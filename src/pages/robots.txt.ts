import type { APIRoute } from 'astro';
import { LEGACY_SITE_ORIGIN } from '../../scripts/site-origin.mjs';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL(LEGACY_SITE_ORIGIN);
  const sitemap = new URL('/sitemap.xml', origin).toString();

  return new Response(
    [
      'User-agent: *',
      'Disallow: /admin/',
      'Allow: /',
      '',
      `Sitemap: ${sitemap}`,
      ''
    ].join('\n'),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8'
      }
    }
  );
};
