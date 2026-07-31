import { spawn } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const chromePath =
  process.env.CHROME_PATH ??
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const baseUrl = process.env.VALIDATION_BASE_URL ?? 'http://127.0.0.1:4321';
const widths = [1440, 1024, 768, 390, 320];
const routes = [
  ['home-pl', '/'],
  ['home-en', '/en/'],
  ['about-pl', '/o-clearstance/'],
  ['about-en', '/en/about/'],
  ['contact-pl', '/kontakt/'],
  ['contact-en', '/en/contact/']
];
const retiredPattern = /(brand-statement(?:-\d+)?\.(?:jpg|webp)|operational-briefing)/i;

class CdpClient {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.id = 0;
    this.pending = new Map();
    this.listeners = new Map();
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
    throw new Error(response.exceptionDetails.text ?? 'Browser evaluation failed.');
  }
  return response.result.value;
};

const openPage = async (client, route, width) => {
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
  await evaluate(
    client,
    `(async () => {
      const step = Math.max(500, Math.floor(innerHeight * 0.75));
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 35));
      }
      document.querySelectorAll('[data-reveal]').forEach((item) => item.classList.add('is-visible'));
      await Promise.all([...document.images].map(async (image) => {
        if (image.complete) return;
        await new Promise((resolve) => {
          image.addEventListener('load', resolve, { once: true });
          image.addEventListener('error', resolve, { once: true });
        });
      }));
      scrollTo(0, 0);
      return true;
    })()`
  );
  await delay(100);
};

const main = async () => {
  const port = await getFreePort();
  const profile = await mkdtemp(join(tmpdir(), 'clearstance-retired-validation-'));
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

    for (const [name, route] of routes) {
      for (const width of widths) {
        const client = await createPage(port);
        const requests = [];
        const failures = [];
        const consoleErrors = [];

        client.on('Network.responseReceived', ({ response }) => {
          requests.push({
            url: response.url,
            status: response.status,
            mimeType: response.mimeType
          });
        });
        client.on('Network.loadingFailed', (event) => failures.push(event));
        client.on('Runtime.consoleAPICalled', (event) => {
          if (event.type === 'error') consoleErrors.push(event);
        });
        client.on('Runtime.exceptionThrown', (event) => consoleErrors.push(event));

        await openPage(client, route, width);
        const page = await evaluate(
          client,
          `(() => {
            const focusable = document.querySelector(
              'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            return {
              clientWidth: document.documentElement.clientWidth,
              scrollWidth: document.documentElement.scrollWidth,
              brokenImages: [...document.images]
                .filter((image) => !image.complete || image.naturalWidth === 0)
                .map((image) => image.currentSrc || image.src),
              firstFocusable: focusable?.getAttribute('href') ?? null,
              reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
              experienceSources: [...document.querySelectorAll('.experience-media img')]
                .map((image) => image.currentSrc),
              heroSource: document.querySelector('.hero-media img')?.currentSrc ?? null
            };
          })()`
        );

        audit.push({
          route: name,
          width,
          overflow: page.scrollWidth > page.clientWidth,
          brokenImages: page.brokenImages,
          firstFocusable: page.firstFocusable,
          reducedMotion: page.reducedMotion,
          experienceSources: page.experienceSources,
          heroSource: page.heroSource,
          retiredRequests: requests
            .filter(({ url }) => retiredPattern.test(url))
            .map(({ url }) => url),
          badResponses: requests.filter(({ status }) => status >= 400),
          failedRequests: failures.length,
          consoleErrors: consoleErrors.length
        });
        client.close();
      }
    }

    const report = {
      generated: new Date().toISOString(),
      chrome: chromePath,
      audit
    };
    await writeFile(
      '/tmp/clearstance-retired-assets-browser-audit.json',
      `${JSON.stringify(report, null, 2)}\n`
    );
    const failed = audit.filter(
      (entry) =>
        entry.overflow ||
        entry.brokenImages.length ||
        entry.retiredRequests.length ||
        entry.badResponses.length ||
        entry.failedRequests ||
        entry.consoleErrors ||
        entry.firstFocusable !== '#main-content' ||
        !entry.reducedMotion ||
        entry.experienceSources.some(
          (source) => !source.includes('/images/experience/')
        ) ||
        (entry.route.startsWith('home') &&
          !entry.heroSource.includes('/images/hero-lighthouse-horizon-'))
    );
    console.log(
      JSON.stringify(
        {
          cases: audit.length,
          passed: audit.length - failed.length,
          failed: failed.map(({ route, width }) => ({ route, width }))
        },
        null,
        2
      )
    );
    if (failed.length) process.exitCode = 1;
  } finally {
    chrome.kill('SIGTERM');
    await rm(profile, { recursive: true, force: true });
  }
};

await main();
