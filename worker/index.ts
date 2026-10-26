import { handleContactRequest, type ContactEnv } from './contact.ts';

interface AssetBinding {
  fetch(request: Request): Promise<Response>;
}

interface Env extends ContactEnv {
  ASSETS: AssetBinding;
  PRIMARY_SITE_ORIGIN?: string;
  WWW_REDIRECT_ENABLED?: string;
  LEGACY_DOMAIN_REDIRECT_ENABLED?: string;
}

const PRIMARY_SITE_ORIGIN = 'https://clearstance.eu';
const WWW_HOSTNAME = 'www.clearstance.eu';
const LEGACY_HOSTNAMES = new Set([
  'clearstance.pl',
  'www.clearstance.pl'
]);

function configuredPrimaryOrigin(value: string | undefined) {
  if (!value || value !== value.trim()) {
    return null;
  }

  try {
    const url = new URL(value);

    if (
      url.origin !== PRIMARY_SITE_ORIGIN ||
      url.pathname !== '/' ||
      url.search ||
      url.hash ||
      url.username ||
      url.password
    ) {
      return null;
    }

    return url.origin;
  } catch {
    return null;
  }
}

function migrationRedirect(request: Request, env: Env) {
  if (!['GET', 'HEAD'].includes(request.method)) {
    return null;
  }

  const url = new URL(request.url);

  if (url.pathname.startsWith('/api/')) {
    return null;
  }

  const primaryOrigin = configuredPrimaryOrigin(env.PRIMARY_SITE_ORIGIN);

  if (!primaryOrigin) {
    return null;
  }

  const redirectWww =
    env.WWW_REDIRECT_ENABLED === 'true' && url.hostname === WWW_HOSTNAME;
  const redirectLegacy =
    env.LEGACY_DOMAIN_REDIRECT_ENABLED === 'true' &&
    LEGACY_HOSTNAMES.has(url.hostname);

  if (!redirectWww && !redirectLegacy) {
    return null;
  }

  return Response.redirect(
    new URL(`${url.pathname}${url.search}`, primaryOrigin),
    308
  );
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);

    const redirect = migrationRedirect(request, env);

    if (redirect) {
      return redirect;
    }

    if (url.pathname === '/api/contact') {
      return handleContactRequest(request, env);
    }

    if (url.pathname.startsWith('/api/')) {
      return new Response('Not Found', {
        status: 404,
        headers: {
          'Cache-Control': 'no-store'
        }
      });
    }

    return env.ASSETS.fetch(request);
  }
};
