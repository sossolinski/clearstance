import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import test from 'node:test';

const readDist = (path) => readFile(new URL(`../dist${path}`, import.meta.url), 'utf8');
const count = (source, pattern) => [...source.matchAll(pattern)].length;

const collectHtmlFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = new URL(`${entry.name}${entry.isDirectory() ? '/' : ''}`, directory);
      return entry.isDirectory()
        ? collectHtmlFiles(path)
        : entry.name.endsWith('.html')
          ? [path]
          : [];
    })
  );

  return files.flat();
};

const [homePl, homeEn, servicesPl, servicesEn, insightsPl, insightsEn, aboutPl] =
  await Promise.all([
    readDist('/index.html'),
    readDist('/en/index.html'),
    readDist('/oferta/index.html'),
    readDist('/en/services/index.html'),
    readDist('/insights/index.html'),
    readDist('/en/insights/index.html'),
    readDist('/o-clearstance/index.html')
  ]);

test('non-sequential Home and Insights collections render without record numbers', () => {
  for (const home of [homePl, homeEn]) {
    assert.match(home, /<ul class="service-list"/u);
    assert.match(home, /<ul class="home-insights-list"/u);
    assert.match(home, /<ul class="practice-list"/u);
    assert.doesNotMatch(home, /service-number|home-insight-number/u);
    assert.doesNotMatch(home, /<ul class="practice-list"[\s\S]*?<span>0[1-4]<\/span>/u);
  }

  for (const insights of [insightsPl, insightsEn]) {
    assert.match(insights, /<ul class="insights-list"/u);
    assert.doesNotMatch(
      insights,
      /<div class="insight-meta">\s*<span>0[1-9]<\/span>/u
    );
  }
});

test('Home offer uses the final intro and editorial CTA rail without Perspective', () => {
  const expected = [
    {
      home: homePl,
      intro: 'Pomagamy organizacjom przygotować sposób podejmowania decyzji, komunikacji i wsparcia ludzi podczas poważnych zdarzeń.',
      label: 'Pełna oferta',
      link: 'Zobacz pełną ofertę',
      href: '/oferta/'
    },
    {
      home: homeEn,
      intro: 'We help organisations prepare how decisions are made, communication is managed and people are supported during serious incidents.',
      label: 'Full offer',
      link: 'Explore the full offer',
      href: '/en/services/'
    }
  ];

  for (const item of expected) {
    const home = item.home.replaceAll('\u00a0', ' ');
    assert.ok(home.includes(item.intro));
    assert.ok(home.includes(`class="services-cta-label">${item.label}</span>`));
    assert.ok(home.includes(`class="services-cta-text">${item.link}</span>`));
    assert.match(
      home,
      new RegExp(`class="services-cta-rail" href="${item.href}" aria-label="${item.link}"`, 'u')
    );
    assert.doesNotMatch(home, /perspective-note|>Perspektywa<|>Perspective</u);
  }
});

test('numbers remain on the readiness cycle and are absent from Services and About', () => {
  for (const home of [homePl, homeEn]) {
    assert.equal(count(home, /<span>0[1-5]<\/span><h3>/gu), 5);
  }

  for (const services of [servicesPl, servicesEn]) {
    assert.equal(count(services, /class="detail-number">0[1-4]<\/span>/gu), 0);
  }

  assert.equal(count(aboutPl, /<span>0[1-3]<\/span>/gu), 0);
});

test('methodological references contain only the three ISO codes', () => {
  const expected = [
    ['ISO 22361', 'ISO 22398', 'ISO 22301'],
    ['ISO 22361', 'ISO 22398', 'ISO 22301']
  ];

  for (const [index, services] of [servicesPl, servicesEn].entries()) {
    for (const value of expected[index]) assert.ok(services.includes(value));
    assert.equal(count(services, /class="context-reference-code"/gu), 3);
    assert.equal(count(services, /class="context-reference--guidance"/gu), 0);
    assert.equal(count(services, /class="context-reference-label"/gu), 0);
  }

  assert.doesNotMatch(servicesPl, /Wytyczne branżowe/u);
  assert.doesNotMatch(servicesEn, /Sector-specific guidance/u);

  assert.doesNotMatch(servicesPl, /sektorowe/iu);
  assert.doesNotMatch(
    servicesPl,
    /\b(?:NIS2|DORA|CER|ISO 27001|compliance)\b/iu
  );
  assert.doesNotMatch(
    servicesEn,
    /\b(?:NIS2|DORA|CER|ISO 27001|compliance)\b/iu
  );
});

test('the methodological note stays textual without a decorative icon', () => {
  for (const services of [servicesPl, servicesEn]) {
    assert.doesNotMatch(services, /context-heading-icon/u);
    assert.match(services, /class="context-body">/u);
  }
});

test('production output is indexable and contains only production URLs', async () => {
  const dist = new URL('../dist/', import.meta.url);
  const [robots, sitemap, htmlFiles] = await Promise.all([
    readDist('/robots.txt'),
    readDist('/sitemap.xml'),
    collectHtmlFiles(dist)
  ]);

  assert.match(robots, /User-agent:\s*\*/u);
  assert.match(robots, /Allow:\s*\//u);
  assert.doesNotMatch(robots, /^Disallow:\s*\/$/mu);
  assert.match(robots, /Sitemap:\s*https:\/\/clearstance\.pl\/sitemap\.xml/u);
  assert.match(sitemap, /https:\/\/clearstance\.pl\//u);
  assert.doesNotMatch(sitemap, /workers\.dev|localhost|127\.0\.0\.1|\/review\//u);

  await assert.rejects(access(new URL('_headers', dist)));

  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    const isPublicPage =
      !file.pathname.endsWith('/404.html') && !file.pathname.includes('/admin/');
    assert.doesNotMatch(
      html,
      /(?:workers\.dev|localhost|127\.0\.0\.1|\/Users\/sebastian\/)/iu,
      `preview-only value in ${file.pathname}`
    );

    if (isPublicPage) {
      assert.doesNotMatch(
        html,
        /<meta[^>]+name="robots"[^>]+noindex/iu,
        `no noindex directive in ${file.pathname}`
      );
      assert.match(
        html,
        /<link rel="canonical" href="https:\/\/clearstance\.pl\//u,
        `production canonical in ${file.pathname}`
      );
      assert.match(
        html,
        /<meta property="og:url" content="https:\/\/clearstance\.pl\//u,
        `production og:url in ${file.pathname}`
      );
      assert.match(
        html,
        /<meta property="og:image" content="https:\/\/clearstance\.pl\//u,
        `absolute production og:image in ${file.pathname}`
      );
    }
  }
});
