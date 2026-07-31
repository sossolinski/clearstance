import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { parse } from 'yaml';
import { resolveInsightEntryVisual } from '../src/lib/insight-visual-theme.ts';

const previewOrigin = process.env.PREVIEW_ORIGIN;
const outputDirectory = path.resolve(
  process.env.REVIEW_OUTPUT_DIRECTORY ?? 'docs/review/deployment-preview'
);
const productionOrigin = 'https://clearstance.pl';

if (!previewOrigin?.startsWith('https://')) {
  throw new Error('PREVIEW_ORIGIN must be an HTTPS origin.');
}

const generalRoutes = [
  '/',
  '/en/',
  '/insights/',
  '/en/insights/',
  '/o-clearstance/',
  '/en/about/',
  '/kontakt/',
  '/en/contact/'
];
const retiredReviewRoutes = [
  '/insights-visual-system/',
  '/en/insights-visual-system/',
  '/insights-visual-system-poc/',
  '/en/insights-visual-system-poc/',
  '/review/insights-visual-system/'
];
const headerNames = [
  'cache-control',
  'content-type',
  'etag',
  'last-modified',
  'cf-cache-status',
  'content-encoding',
  'x-robots-tag',
  'content-security-policy',
  'x-content-type-options',
  'x-frame-options',
  'referrer-policy',
  'permissions-policy'
];

const sha256 = (input) => createHash('sha256').update(input).digest('hex');

const htmlContainsText = (html, value) =>
  html.includes(value) ||
  html.includes(
    value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
  );

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([:\w-]+)="([^"]*)"/gu)].map((match) => [
      match[1],
      match[2]
    ])
  );
}

function metadata(html) {
  const tags = [...html.matchAll(/<meta\b[^>]*>/gu)].map((match) =>
    attributes(match[0])
  );
  const value = (key, name) =>
    tags.find((tag) => tag[key] === name)?.content ?? null;
  return {
    ogTitle: value('property', 'og:title'),
    ogDescription: value('property', 'og:description'),
    ogType: value('property', 'og:type'),
    ogUrl: value('property', 'og:url'),
    ogImage: value('property', 'og:image'),
    ogImageWidth: value('property', 'og:image:width'),
    ogImageHeight: value('property', 'og:image:height'),
    twitterCard: value('name', 'twitter:card'),
    twitterTitle: value('name', 'twitter:title'),
    twitterDescription: value('name', 'twitter:description'),
    twitterImage: value('name', 'twitter:image'),
    robots: value('name', 'robots')
  };
}

function linkValue(html, rel) {
  return [...html.matchAll(/<link\b[^>]*>/gu)]
    .map((match) => attributes(match[0]))
    .find((tag) => tag.rel === rel)?.href ?? null;
}

function responseHeaders(response) {
  return Object.fromEntries(
    headerNames.map((name) => [name, response.headers.get(name)])
  );
}

async function fetchRecord(route) {
  const response = await fetch(new URL(route, previewOrigin));
  const body = await response.text();
  return {
    route,
    finalUrl: response.url,
    status: response.status,
    headers: responseHeaders(response),
    body
  };
}

function readFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/u);
  if (!match) throw new Error('Missing frontmatter.');
  return parse(match[1]);
}

async function articleEntries() {
  const entries = [];
  for (const locale of ['pl', 'en']) {
    const directory = path.resolve(`src/content/insights/${locale}`);
    for (const fileName of (await readdir(directory)).sort()) {
      if (!/\.mdx?$/u.test(fileName)) continue;
      const data = readFrontmatter(
        await readFile(path.join(directory, fileName), 'utf8')
      );
      if (data.draft) continue;
      const route = locale === 'pl'
        ? `/insights/${data.slug}/`
        : `/en/insights/${data.slug}/`;
      const visual = resolveInsightEntryVisual(data);
      entries.push({ locale, route, data, visual });
    }
  }
  return entries;
}

await mkdir(path.join(outputDirectory, 'og'), { recursive: true });

const routeRecords = await Promise.all(generalRoutes.map(fetchRecord));
const retiredRecords = await Promise.all(retiredReviewRoutes.map(fetchRecord));
const sitemap = await fetchRecord('/sitemap.xml');
const articleResults = [];

for (const entry of await articleEntries()) {
  const response = await fetchRecord(entry.route);
  const meta = metadata(response.body);
  const canonical = linkValue(response.body, 'canonical');
  const expectedCanonical = new URL(entry.route, productionOrigin).toString();
  const expectedOgPath = `/images/insights/og/${entry.locale}/${entry.data.slug}.webp`;
  const expectedOgUrl = new URL(expectedOgPath, productionOrigin).toString();
  const previewOgUrl = new URL(expectedOgPath, previewOrigin);
  const ogResponse = await fetch(previewOgUrl);
  const ogBuffer = Buffer.from(await ogResponse.arrayBuffer());
  const declaredOgResponse = await fetch(expectedOgUrl);
  await declaredOgResponse.arrayBuffer();
  const localOg = await readFile(path.resolve('dist', expectedOgPath.slice(1)));
  const ogMetadata = await sharp(ogBuffer).metadata();
  const outputName = `${entry.locale}-${entry.data.slug}.webp`;
  await writeFile(path.join(outputDirectory, 'og', outputName), ogBuffer);
  const expectedTheme = entry.visual.kind === 'micro-illustration'
    ? entry.visual.theme
    : null;

  articleResults.push({
    route: entry.route,
    locale: entry.locale,
    title: entry.data.title,
    category: entry.data.category,
    date: new Date(entry.data.publishedAt).toISOString().slice(0, 10),
    theme: expectedTheme,
    status: response.status,
    headers: response.headers,
    htmlChecks: {
      lang: response.body.match(/<html\b[^>]*\blang="([^"]+)"/u)?.[1] ?? null,
      titlePresent: htmlContainsText(response.body, entry.data.title),
      categoryPresent: htmlContainsText(response.body, entry.data.category),
      datePresent: response.body.includes(
        new Date(entry.data.publishedAt).toISOString()
      ),
      leadPresent: htmlContainsText(response.body, entry.data.description),
      themePresent: expectedTheme
        ? response.body.includes(`#${expectedTheme}`)
        : true,
      reserveThemeAbsent:
        !response.body.includes('#situation-field-b') &&
        !response.body.includes('#interface-map-b'),
      backLinkPresent: response.body.includes(
        `href="${entry.locale === 'pl' ? '/insights/' : '/en/insights/'}"`
      ),
      noHydration: !response.body.includes('<astro-island')
    },
    metadata: {
      ...meta,
      canonical,
      canonicalValid: canonical === expectedCanonical,
      ogUrlValid: meta.ogUrl === expectedCanonical,
      ogImageValid: meta.ogImage === expectedOgUrl,
      twitterImageValid: meta.twitterImage === expectedOgUrl,
      absoluteHttps: [
        canonical,
        meta.ogUrl,
        meta.ogImage,
        meta.twitterImage
      ].every((value) => value?.startsWith('https://clearstance.pl/'))
    },
    og: {
      previewUrl: previewOgUrl.toString(),
      declaredUrl: meta.ogImage,
      declaredStatus: declaredOgResponse.status,
      declaredHeaders: responseHeaders(declaredOgResponse),
      status: ogResponse.status,
      headers: responseHeaders(ogResponse),
      width: ogMetadata.width,
      height: ogMetadata.height,
      bytes: ogBuffer.byteLength,
      sha256: sha256(ogBuffer),
      localSha256: sha256(localOg),
      binaryMatch: ogBuffer.equals(localOg),
      file: `og/${outputName}`
    }
  });
}

const indexHtml = routeRecords.find(({ route }) => route === '/insights/').body;
const articleHtml = articleResults[0]
  ? (await fetchRecord(articleResults[0].route)).body
  : '';
const cssPath = linkValue(indexHtml, 'stylesheet');
const jsPath = articleHtml.match(/<script\b[^>]*\bsrc="([^"]+)"/u)?.[1] ?? null;
const svgPath = indexHtml.match(/href="([^"#]+\.svg)#[^"]+"/u)?.[1] ?? null;
const headerTargets = {
  indexHtml: '/insights/',
  articleHtml: articleResults[0]?.route,
  svg: svgPath,
  og: articleResults[0]
    ? new URL(articleResults[0].og.previewUrl).pathname
    : null,
  css: cssPath,
  js: jsPath,
  experienceImage: '/images/experience/experience-maritime-home-720.avif',
  sitemap: '/sitemap.xml',
  robots: '/robots.txt'
};
const headerAudit = {};
for (const [name, route] of Object.entries(headerTargets)) {
  if (!route) continue;
  const response = await fetch(new URL(route, previewOrigin));
  await response.arrayBuffer();
  headerAudit[name] = {
    route,
    status: response.status,
    headers: responseHeaders(response)
  };
}

const sitemapBody = sitemap.body;
const result = {
  generated: new Date().toISOString(),
  previewOrigin,
  generalRoutes: routeRecords.map(({ body, ...record }) => ({
    ...record,
    canonical: linkValue(body, 'canonical'),
    lang: body.match(/<html\b[^>]*\blang="([^"]+)"/u)?.[1] ?? null,
    title: body.match(/<title>([^<]+)<\/title>/u)?.[1] ?? null
  })),
  retiredRoutes: retiredRecords.map(({ body, ...record }) => ({
    ...record,
    referencedBySitemap: sitemapBody.includes(record.route),
    referencedByPublishedHtml: [...routeRecords, ...articleResults].some((item) =>
      (item.body ?? '').includes(record.route)
    )
  })),
  sitemap: {
    status: sitemap.status,
    headers: sitemap.headers,
    productionUrlsOnly:
      !sitemap.body.includes(new URL(previewOrigin).hostname) &&
      !/localhost|127\.0\.0\.1|\/Users\/sebastian/u.test(sitemap.body),
    urlCount: [...sitemap.body.matchAll(/<loc>/gu)].length
  },
  articles: articleResults,
  headerAudit
};

await writeFile(
  path.join(outputDirectory, 'http-validation.json'),
  `${JSON.stringify(result, null, 2)}\n`
);

const failures = [
  ...result.generalRoutes.filter(({ status }) => status !== 200),
  ...result.retiredRoutes.filter(({ status }) => status !== 404),
  ...articleResults.filter((article) =>
    article.status !== 200 ||
    Object.values(article.htmlChecks).includes(false) ||
    !article.metadata.canonicalValid ||
    !article.metadata.ogUrlValid ||
    !article.metadata.ogImageValid ||
    !article.metadata.twitterImageValid ||
    !article.metadata.absoluteHttps ||
    article.metadata.ogType !== 'article' ||
    article.metadata.twitterCard !== 'summary_large_image' ||
    article.metadata.ogImageWidth !== '1200' ||
    article.metadata.ogImageHeight !== '630' ||
    article.og.status !== 200 ||
    article.og.width !== 1200 ||
    article.og.height !== 630 ||
    !article.og.binaryMatch
  )
];

if (failures.length > 0) {
  throw new Error(`Preview HTTP validation failed ${failures.length} checks.`);
}

console.log(
  `Preview HTTP validation passed: ${result.generalRoutes.length} general routes, ` +
  `${articleResults.length} articles, ${result.retiredRoutes.length} retired 404s and ` +
  `${articleResults.length} binary-identical OG images.`
);
