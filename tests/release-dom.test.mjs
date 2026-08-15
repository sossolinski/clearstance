import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import test from 'node:test';

const readDist = (path) => readFile(new URL(`../dist${path}`, import.meta.url), 'utf8');
const count = (source, pattern) => [...source.matchAll(pattern)].length;

const collectHtmlFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const path = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, directory);
    return entry.isDirectory() ? collectHtmlFiles(path) : entry.name.endsWith('.html') ? [path] : [];
  }));
  return files.flat();
};

const [homePl, homeEn, advisoryPl, advisoryEn, crisisManagementPl, crisisManagementEn, exercisesPl, exercisesEn, executivePl, executiveEn, contactPl, contactEn] = await Promise.all([
  readDist('/index.html'), readDist('/en/index.html'), readDist('/oferta/index.html'), readDist('/en/services/index.html'),
  readDist('/oferta/zarzadzanie-kryzysowe/index.html'), readDist('/en/services/crisis-management/index.html'),
  readDist('/cwiczenia-kryzysowe/index.html'), readDist('/en/exercises/index.html'),
  readDist('/cwiczenia-kryzysowe/executive-tabletop/index.html'), readDist('/en/exercises/executive-tabletop/index.html'),
  readDist('/kontakt/index.html'), readDist('/en/contact/index.html')
]);
const [page404, globalCss, contactPageSource] = await Promise.all([
  readDist('/404.html'),
  readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8'),
  readFile(new URL('../src/components/pages/ContactPage.astro', import.meta.url), 'utf8')
]);

test('homepage renders the accepted Release 1 section architecture in both languages', () => {
  for (const home of [homePl, homeEn]) {
    const order = ['commercial-capabilities', 'ways-section', 'engagements-section', 'readiness-approach-section', 'experience-section', 'commercial-insights', 'contact-band'];
    let previous = -1;
    for (const className of order) {
      const position = home.indexOf(className);
      assert.ok(position > previous, `${className} should follow the prior section`);
      previous = position;
    }
    assert.equal(count(home, /<li><span class="icon service-icon"/gu), 3);
    assert.equal(count(home, /<ol class="ways-list">/gu), 1);
    assert.equal(count(home, /<span class="ways-marker" aria-hidden="true">0[12]<\/span>/gu), 2);
    assert.doesNotMatch(home, /ways-grid|way-card/u);
    assert.match(home, /Crisis Readiness Review/u);
    assert.match(home, /Executive Tabletop Exercise/u);
    assert.equal(count(home, /<ol class="readiness-stage-list"/gu), 1);
    assert.equal(count(home, /<ol class="readiness-stage-list"[\s\S]*?<\/ol>/gu), 1);
    assert.doesNotMatch(home, /readiness-note/u);
    assert.doesNotMatch(home, /practice-section|BrandStatement/u);
  }
  assert.match(homePl, /Punkt wyjścia/u);
  assert.match(homePl, /Doradztwo w\sgotowości kryzysowej/u);
  assert.match(homePl, /Od czego możemy zacząć\./u);
  assert.match(homeEn, /Boutique crisis readiness advisory/u);
  assert.match(homeEn, /A place to start/u);
  assert.match(homeEn, /Where we can begin\./u);
  assert.doesNotMatch(homePl, /Doradztwo wspiera rozpoznanie/u);
  assert.doesNotMatch(homeEn, /Advisory work supports understanding/u);
});

test('advisory separates engagement activity from client outcomes', () => {
  assert.match(advisoryPl, /Zakres współpracy obejmuje/u);
  assert.match(advisoryPl, /Organizacja otrzymuje/u);
  assert.match(advisoryEn, /The engagement includes/u);
  assert.match(advisoryEn, /The organisation receives/u);
  assert.match(advisoryPl, /id="przeglad-gotowosci"/u);
  assert.match(advisoryEn, /id="readiness-review"/u);
  assert.equal(count(advisoryPl, /class="capability-detail-heading"/gu), 3);
  assert.equal(count(advisoryEn, /class="capability-detail-heading"/gu), 3);
  assert.match(advisoryPl, /id="model-dzialania-cmt"/u);
  assert.match(advisoryEn, /id="cmt-operating-model"/u);
  assert.match(advisoryPl, /href="\/oferta\/zarzadzanie-kryzysowe\/"[^>]*>Poznaj obszar/u);
  assert.match(advisoryEn, /href="\/en\/services\/crisis-management\/"[^>]*>Explore the capability/u);
});

test('Crisis Management capability renders the approved bilingual buyer journey', () => {
  const cases = [
    {
      html: crisisManagementPl,
      h1: 'Model działania, który porządkuje decyzje podczas kryzysu.',
      canonical: 'https://clearstance.pl/oferta/zarzadzanie-kryzysowe/',
      alternate: 'https://clearstance.pl/en/services/crisis-management/',
      contact: '/kontakt/?topic=crisis-management',
      review: '/oferta/#przeglad-gotowosci',
      cmt: '/oferta/#model-dzialania-cmt',
      tabletop: '/cwiczenia-kryzysowe/executive-tabletop/',
      insightOne: '/insights/kiedy-zespol-kryzysowy-traci-obraz-sytuacji/',
      insightTwo: '/insights/plany-ciaglosci-zawodza-na-styku-odpowiedzialnosci/'
    },
    {
      html: crisisManagementEn,
      h1: 'A crisis management model that supports decisions and coordinated action.',
      canonical: 'https://clearstance.pl/en/services/crisis-management/',
      alternate: 'https://clearstance.pl/oferta/zarzadzanie-kryzysowe/',
      contact: '/en/contact/?topic=crisis-management',
      review: '/en/services/#readiness-review',
      cmt: '/en/services/#cmt-operating-model',
      tabletop: '/en/exercises/executive-tabletop/',
      insightOne: '/en/insights/when-crisis-teams-lose-situational-awareness/',
      insightTwo: '/en/insights/business-continuity-fails-at-the-interfaces/'
    }
  ];

  const order = [
    'page-intro',
    'capability-situations',
    'capability-model',
    'capability-interfaces',
    'capability-routes',
    'capability-outcomes',
    'commercial-insights',
    'contact-band'
  ];

  for (const item of cases) {
    let previous = -1;
    for (const className of order) {
      const position = item.html.indexOf(className);
      assert.ok(position > previous, `${className} should follow the previous capability section`);
      previous = position;
    }

    assert.equal(count(item.html, /<h1(?:\s|>)/gu), 1);
    assert.ok(item.html.includes(`<h1 id="page-title">${item.h1}</h1>`));
    assert.ok(item.html.includes(`rel="canonical" href="${item.canonical}"`));
    assert.ok(item.html.includes(`hreflang="${item.html === crisisManagementPl ? 'en' : 'pl'}" href="${item.alternate}"`));
    assert.ok(item.html.includes(`href="${item.contact}"`));
    assert.ok(item.html.includes(`href="${item.review}"`));
    assert.ok(item.html.includes(`href="${item.cmt}"`));
    assert.ok(item.html.includes(`href="${item.tabletop}"`));
    assert.ok(item.html.includes(`href="${item.insightOne}"`));
    assert.ok(item.html.includes(`href="${item.insightTwo}"`));
    assert.equal(count(item.html, /class="capability-situation-list"/gu), 1);
    assert.equal(count(item.html, /class="capability-model-list"/gu), 1);
    assert.equal(count(item.html, /class="capability-route-list"/gu), 1);
    assert.match(item.html, /"@type":"Service"/u);
    assert.match(item.html, /"@type":"BreadcrumbList"/u);
  }

  assert.match(homePl, /href="\/oferta\/zarzadzanie-kryzysowe\/"[^>]*>Poznaj zakres/u);
  assert.match(homeEn, /href="\/en\/services\/crisis-management\/"[^>]*>Explore the scope/u);
});

test('exercise architecture keeps one flagship and three supporting formats', () => {
  for (const exercises of [exercisesPl, exercisesEn]) {
    assert.equal(count(exercises, /class="format-card(?: format-card--featured)?"/gu), 4);
    assert.equal(count(exercises, /format-card--featured/gu), 1);
    assert.match(exercises, /Executive Tabletop Exercise/u);
    assert.match(exercises, /communication-simulation/u);
    assert.match(exercises, /affected-people-exercise/u);
    assert.match(exercises, /exercise-programme/u);
    assert.match(exercises, /<div class="inclusion-panel"[^>]*><h3>[^<]+<\/h3><div class="deliverable-split deliverable-split--light"><article>/u);
    assert.equal(count(exercises, /deliverable-split deliverable-split--light/gu), 1);
    assert.doesNotMatch(exercises, />\s*CMT Exercise\s*</u);
    assert.doesNotMatch(exercises, /inne dokumenty uzgodnione w zakresie projektu|other documents agreed within the project scope/iu);
  }
  assert.match(exercisesPl, /Exercise Brief: uzgodnione cele, zakres i\szałożenia ćwiczenia/u);
  assert.match(exercisesEn, /Exercise Brief: agreed exercise objectives, scope and assumptions/u);
});

test('Executive Tabletop preserves observation logic and client-facing outcomes', () => {
  assert.match(executivePl, /<title>Executive Tabletop Exercise dla zarządu i CMT \| ClearStance<\/title>/u);
  assert.match(executiveEn, /<title>Executive Tabletop Exercise \| ClearStance<\/title>/u);

  const plLabels = ['Co się wydarzyło', 'Kiedy', 'Na podstawie jakiej informacji', 'Zaangażowane role', 'Wpływ na decyzje lub koordynację'];
  const enLabels = ['What happened', 'When', 'Based on what information', 'Roles involved', 'Effect on decisions or coordination'];
  for (const label of plLabels) assert.ok(executivePl.includes(label));
  for (const label of enLabels) assert.ok(executiveEn.includes(label));

  for (const executive of [executivePl, executiveEn]) {
    assert.match(executive, /After Action Review/u);
    assert.match(executive, /<dl class="observation-example"/u);
    assert.match(executive, /deliverable-split deliverable-split--outlined/u);
    assert.doesNotMatch(executive, /preparation-section|preparation-grid/u);
    assert.match(executive, /"@type":"BreadcrumbList"/u);
  }

  assert.match(executivePl, /href="\/kontakt\/\?topic=executive-tabletop"[^>]*>Omów planowane ćwiczenie/u);
  assert.match(executiveEn, /href="\/en\/contact\/\?topic=executive-tabletop"[^>]*>Discuss a planned exercise/u);
  for (const executive of [executivePl, executiveEn]) {
    const participation = executive.indexOf('participation-panel');
    const contextualCta = executive.indexOf('executive-contextual-cta');
    const observation = executive.indexOf('observation-focus observation-focus--dark');
    assert.ok(participation < contextualCta && contextualCta < observation, 'contextual CTA should close the use-cases section');
  }
  assert.match(executivePl, /Facylitowane ćwiczenie tabletop/u);
  assert.doesNotMatch(executivePl, /Realizacja sesji, praca projektowa i dokumenty końcowe/u);
  assert.doesNotMatch(executiveEn, /The delivery of the session, design work and final documents/u);
  assert.match(executivePl, /Exercise Brief: uzgodnione cele, zakres i\szałożenia ćwiczenia/u);
  assert.match(executiveEn, /Exercise Brief: agreed exercise objectives, scope and assumptions/u);

  assert.doesNotMatch(executivePl, /Zakres i przygotowanie|Po stronie organizacji|wskazanie sponsora i koordynatora/u);
  assert.doesNotMatch(executiveEn, /Scope and preparation|The organisation provides|an exercise sponsor and coordinator/u);
});

test('commercial copy excludes removed editorial and technical language', () => {
  const commercialPages = [homePl, homeEn, advisoryPl, advisoryEn, crisisManagementPl, crisisManagementEn, exercisesPl, exercisesEn, executivePl, executiveEn];
  const removedLanguage = [
    /—/u,
    /ClearStance nie sprzedaje certyfikacji/u,
    /ClearStance does not sell certification/u,
    /Metodyczne punkty odniesienia/u,
    /Methodological reference points/u,
    /ISO 22398|ISO 22361/u,
    /Główny dokument scenariusza|scenario master/iu,
    /Granice podstawowego formatu|Boundaries of the core format/iu,
    /Role, dokumenty i narzędzia powstawały w różnym czasie i nie tworzą/iu,
    /Roles, documents and tools were created at different times and do not yet form/iu,
    /dokumenty istnieją, lecz ich praktyczna użyteczność nie jest jasna/iu,
    /documents exist, but their practical usefulness is unclear/iu,
    /Standardy wspierają metodę, a nie stanowią/iu,
    /Standards support the method; they are not/iu
  ];

  for (const page of commercialPages) {
    for (const pattern of removedLanguage) assert.doesNotMatch(page, pattern);
  }

  for (const productName of ['Crisis Readiness Review', 'Executive Tabletop Exercise', 'Exercise Brief', 'After Action Review', 'hot debrief']) {
    assert.ok(commercialPages.some((page) => page.includes(productName)), `${productName} remains public`);
  }
});

test('Polish commercial copy protects one-letter words without changing routes or ids', () => {
  const polishPages = [homePl, advisoryPl, crisisManagementPl, exercisesPl, executivePl];

  for (const page of polishPages) {
    const commercialMarkup = page.match(/<main id="main-content" class="commercial-page(?: capability-page crisis-management-page| executive-page)?">([\s\S]*?)<\/main>/u)?.[1] ?? '';
    const visibleText = commercialMarkup
      .replace(/<script\b[\s\S]*?<\/script>/giu, '')
      .replace(/<style\b[\s\S]*?<\/style>/giu, '')
      .replace(/<[^>]+>/gu, ' ')
      .replace(/&nbsp;|&#160;/giu, '\u00a0');

    assert.doesNotMatch(visibleText, /(?:^|\s)(?:a|i|o|u|w|z) (?=\S)/iu);
  }

  assert.match(advisoryPl, /id="przeglad-gotowosci"/u);
  assert.match(exercisesPl, /id="executive-tabletop"/u);
  assert.match(executivePl, /href="\/oferta\/#przeglad-gotowosci"/u);
});

test('contact exposes only allowed topics and supports runtime language preservation', () => {
  const topicValues = ['general', 'advisory', 'crisis-management', 'crisis-readiness-review', 'exercises', 'executive-tabletop'];
  for (const contact of [contactPl, contactEn]) {
    assert.match(contact, /name="topic"[^>]+data-contact-topic/u);
    assert.equal(count(contact, /<option value=/gu), topicValues.length);
    for (const topic of topicValues) assert.match(contact, new RegExp(`<option value="${topic}"`, 'u'));
    assert.match(contact, /data-contact-topics="general,advisory,crisis-management,crisis-readiness-review,exercises,executive-tabletop"/u);
    assert.match(contact, /data-language-switch/u);
  }
  assert.match(contactPl, /<option value="crisis-management">Zarządzanie kryzysowe<\/option>/u);
  assert.match(contactEn, /<option value="crisis-management">Crisis Management<\/option>/u);
});

test('final polish protects public headings and uses the accepted 404 title', () => {
  assert.match(globalCss, /h1,\s*h2,\s*h3,\s*h4\s*\{\s*overflow-wrap: normal;\s*hyphens: none;\s*text-wrap: balance;\s*word-break: normal;/u);
  assert.match(page404, /<title>404 \| Strona nie istnieje \| ClearStance<\/title>/u);
  assert.match(contactPageSource, /target\.searchParams\.set\('topic', topic\)/u);
});

test('canonical, hreflang, sitemap and service structured data cover new routes', async () => {
  assert.match(executivePl, /rel="canonical" href="https:\/\/clearstance\.pl\/cwiczenia-kryzysowe\/executive-tabletop\/"/u);
  assert.match(executivePl, /hreflang="en" href="https:\/\/clearstance\.pl\/en\/exercises\/executive-tabletop\/"/u);
  assert.match(exercisesEn, /"@type":"Service"/u);

  const sitemap = await readDist('/sitemap.xml');
  for (const path of ['/oferta/zarzadzanie-kryzysowe/', '/en/services/crisis-management/', '/cwiczenia-kryzysowe/', '/cwiczenia-kryzysowe/executive-tabletop/', '/en/exercises/', '/en/exercises/executive-tabletop/']) {
    assert.ok(sitemap.includes(`https://clearstance.pl${path}`));
  }
});

test('production output is indexable and contains only production URLs', async () => {
  const dist = new URL('../dist/', import.meta.url);
  const [robots, sitemap, htmlFiles] = await Promise.all([readDist('/robots.txt'), readDist('/sitemap.xml'), collectHtmlFiles(dist)]);
  assert.match(robots, /User-agent:\s*\*/u);
  assert.match(robots, /Allow:\s*\//u);
  assert.doesNotMatch(robots, /^Disallow:\s*\/$/mu);
  assert.match(robots, /Sitemap:\s*https:\/\/clearstance\.pl\/sitemap\.xml/u);
  assert.doesNotMatch(sitemap, /workers\.dev|localhost|127\.0\.0\.1|\/review\//u);
  await assert.rejects(access(new URL('_headers', dist)));

  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    const isPublicPage = !file.pathname.endsWith('/404.html') && !file.pathname.includes('/admin/');
    assert.doesNotMatch(html, /(?:workers\.dev|localhost|127\.0\.0\.1|\/Users\/sebastian\/)/iu, `preview-only value in ${file.pathname}`);
    assert.doesNotMatch(html, /—/u, `em dash in public HTML ${file.pathname}`);
    if (!file.pathname.includes('/admin/')) {
      assert.equal(count(html, /<h1(?:\s|>)/gu), 1, `one H1 in ${file.pathname}`);
    }
    if (isPublicPage) {
      assert.doesNotMatch(html, /<meta[^>]+name="robots"[^>]+noindex/iu, `no noindex directive in ${file.pathname}`);
      assert.match(html, /<link rel="canonical" href="https:\/\/clearstance\.pl\//u, `production canonical in ${file.pathname}`);
      assert.match(html, /<meta property="og:url" content="https:\/\/clearstance\.pl\//u, `production og:url in ${file.pathname}`);
      assert.match(html, /<meta property="og:image" content="https:\/\/clearstance\.pl\//u, `absolute production og:image in ${file.pathname}`);
    }
  }
});
