import type { Locale } from '../i18n/routes';
import { getArticlePath, getRoute } from '../i18n/routes';
import type { InsightEntry } from './insights';

const PRODUCTION_SITE = new URL('https://clearstance.pl');

export const INSIGHTS_RSS_PATHS: Record<Locale, string> = {
  pl: '/rss.xml',
  en: '/en/rss.xml'
};

const FEED_DESCRIPTIONS: Record<Locale, string> = {
  pl: 'Publikacje ClearStance o gotowości kryzysowej i działaniu w warunkach niepewności.',
  en: 'ClearStance publications on crisis readiness and operating under uncertainty.'
};

export function getInsightsRssPath(locale: Locale): string {
  return INSIGHTS_RSS_PATHS[locale];
}

export function escapeXml(value: string): string {
  return value.replace(
    /[&<>"']/gu,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;'
      })[character] ?? character
  );
}

function xmlElement(name: string, value: string): string {
  return `<${name}>${escapeXml(value)}</${name}>`;
}

export function createInsightsRss(
  locale: Locale,
  entries: InsightEntry[],
  site: URL = PRODUCTION_SITE
): string {
  const feedUrl = new URL(getInsightsRssPath(locale), site).toString();
  const insightsUrl = new URL(getRoute(locale, 'insights'), site).toString();
  const language = locale === 'pl' ? 'pl-PL' : 'en-GB';
  const lastBuildDate = entries[0]?.data.publishedAt.toUTCString();
  const items = entries
    .map((entry) => {
      const canonicalUrl = new URL(
        getArticlePath(locale, entry.data.slug),
        site
      ).toString();

      return [
        '    <item>',
        `      ${xmlElement('title', entry.data.title)}`,
        `      ${xmlElement('description', entry.data.description)}`,
        `      ${xmlElement('link', canonicalUrl)}`,
        `      <guid isPermaLink="true">${escapeXml(canonicalUrl)}</guid>`,
        `      ${xmlElement('pubDate', entry.data.publishedAt.toUTCString())}`,
        `      ${xmlElement('dc:creator', entry.data.author)}`,
        '    </item>'
      ].join('\n');
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '  <channel>',
    `    ${xmlElement('title', 'ClearStance Insights')}`,
    `    ${xmlElement('description', FEED_DESCRIPTIONS[locale])}`,
    `    ${xmlElement('link', insightsUrl)}`,
    `    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    `    ${xmlElement('language', language)}`,
    ...(lastBuildDate
      ? [`    ${xmlElement('lastBuildDate', lastBuildDate)}`]
      : []),
    ...(items ? [items] : []),
    '  </channel>',
    '</rss>',
    ''
  ].join('\n');
}

export function createRssResponse(xml: string): Response {
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  });
}
