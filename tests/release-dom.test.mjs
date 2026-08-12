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

const [homePl, homeEn, advisoryPl, advisoryEn, exercisesPl, exercisesEn, executivePl, executiveEn, contactPl, contactEn] = await Promise.all([
  readDist('/index.html'), readDist('/en/index.html'), readDist('/oferta/index.html'), readDist('/en/services/index.html'),
  readDist('/cwiczenia-kryzysowe/index.html'), readDist('/en/exercises/index.html'),
  readDist('/cwiczenia-kryzysowe/executive-tabletop/index.html'), readDist('/en/exercises/executive-tabletop/index.html'),
  readDist('/kontakt/index.html'), readDist('/en/contact/index.html')
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
    assert.doesNotMatch(home, /practice-section|BrandStatement/u);
  }
  assert.match(homePl, /Punkt wyjścia/u);
  assert.match(homePl, /Od czego możemy zacząć\./u);
  assert.match(homeEn, /A place to start/u);
  assert.match(homeEn, /Where we can begin\./u);
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
});

test('exercise architecture keeps one flagship and three supporting formats', () => {
  for (const exercises of [exercisesPl, exercisesEn]) {
    assert.equal(count(exercises, /class="format-card(?: format-card--featured)?"/gu), 4);
    assert.equal(count(exercises, /format-card--featured/gu), 1);
    assert.match(exercises, /Executive Tabletop Exercise/u);
    assert.match(exercises, /communication-simulation/u);
    assert.match(exercises, /affected-people-exercise/u);
    assert.match(exercises, /exercise-programme/u);
    assert.doesNotMatch(exercises, />\s*CMT Exercise\s*</u);
  }
});

test('Executive Tabletop preserves observation logic and deliverable boundaries', () => {
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
    assert.match(executive, /project artefacts|materiałami projektowymi/u);
    assert.match(executive, /"@type":"BreadcrumbList"/u);
  }
});

test('contact exposes only allowed topics and supports runtime language preservation', () => {
  const topicValues = ['general', 'advisory', 'crisis-readiness-review', 'exercises', 'executive-tabletop'];
  for (const contact of [contactPl, contactEn]) {
    assert.match(contact, /name="topic"[^>]+data-contact-topic/u);
    assert.equal(count(contact, /<option value=/gu), topicValues.length);
    for (const topic of topicValues) assert.match(contact, new RegExp(`<option value="${topic}"`, 'u'));
    assert.match(contact, /data-contact-topics="general,advisory,crisis-readiness-review,exercises,executive-tabletop"/u);
    assert.match(contact, /data-language-switch/u);
  }
});

test('canonical, hreflang, sitemap and service structured data cover new routes', async () => {
  assert.match(executivePl, /rel="canonical" href="https:\/\/clearstance\.pl\/cwiczenia-kryzysowe\/executive-tabletop\/"/u);
  assert.match(executivePl, /hreflang="en" href="https:\/\/clearstance\.pl\/en\/exercises\/executive-tabletop\/"/u);
  assert.match(exercisesEn, /"@type":"Service"/u);

  const sitemap = await readDist('/sitemap.xml');
  for (const path of ['/cwiczenia-kryzysowe/', '/cwiczenia-kryzysowe/executive-tabletop/', '/en/exercises/', '/en/exercises/executive-tabletop/']) {
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
    if (isPublicPage) {
      assert.doesNotMatch(html, /<meta[^>]+name="robots"[^>]+noindex/iu, `no noindex directive in ${file.pathname}`);
      assert.match(html, /<link rel="canonical" href="https:\/\/clearstance\.pl\//u, `production canonical in ${file.pathname}`);
      assert.match(html, /<meta property="og:url" content="https:\/\/clearstance\.pl\//u, `production og:url in ${file.pathname}`);
      assert.match(html, /<meta property="og:image" content="https:\/\/clearstance\.pl\//u, `absolute production og:image in ${file.pathname}`);
    }
  }
});
