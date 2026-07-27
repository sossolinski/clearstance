import { createHash } from 'node:crypto';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');
const origin = 'https://clearstance.pl';
const errors = [];

const routeCases = [
  { route: '/', file: 'index.html', lang: 'pl', alternate: '/en/' },
  { route: '/oferta/', file: 'oferta/index.html', lang: 'pl', alternate: '/en/services/' },
  { route: '/o-clearstance/', file: 'o-clearstance/index.html', lang: 'pl', alternate: '/en/about/' },
  { route: '/insights/', file: 'insights/index.html', lang: 'pl', alternate: '/en/insights/' },
  {
    route: '/insights/kiedy-zespol-kryzysowy-traci-obraz-sytuacji/',
    file: 'insights/kiedy-zespol-kryzysowy-traci-obraz-sytuacji/index.html',
    lang: 'pl',
    alternate: '/en/insights/when-crisis-teams-lose-situational-awareness/'
  },
  { route: '/kontakt/', file: 'kontakt/index.html', lang: 'pl', alternate: '/en/contact/' },
  { route: '/en/', file: 'en/index.html', lang: 'en', alternate: '/' },
  { route: '/en/services/', file: 'en/services/index.html', lang: 'en', alternate: '/oferta/' },
  { route: '/en/about/', file: 'en/about/index.html', lang: 'en', alternate: '/o-clearstance/' },
  { route: '/en/insights/', file: 'en/insights/index.html', lang: 'en', alternate: '/insights/' },
  {
    route: '/en/insights/when-crisis-teams-lose-situational-awareness/',
    file: 'en/insights/when-crisis-teams-lose-situational-awareness/index.html',
    lang: 'en',
    alternate: '/insights/kiedy-zespol-kryzysowy-traci-obraz-sytuacji/'
  },
  { route: '/en/contact/', file: 'en/contact/index.html', lang: 'en', alternate: '/kontakt/' }
];

function report(message) {
  errors.push(message);
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]+)"`, 'u'))?.[1];
}

function linkTags(html) {
  return [...html.matchAll(/<link\b[^>]*>/gu)].map((match) => match[0]);
}

function isFinalInternalRoute(value) {
  if (
    !value.startsWith('/') ||
    value.startsWith('/_astro/') ||
    value.startsWith('/api/')
  ) {
    return true;
  }

  const pathname = value.split('#')[0].split('?')[0];

  if (pathname === '/' || path.posix.extname(pathname)) {
    return true;
  }

  return pathname.endsWith('/');
}

async function checkAsset(reference, owner) {
  if (
    !reference.startsWith('/') ||
    reference.startsWith('//') ||
    !path.posix.extname(reference.split('?')[0])
  ) {
    return;
  }

  const file = path.join(dist, reference.split('?')[0].replace(/^\/+/u, ''));

  try {
    await access(file);
  } catch {
    report(`${owner}: missing local asset ${reference}.`);
  }
}

async function checkHtml(file, expected) {
  const absolutePath = path.join(dist, file);
  let html;

  try {
    html = await readFile(absolutePath, 'utf8');
  } catch {
    report(`${file}: generated HTML is missing.`);
    return;
  }

  if (!/<title>[^<]+<\/title>/u.test(html)) {
    report(`${file}: title is missing.`);
  }

  if (attribute(html.match(/<html\b[^>]*>/u)?.[0] ?? '', 'lang') !== expected.lang) {
    report(`${file}: expected lang="${expected.lang}".`);
  }

  const links = linkTags(html);
  const canonical = links.find((tag) => attribute(tag, 'rel') === 'canonical');
  const expectedCanonical = new URL(expected.route, origin).toString();

  if (attribute(canonical ?? '', 'href') !== expectedCanonical) {
    report(`${file}: canonical is not ${expectedCanonical}.`);
  }

  const alternateTags = links.filter(
    (tag) =>
      attribute(tag, 'rel') === 'alternate' &&
      ['pl', 'en'].includes(attribute(tag, 'hreflang'))
  );
  const expectedAlternate = new URL(expected.alternate, origin).toString();

  if (!alternateTags.some((tag) => attribute(tag, 'href') === expectedAlternate)) {
    report(`${file}: localized hreflang does not include ${expectedAlternate}.`);
  }

  for (const match of html.matchAll(/\bhref="([^"]+)"/gu)) {
    if (!isFinalInternalRoute(match[1])) {
      report(`${file}: internal link does not use the final slash convention (${match[1]}).`);
    }
  }

  for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/gu)) {
    await checkAsset(match[1], file);
  }

  for (const match of html.matchAll(/\bsrcset="([^"]+)"/gu)) {
    for (const candidate of match[1].split(',')) {
      const reference = candidate.trim().split(/\s+/u)[0];
      await checkAsset(reference, file);
    }
  }

  if (file !== 'admin/index.html' && html.includes('sveltia-cms')) {
    report(`${file}: public page unexpectedly references the Sveltia CMS bundle.`);
  }
}

for (const routeCase of routeCases) {
  await checkHtml(routeCase.file, routeCase);
}

for (const [homeFile, contactPath] of [
  ['index.html', '/kontakt/'],
  ['en/index.html', '/en/contact/']
]) {
  const homeHtml = await readFile(path.join(dist, homeFile), 'utf8');
  const primaryContactLinks = [
    ...homeHtml.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/gu)
  ]
    .filter((match) =>
      /class="[^"]*(?:nav-contact|button--dark)[^"]*"/u.test(match[0])
    )
    .map((match) => match[1]);

  if (!primaryContactLinks.includes(contactPath)) {
    report(`${homeFile}: primary contact CTA does not link to ${contactPath}.`);
  }

  if (!homeHtml.includes('href="mailto:contact@clearstance.pl"')) {
    report(`${homeFile}: direct email fallback is missing.`);
  }
}

let notFoundHtml = '';

try {
  notFoundHtml = await readFile(path.join(dist, '404.html'), 'utf8');
} catch {
  report('404.html was not generated.');
}

for (const text of [
  'Nie znaleziono strony.',
  'Page not found.',
  '/oferta/',
  '/insights/',
  '/kontakt/',
  '/en/services/',
  '/en/insights/',
  '/en/contact/'
]) {
  if (!notFoundHtml.includes(text)) {
    report(`404.html does not contain required content: ${text}`);
  }
}

if (/<meta[^>]+http-equiv="refresh"/iu.test(notFoundHtml)) {
  report('404.html must not redirect with meta refresh.');
}

const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
const sitemapLocations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gu)]
  .map((match) => match[1]);

for (const location of sitemapLocations) {
  const url = new URL(location);
  if (url.pathname !== '/' && !url.pathname.endsWith('/')) {
    report(`sitemap.xml uses a non-final public URL: ${location}`);
  }
}

for (const rssFile of ['rss.xml', 'en/rss.xml']) {
  const rss = await readFile(path.join(dist, rssFile), 'utf8');
  const publicLinks = [...rss.matchAll(/<(?:link|guid)[^>]*>(https:\/\/clearstance\.pl[^<]+)<\/(?:link|guid)>/gu)]
    .map((match) => match[1]);

  for (const publicLink of publicLinks) {
    const url = new URL(publicLink);
    if (url.pathname !== '/' && !url.pathname.endsWith('/')) {
      report(`${rssFile} uses a non-final page URL: ${publicLink}`);
    }
  }
}

const adminHtml = await readFile(path.join(dist, 'admin/index.html'), 'utf8');
const cmsScriptPath = '/admin/sveltia-cms-0.173.0.js';

if (!adminHtml.includes(`src="${cmsScriptPath}"`)) {
  report(`admin/index.html does not load ${cmsScriptPath}.`);
}

if (/unpkg\.com\/@sveltia\/cms\/dist|\blatest\b/u.test(adminHtml)) {
  report('admin/index.html still loads an uncontrolled Sveltia version.');
}

for (const requiredAdminAsset of [
  'admin/config.yml',
  'admin/insights-validation.js',
  'admin/sveltia-cms-0.173.0.js',
  'admin/sveltia-cms.LICENSE.txt',
  'admin/sveltia-cms.version.json'
]) {
  try {
    await access(path.join(dist, requiredAdminAsset));
  } catch {
    report(`Missing admin asset: ${requiredAdminAsset}.`);
  }
}

const cmsManifest = JSON.parse(
  await readFile(path.join(dist, 'admin/sveltia-cms.version.json'), 'utf8')
);
const cmsBundle = await readFile(
  path.join(dist, `admin/${cmsManifest.artifact}`)
);
const cmsSha256 = createHash('sha256').update(cmsBundle).digest('hex');

if (cmsSha256 !== cmsManifest.sha256) {
  report(
    `Self-hosted Sveltia hash mismatch: expected ${cmsManifest.sha256}, received ${cmsSha256}.`
  );
}

if (errors.length > 0) {
  console.error(`Generated dist contract failed:\n${errors.map((item) => `- ${item}`).join('\n')}`);
  process.exit(1);
}

console.log(
  `Generated dist contract passed for ${routeCases.length} representative routes, 404, feeds and self-hosted Sveltia ${cmsManifest.version}.`
);
