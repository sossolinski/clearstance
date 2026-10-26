import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import worker from '../worker/index.ts';

function createEnv(overrides = {}) {
  const assetRequests = [];

  return {
    assetRequests,
    env: {
      PRIMARY_SITE_ORIGIN: 'https://clearstance.eu',
      WWW_REDIRECT_ENABLED: 'false',
      LEGACY_DOMAIN_REDIRECT_ENABLED: 'false',
      ASSETS: {
        async fetch(request) {
          assetRequests.push(request.url);
          return new Response('asset', { status: 200 });
        }
      },
      ...overrides
    }
  };
}

test('keeps clearstance.pl serving assets while the legacy redirect is disabled', async () => {
  const harness = createEnv();
  const response = await worker.fetch(
    new Request('https://clearstance.pl/en/services/'),
    harness.env
  );

  assert.equal(response.status, 200);
  assert.deepEqual(harness.assetRequests, [
    'https://clearstance.pl/en/services/'
  ]);
});

test('keeps www.clearstance.eu inactive until its redirect gate is enabled', async () => {
  const harness = createEnv();
  const response = await worker.fetch(
    new Request('https://www.clearstance.eu/en/?source=test'),
    harness.env
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Location'), null);
});

test('redirects www.clearstance.eu to the apex with path and query intact when approved', async () => {
  const harness = createEnv({ WWW_REDIRECT_ENABLED: 'true' });
  const response = await worker.fetch(
    new Request('https://www.clearstance.eu/en/?source=test'),
    harness.env
  );

  assert.equal(response.status, 308);
  assert.equal(
    response.headers.get('Location'),
    'https://clearstance.eu/en/?source=test'
  );
  assert.deepEqual(harness.assetRequests, []);
});

test('keeps the future clearstance.pl redirect independently disabled', async () => {
  const harness = createEnv({ WWW_REDIRECT_ENABLED: 'true' });
  const response = await worker.fetch(
    new Request('https://clearstance.pl/kontakt/'),
    harness.env
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Location'), null);
});

test('supports a later explicit legacy-domain redirect without redirecting API posts', async () => {
  const harness = createEnv({ LEGACY_DOMAIN_REDIRECT_ENABLED: 'true' });
  const pageResponse = await worker.fetch(
    new Request('https://clearstance.pl/en/contact/?topic=advisory'),
    harness.env
  );

  assert.equal(pageResponse.status, 308);
  assert.equal(
    pageResponse.headers.get('Location'),
    'https://clearstance.eu/en/contact/?topic=advisory'
  );

  const apiResponse = await worker.fetch(
    new Request('https://clearstance.pl/api/unknown', { method: 'POST' }),
    harness.env
  );
  assert.equal(apiResponse.status, 404);
  assert.equal(apiResponse.headers.get('Location'), null);
});

test('fails closed when the configured primary origin is not exact', async () => {
  const harness = createEnv({
    PRIMARY_SITE_ORIGIN: 'https://example.com',
    WWW_REDIRECT_ENABLED: 'true',
    LEGACY_DOMAIN_REDIRECT_ENABLED: 'true'
  });
  const response = await worker.fetch(
    new Request('https://clearstance.pl/'),
    harness.env
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Location'), null);
});

test('keeps repository redirects disabled and CI deployment-free', async () => {
  const [wranglerSource, packageSource, workflowSource] = await Promise.all([
    readFile(new URL('../wrangler.jsonc', import.meta.url), 'utf8'),
    readFile(new URL('../package.json', import.meta.url), 'utf8'),
    readFile(
      new URL('../.github/workflows/quality.yml', import.meta.url),
      'utf8'
    )
  ]);
  const wrangler = JSON.parse(wranglerSource);
  const packageJson = JSON.parse(packageSource);

  assert.equal(wrangler.vars.WWW_REDIRECT_ENABLED, 'false');
  assert.equal(wrangler.vars.LEGACY_DOMAIN_REDIRECT_ENABLED, 'false');
  assert.doesNotMatch(workflowSource, /deploy:cloudflare|wrangler deploy/u);
  assert.match(packageJson.scripts['check:worker'], /--dry-run/u);
});
