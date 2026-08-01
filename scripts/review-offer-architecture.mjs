import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const chromePath =
  process.env.CHROME_PATH ??
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const baseUrl = process.env.REVIEW_BASE_URL ?? 'http://127.0.0.1:4321';
const outputDirectory = 'docs/review/offer-architecture';
const widths = [1920, 1440, 1280, 1024, 768, 430, 390, 375, 320];
const releaseWidths = [1920, 1440, 1280, 1024, 900, 768, 430, 390, 375, 320];
const releaseRoutes = [
  ['home-pl', '/'],
  ['home-en', '/en/'],
  ['services-pl', '/oferta/'],
  ['services-en', '/en/services/'],
  ['insights-pl', '/insights/'],
  ['insights-en', '/en/insights/'],
  ['article-pl', '/insights/kiedy-zespol-kryzysowy-traci-obraz-sytuacji/'],
  ['article-en', '/en/insights/when-crisis-teams-lose-situational-awareness/'],
  ['about-pl', '/o-clearstance/'],
  ['about-en', '/en/about/'],
  ['contact-pl', '/kontakt/'],
  ['contact-en', '/en/contact/']
];
const routes = [
  {
    name: 'home-pl',
    route: '/',
    selector: '.services-section',
    titles: [
      'Zarządzanie kryzysowe',
      'Ćwiczenia i facylitacja',
      'Komunikacja kryzysowa',
      'Wsparcie osób dotkniętych zdarzeniem i ich bliskich'
    ],
    metaDescription: 'ClearStance wspiera organizacje w przygotowaniu sposobu podejmowania decyzji, komunikowania się i wspierania ludzi podczas poważnych zdarzeń.',
    intro: 'Pomagamy organizacjom przygotować sposób podejmowania decyzji, komunikacji i wsparcia ludzi podczas poważnych zdarzeń.',
    ctaLabel: 'Pełna oferta',
    ctaText: 'Zobacz pełną ofertę',
    ctaHref: '/oferta/',
    schemaAreas: [
      'zarządzanie kryzysowe',
      'ćwiczenia i facylitacja',
      'komunikacja kryzysowa',
      'wsparcie osób dotkniętych zdarzeniem i ich bliskich'
    ],
    notes: 0
  },
  {
    name: 'home-en',
    route: '/en/',
    selector: '.services-section',
    titles: [
      'Crisis Management',
      'Exercises & Facilitation',
      'Crisis Communication',
      'Affected People & Family Assistance'
    ],
    metaDescription: 'ClearStance helps organisations prepare how they will make decisions, communicate and support people during serious incidents.',
    intro: 'We help organisations prepare how decisions are made, communication is managed and people are supported during serious incidents.',
    ctaLabel: 'Full offer',
    ctaText: 'Explore the full offer',
    ctaHref: '/en/services/',
    schemaAreas: [
      'crisis management',
      'exercises and facilitation',
      'crisis communication',
      'affected people and family assistance'
    ],
    notes: 0
  },
  {
    name: 'services-pl',
    route: '/oferta/',
    selector: '.services-detail',
    titles: [
      'Zarządzanie kryzysowe',
      'Ćwiczenia i facylitacja',
      'Komunikacja kryzysowa',
      'Wsparcie osób dotkniętych zdarzeniem i ich bliskich'
    ],
    metaDescription: 'Zarządzanie kryzysowe, ćwiczenia, komunikacja kryzysowa oraz organizacja wsparcia osób dotkniętych zdarzeniem i ich bliskich.',
    methodTitle: 'Zaplecze metodyczne',
    methodText: 'Projekty mogą uwzględniać odpowiednie standardy zarządzania kryzysowego, ćwiczeń i ciągłości działania oraz wymagania branżowe właściwe dla organizacji. Standardy stanowią punkt odniesienia dla zakresu pracy, a nie osobny produkt.',
    methodReferences: [
      'ISO 22361 — zarządzanie kryzysowe',
      'ISO 22398 — ćwiczenia',
      'ISO 22301 — ciągłość działania',
      'Wytyczne branżowe — organizacja pomocy osobom i rodzinom po poważnym zdarzeniu'
    ],
    notes: 2
  },
  {
    name: 'services-en',
    route: '/en/services/',
    selector: '.services-detail',
    titles: [
      'Crisis Management',
      'Exercises & Facilitation',
      'Crisis Communication',
      'Affected People & Family Assistance'
    ],
    metaDescription: 'Crisis management, exercises, crisis communication and organisational arrangements supporting affected people and their families.',
    methodTitle: 'Methodological reference points',
    methodText: 'Engagements may draw on relevant standards for crisis management, exercises and business continuity, together with sector-specific requirements applicable to the organisation. These provide reference points for the work rather than separate products.',
    methodReferences: [
      'ISO 22361 — crisis management',
      'ISO 22398 — exercises',
      'ISO 22301 — business continuity',
      'Sector-specific guidance — organisational arrangements for supporting affected people and their families after a serious incident'
    ],
    notes: 2
  }
];

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
    this.listeners.set(method, [...(this.listeners.get(method) ?? []), listener]);
  }

  once(method, timeout = 10_000) {
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
  const loaded = client.once('Page.loadEventFired');
  await client.send('Page.navigate', { url: new URL(route, baseUrl).toString() });
  await loaded;
  await delay(300);
  await evaluate(
    client,
    `document.querySelectorAll('[data-reveal]').forEach((item) => item.classList.add('is-visible'))`
  );
};

const captureSection = async (client, selector, output) => {
  const clip = await evaluate(
    client,
    `(() => {
      const section = document.querySelector(${JSON.stringify(selector)});
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + scrollY;
      const contextBefore = Math.min(90, sectionTop);
      return {
        x: 0,
        y: sectionTop - contextBefore,
        width: document.documentElement.clientWidth,
        height: rect.height + contextBefore
      };
    })()`
  );
  const screenshot = await client.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: true,
    fromSurface: true,
    clip: { ...clip, scale: 1 }
  });
  await writeFile(output, Buffer.from(screenshot.data, 'base64'));
};

const main = async () => {
  await mkdir(outputDirectory, { recursive: true });
  const port = await getFreePort();
  const profileDirectory = await mkdtemp(join(tmpdir(), 'clearstance-offer-review-'));
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

    for (const definition of routes) {
      for (const width of widths) {
        const client = await createPage(port);
        const consoleErrors = [];
        const requestFailures = [];
        client.on('Runtime.consoleAPICalled', (event) => {
          if (event.type === 'error') consoleErrors.push(event);
        });
        client.on('Runtime.exceptionThrown', (event) => consoleErrors.push(event));
        client.on('Network.loadingFailed', (event) => requestFailures.push(event));
        await openRoute(client, definition.route, width);
        const result = await evaluate(
          client,
          `(() => {
            const section = document.querySelector(${JSON.stringify(definition.selector)});
            const rows = [...section.querySelectorAll(':scope .service-list > li, :scope .services-detail-list > li')];
            const titles = rows.map((row) =>
              row.querySelector('h3')?.textContent.trim().replaceAll('\u00a0', ' ')
            );
            const icons = rows.map((row) => row.querySelector('.icon'));
            const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')]
              .map((script) => JSON.parse(script.textContent));
            const professionalService = jsonLd.find((item) => item['@type'] === 'ProfessionalService');
            const metaDescription = document.querySelector('meta[name="description"]')?.content;
            const ogDescription = document.querySelector('meta[property="og:description"]')?.content;
            const mainText = document.querySelector('main')?.textContent ?? '';
            const contextSection = document.querySelector('.context-section');
            const contextGrid = contextSection?.querySelector('.context-grid');
            const contextHeading = contextSection?.querySelector('h2');
            const contextText = contextSection?.querySelector('.context-copy')?.textContent.trim();
            const contextReferences = [...(contextSection?.querySelectorAll('.context-references li') ?? [])]
              .map((item) => item.textContent.trim().replaceAll('\u00a0', ' ').replace(/\\s+/gu, ' '));
            const contextBackground = contextSection
              ? getComputedStyle(contextSection).backgroundColor
              : null;
            const contextBook = contextSection?.querySelector('.context-heading-icon');
            const contextBookSvg = contextBook?.querySelector('svg');
            const contextIsoCodes = [...(contextSection?.querySelectorAll('.context-reference-code') ?? [])];
            const contextGuidanceLabel = contextSection?.querySelector('.context-reference-label');
            const sectionIntro = section.querySelector('.services-heading > p');
            const offerCta = section.querySelector('.services-cta-rail');
            const offerCtaStyle = offerCta ? getComputedStyle(offerCta) : null;
            const sectionStyle = getComputedStyle(section);
            const sectionDescription = rows[0]?.querySelector('p');
            const sectionTitle = rows[0]?.querySelector('h3');
            const lastService = rows.at(-1);
            const ctaText = offerCta?.querySelector('.services-cta-text');
            const ctaLabel = offerCta?.querySelector('.services-cta-label');
            const ctaArrow = offerCta?.querySelector('.services-cta-arrow');
            const offerWrap = offerCta?.parentElement;
            return {
              width: ${width},
              clientWidth: document.documentElement.clientWidth,
              scrollWidth: document.documentElement.scrollWidth,
              overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
              titles,
              titleMatch: JSON.stringify(titles) === ${JSON.stringify(JSON.stringify(definition.titles))},
              rowCount: rows.length,
              iconCount: icons.filter(Boolean).length,
              decorativeIconsValid: icons.every((icon) =>
                icon?.getAttribute('aria-hidden') === 'true' &&
                icon.querySelector('svg')?.getAttribute('aria-hidden') === 'true'
              ),
              noteCount: section.querySelectorAll('.service-scope-note').length,
              metaDescription,
              metaDescriptionValid: metaDescription === ${JSON.stringify(definition.metaDescription)},
              ogDescriptionValid: ogDescription === metaDescription,
              schemaAreasValid: ${definition.schemaAreas
                ? `JSON.stringify(professionalService?.knowsAbout) === ${JSON.stringify(JSON.stringify(definition.schemaAreas))}`
                : 'true'},
              methodTitleValid: ${definition.methodTitle
                ? `document.querySelector('#context-title')?.textContent.trim() === ${JSON.stringify(definition.methodTitle)}`
                : 'true'},
              methodExpected: ${Boolean(definition.methodTitle)},
              methodTextValid: ${definition.methodText
                ? `contextText?.replaceAll('\\u00a0', ' ') === ${JSON.stringify(definition.methodText)}`
                : 'true'},
              methodReferencesValid: ${definition.methodReferences
                ? `JSON.stringify(contextReferences) === ${JSON.stringify(JSON.stringify(definition.methodReferences))}`
                : 'true'},
              contextSectionHeight: contextSection
                ? Number(contextSection.getBoundingClientRect().height.toFixed(2))
                : null,
              contextDesktopHeightValid: !contextSection || ${width} < 1024 || contextSection.getBoundingClientRect().height <= 300,
              contextHeadingSize: contextHeading
                ? Number.parseFloat(getComputedStyle(contextHeading).fontSize)
                : null,
              contextHeadingScaleValid: !contextHeading || Number.parseFloat(getComputedStyle(contextHeading).fontSize) <= 24,
              contextBackground,
              contextLightBackground: !contextSection || !['rgb(8, 23, 34)', 'rgb(13, 32, 43)'].includes(contextBackground),
              contextRuleValid: !contextGrid || getComputedStyle(contextGrid).borderTopWidth === '1px',
              contextIconCount: contextSection?.querySelectorAll('.icon, svg').length ?? 0,
              contextBookValid: !contextSection || (
                contextBook?.getAttribute('aria-hidden') === 'true' &&
                contextBookSvg?.getAttribute('aria-hidden') === 'true' &&
                contextBookSvg?.getAttribute('focusable') === 'false'
              ),
              contextIsoCodeCount: contextIsoCodes.length,
              contextGuidanceCount: contextSection?.querySelectorAll('.context-reference--guidance').length ?? 0,
              contextGuidanceFontDistinct: !contextSection || (
                contextIsoCodes.length === 3 &&
                contextGuidanceLabel &&
                getComputedStyle(contextIsoCodes[0]).fontFamily !== getComputedStyle(contextGuidanceLabel).fontFamily
              ),
              forbiddenSectorowePresent: /sektorowe/iu.test(contextSection?.textContent ?? ''),
              forbiddenPositioningPresent: /\\b(?:NIS2|DORA|CER|compliance|cyberbezpieczeństwo)\\b/iu.test(mainText),
              brokenImages: [...section.querySelectorAll('img')]
                .filter((image) => !image.complete || image.naturalWidth === 0)
                .map((image) => image.currentSrc || image.src),
              skipLinkPresent: Boolean(document.querySelector('a[href="#main-content"]')),
              hydrationCount: document.querySelectorAll('astro-island').length,
              oldPrimaryTitlesPresent: [
                'System zarządzania kryzysowego',
                'Ćwiczenia i symulacje',
                'Facylitacja',
                'Przeglądy i doskonalenie',
                'Crisis management system',
                'Exercises and simulations',
                'Reviews and improvement'
              ].some((title) => titles.includes(title)),
              homeOfferExpected: ${Boolean(definition.ctaText)},
              homeIntroValid: ${definition.intro
                ? `sectionIntro?.textContent.trim().replaceAll('\u00a0', ' ') === ${JSON.stringify(definition.intro)}`
                : 'true'},
              perspectiveAbsent: !section.querySelector('.perspective-note'),
              homeOfferCtaValid: ${definition.ctaText
                ? `Boolean(offerCta) &&
                  offerCta.getAttribute('href') === ${JSON.stringify(definition.ctaHref)} &&
                  offerCta.getAttribute('aria-label') === ${JSON.stringify(definition.ctaText)} &&
                  offerCta.querySelector('.services-cta-label')?.textContent.trim() === ${JSON.stringify(definition.ctaLabel)} &&
                  offerCta.querySelector('.services-cta-text')?.textContent.trim() === ${JSON.stringify(definition.ctaText)}`
                : 'true'},
              homeOfferCtaEditorial: ${definition.ctaText
                ? `offerCtaStyle?.display === 'grid' &&
                  offerCtaStyle.borderTopWidth === '0px' &&
                  offerCtaStyle.borderBottomWidth === '0px' &&
                  offerCtaStyle.borderRadius === '0px' &&
                  offerCtaStyle.boxShadow === 'none' &&
                  (${width} <= 760
                    ? offerCtaStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' &&
                      offerCtaStyle.backgroundColor !== sectionStyle.backgroundColor
                    : offerCtaStyle.backgroundColor === 'rgba(0, 0, 0, 0)') &&
                  getComputedStyle(lastService).borderBottomWidth === '1px'`
                : 'true'},
              homeIntroDescriptionAligned: ${definition.ctaText
                ? `${width} <= 760 || Math.abs(
                  sectionIntro.getBoundingClientRect().left -
                  sectionDescription.getBoundingClientRect().left
                ) <= 0.5`
                : 'true'},
              homeCtaHierarchyValid: ${definition.ctaText
                ? `getComputedStyle(ctaLabel).whiteSpace === 'nowrap' &&
                  Math.abs(ctaLabel.getBoundingClientRect().height -
                    Number.parseFloat(getComputedStyle(ctaLabel).lineHeight)) <= 1 &&
                  Number.parseFloat(getComputedStyle(ctaText).fontSize) >= 20 &&
                  Number.parseFloat(getComputedStyle(ctaArrow).fontSize) >= 22`
                : 'true'},
              homeCtaGeometryValid: ${definition.ctaText
                ? `(() => {
                  const ctaRect = offerCta.getBoundingClientRect();
                  const wrapRect = offerWrap.getBoundingClientRect();
                  const textRect = ctaText.getBoundingClientRect();
                  const labelRect = ctaLabel.getBoundingClientRect();
                  const arrowRect = ctaArrow.getBoundingClientRect();
                  return (${width} <= 760
                    ? Math.abs(ctaRect.left - wrapRect.left - 8) <= 0.5 &&
                      Math.abs(wrapRect.right - ctaRect.right - 8) <= 0.5 &&
                      Math.abs(ctaRect.right - arrowRect.right - 16) <= 0.5
                    : Math.abs(ctaRect.left - wrapRect.left - 66) <= 0.5 &&
                      Math.abs(arrowRect.left - textRect.right - 18) <= 0.5) &&
                    labelRect.bottom < textRect.top &&
                    (${width} <= 760 || Math.abs(
                      textRect.left - sectionTitle.getBoundingClientRect().left
                    ) <= 0.5);
                })()`
                : 'true'},
              homeCtaUsesServiceSeparator: ${definition.ctaText
                ? `Math.abs(
                  offerCta.getBoundingClientRect().top -
                  lastService.getBoundingClientRect().bottom
                ) <= 0.5`
                : 'true'},
              homeOfferCtaFocusVisible: true
            };
          })()`
        );
        let hoverValid = true;
        let focusVisible = true;
        if (definition.ctaText) {
          await Promise.all([
            client.send('DOM.enable'),
            client.send('CSS.enable')
          ]);
          const { root } = await client.send('DOM.getDocument');
          const { nodeId } = await client.send('DOM.querySelector', {
            nodeId: root.nodeId,
            selector: '.services-cta-rail'
          });
          await client.send('CSS.forcePseudoState', {
            nodeId,
            forcedPseudoClasses: ['focus', 'focus-visible']
          });
          focusVisible = await evaluate(
            client,
            `(() => {
              const style = getComputedStyle(document.querySelector('.services-cta-rail'));
              return style.outlineStyle !== 'none' && Number.parseFloat(style.outlineWidth) >= 2;
            })()`
          );
          const idleBackground = await evaluate(
            client,
            `getComputedStyle(document.querySelector('.services-cta-rail')).backgroundColor`
          );
          const ctaRect = await evaluate(
            client,
            `(() => {
              const cta = document.querySelector('.services-cta-rail');
              cta.scrollIntoView({ block: 'center' });
              const rect = cta.getBoundingClientRect();
              return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
            })()`
          );
          await client.send('Input.dispatchMouseEvent', {
            type: 'mouseMoved',
            x: ctaRect.x,
            y: ctaRect.y
          });
          await delay(220);
          hoverValid = await evaluate(
            client,
            `(() => {
              const cta = document.querySelector('.services-cta-rail');
              const arrow = cta.querySelector('.services-cta-arrow');
              return cta.matches(':hover') &&
                (${width} > 760 ||
                  getComputedStyle(cta).backgroundColor !== ${JSON.stringify(idleBackground)}) &&
                getComputedStyle(arrow).transform !== 'none';
            })()`
          );
        }
        audit.push({
          route: definition.name,
          ...result,
          homeOfferCtaFocusVisible: focusVisible,
          hoverValid,
          expectedNotes: definition.notes,
          consoleErrors: consoleErrors.length,
          requestFailures: requestFailures.length
        });
        client.close();
      }
    }

    const releaseAudit = [];
    for (const [name, route] of releaseRoutes) {
      for (const width of releaseWidths) {
        const client = await createPage(port);
        const consoleErrors = [];
        const requestFailures = [];
        client.on('Runtime.consoleAPICalled', (event) => {
          if (event.type === 'error') consoleErrors.push(event);
        });
        client.on('Runtime.exceptionThrown', (event) => consoleErrors.push(event));
        client.on('Network.loadingFailed', (event) => requestFailures.push(event));
        await openRoute(client, route, width);
        await evaluate(
          client,
          `(async () => {
            document.querySelectorAll('img[loading="lazy"]').forEach((image) => {
              image.loading = 'eager';
            });
            window.scrollTo(0, document.documentElement.scrollHeight);
            await new Promise((resolve) => setTimeout(resolve, 120));
            await Promise.all([...document.images].map(async (image) => {
              if (image.complete) return;
              await new Promise((resolve) => {
                image.addEventListener('load', resolve, { once: true });
                image.addEventListener('error', resolve, { once: true });
              });
            }));
            window.scrollTo(0, 0);
            return true;
          })()`
        );
        await delay(80);
        const result = await evaluate(
          client,
          `(() => {
            const homeServices = document.querySelector('.service-list');
            const homeInsights = document.querySelector('.home-insights-list');
            const practice = document.querySelector('.practice-list');
            const insightMeta = [...document.querySelectorAll('.insight-meta')];
            const firstInsight = document.querySelector('.insight-item--with-visual');
            const thumbnail = firstInsight?.querySelector('.insight-thumbnail');
            const copy = firstInsight?.querySelector('.insight-item-copy');
            const serviceColumns = homeServices
              ? getComputedStyle(homeServices.querySelector('li')).gridTemplateColumns.split(' ').length
              : null;
            return {
              route: ${JSON.stringify(name)},
              path: ${JSON.stringify(route)},
              width: ${width},
              clientWidth: document.documentElement.clientWidth,
              scrollWidth: document.documentElement.scrollWidth,
              overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
              brokenImages: [...document.images]
                .filter((image) => !image.complete || image.naturalWidth === 0)
                .map((image) => image.currentSrc || image.src),
              skipLinkPresent: Boolean(document.querySelector('a.skip-link[href="#main-content"]')),
              mainPresent: Boolean(document.querySelector('main#main-content')),
              hydrationCount: document.querySelectorAll('astro-island').length,
              homeServiceFirstIsIcon: !homeServices || [...homeServices.children].every((item) => item.firstElementChild?.classList.contains('service-icon')),
              homeServiceColumnCountValid: !homeServices || serviceColumns === (${width} <= 760 ? 2 : 3),
              homeInsightFirstIsMeta: !homeInsights || [...homeInsights.querySelectorAll('.home-insight-item')].every((item) => item.firstElementChild?.classList.contains('home-insight-meta')),
              practiceFirstIsHeading: !practice || [...practice.children].every((item) => item.firstElementChild?.tagName === 'H3'),
              insightMetaStartsWithCategory: insightMeta.every((meta) => !/^0[1-9]$/u.test(meta.firstElementChild?.textContent.trim() ?? '')),
              mobileInsightVisualFirst: !firstInsight || ${width} > 760 || (
                thumbnail.getBoundingClientRect().top < copy.getBoundingClientRect().top
              ),
              readinessNumberCount: document.querySelectorAll('.readiness-steps > li > span').length,
              detailNumberCount: document.querySelectorAll('.detail-number').length,
              aboutAxisNumberCount: document.querySelectorAll('.about-experience-axis li > span').length
            };
          })()`
        );
        releaseAudit.push({
          ...result,
          consoleErrors: consoleErrors.length,
          requestFailures: requestFailures.length
        });
        client.close();
      }
    }

    let screenshotCount = 0;
    for (const definition of routes) {
      const screenshotWidths = definition.name.startsWith('home-')
        ? widths
        : [1440, 390];
      for (const width of screenshotWidths) {
        const client = await createPage(port);
        await openRoute(client, definition.route, width);
        await captureSection(
          client,
          definition.selector,
          join(outputDirectory, `${definition.name}-${width}.png`)
        );
        screenshotCount += 1;
        client.close();
      }
    }

    for (const definition of routes.filter((item) => item.methodTitle)) {
      for (const width of [1440, 1024, 768, 390, 320]) {
        const client = await createPage(port);
        await openRoute(client, definition.route, width);
        await captureSection(
          client,
          '.context-section',
          join(outputDirectory, `${definition.name}-method-${width}.png`)
        );
        screenshotCount += 1;
        client.close();
      }
    }

    const anchorAudit = [];
    for (const [route, id] of [['/#praktyka', 'praktyka'], ['/en/#practice', 'practice']]) {
      for (const width of [1440, 390]) {
        const client = await createPage(port);
        await openRoute(client, route, width);
        await delay(600);
        anchorAudit.push(await evaluate(
          client,
          `(() => {
            const target = document.getElementById(${JSON.stringify(id)});
            const header = document.querySelector('.site-header');
            const targetTop = target.getBoundingClientRect().top;
            const headerBottom = header.getBoundingClientRect().bottom;
            return {
              route: ${JSON.stringify(route)},
              width: ${width},
              targetTop: Number(targetTop.toFixed(2)),
              headerBottom: Number(headerBottom.toFixed(2)),
              visibleGap: Number((targetTop - headerBottom).toFixed(2)),
              clearOfHeader: targetTop >= headerBottom
            };
          })()`
        ));
        client.close();
      }
    }

    const comparisonClient = await createPage(port);
    await openRoute(comparisonClient, '/', 900);
    const candidateNames = ['message-text', 'chat-lines', 'chat-bubble', 'community', 'group'];
    const candidateSvgs = Object.fromEntries(
      await Promise.all(candidateNames.map(async (name) => [
        name,
        await readFile(`node_modules/iconoir/icons/regular/${name}.svg`, 'utf8')
      ]))
    );
    const comparisonClip = await evaluate(
      comparisonClient,
      `(() => {
        const panel = document.createElement('div');
        panel.style.cssText = 'position:absolute;left:0;top:0;width:900px;padding:32px;background:#ebe7df;color:#122630;font:14px/1.4 Arial,sans-serif;';
        const variants = ${JSON.stringify(candidateSvgs)};
        const names = ${JSON.stringify(candidateNames)};
        for (const [label, background, color] of [
          ['Light background', '#f8f6f2', '#28605e'],
          ['Dark background', '#0d202b', '#f8f6f2']
        ]) {
          const heading = document.createElement('h2');
          heading.textContent = label;
          heading.style.cssText = 'margin:0 0 14px;font-size:15px;';
          panel.append(heading);
          const row = document.createElement('div');
          row.style.cssText = 'display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:24px;';
          names.forEach((name) => {
            const item = document.createElement('div');
            item.style.cssText = 'display:grid;place-items:center;gap:10px;min-height:112px;padding:14px;background:' + background + ';color:' + color + ';';
            item.innerHTML = variants[name].replace('<svg ', '<svg width="24" height="24" ') + '<span style="color:' + color + ';font-size:12px">' + name + '</span>';
            row.append(item);
          });
          panel.append(row);
        }
        document.body.replaceChildren(panel);
        return { x: 0, y: 0, width: 900, height: panel.getBoundingClientRect().height };
      })()`
    );
    const comparison = await comparisonClient.send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
      clip: { ...comparisonClip, scale: 1 }
    });
    await writeFile(
      join(outputDirectory, 'icon-comparison.png'),
      Buffer.from(comparison.data, 'base64')
    );
    screenshotCount += 1;
    comparisonClient.close();

    const failures = audit.filter((item) =>
      item.overflow ||
      !item.titleMatch ||
      item.rowCount !== 4 ||
      item.iconCount !== 4 ||
      !item.decorativeIconsValid ||
      item.noteCount !== item.expectedNotes ||
      !item.metaDescriptionValid ||
      !item.ogDescriptionValid ||
      !item.schemaAreasValid ||
      !item.methodTitleValid ||
      !item.methodTextValid ||
      !item.methodReferencesValid ||
      !item.contextDesktopHeightValid ||
      !item.contextHeadingScaleValid ||
      !item.contextLightBackground ||
      !item.contextRuleValid ||
      (item.methodExpected && item.contextIconCount !== 2) ||
      !item.contextBookValid ||
      (item.methodExpected && item.contextIsoCodeCount !== 3) ||
      (item.methodExpected && item.contextGuidanceCount !== 1) ||
      !item.contextGuidanceFontDistinct ||
      item.forbiddenSectorowePresent ||
      item.forbiddenPositioningPresent ||
      item.brokenImages.length > 0 ||
      !item.skipLinkPresent ||
      item.hydrationCount > 0 ||
      item.oldPrimaryTitlesPresent ||
      !item.homeIntroValid ||
      !item.perspectiveAbsent ||
      !item.homeOfferCtaValid ||
      !item.homeOfferCtaEditorial ||
      !item.homeIntroDescriptionAligned ||
      !item.homeCtaHierarchyValid ||
      !item.homeCtaGeometryValid ||
      !item.homeCtaUsesServiceSeparator ||
      !item.homeOfferCtaFocusVisible ||
      !item.hoverValid ||
      item.consoleErrors > 0 ||
      item.requestFailures > 0
    );
    const releaseFailures = releaseAudit.filter((item) =>
      item.overflow ||
      item.brokenImages.length > 0 ||
      !item.skipLinkPresent ||
      !item.mainPresent ||
      item.hydrationCount > 0 ||
      !item.homeServiceFirstIsIcon ||
      !item.homeServiceColumnCountValid ||
      !item.homeInsightFirstIsMeta ||
      !item.practiceFirstIsHeading ||
      !item.insightMetaStartsWithCategory ||
      !item.mobileInsightVisualFirst ||
      (item.route.startsWith('home-') && item.readinessNumberCount !== 5) ||
      (item.route.startsWith('services-') && item.detailNumberCount !== 4) ||
      (item.route.startsWith('about-') && item.width > 900 && item.aboutAxisNumberCount !== 3) ||
      item.consoleErrors > 0 ||
      item.requestFailures > 0
    );
    const failedAnchors = anchorAudit.filter((item) => !item.clearOfHeader);
    await writeFile(
      join(outputDirectory, 'validation-report.json'),
      `${JSON.stringify({ generated: new Date().toISOString(), audit, releaseAudit, anchorAudit }, null, 2)}\n`
    );
    if (failures.length > 0 || releaseFailures.length > 0 || failedAnchors.length > 0) {
      throw new Error(
        `Release review failed: ${failures.length} offer cases, ${releaseFailures.length} route cases, ${failedAnchors.length} anchors.`
      );
    }
    console.log(`Release review passed: ${audit.length} offer cases, ${releaseAudit.length} route cases, ${anchorAudit.length} anchors, ${screenshotCount} screenshots.`);
  } finally {
    chrome.kill('SIGTERM');
    await rm(profileDirectory, { recursive: true, force: true });
  }
};

await main();
