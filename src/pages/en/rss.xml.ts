import type { APIRoute } from 'astro';
import { getPublishedInsights } from '../../lib/insights';
import { createInsightsRss, createRssResponse } from '../../lib/rss';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const entries = await getPublishedInsights('en');
  return createRssResponse(
    createInsightsRss('en', entries, site ?? new URL('https://clearstance.pl'))
  );
};
