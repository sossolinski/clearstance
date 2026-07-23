import assert from 'node:assert/strict';
import test from 'node:test';
import { handleContactRequest } from '../worker/contact.ts';

const baseFields = {
  name: 'Alex Example',
  email: 'alex@example.com',
  organisation: 'Example Organisation',
  message: 'We would like to discuss a crisis readiness exercise.',
  locale: 'en',
  source: 'https://clearstance.pl/en/contact',
  website: '',
  'cf-turnstile-response': 'test-token'
};

function createRequest(overrides = {}, contentType = 'form') {
  const fields = { ...baseFields, ...overrides };

  if (contentType === 'json') {
    return new Request('https://clearstance.pl/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    });
  }

  const body = new URLSearchParams(fields);

  return new Request('https://clearstance.pl/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });
}

function createHarness(
  turnstileResult = { success: true, action: 'contact' }
) {
  const emails = [];
  let verificationCalls = 0;
  const result =
    typeof turnstileResult === 'boolean'
      ? { success: turnstileResult, action: 'contact' }
      : turnstileResult;

  return {
    emails,
    get verificationCalls() {
      return verificationCalls;
    },
    env: {
      TURNSTILE_SECRET_KEY: 'test-secret',
      CONTACT_DESTINATION_EMAIL: 'verified-destination@example.com',
      CONTACT_FROM_EMAIL: 'website@clearstance.pl',
      EMAIL: {
        async send(payload) {
          emails.push(payload);
          return { messageId: 'test-message-id' };
        }
      }
    },
    dependencies: {
      async fetch() {
        verificationCalls += 1;
        return Response.json(result);
      },
      now: () => new Date('2026-07-23T20:00:00.000Z'),
      createId: () => '00000000-0000-4000-8000-000000000000'
    }
  };
}

async function readJson(response) {
  return response.json();
}

test('accepts a valid submission and builds a plain-text notification', async () => {
  const harness = createHarness();
  const response = await handleContactRequest(
    createRequest(),
    harness.env,
    harness.dependencies
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await readJson(response), { ok: true });
  assert.equal(harness.verificationCalls, 1);
  assert.equal(harness.emails.length, 1);
  assert.equal(
    harness.emails[0].subject,
    'ClearStance — new website enquiry'
  );
  assert.deepEqual(harness.emails[0].replyTo, {
    email: 'alex@example.com',
    name: 'Alex Example'
  });
  assert.match(harness.emails[0].text, /Language:\nEN/);
  assert.match(
    harness.emails[0].text,
    /Timestamp:\n2026-07-23T20:00:00.000Z/
  );
});

test('accepts Cloudflare’s documented always-pass testing response', async () => {
  const harness = createHarness({
    success: true,
    hostname: 'example.com',
    metadata: { result_with_testing_key: true }
  });
  harness.env.TURNSTILE_EXPECTED_HOSTNAME = 'clearstance.pl';

  const response = await handleContactRequest(
    createRequest(),
    harness.env,
    harness.dependencies
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await readJson(response), { ok: true });
  assert.equal(harness.emails.length, 1);
});

test('rejects a production verification with the wrong action', async () => {
  const harness = createHarness({
    success: true,
    action: 'newsletter',
    hostname: 'clearstance.pl'
  });
  harness.env.TURNSTILE_EXPECTED_HOSTNAME = 'clearstance.pl';

  const response = await handleContactRequest(
    createRequest(),
    harness.env,
    harness.dependencies
  );

  assert.equal(response.status, 400);
  assert.equal((await readJson(response)).code, 'verification_failed');
  assert.equal(harness.emails.length, 0);
});

test('rejects a populated honeypot before Turnstile verification', async () => {
  const harness = createHarness();
  const response = await handleContactRequest(
    createRequest({ website: 'https://spam.example' }),
    harness.env,
    harness.dependencies
  );

  assert.equal(response.status, 400);
  assert.deepEqual(await readJson(response), {
    ok: false,
    code: 'invalid_request'
  });
  assert.equal(harness.verificationCalls, 0);
  assert.equal(harness.emails.length, 0);
});

test('rejects an invalid email address', async () => {
  const harness = createHarness();
  const response = await handleContactRequest(
    createRequest({ email: 'not-an-email' }),
    harness.env,
    harness.dependencies
  );

  assert.equal(response.status, 422);
  assert.equal((await readJson(response)).code, 'validation_failed');
  assert.equal(harness.verificationCalls, 0);
});

test('rejects missing required fields', async () => {
  const harness = createHarness();
  const response = await handleContactRequest(
    createRequest({ name: '', message: '' }),
    harness.env,
    harness.dependencies
  );

  assert.equal(response.status, 422);
  assert.equal((await readJson(response)).code, 'validation_failed');
  assert.equal(harness.verificationCalls, 0);
});

test('rejects an oversized message', async () => {
  const harness = createHarness();
  const response = await handleContactRequest(
    createRequest({ message: 'x'.repeat(5_001) }),
    harness.env,
    harness.dependencies
  );

  assert.equal(response.status, 422);
  assert.equal((await readJson(response)).code, 'validation_failed');
  assert.equal(harness.verificationCalls, 0);
});

test('rejects a failed Turnstile verification', async () => {
  const harness = createHarness(false);
  const response = await handleContactRequest(
    createRequest(),
    harness.env,
    harness.dependencies
  );

  assert.equal(response.status, 400);
  assert.equal((await readJson(response)).code, 'verification_failed');
  assert.equal(harness.verificationCalls, 1);
  assert.equal(harness.emails.length, 0);
});

test('rejects unsupported request content types', async () => {
  const harness = createHarness();
  const response = await handleContactRequest(
    createRequest({}, 'json'),
    harness.env,
    harness.dependencies
  );

  assert.equal(response.status, 415);
  assert.equal(
    (await readJson(response)).code,
    'unsupported_content_type'
  );
  assert.equal(harness.verificationCalls, 0);
});

test('fails safely when runtime configuration is missing', async () => {
  const response = await handleContactRequest(createRequest(), {}, {});

  assert.equal(response.status, 503);
  assert.deepEqual(await readJson(response), {
    ok: false,
    code: 'service_unavailable'
  });
});
