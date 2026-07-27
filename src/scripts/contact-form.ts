export const CONTACT_REQUEST_TIMEOUT_MS = 15_000;

export type ContactStatusState = '' | 'success' | 'error';
export type ContactSubmissionOutcome = 'success' | 'timeout' | 'failure';

export interface ContactFormMessages {
  success: string;
  timeout: string;
  failure: string;
}

export interface ContactFormUi {
  setBusy(isBusy: boolean): void;
  setStatus(message: string, state?: ContactStatusState): void;
  resetForm(): void;
  resetTurnstile(): void;
  focusStatus(): void;
}

export interface ContactSubmissionOptions {
  action: string;
  formData: FormData;
  messages: ContactFormMessages;
  ui: ContactFormUi;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}

interface ContactResponse {
  ok?: boolean;
}

declare global {
  interface Window {
    turnstile?: {
      reset(): void;
    };
  }
}

/**
 * Submit one contact request and restore the UI for every terminal outcome.
 *
 * A client timeout means that the result is unknown: the Worker may have
 * accepted the request before the browser stopped waiting. The caller must
 * therefore use the dedicated, non-definitive timeout message.
 */
export async function submitContactForm({
  action,
  formData,
  messages,
  ui,
  fetchImpl = fetch,
  timeoutMs = CONTACT_REQUEST_TIMEOUT_MS
}: ContactSubmissionOptions): Promise<ContactSubmissionOutcome> {
  const controller = new AbortController();
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let didTimeOut = false;

  ui.setBusy(true);
  ui.setStatus('');

  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      didTimeOut = true;
      controller.abort();
      reject(new DOMException('Contact request timed out', 'AbortError'));
    }, timeoutMs);
  });

  try {
    const response = await Promise.race([
      fetchImpl(action, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formData,
        signal: controller.signal
      }),
      timeout
    ]);
    const result: ContactResponse = await response
      .json()
      .catch(() => ({ ok: false }));

    if (!response.ok || result.ok !== true) {
      throw new Error('Contact request failed');
    }

    ui.resetForm();
    ui.resetTurnstile();
    ui.setStatus(messages.success, 'success');
    ui.focusStatus();
    return 'success';
  } catch {
    ui.resetTurnstile();
    ui.setStatus(
      didTimeOut ? messages.timeout : messages.failure,
      'error'
    );
    ui.focusStatus();
    return didTimeOut ? 'timeout' : 'failure';
  } finally {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    ui.setBusy(false);
  }
}

export function initialiseContactForm(): void {
  const form = document.querySelector('#contact-form');

  if (!(form instanceof HTMLFormElement) || form.dataset.enhanced === 'true') {
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  const submitLabel = form.querySelector('[data-contact-submit-label]');
  const status = form.querySelector('#contact-form-status');
  const source = form.querySelector('[data-contact-source]');

  if (
    !(submitButton instanceof HTMLButtonElement) ||
    !(submitLabel instanceof HTMLElement) ||
    !(status instanceof HTMLElement)
  ) {
    return;
  }

  form.dataset.enhanced = 'true';

  if (source instanceof HTMLInputElement) {
    source.value = window.location.href;
  }

  const setStatus = (
    message: string,
    state: ContactStatusState = '',
    turnstileIssue = false
  ) => {
    status.textContent = message;
    status.dataset.state = state;

    if (turnstileIssue) {
      status.dataset.turnstileIssue = 'true';
    } else {
      delete status.dataset.turnstileIssue;
    }
  };

  const resetTurnstile = () => {
    if (typeof window.turnstile?.reset === 'function') {
      window.turnstile.reset();
    }
  };

  let submissionInProgress = false;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (submissionInProgress || !form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);
    const turnstileToken = formData.get('cf-turnstile-response');

    if (typeof turnstileToken !== 'string' || turnstileToken.length === 0) {
      setStatus(form.dataset.verificationMessage || '', 'error', true);
      return;
    }

    submissionInProgress = true;

    await submitContactForm({
      action: form.action,
      formData,
      messages: {
        success: form.dataset.successMessage || '',
        timeout: form.dataset.timeoutMessage || '',
        failure: form.dataset.failureMessage || ''
      },
      ui: {
        setBusy(isBusy) {
          submitButton.disabled = isBusy;
          form.toggleAttribute('aria-busy', isBusy);
          submitLabel.textContent = isBusy
            ? form.dataset.sendingLabel || ''
            : form.dataset.submitLabel || '';
        },
        setStatus,
        resetForm: () => form.reset(),
        resetTurnstile,
        focusStatus: () => status.focus({ preventScroll: true })
      }
    });

    submissionInProgress = false;
  });
}
