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
  metadata?: {
    result_with_testing_key?: boolean;
  };
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
}

interface ValidationResult {
  ok: boolean;
  submission?: ContactSubmission;
  code?: string;
  status?: number;
}

const CONTROL_CHARACTERS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
    .replace(CONTROL_CHARACTERS, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function sanitiseMessage(value: string) {
  return value
    .replace(/\r\n?/g, '\n')
    .replace(CONTROL_CHARACTERS, '')
    .trim();
}

function validateFormData(formData: FormData): ValidationResult {
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

async function verifyTurnstile(
  submission: ContactSubmission,
  request: Request,
  env: ContactEnv,
  dependencies: ContactDependencies
) {
  const body = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY ?? '',
    response: submission.turnstileToken,
    idempotency_key: dependencies.createId()
  });
  const remoteAddress = request.headers.get('CF-Connecting-IP');

  if (remoteAddress) {
    body.set('remoteip', remoteAddress);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5_000);

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

    const result = (await response.json()) as TurnstileResult;
    const isDocumentedTestResponse =
      result.metadata?.result_with_testing_key === true;
    const hostnameMatches =
      isDocumentedTestResponse ||
      !env.TURNSTILE_EXPECTED_HOSTNAME ||
      result.hostname === env.TURNSTILE_EXPECTED_HOSTNAME;
    const actionMatches =
      isDocumentedTestResponse || result.action === 'contact';
    const isValid =
      result.success === true &&
      actionMatches &&
      hostnameMatches;

    if (!isValid) {
      console.warn('Turnstile verification failed', {
        action: result.action ?? 'missing',
        errorCodes: result['error-codes'] ?? [],
        hostname: result.hostname ?? 'missing',
        testResponse: isDocumentedTestResponse
      });
    }

    return isValid;
  } catch (error) {
    const name = error instanceof Error ? error.name : 'UnknownError';
    const message = error instanceof Error ? error.message : 'Unknown failure';
    console.warn('Turnstile verification request failed', { name, message });
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

  const contentLength = Number(request.headers.get('Content-Length') ?? 0);

  if (
    Number.isFinite(contentLength) &&
    contentLength > MAX_REQUEST_BYTES
  ) {
    return jsonResponse(413, { ok: false, code: 'request_too_large' });
  }

  let formData: FormData;

  try {
    formData = await request.formData();
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

  if (
    !env.TURNSTILE_SECRET_KEY ||
    !env.CONTACT_DESTINATION_EMAIL ||
    !env.CONTACT_FROM_EMAIL ||
    !env.EMAIL
  ) {
    return jsonResponse(503, { ok: false, code: 'service_unavailable' });
  }

  const dependencies: ContactDependencies = {
    fetch: overrides.fetch ?? ((input, init) => fetch(input, init)),
    now: overrides.now ?? (() => new Date()),
    createId: overrides.createId ?? (() => crypto.randomUUID())
  };
  const turnstileIsValid = await verifyTurnstile(
    validation.submission,
    request,
    env,
    dependencies
  );

  if (!turnstileIsValid) {
    return jsonResponse(400, { ok: false, code: 'verification_failed' });
  }

  try {
    await env.EMAIL.send({
      to: env.CONTACT_DESTINATION_EMAIL,
      from: {
        email: env.CONTACT_FROM_EMAIL,
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
