import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const previewOrigin = process.env.PREVIEW_ORIGIN;
const outputDirectory =
  process.env.REVIEW_OUTPUT_DIRECTORY ?? 'docs/review/deployment-preview';
const chromePath =
  process.env.CHROME_PATH ??
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const previewUrl = previewOrigin ? new URL(previewOrigin) : null;
const isLocalPreview = ['127.0.0.1', 'localhost'].includes(previewUrl?.hostname);

if (!previewUrl || (previewUrl.protocol !== 'https:' && !isLocalPreview)) {
  throw new Error('PREVIEW_ORIGIN must be HTTPS or a local review origin.');
}

const delay = (milliseconds) =>
  new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));

const getFreePort = () =>
  new Promise((resolvePort, reject) => {
    const server = createServer();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      server.close(() =>
        typeof address === 'object' && address
          ? resolvePort(address.port)
          : reject(new Error('Missing Chrome port.'))
      );
    });
  });

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
      } else {
        for (const listener of this.listeners.get(message.method) ?? []) {
          listener(message.params);
        }
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
    this.listeners.set(method, [
      ...(this.listeners.get(method) ?? []),
      listener
    ]);
  }

  once(method, timeout = 15_000) {
    return new Promise((resolve, reject) => {
      const listener = (params) => {
        clearTimeout(timer);
        this.listeners.set(
          method,
          (this.listeners.get(method) ?? []).filter((item) => item !== listener)
        );
        resolve(params);
      };
      const timer = setTimeout(
        () => reject(new Error(`Timed out waiting for ${method}.`)),
        timeout
      );
      this.on(method, listener);
    });
  }
}

const evaluate = async (client, expression) => {
  const result = await client.send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description ?? 'Evaluation failed.');
  }
  return result.result.value;
};

const key = async (client, value) => {
  const keyCode = value === 'Enter'
    ? 13
    : value === 'Escape'
      ? 27
      : value === 'Tab'
        ? 9
        : 32;
  const code = value === ' ' ? 'Space' : value;
  await client.send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: value,
    code,
    windowsVirtualKeyCode: keyCode,
    ...(value === ' ' ? { text: ' ', nativeVirtualKeyCode: keyCode } : {})
  });
  await client.send('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: value,
    code,
    windowsVirtualKeyCode: keyCode,
    ...(value === ' ' ? { nativeVirtualKeyCode: keyCode } : {})
  });
};

const port = await getFreePort();
const profile = await mkdtemp(join(tmpdir(), 'clearstance-preview-interactions-'));
const chrome = spawn(
  chromePath,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    'about:blank'
  ],
  { stdio: 'ignore' }
);

try {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      if ((await fetch(`http://127.0.0.1:${port}/json/version`)).ok) break;
    } catch {
      await delay(100);
    }
  }
  const target = await (
    await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {
      method: 'PUT'
    })
  ).json();
  const client = new CdpClient(target.webSocketDebuggerUrl);
  await client.connect();
  await Promise.all([
    client.send('Page.enable'),
    client.send('Runtime.enable'),
    client.send('Network.enable')
  ]);
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 900,
    deviceScaleFactor: 1,
    mobile: true,
    screenWidth: 390,
    screenHeight: 900
  });
  await client.send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }]
  });
  const failures = [];
  const consoleErrors = [];
  client.on('Network.loadingFailed', (event) => failures.push(event.errorText));
  client.on('Runtime.consoleAPICalled', (event) => {
    if (event.type === 'error') consoleErrors.push(event.type);
  });
  client.on('Runtime.exceptionThrown', () => consoleErrors.push('exception'));

  let loaded = client.once('Page.loadEventFired');
  await client.send('Page.navigate', {
    url: new URL('/insights/', previewOrigin).toString()
  });
  await loaded;
  await evaluate(client, 'document.activeElement?.blur(); true');
  await key(client, 'Tab');
  const skipLink = await evaluate(
    client,
    `({
      href: document.activeElement?.getAttribute('href'),
      className: document.activeElement?.className
    })`
  );
  await evaluate(
    client,
    `document.querySelector('.mobile-navigation > summary').focus(); true`
  );
  await key(client, ' ');
  await delay(100);
  const menuOpen = await evaluate(
    client,
    `(() => {
      const menu = document.querySelector('.mobile-navigation');
      const summary = menu?.querySelector('summary');
      const language = menu?.querySelector('.language-switcher a:not([aria-current="page"])');
      return {
        open: menu?.open,
        bodyLocked: document.body.classList.contains('menu-is-open'),
        label: summary?.getAttribute('aria-label'),
        languageHref: language?.getAttribute('href'),
        panelVisible: Boolean(menu?.querySelector('.mobile-navigation-panel')?.getClientRects().length)
      };
    })()`
  );
  await key(client, 'Escape');
  await delay(100);
  const menuClosed = await evaluate(
    client,
    `(() => {
      const menu = document.querySelector('.mobile-navigation');
      return {
        closed: !menu?.open,
        bodyUnlocked: !document.body.classList.contains('menu-is-open'),
        focusReturned: document.activeElement === menu?.querySelector('summary')
      };
    })()`
  );
  await client.send('Emulation.setPageScaleFactor', { pageScaleFactor: 2 });
  const zoom = await evaluate(
    client,
    `({
      scale: visualViewport?.scale,
      hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      brokenImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).length
    })`
  );
  await client.send('Emulation.setPageScaleFactor', { pageScaleFactor: 1 });
  await evaluate(
    client,
    `(() => {
      const menu = document.querySelector('.mobile-navigation');
      menu.open = true;
      const language = menu.querySelector('.language-switcher a:not([aria-current="page"])');
      language.focus();
      return true;
    })()`
  );
  loaded = client.once('Page.loadEventFired');
  await key(client, 'Enter');
  await loaded;
  const languageSwitch = await evaluate(
    client,
    `({
      lang: document.documentElement.lang,
      path: location.pathname,
      menuClosed: !document.querySelector('.mobile-navigation')?.open
    })`
  );

  loaded = client.once('Page.loadEventFired');
  await client.send('Page.navigate', {
    url: new URL(
      '/insights/kiedy-zespol-kryzysowy-traci-obraz-sytuacji/',
      previewOrigin
    ).toString()
  });
  await loaded;
  const article = await evaluate(
    client,
    `(() => {
      const header = document.querySelector('.article-header');
      const nodes = [
        header?.querySelector('.back-link'),
        header?.querySelector('.eyebrow'),
        header?.querySelector('h1'),
        header?.querySelector('.article-deck'),
        header?.querySelector('.article-meta'),
        header?.querySelector('.article-header-visual')
      ];
      const domOrder = nodes.every((node, index) =>
        index === 0 || Boolean(nodes[index - 1]?.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_FOLLOWING)
      );
      return {
        domOrder,
        cssOrders: nodes.map((node) => node ? getComputedStyle(node).order : null),
        visualCount: header?.querySelectorAll('.article-header-visual').length,
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        ogImage: document.querySelector('meta[property="og:image"]')?.content,
        hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches
      };
    })()`
  );

  const report = {
    generated: new Date().toISOString(),
    skipLink,
    menuOpen,
    menuClosed,
    zoom,
    languageSwitch,
    article,
    failedRequests: failures,
    consoleErrors
  };
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(
    join(outputDirectory, 'interaction-report.json'),
    `${JSON.stringify(report, null, 2)}\n`
  );
  const checks = [
    skipLink.href === '#main-content',
    skipLink.className === 'skip-link',
    menuOpen.open,
    menuOpen.bodyLocked,
    menuOpen.panelVisible,
    menuOpen.languageHref === '/en/insights/',
    menuClosed.closed,
    menuClosed.bodyUnlocked,
    menuClosed.focusReturned,
    zoom.scale === 2,
    !zoom.hasHorizontalOverflow,
    zoom.brokenImages === 0,
    languageSwitch.lang === 'en',
    languageSwitch.path === '/en/insights/',
    languageSwitch.menuClosed,
    article.domOrder,
    article.cssOrders.every((order) => order === '0'),
    article.visualCount === 1,
    article.canonical?.startsWith('https://clearstance.pl/'),
    article.ogImage?.startsWith('https://clearstance.pl/'),
    !article.hasHorizontalOverflow,
    article.reducedMotion,
    failures.length === 0,
    consoleErrors.length === 0
  ];
  if (checks.includes(false)) {
    throw new Error('Preview interaction validation failed.');
  }
  console.log(`Preview interaction validation passed (${checks.length} checks).`);
} finally {
  chrome.kill('SIGTERM');
  await Promise.race([
    new Promise((resolve) => chrome.once('exit', resolve)),
    delay(2_000)
  ]);
  await rm(profile, { recursive: true, force: true });
}
