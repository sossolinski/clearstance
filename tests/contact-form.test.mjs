import assert from 'node:assert/strict';
import test from 'node:test';
import { submitContactForm } from '../src/scripts/contact-form.ts';

const messages = {
  success: 'success',
  timeout: 'unknown outcome',
  failure: 'failure'
};

function createUi() {
  const state = {
    busy: [],
    statuses: [],
    formResets: 0,
    turnstileResets: 0,
    statusFocuses: 0
  };

  return {
    state,
    adapter: {
      setBusy(value) {
        state.busy.push(value);
      },
      setStatus(message, status = '') {
        state.statuses.push({ message, status });
      },
      resetForm() {
        state.formResets += 1;
      },
      resetTurnstile() {
        state.turnstileResets += 1;
      },
      focusStatus() {
        state.statusFocuses += 1;
      }
    }
  };
}

function formData() {
  const data = new FormData();
  data.set('name', 'Test');
  data.set('cf-turnstile-response', 'token');
  return data;
}

function successResponse() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

function pendingFetch(_input, init) {
  return new Promise((_, reject) => {
    init.signal.addEventListener(
      'abort',
      () => reject(new DOMException('Aborted', 'AbortError')),
      { once: true }
    );
  });
}

test('restores the UI after a successful submission', async () => {
  const ui = createUi();
  const outcome = await submitContactForm({
    action: 'https://clearstance.pl/api/contact',
    formData: formData(),
    messages,
    ui: ui.adapter,
    fetchImpl: async () => successResponse(),
    timeoutMs: 50
  });

  assert.equal(outcome, 'success');
  assert.deepEqual(ui.state.busy, [true, false]);
  assert.deepEqual(ui.state.statuses.at(-1), {
    message: 'success',
    status: 'success'
  });
  assert.equal(ui.state.formResets, 1);
  assert.equal(ui.state.turnstileResets, 1);
  assert.equal(ui.state.statusFocuses, 1);
});

test('uses the non-definitive timeout message and restores retry state', async () => {
  const ui = createUi();
  const outcome = await submitContactForm({
    action: 'https://clearstance.pl/api/contact',
    formData: formData(),
    messages,
    ui: ui.adapter,
    fetchImpl: pendingFetch,
    timeoutMs: 5
  });

  assert.equal(outcome, 'timeout');
  assert.deepEqual(ui.state.busy, [true, false]);
  assert.deepEqual(ui.state.statuses.at(-1), {
    message: 'unknown outcome',
    status: 'error'
  });
  assert.equal(ui.state.formResets, 0);
  assert.equal(ui.state.turnstileResets, 1);
  assert.equal(ui.state.statusFocuses, 1);
});

test('handles a network failure and restores the UI', async () => {
  const ui = createUi();
  const outcome = await submitContactForm({
    action: 'https://clearstance.pl/api/contact',
    formData: formData(),
    messages,
    ui: ui.adapter,
    fetchImpl: async () => {
      throw new TypeError('Network unavailable');
    },
    timeoutMs: 50
  });

  assert.equal(outcome, 'failure');
  assert.deepEqual(ui.state.busy, [true, false]);
  assert.deepEqual(ui.state.statuses.at(-1), {
    message: 'failure',
    status: 'error'
  });
  assert.equal(ui.state.formResets, 0);
  assert.equal(ui.state.turnstileResets, 1);
});

test('a fresh submission can succeed after a timeout', async () => {
  const ui = createUi();
  let attempt = 0;
  const fetchImpl = async (input, init) => {
    attempt += 1;
    return attempt === 1
      ? pendingFetch(input, init)
      : successResponse();
  };

  const firstOutcome = await submitContactForm({
    action: 'https://clearstance.pl/api/contact',
    formData: formData(),
    messages,
    ui: ui.adapter,
    fetchImpl,
    timeoutMs: 5
  });
  const secondOutcome = await submitContactForm({
    action: 'https://clearstance.pl/api/contact',
    formData: formData(),
    messages,
    ui: ui.adapter,
    fetchImpl,
    timeoutMs: 50
  });

  assert.equal(firstOutcome, 'timeout');
  assert.equal(secondOutcome, 'success');
  assert.deepEqual(ui.state.busy, [true, false, true, false]);
  assert.equal(ui.state.formResets, 1);
  assert.equal(ui.state.turnstileResets, 2);
  assert.deepEqual(ui.state.statuses.at(-1), {
    message: 'success',
    status: 'success'
  });
});
