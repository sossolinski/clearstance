import { handleContactRequest, type ContactEnv } from './contact';

interface AssetBinding {
  fetch(request: Request): Promise<Response>;
}

interface Env extends ContactEnv {
  ASSETS: AssetBinding;
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);

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
