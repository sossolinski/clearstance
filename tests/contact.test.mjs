import assert from 'node:assert/strict';
import test from 'node:test';
import { handleContactRequest } from '../worker/contact.ts';

const PRODUCTION_URL = 'https://clearstance.pl/api/contact';
const LOCAL_URL = 'http://127.0.0.1:8787/api/contact';
const TEST_SECRET = '1x0000000000000000000000000000000AA';

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

function appendFields(body, fields) {
  for (const [name, value] of Object.entries(fields)) {
    if (value !== undefined) {
      body.append(name, String(value));
    }
  }
}

function createRequest(overrides = {}, options = {}) {
  const fields = { ...baseFields, ...overrides };
  const url = options.url ?? PRODUCTION_URL;

  if (options.contentType === 'json') {
    return new Request(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    });
  }

  if (options.formData) {
    return new Request(url, {
      method: 'POST',
      body: options.formData
    });
  }

  const body = new URLSearchParams();
  appendFields(body, fields);

  for (const [name, value] of options.extraFields ?? []) {
    body.append(name, value);
  }

  return new Request(url, {
    method: options.method ?? 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });
}

function createStreamingRequest(body) {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(body));
      controller.close();
    }
  });

  return new Request(PRODUCTION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: stream,
    duplex: 'half'
  });
}

function createHarness(
  turnstileResult = {
    success: true,
    action: 'contact',
    hostname: 'clearstance.pl'
  },
  options = {}
) {
  const emails = [];
  let verificationCalls = 0;

  return {
    emails,
    get verificationCalls() {
      return verificationCalls;
    },
    env: {
      TURNSTILE_SECRET_KEY: 'production-like-test-secret',
      TURNSTILE_EXPECTED_HOSTNAME: 'clearstance.pl',
      CONTACT_DESTINATION_EMAIL: 'verified-destination@example.com',
      CONTACT_FROM_EMAIL: 'website@clearstance.pl',
      EMAIL: {
        async send(payload) {
          if (options.emailError) {
            throw options.emailError;
          }

          emails.push(payload);
          return { messageId: 'test-message-id' };
        }
      }
    },
    dependencies: {
      async fetch(_input, init) {
        verificationCalls += 1;

        if (typeof turnstileResult === 'function') {
          return turnstileResult(init);
        }

        return Response.json(turnstileResult);
      },
      now: () => new Date('2026-07-23T20:00:00.000Z'),
      createId: () => '00000000-0000-4000-8000-000000000000',
      turnstileTimeoutMs: options.turnstileTimeoutMs ?? 100
    }
  };
}

async function readJson(response) {
  return response.json();
}

test('accepts a valid submission with fixed safe email headers and plain text', async () => {
  const harness = createHarness();
  const response = await handleContactRequest(
    createRequest({
      name: 'Alex\r\nInjected: value',
      subject: 'Visitor-controlled subject',
      from: 'visitor-controlled@example.com',
      to: 'visitor-controlled@example.com'
    }),
    harness.env,
    harness.dependencies
  );

  assert.equal(response.status, 400);
  assert.equal((await readJson(response)).code, 'invalid_request');
  assert.equal(harness.verificationCalls, 0);
  assert.equal(harness.emails.length, 0);

  const acceptedResponse = await handleContactRequest(
    createRequest({ name: 'Alex\r\nExample' }),
    harness.env,
    harness.dependencies
  );

  assert.equal(acceptedResponse.status, 200);
  assert.deepEqual(await readJson(acceptedResponse), { ok: true });
  assert.equal(harness.verificationCalls, 1);
  assert.equal(harness.emails.length, 1);
  assert.deepEqual(harness.emails[0].from, {
    email: 'website@clearstance.pl',
    name: 'ClearStance website'
  });
  assert.equal(
    harness.emails[0].to,
    'verified-destination@example.com'
  );
  assert.equal(
    harness.emails[0].subject,
    'ClearStance — new website enquiry'
  );
  assert.deepEqual(harness.emails[0].replyTo, {
    email: 'alex@example.com',
    name: 'Alex Example'
  });
  assert.equal('html' in harness.emails[0], false);
  assert.match(harness.emails[0].text, /Language:\nEN/);
  assert.match(
    harness.emails[0].text,
    /Timestamp:\n2026-07-23T20:00:00.000Z/
  );
});

test('accepts Cloudflare’s documented always-pass response only on a local request', async () => {
  const harness = createHarness({
    success: true,
    hostname: 'localhost',
    action: 'test',
    'error-codes': []
  });
  harness.env.TURNSTILE_SECRET_KEY = TEST_SECRET;

  const response = await handleContactRequest(
    createRequest({}, { url: LOCAL_URL }),
    harness.env,
    harness.dependencies
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await readJson(response), { ok: true });
  assert.equal(harness.emails.length, 1);
});

test('does not allow a documented test secret to weaken production validation', async () => {
  const harness = createHarness({
    success: true,
    hostname: 'clearstance.pl',
    action: 'test',
    'error-codes': []
  });
  harness.env.TURNSTILE_SECRET_KEY = TEST_SECRET;

  const response = await handleContactRequest(
    createRequest(),
    harness.env,
    harness.dependencies
  );

  assert.equal(response.status, 400);
  assert.equal((await readJson(response)).code, 'verification_failed');
  assert.equal(harness.emails.length, 0);
});

test('rejects a production verification with the wrong action', async () => {
  const harness = createHarness({
    success: true,
    action: 'newsletter',
    hostname: 'clearstance.pl'
  });

  const response = await handleContactRequest(
    createRequest(),
    harness.env,
    harness.dependencies
  );

  assert.equal(response.status, 400);
  assert.equal((await readJson(response)).code, 'verification_failed');
  assert.equal(harness.emails.length, 0);
});

test('rejects a production verification with the wrong hostname', async () => {
  const harness = createHarness({
    success: true,
    action: 'contact',
    hostname: 'example.com'
  });

  const response = await handleContactRequest(
    createRequest(),
    harness.env,
    harness.dependencies
  );

  assert.equal(response.status, 400);
  assert.equal((await readJson(response)).code, 'verification_failed');
  assert.equal(harness.emails.length, 0);
});

test('rejects a missing Turnstile token before verification', async () => {
  const harness = createHarness();
  const response = await handleContactRequest(
    createRequest({ 'cf-turnstile-response': undefined }),
    harness.env,
    harness.dependencies
  );

  assert.equal(response.status, 400);
  assert.equal((await readJson(response)).code, 'verification_failed');
  assert.equal(harness.verificationCalls, 0);
  assert.equal(harness.emails.length, 0);
});

test('fails closed on a malformed Turnstile response', async () => {
  const harness = createHarness(
    () =>
      new Response('{', {
        headers: { 'Content-Type': 'application/json' }
      })
  );
  const response = await handleContactRequest(
    createRequest(),
    harness.env,
    harness.dependencies
  );

  assert.equal(response.status, 400);
  assert.equal((await readJson(response)).code, 'verification_failed');
  assert.equal(harness.emails.length, 0);
});

test('fails closed when Siteverify has a network failure', async () => {
  const harness = createHarness(() => {
    throw new TypeError('Network unavailable');
  });
  const response = await handleContactRequest(
    createRequest(),
    harness.env,
    harness.dependencies
  );

  assert.equal(response.status, 400);
  assert.equal((await readJson(response)).code, 'verification_failed');
  assert.equal(harness.emails.length, 0);
});

test('fails closed when Siteverify times out', async () => {
  const harness = createHarness(
    (init) =>
      new Promise((_resolve, reject) => {
        init.signal.addEventListener(
          'abort',
          () => reject(new DOMException('Timed out', 'AbortError')),
          { once: true }
        );
      }),
    { turnstileTimeoutMs: 10 }
  );
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

test('rejects an invalid or header-injected email address', async () => {
  for (const email of [
    'not-an-email',
    'alex@example.com\r\nBcc: victim@example.com'
  ]) {
    const harness = createHarness();
    const response = await handleContactRequest(
      createRequest({ email }),
      harness.env,
      harness.dependencies
    );

    assert.equal(response.status, 422);
    assert.equal((await readJson(response)).code, 'validation_failed');
    assert.equal(harness.verificationCalls, 0);
    assert.equal(harness.emails.length, 0);
  }
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

test('rejects an oversized streamed request without Content-Length', async () => {
  const harness = createHarness();
  const response = await handleContactRequest(
    createStreamingRequest(`message=${'x'.repeat(16_385)}`),
    harness.env,
    harness.dependencies
  );

  assert.equal(response.status, 413);
  assert.equal((await readJson(response)).code, 'request_too_large');
  assert.equal(harness.verificationCalls, 0);
  assert.equal(harness.emails.length, 0);
});

test('rejects unsupported request content types', async () => {
  const harness = createHarness();
  const response = await handleContactRequest(
    createRequest({}, { contentType: 'json' }),
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

test('rejects duplicate and unexpected form fields', async () => {
  for (const extraFields of [
    [['email', 'second@example.com']],
    [['unexpected', 'value']]
  ]) {
    const harness = createHarness();
    const response = await handleContactRequest(
      createRequest({}, { extraFields }),
      harness.env,
      harness.dependencies
    );

    assert.equal(response.status, 400);
    assert.equal((await readJson(response)).code, 'invalid_request');
    assert.equal(harness.verificationCalls, 0);
    assert.equal(harness.emails.length, 0);
  }
});

test('rejects multipart file uploads', async () => {
  const formData = new FormData();
  appendFields(formData, baseFields);
  formData.append(
    'attachment',
    new File(['not accepted'], 'attachment.txt', { type: 'text/plain' })
  );
  const harness = createHarness();
  const response = await handleContactRequest(
    createRequest({}, { formData }),
    harness.env,
    harness.dependencies
  );

  assert.equal(response.status, 400);
  assert.equal((await readJson(response)).code, 'invalid_request');
  assert.equal(harness.verificationCalls, 0);
  assert.equal(harness.emails.length, 0);
});

test('rejects malformed multipart requests', async () => {
  const harness = createHarness();
  const response = await handleContactRequest(
    new Request(PRODUCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data; boundary=missing-boundary'
      },
      body: 'not a valid multipart body'
    }),
    harness.env,
    harness.dependencies
  );

  assert.equal(response.status, 400);
  assert.equal((await readJson(response)).code, 'invalid_request');
  assert.equal(harness.verificationCalls, 0);
  assert.equal(harness.emails.length, 0);
});

test('rejects a failed Turnstile verification without sending email', async () => {
  const harness = createHarness({
    success: false,
    'error-codes': ['invalid-input-response']
  });
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

test('fails safely when production hostname or runtime configuration is missing', async () => {
  for (const missing of [
    'TURNSTILE_EXPECTED_HOSTNAME',
    'TURNSTILE_SECRET_KEY',
    'CONTACT_DESTINATION_EMAIL',
    'CONTACT_FROM_EMAIL',
    'EMAIL'
  ]) {
    const harness = createHarness();
    delete harness.env[missing];
    const response = await handleContactRequest(
      createRequest(),
      harness.env,
      harness.dependencies
    );

    assert.equal(response.status, 503);
    assert.deepEqual(await readJson(response), {
      ok: false,
      code: 'service_unavailable'
    });
    assert.equal(harness.verificationCalls, 0);
    assert.equal(harness.emails.length, 0);
  }
});

test('fails safely when Email Service rejects the notification', async () => {
  const emailError = Object.assign(new Error('Service unavailable'), {
    code: 'E_DELIVERY_FAILED'
  });
  const harness = createHarness(undefined, { emailError });
  const response = await handleContactRequest(
    createRequest(),
    harness.env,
    harness.dependencies
  );

  assert.equal(response.status, 503);
  assert.deepEqual(await readJson(response), {
    ok: false,
    code: 'service_unavailable'
  });
  assert.equal(harness.verificationCalls, 1);
  assert.equal(harness.emails.length, 0);
});

test('accepts POST only', async () => {
  const harness = createHarness();
  const response = await handleContactRequest(
    new Request(PRODUCTION_URL, { method: 'GET' }),
    harness.env,
    harness.dependencies
  );

  assert.equal(response.status, 405);
  assert.equal(response.headers.get('Allow'), 'POST');
  assert.equal(harness.verificationCalls, 0);
  assert.equal(harness.emails.length, 0);
});
