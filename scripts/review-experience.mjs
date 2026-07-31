import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const chromePath =
  process.env.CHROME_PATH ??
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const baseUrl = process.env.REVIEW_BASE_URL ?? 'http://127.0.0.1:4321';
const outputDirectory = 'docs/review/experience-section/final';
const screenshotDefinitions = [
  ['home-pl', '/', '.experience-section', [1440, 1280, 1024, 768, 390, 320]],
  ['home-en', '/en/', '.experience-section', [1440, 1024, 768, 390]],
  ['about-pl', '/o-clearstance/', '.about-story', [1440, 1024, 768, 390, 320]],
  ['about-en', '/en/about/', '.about-story', [1440, 768, 390]]
];
const auditDefinitions = [
  ['home-pl', '/', '.experience-section'],
  ['home-en', '/en/', '.experience-section'],
  ['about-pl', '/o-clearstance/', '.about-story'],
  ['about-en', '/en/about/', '.about-story']
];
const auditWidths = [1440, 1280, 1024, 768, 390, 375, 320];

class CdpClient {
  constructor(webSocketUrl) {
    this.id = 0;
    this.pending = new Map();
    this.listeners = new Map();
    this.socket = new WebSocket(webSocketUrl);
  }

  async connect() {
    await new Promise((resolve, reject) => {
      this.socket.addEventListener('open', resolve, { once: true });
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
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  on(method, listener) {
    const listeners = this.listeners.get(method) ?? [];
    listeners.push(listener);
    this.listeners.set(method, listeners);
  }

  once(method, timeout = 10_000) {
    return new Promise((resolve, reject) => {
      const listener = (params) => {
        clearTimeout(timer);
        const listeners = this.listeners.get(method) ?? [];
        this.listeners.set(
          method,
          listeners.filter((candidate) => candidate !== listener)
        );
        resolve(params);
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
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const getFreePort = () =>
  new Promise((resolve, reject) => {
    const server = createServer();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      server.close(() => resolve(address.port));
    });
  });

const waitForChrome = async (port) => {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return response.json();
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
  if (!response.ok) throw new Error(`Could not create Chrome page: ${response.status}`);
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
    throw new Error(response.exceptionDetails.text ?? 'Browser evaluation failed.');
  }
  return response.result.value;
};

const openRoute = async (client, route, width) => {
  await client.send('Emulation.setDeviceMetricsOverride', {
    width,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
    screenWidth: width,
    screenHeight: 900
  });
  await client.send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }]
  });
  await client.send('Network.setCacheDisabled', { cacheDisabled: true });
  await client.send('Network.clearBrowserCache');
  const loaded = client.once('Page.loadEventFired');
  await client.send('Page.navigate', { url: new URL(route, baseUrl).toString() });
  await loaded;
  await delay(250);
};

const prepareSection = async (client, selector) =>
  evaluate(
    client,
    `(async () => {
      const section = document.querySelector(${JSON.stringify(selector)});
      if (!section) throw new Error('Missing review section: ${selector}');
      section.scrollIntoView({ block: 'center' });
      document.querySelectorAll('[data-reveal]').forEach((item) => item.classList.add('is-visible'));
      const images = [...section.querySelectorAll('img')];
      await Promise.all(images.map(async (image) => {
        if (image.complete) return;
        await new Promise((resolve) => {
          image.addEventListener('load', resolve, { once: true });
          image.addEventListener('error', resolve, { once: true });
        });
      }));
      document.activeElement?.blur?.();
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      return true;
    })()`
  );

const captureClip = async (client, clip, output) => {
  const screenshot = await client.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: true,
    fromSurface: true,
    clip: { ...clip, scale: 1 }
  });
  await writeFile(output, Buffer.from(screenshot.data, 'base64'));
};

const captureSection = async (client, selector, output) => {
  await prepareSection(client, selector);
  const clip = await evaluate(
    client,
    `(() => {
      const section = document.querySelector(${JSON.stringify(selector)});
      const rect = section.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const before = Math.min(150, top);
      const after = 150;
      const clip = {
        x: 0,
        y: Math.max(0, top - before),
        width: document.documentElement.clientWidth,
        height: Math.min(
          document.documentElement.scrollHeight - Math.max(0, top - before),
          rect.height + before + after
        )
      };
      window.scrollTo(0, 0);
      return clip;
    })()`
  );
  await delay(100);
  await captureClip(client, clip, output);
};

const inspectPage = async (client, selector, width) => {
  await prepareSection(client, selector);
  const firstTabTarget = await evaluate(
    client,
    `(() => {
      const selector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
      const active = document.querySelector(selector);
      return {
        tag: active?.tagName ?? null,
        href: active?.getAttribute?.('href') ?? null,
        text: active?.textContent?.trim() ?? null
      };
    })()`
  );
  await client.send('Emulation.setPageScaleFactor', { pageScaleFactor: 2 });
  const zoomScale = await evaluate(client, 'window.visualViewport?.scale ?? 1');
  await client.send('Emulation.setPageScaleFactor', { pageScaleFactor: 1 });

  return evaluate(
    client,
    `(() => {
      const section = document.querySelector(${JSON.stringify(selector)});
      const pictures = [...section.querySelectorAll('.experience-media-picture')];
      const images = pictures.map((picture) => {
        const image = picture.querySelector('img');
        const rect = picture.getBoundingClientRect();
        return {
          width: Number(rect.width.toFixed(2)),
          height: Number(rect.height.toFixed(2)),
          ratio: Number((rect.width / rect.height).toFixed(4)),
          currentSrc: image.currentSrc,
          naturalWidth: image.naturalWidth,
          naturalHeight: image.naturalHeight,
          complete: image.complete,
          loading: image.loading,
          decoding: image.decoding,
          alt: image.alt
        };
      });
      const axis = section.querySelector('.about-experience-axis');
      return {
        viewportWidth: ${width},
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        sectionHeight: Number(section.getBoundingClientRect().height.toFixed(2)),
        pairEqual:
          images.length === 2 &&
          Math.abs(images[0].width - images[1].width) < 1 &&
          Math.abs(images[0].height - images[1].height) < 1,
        images,
        axisDisplay: axis ? getComputedStyle(axis).display : null,
        brokenImages: [...document.images]
          .filter((image) => !image.complete || image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.src),
        skipLinkPresent: Boolean(document.querySelector('a[href="#main-content"]')),
        reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
        hydrationDirectives: document.querySelectorAll('[client\\\\:load], [client\\\\:idle], [client\\\\:visible], astro-island').length
      };
    })()`
  ).then((result) => ({ ...result, firstTabTarget, zoomScale }));
};

const main = async () => {
  await mkdir(outputDirectory, { recursive: true });
  const port = await getFreePort();
  const profileDirectory = await mkdtemp(join(tmpdir(), 'clearstance-review-'));
  const chrome = spawn(
    chromePath,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      '--no-default-browser-check',
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profileDirectory}`,
      'about:blank'
    ],
    { stdio: 'ignore' }
  );

  try {
    await waitForChrome(port);
    const audit = [];

    for (const [name, route, selector] of auditDefinitions) {
      for (const width of auditWidths) {
        const client = await createPage(port);
        const consoleErrors = [];
        const requestFailures = [];
        const experienceResponses = new Map();
        client.on('Runtime.consoleAPICalled', (event) => {
          if (event.type === 'error') consoleErrors.push(event);
        });
        client.on('Runtime.exceptionThrown', (event) => consoleErrors.push(event));
        client.on('Network.loadingFailed', (event) => requestFailures.push(event));
        client.on('Network.responseReceived', (event) => {
          if (!event.response.url.includes('/images/experience/')) return;
          experienceResponses.set(event.requestId, {
            url: event.response.url,
            mimeType: event.response.mimeType,
            status: event.response.status,
            transferSize: null
          });
        });
        client.on('Network.loadingFinished', (event) => {
          const response = experienceResponses.get(event.requestId);
          if (response) response.transferSize = event.encodedDataLength;
        });
        await openRoute(client, route, width);
        const result = await inspectPage(client, selector, width);
        await delay(100);
        audit.push({
          route: name,
          ...result,
          consoleErrors: consoleErrors.length,
          requestFailures: requestFailures.length,
          experienceResponses: [...experienceResponses.values()]
        });
        client.close();
      }
    }

    for (const [name, route, selector, widths] of screenshotDefinitions) {
      for (const width of widths) {
        const client = await createPage(port);
        await openRoute(client, route, width);
        await captureSection(
          client,
          selector,
          join(outputDirectory, `${name}-${width}.png`)
        );
        client.close();
      }
    }

    const comparisonClient = await createPage(port);
    await openRoute(comparisonClient, '/', 1440);
    await prepareSection(comparisonClient, '.experience-section');
    const navigatorSvg = await readFile(
      'node_modules/iconoir/icons/regular/navigator.svg',
      'utf8'
    );
    const comparisonClip = await evaluate(
      comparisonClient,
      `(() => {
        const source = document.querySelector('.experience-tracks');
        const comparison = document.createElement('div');
        comparison.className = 'icon-review-comparison';
        comparison.style.cssText = 'width: 700px; padding: 24px; background: var(--paper);';

        const addVariant = (label, mutate) => {
          const heading = document.createElement('p');
          heading.textContent = label;
          heading.style.cssText = 'margin: 0 0 8px; color: var(--teal-deep); font: 700 9px/1.4 var(--mono); letter-spacing: .12em; text-transform: uppercase;';
          const tracks = source.cloneNode(true);
          tracks.style.margin = '0 0 22px';
          mutate?.(tracks);
          comparison.append(heading, tracks);
        };

        addVariant('01 / compass + maps-arrow-diagonal');
        addVariant('02 / compass + navigator', (tracks) => {
          const icon = tracks.querySelectorAll('.experience-domain-icon')[1];
          icon.outerHTML = ${JSON.stringify(navigatorSvg.replace('<svg ', '<svg class="experience-domain-icon" width="22" height="22" '))};
        });
        addVariant('03 / bez ikon', (tracks) => {
          tracks.querySelectorAll('.experience-domain-icon').forEach((icon) => icon.remove());
        });

        source.replaceWith(comparison);
        const rect = comparison.getBoundingClientRect();
        return {
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY,
          width: rect.width,
          height: rect.height
        };
      })()`
    );
    await captureClip(
      comparisonClient,
      comparisonClip,
      join(outputDirectory, 'icon-comparison-compass-maps-arrow-diagonal.png')
    );
    comparisonClient.close();

    const reviewRoutes = [
      '/review/experience-a/',
      '/review/experience-b/',
      '/en/review/experience-a/',
      '/en/review/experience-b/'
    ];
    const routeStatuses = Object.fromEntries(
      await Promise.all(
        reviewRoutes.map(async (route) => [
          route,
          (await fetch(new URL(route, baseUrl))).status
        ])
      )
    );

    await writeFile(
      join(outputDirectory, 'validation-report.json'),
      `${JSON.stringify({ generated: new Date().toISOString(), routeStatuses, audit }, null, 2)}\n`
    );
    console.log(
      `Captured 18 page screenshots, one icon comparison and ${audit.length} responsive audits.`
    );
  } finally {
    chrome.kill('SIGTERM');
    await rm(profileDirectory, { recursive: true, force: true });
  }
};

await main();
