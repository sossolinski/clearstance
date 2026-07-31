import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const chromePath =
  process.env.CHROME_PATH ??
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const baseUrl = process.env.REVIEW_BASE_URL ?? 'http://127.0.0.1:4321';
const deploymentReview = process.env.REVIEW_DEPLOYMENT === 'true';
const outputDirectory =
  process.env.REVIEW_OUTPUT_DIRECTORY ??
  'docs/review/insights-visual-system/final';
const widths = process.env.REVIEW_WIDTHS
  ? process.env.REVIEW_WIDTHS.split(',').map(Number)
  : [1440, 1024, 768, 390, 320];
const routes = [
  ['index-pl', '/insights/', 'index', null],
  ['index-en', '/en/insights/', 'index', null],
  ['article-pl-situation', '/insights/kiedy-zespol-kryzysowy-traci-obraz-sytuacji/', 'article', 'situation-field-a'],
  ['article-pl-communication', '/insights/pierwsza-godzina-komunikacji-kryzysowej/', 'article', 'decision-route-outbound'],
  ['article-pl-exercises', '/insights/dobre-cwiczenie-kryzysowe-nie-jest-spektaklem/', 'article', 'decision-route-checkpoints'],
  ['article-pl-continuity', '/insights/plany-ciaglosci-zawodza-na-styku-odpowiedzialnosci/', 'article', 'interface-map-a'],
  ['article-en-situation', '/en/insights/when-crisis-teams-lose-situational-awareness/', 'article', 'situation-field-a'],
  ['article-en-communication', '/en/insights/the-first-hour-of-crisis-communication/', 'article', 'decision-route-outbound'],
  ['article-en-exercises', '/en/insights/a-good-crisis-exercise-is-not-a-performance/', 'article', 'decision-route-checkpoints'],
  ['article-en-continuity', '/en/insights/business-continuity-fails-at-the-interfaces/', 'article', 'interface-map-a'],
  ['home-pl', '/', 'home', null],
  ['home-en', '/en/', 'home', null]
];
if (deploymentReview) {
  routes.push(
    ['about-pl', '/o-clearstance/', 'general', null],
    ['about-en', '/en/about/', 'general', null]
  );
}
const screenshots = deploymentReview
  ? [
      ...[1440, 1024, 768, 390, 320].map((width) => [
        `index-pl-${width}`,
        '/insights/',
        '.insights-index',
        width
      ]),
      ...[1440, 390].map((width) => [
        `index-en-${width}`,
        '/en/insights/',
        '.insights-index',
        width
      ]),
      ...[1440, 768, 390, 320].map((width) => [
        `article-pl-${width}`,
        '/insights/kiedy-zespol-kryzysowy-traci-obraz-sytuacji/',
        '.article-header',
        width
      ]),
      ...[1440, 390].map((width) => [
        `article-en-${width}`,
        '/en/insights/when-crisis-teams-lose-situational-awareness/',
        '.article-header',
        width
      ])
    ]
  : routes
      .filter(([, , kind]) => kind !== 'home')
      .flatMap(([name, route, kind]) =>
        [1440, 390].map((width) => [
          `${name}-${width}`,
          route,
          kind === 'index' ? '.insights-index' : '.article-header',
          width
        ])
      );

class CdpClient {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.id = 0;
    this.pending = new Map();
    this.listeners = new Map();
  }

  async connect() {
    await new Promise((resolveConnection, reject) => {
      this.socket.addEventListener('open', resolveConnection, { once: true });
      this.socket.addEventListener('error', reject, { once: true });
    });
    this.socket.addEventListener('message', ({ data }) => {
      const message = JSON.parse(data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
        return;
      }
      for (const listener of this.listeners.get(message.method) ?? []) {
        listener(message.params);
      }
    });
  }

  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolveRequest, reject) => {
      this.pending.set(id, { resolve: resolveRequest, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  on(method, listener) {
    const listeners = this.listeners.get(method) ?? [];
    listeners.push(listener);
    this.listeners.set(method, listeners);
  }

  once(method, timeout = 10_000) {
    return new Promise((resolveEvent, reject) => {
      const listener = (params) => {
        clearTimeout(timer);
        const listeners = this.listeners.get(method) ?? [];
        this.listeners.set(
          method,
          listeners.filter((candidate) => candidate !== listener)
        );
        resolveEvent(params);
      };
      const timer = setTimeout(
        () => reject(new Error(`Timed out waiting for ${method}`)),
        timeout
      );
      this.on(method, listener);
    });
  }

  close() {
    this.socket.close();
  }
}

const delay = (milliseconds) =>
  new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));

const getFreePort = () =>
  new Promise((resolvePort, reject) => {
    const server = createServer();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      if (!address || typeof address === 'string') {
        server.close(() => reject(new Error('Missing free port.')));
        return;
      }
      server.close(() => resolvePort(address.port));
    });
  });

const waitForChrome = async (port) => {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return;
    } catch {
      // Chrome is still starting.
    }
    await delay(100);
  }
  throw new Error('Chrome DevTools endpoint did not start.');
};

const createPage = async (port) => {
  const response = await fetch(
    `http://127.0.0.1:${port}/json/new?${encodeURIComponent('about:blank')}`,
    { method: 'PUT' }
  );
  if (!response.ok) throw new Error(`Could not create page: ${response.status}`);
  const target = await response.json();
  const client = new CdpClient(target.webSocketDebuggerUrl);
  await client.connect();
  await Promise.all([
    client.send('Page.enable'),
    client.send('Runtime.enable'),
    client.send('Network.enable')
  ]);
  return client;
};

const evaluate = async (client, expression) => {
  const response = await client.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true
  });
  if (response.exceptionDetails) {
    throw new Error(response.exceptionDetails.exception?.description ?? 'Browser evaluation failed.');
  }
  return response.result.value;
};

const openPage = async (client, route, width) => {
  await client.send('Emulation.setDeviceMetricsOverride', {
    width,
    height: 900,
    deviceScaleFactor: 1,
    mobile: width <= 430,
    screenWidth: width,
    screenHeight: 900
  });
  await client.send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }]
  });
  await client.send('Network.setCacheDisabled', { cacheDisabled: true });
  const loaded = client.once('Page.loadEventFired');
  await client.send('Page.navigate', { url: new URL(route, baseUrl).toString() });
  await loaded;
  await evaluate(
    client,
    `(async () => {
      document.querySelectorAll('[data-reveal]').forEach((item) => item.classList.add('is-visible'));
      const step = Math.max(500, Math.floor(innerHeight * .8));
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 25));
      }
      await Promise.all([...document.images].map(async (image) => {
        if (image.complete) return;
        await new Promise((resolve) => {
          image.addEventListener('load', resolve, { once: true });
          image.addEventListener('error', resolve, { once: true });
        });
      }));
      scrollTo(0, 0);
      await Promise.all(document.fonts ? [document.fonts.ready] : []);
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      return true;
    })()`
  );
  await delay(100);
};

const inspectPage = async (client, kind, expectedTheme, width) =>
  evaluate(
    client,
    `(() => {
      const kind = ${JSON.stringify(kind)};
      const expectedTheme = ${JSON.stringify(expectedTheme)};
      const visuals = [...document.querySelectorAll('.insight-visual')];
      const firstFocusable = document.querySelector(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const hrefs = visuals.map((visual) => visual.querySelector('use')?.getAttribute('href') ?? '');
      const emptyUses = visuals.filter((visual) => {
        const use = visual.querySelector('use');
        if (!use) return true;
        const box = use.getBBox();
        return box.width === 0 || box.height === 0;
      }).length;
      const indexItems = [...document.querySelectorAll('.insight-item')];
      const indexRatios = indexItems.map((item) => {
        const visual = item.querySelector('.insight-thumbnail');
        if (!visual) return null;
        const itemRect = item.getBoundingClientRect();
        const visualRect = visual.getBoundingClientRect();
        const metaRect = item.querySelector('.insight-meta')?.getBoundingClientRect();
        return {
          aspect: Number((visualRect.width / visualRect.height).toFixed(4)),
          share: Number((visualRect.width / itemRect.width).toFixed(4)),
          visualBeforeMeta: metaRect ? visualRect.top < metaRect.top : false
        };
      }).filter(Boolean);
      const header = document.querySelector('.article-header');
      const copy = document.querySelector('.article-header-copy');
      const articleVisual = document.querySelector('.article-header-visual');
      const ordered = [
        document.querySelector('.back-link'),
        header?.querySelector('.eyebrow'),
        header?.querySelector('h1'),
        header?.querySelector('.article-deck'),
        header?.querySelector('.article-meta'),
        articleVisual
      ].map((element) => element?.getBoundingClientRect().top ?? null);
      const articleOrder = ordered.every(
        (top, index) => top === null || index === 0 || ordered[index - 1] === null || top >= ordered[index - 1]
      );
      const copyRect = copy?.getBoundingClientRect();
      const articleVisualRect = articleVisual?.getBoundingClientRect();
      const ogImage = document.querySelector('meta[property="og:image"]')?.content ?? null;
      return {
        kind,
        viewportWidth: ${width},
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        brokenImages: [...document.images]
          .filter((image) => !image.complete || image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.src),
        firstFocusable: firstFocusable?.getAttribute('href') ?? null,
        reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
        visualCount: visuals.length,
        emptyUses,
        hydrationCount: document.querySelectorAll('astro-island').length,
        hrefs,
        expectedThemePresent: expectedTheme ? hrefs.some((href) => href.endsWith('#' + expectedTheme)) : true,
        reserveThemePresent: hrefs.some((href) => /#(?:situation-field-b|interface-map-b)$/u.test(href)),
        indexRatios,
        indexOrderValid: kind !== 'index' || ${width} > 760 || indexRatios.every((item) => item.visualBeforeMeta),
        indexShareValid: kind !== 'index' || ${width} <= 900 || indexRatios.every((item) => item.share <= .32),
        articleOrder,
        articleDesktopSplit:
          kind !== 'article' ||
          ${width} <= 900 ||
          Boolean(copyRect && articleVisualRect && articleVisualRect.left > copyRect.right),
        articleMobileAfterMeta:
          kind !== 'article' ||
          ${width} > 900 ||
          Boolean(articleVisualRect && ordered[4] !== null && articleVisualRect.top >= ordered[4]),
        articleRule:
          kind !== 'article' ||
          !articleVisual ||
          (${width} > 900
            ? getComputedStyle(articleVisual).borderLeftWidth
            : getComputedStyle(articleVisual).borderTopWidth),
        homeHasVisual: kind === 'home' && visuals.length > 0,
        ogImage
      };
    })()`
  );

const captureSection = async (client, selector, output) => {
  const clip = await evaluate(
    client,
    `(() => {
      const target = document.querySelector(${JSON.stringify(selector)});
      if (!target) throw new Error('Missing screenshot target');
      const rect = target.getBoundingClientRect();
      return {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height
      };
    })()`
  );
  const screenshot = await client.send('Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
    captureBeyondViewport: true,
    clip: { ...clip, scale: 1 }
  });
  await writeFile(output, Buffer.from(screenshot.data, 'base64'));
};

const main = async () => {
  await mkdir(outputDirectory, { recursive: true });
  const port = await getFreePort();
  const profile = await mkdtemp(join(tmpdir(), 'clearstance-insights-production-'));
  const chrome = spawn(
    chromePath,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      '--no-default-browser-check',
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profile}`,
      'about:blank'
    ],
    { stdio: 'ignore' }
  );

  try {
    await waitForChrome(port);
    const audit = [];

    for (const [name, route, kind, expectedTheme] of routes) {
      for (const width of widths) {
        const client = await createPage(port);
        const responses = [];
        const failures = [];
        const consoleErrors = [];
        client.on('Network.responseReceived', ({ response }) => responses.push(response));
        client.on('Network.loadingFailed', (event) => failures.push(event));
        client.on('Runtime.consoleAPICalled', (event) => {
          if (event.type === 'error') consoleErrors.push(event);
        });
        client.on('Runtime.exceptionThrown', (event) => consoleErrors.push(event));
        await openPage(client, route, width);
        const page = await inspectPage(client, kind, expectedTheme, width);
        audit.push({
          route: name,
          width,
          ...page,
          badResponses: responses.filter(({ status }) => status >= 400).length,
          failedRequests: failures.length,
          consoleErrors: consoleErrors.length
        });
        client.close();
      }
    }

    for (const [name, route, selector, width] of screenshots) {
      const client = await createPage(port);
      await openPage(client, route, width);
      await captureSection(
        client,
        selector,
        join(outputDirectory, `${name}.png`)
      );
      client.close();
    }

    const failed = audit.filter((entry) => {
      const expectedVisuals = entry.kind === 'index'
        ? 4
        : entry.kind === 'article'
          ? 4
          : 0;
      return (
        entry.scrollWidth > entry.clientWidth ||
        entry.brokenImages.length > 0 ||
        entry.firstFocusable !== '#main-content' ||
        !entry.reducedMotion ||
        entry.visualCount !== expectedVisuals ||
        entry.emptyUses > 0 ||
        entry.hydrationCount > 0 ||
        !entry.expectedThemePresent ||
        entry.reserveThemePresent ||
        !entry.indexOrderValid ||
        !entry.indexShareValid ||
        (entry.kind === 'article' && entry.width <= 900 && !entry.articleOrder) ||
        !entry.articleDesktopSplit ||
        !entry.articleMobileAfterMeta ||
        entry.articleRule === '0px' ||
        entry.homeHasVisual ||
        entry.badResponses > 0 ||
        entry.failedRequests > 0 ||
        entry.consoleErrors > 0
      );
    });

    await writeFile(
      join(outputDirectory, 'validation-report.json'),
      `${JSON.stringify({ generated: new Date().toISOString(), audit, failed }, null, 2)}\n`
    );
    if (failed.length > 0) {
      throw new Error(`Insights production review failed ${failed.length} checks.`);
    }
    console.log(
      `Captured ${screenshots.length} screenshots and passed ${audit.length} responsive audits.`
    );
  } finally {
    chrome.kill('SIGTERM');
    await Promise.race([
      new Promise((resolveExit) => chrome.once('exit', resolveExit)),
      delay(2_000)
    ]);
    await rm(profile, {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 150
    });
  }
};

await main();
