const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const MAX_REQUEST_BYTES = 16_384;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_ORGANISATION_LENGTH = 160;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 5_000;
const MAX_SOURCE_LENGTH = 500;
const MAX_TURNSTILE_TOKEN_LENGTH = 2_048;
const TURNSTILE_TEST_SECRET_KEYS = new Set([
  '1x0000000000000000000000000000000AA',
  '2x0000000000000000000000000000000AA',
  '3x0000000000000000000000000000000AA'
]);
const LOCAL_TEST_HOSTNAMES = new Set([
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '[::1]'
]);
const ALLOWED_FORM_FIELDS = new Set([
  'name',
  'email',
  'organisation',
  'message',
  'locale',
  'source',
  'website',
  'cf-turnstile-response'
]);
const REQUIRED_FORM_FIELDS = [
  'name',
  'email',
  'message',
  'locale'
];

interface EmailAddress {
  email: string;
  name?: string;
}

interface EmailPayload {
  to: string | EmailAddress;
  from: string | EmailAddress;
  subject: string;
  text: string;
  replyTo?: string | EmailAddress;
}

interface EmailBinding {
  send(payload: EmailPayload): Promise<{ messageId?: string }>;
}

export interface ContactEnv {
  EMAIL?: EmailBinding;
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_EXPECTED_HOSTNAME?: string;
  CONTACT_DESTINATION_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

interface TurnstileResult {
  success?: boolean;
  hostname?: string;
  action?: string;
  'error-codes'?: string[];
}

interface ContactSubmission {
  name: string;
  email: string;
  organisation: string;
  message: string;
  locale: 'pl' | 'en';
  source: string;
  turnstileToken: string;
}

interface ContactDependencies {
  fetch: typeof fetch;
  now: () => Date;
  createId: () => string;
  turnstileTimeoutMs: number;
}

interface ValidationResult {
  ok: boolean;
  submission?: ContactSubmission;
  code?: string;
  status?: number;
}

const SINGLE_LINE_CONTROL_CHARACTERS = /[\p{Cc}\p{Cf}]/gu;
const MESSAGE_CONTROL_CHARACTERS =
  /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u061c\u200e\u200f\u202a-\u202e\u2066-\u2069]/g;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HOSTNAME_PATTERN =
  /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;
const ALLOWED_CONTENT_TYPES = new Set([
  'application/x-www-form-urlencoded',
  'multipart/form-data'
]);

function jsonResponse(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}

function readString(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === 'string' ? value : '';
}

function sanitiseSingleLine(value: string) {
  return value
    .replace(SINGLE_LINE_CONTROL_CHARACTERS, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function sanitiseMessage(value: string) {
  return value
    .replace(/\r\n?/g, '\n')
    .replace(MESSAGE_CONTROL_CHARACTERS, '')
    .trim();
}

function formDataShapeIsValid(formData: FormData) {
  const counts = new Map<string, number>();

  for (const [name, value] of formData.entries()) {
    if (!ALLOWED_FORM_FIELDS.has(name) || typeof value !== 'string') {
      return false;
    }

    const count = (counts.get(name) ?? 0) + 1;

    if (count > 1) {
      return false;
    }

    counts.set(name, count);
  }

  return REQUIRED_FORM_FIELDS.every((name) => counts.get(name) === 1);
}

function validateFormData(formData: FormData): ValidationResult {
  if (!formDataShapeIsValid(formData)) {
    return { ok: false, status: 400, code: 'invalid_request' };
  }

  const honeypot = sanitiseSingleLine(readString(formData, 'website'));

  if (honeypot.length > 0) {
    return { ok: false, status: 400, code: 'invalid_request' };
  }

  const name = sanitiseSingleLine(readString(formData, 'name'));
  const email = sanitiseSingleLine(readString(formData, 'email'));
  const organisation = sanitiseSingleLine(
    readString(formData, 'organisation')
  );
  const message = sanitiseMessage(readString(formData, 'message'));
  const locale = sanitiseSingleLine(readString(formData, 'locale'));
  const source = sanitiseSingleLine(readString(formData, 'source'));
  const turnstileToken = sanitiseSingleLine(
    readString(formData, 'cf-turnstile-response')
  );

  const requiredFieldsAreValid =
    name.length > 0 &&
    email.length > 0 &&
    message.length >= MIN_MESSAGE_LENGTH &&
    (locale === 'pl' || locale === 'en');
  const lengthsAreValid =
    name.length <= MAX_NAME_LENGTH &&
    email.length <= MAX_EMAIL_LENGTH &&
    organisation.length <= MAX_ORGANISATION_LENGTH &&
    message.length <= MAX_MESSAGE_LENGTH &&
    source.length <= MAX_SOURCE_LENGTH;

  if (
    !requiredFieldsAreValid ||
    !lengthsAreValid ||
    !EMAIL_PATTERN.test(email)
  ) {
    return { ok: false, status: 422, code: 'validation_failed' };
  }

  if (
    turnstileToken.length === 0 ||
    turnstileToken.length > MAX_TURNSTILE_TOKEN_LENGTH
  ) {
    return { ok: false, status: 400, code: 'verification_failed' };
  }

  return {
    ok: true,
    submission: {
      name,
      email,
      organisation,
      message,
      locale,
      source: source || '—',
      turnstileToken
    }
  };
}

async function readRequestBody(request: Request) {
  if (!request.body) {
    return new ArrayBuffer(0);
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    totalBytes += value.byteLength;

    if (totalBytes > MAX_REQUEST_BYTES) {
      await reader.cancel();
      return null;
    }

    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;

  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return body.buffer;
}

function isLocalTurnstileTestMode(request: Request, secret: string) {
  return (
    TURNSTILE_TEST_SECRET_KEYS.has(secret) &&
    LOCAL_TEST_HOSTNAMES.has(new URL(request.url).hostname)
  );
}

function readConfiguredEmail(value: string | undefined) {
  if (!value || value !== value.trim()) {
    return null;
  }

  const sanitised = sanitiseSingleLine(value);

  if (
    sanitised !== value ||
    sanitised.length > MAX_EMAIL_LENGTH ||
    !EMAIL_PATTERN.test(sanitised)
  ) {
    return null;
  }

  return sanitised;
}

function readExpectedHostname(value: string | undefined) {
  const hostname = value?.trim().toLowerCase() ?? '';
  return HOSTNAME_PATTERN.test(hostname) ? hostname : null;
}

async function verifyTurnstile(
  submission: ContactSubmission,
  request: Request,
  secret: string,
  expectedHostname: string | null,
  testMode: boolean,
  dependencies: ContactDependencies
) {
  const body = new URLSearchParams({
    secret,
    response: submission.turnstileToken,
    idempotency_key: dependencies.createId()
  });
  const remoteAddress = request.headers.get('CF-Connecting-IP');

  if (remoteAddress) {
    body.set('remoteip', remoteAddress);
  }

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    dependencies.turnstileTimeoutMs
  );

  try {
    const response = await dependencies.fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body,
      signal: controller.signal
    });

    if (!response.ok) {
      return false;
    }

    const parsed: unknown = await response.json();

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      console.warn('Turnstile verification returned a malformed response');
      return false;
    }

    const result = parsed as TurnstileResult;
    const hostnameMatches =
      testMode || result.hostname?.toLowerCase() === expectedHostname;
    const actionMatches = testMode || result.action === 'contact';
    const isValid =
      result.success === true &&
      actionMatches &&
      hostnameMatches;

    if (!isValid) {
      console.warn('Turnstile verification failed', {
        action: result.action ?? 'missing',
        errorCodes: result['error-codes'] ?? [],
        hostname: result.hostname ?? 'missing',
        testMode
      });
    }

    return isValid;
  } catch (error) {
    const name = error instanceof Error ? error.name : 'UnknownError';
    console.warn('Turnstile verification request failed', { name });
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export function buildNotification(
  submission: ContactSubmission,
  timestamp: Date
) {
  const organisation = submission.organisation || '—';

  return [
    'New enquiry from clearstance.pl',
    '',
    'Name:',
    submission.name,
    '',
    'Organisation:',
    organisation,
    '',
    'Email:',
    submission.email,
    '',
    'Language:',
    submission.locale.toUpperCase(),
    '',
    'Message:',
    submission.message,
    '',
    'Source:',
    submission.source,
    '',
    'Timestamp:',
    timestamp.toISOString()
  ].join('\n');
}

export async function handleContactRequest(
  request: Request,
  env: ContactEnv,
  overrides: Partial<ContactDependencies> = {}
) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: {
        Allow: 'POST',
        'Cache-Control': 'no-store'
      }
    });
  }

  const contentType = request.headers
    .get('Content-Type')
    ?.split(';', 1)[0]
    .trim()
    .toLowerCase();

  if (!contentType || !ALLOWED_CONTENT_TYPES.has(contentType)) {
    return jsonResponse(415, {
      ok: false,
      code: 'unsupported_content_type'
    });
  }

  const contentLengthHeader = request.headers.get('Content-Length');

  if (contentLengthHeader !== null) {
    if (!/^\d+$/.test(contentLengthHeader)) {
      return jsonResponse(400, { ok: false, code: 'invalid_request' });
    }

    if (Number(contentLengthHeader) > MAX_REQUEST_BYTES) {
      return jsonResponse(413, { ok: false, code: 'request_too_large' });
    }
  }

  let formData: FormData;

  try {
    const body = await readRequestBody(request);

    if (!body) {
      return jsonResponse(413, { ok: false, code: 'request_too_large' });
    }

    const formRequest = new Request(request.url, {
      method: 'POST',
      headers: request.headers,
      body
    });
    formData = await formRequest.formData();
  } catch {
    return jsonResponse(400, { ok: false, code: 'invalid_request' });
  }

  const validation = validateFormData(formData);

  if (!validation.ok || !validation.submission) {
    return jsonResponse(validation.status ?? 400, {
      ok: false,
      code: validation.code ?? 'invalid_request'
    });
  }

  const turnstileSecret = env.TURNSTILE_SECRET_KEY?.trim() ?? '';
  const testMode = isLocalTurnstileTestMode(request, turnstileSecret);
  const expectedHostname = readExpectedHostname(
    env.TURNSTILE_EXPECTED_HOSTNAME
  );
  const destinationEmail = readConfiguredEmail(
    env.CONTACT_DESTINATION_EMAIL
  );
  const fromEmail = readConfiguredEmail(env.CONTACT_FROM_EMAIL);

  if (
    !turnstileSecret ||
    (!testMode && !expectedHostname) ||
    !destinationEmail ||
    !fromEmail ||
    !env.EMAIL
  ) {
    return jsonResponse(503, { ok: false, code: 'service_unavailable' });
  }

  const dependencies: ContactDependencies = {
    fetch: overrides.fetch ?? ((input, init) => fetch(input, init)),
    now: overrides.now ?? (() => new Date()),
    createId: overrides.createId ?? (() => crypto.randomUUID()),
    turnstileTimeoutMs: overrides.turnstileTimeoutMs ?? 5_000
  };
  const turnstileIsValid = await verifyTurnstile(
    validation.submission,
    request,
    turnstileSecret,
    expectedHostname,
    testMode,
    dependencies
  );

  if (!turnstileIsValid) {
    return jsonResponse(400, { ok: false, code: 'verification_failed' });
  }

  try {
    await env.EMAIL.send({
      to: destinationEmail,
      from: {
        email: fromEmail,
        name: 'ClearStance website'
      },
      replyTo: {
        email: validation.submission.email,
        name: validation.submission.name
      },
      subject: 'ClearStance — new website enquiry',
      text: buildNotification(validation.submission, dependencies.now())
    });
  } catch (error) {
    const code =
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      typeof error.code === 'string'
        ? error.code
        : 'unknown';
    console.error('Contact email delivery failed', { code });
    return jsonResponse(503, { ok: false, code: 'service_unavailable' });
  }

  return jsonResponse(200, { ok: true });
}
