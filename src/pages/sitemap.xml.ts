import { getCollection } from 'astro:content';
import {
  getArticlePath,
  getRoute,
  type Locale,
  type PageKey
} from '../i18n/routes';

export const prerender = true;

const staticPages: PageKey[] = [
  'home',
  'services',
  'exercises',
  'executiveTabletop',
  'insights',
  'about',
  'contact',
  'privacy'
];

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function urlEntry(
  site: URL,
  locale: Locale,
  path: string,
  alternate?: { locale: Locale; path: string },
  lastmod?: Date
): string {
  const canonical = new URL(path, site).toString();
  const polishPath = locale === 'pl' ? path : alternate?.locale === 'pl' ? alternate.path : undefined;
  const englishPath = locale === 'en' ? path : alternate?.locale === 'en' ? alternate.path : undefined;
  const alternateLinks = [
    polishPath
      ? `<xhtml:link rel="alternate" hreflang="pl" href="${escapeXml(new URL(polishPath, site).toString())}" />`
      : '',
    englishPath
      ? `<xhtml:link rel="alternate" hreflang="en" href="${escapeXml(new URL(englishPath, site).toString())}" />`
      : '',
    polishPath
      ? `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(new URL(polishPath, site).toString())}" />`
      : ''
  ].join('');

  return [
    '<url>',
    `<loc>${escapeXml(canonical)}</loc>`,
    lastmod ? `<lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : '',
    alternateLinks,
    '</url>'
  ].join('');
}

export async function GET({ site }: { site?: URL }) {
  const base = site ?? new URL('https://clearstance.pl');
  const entries: string[] = [];

  for (const page of staticPages) {
    entries.push(
      urlEntry(base, 'pl', getRoute('pl', page), {
        locale: 'en',
        path: getRoute('en', page)
      }),
      urlEntry(base, 'en', getRoute('en', page), {
        locale: 'pl',
        path: getRoute('pl', page)
      })
    );
  }

  const insights = await getCollection('insights', ({ data }) => !data.draft);
  for (const insight of insights) {
    const locale = insight.data.locale;
    const alternate = insights.find(
      (candidate) =>
        candidate.data.locale !== locale &&
        candidate.data.translationKey === insight.data.translationKey
    );
    entries.push(
      urlEntry(
        base,
        locale,
        getArticlePath(locale, insight.data.slug),
        alternate
          ? {
              locale: alternate.data.locale,
              path: getArticlePath(alternate.data.locale, alternate.data.slug)
            }
          : undefined,
        insight.data.updatedAt ?? insight.data.publishedAt
      )
    );
  }

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>'
  ].join('');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}
