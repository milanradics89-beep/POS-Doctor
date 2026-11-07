export type RequestPolicy = { timeoutMs?: number; attempts?: number; baseDelayMs?: number };

type SessionState = { token: string; expiresAt: number };
const sessionStates = new Map<string, SessionState>();
const sessionPromises = new Map<string, Promise<SessionState | null>>();

// Shared bootstrap has its own cap; the first caller's shorter deadline must not cancel other waiters.
const SESSION_BOOTSTRAP_TIMEOUT_MS = 30_000;

const responseSignalCleanups = new WeakMap<Response, () => void>();

function combineAbortSignals(
  externalSignal: AbortSignal | null | undefined,
  internalSignal: AbortSignal,
): { signal: AbortSignal; cleanup: () => void } {
  if (!externalSignal) return { signal: internalSignal, cleanup: () => undefined };

  const combined = new AbortController();
  const abort = () => {
    if (!combined.signal.aborted) combined.abort();
  };
  if (externalSignal.aborted) abort();
  else externalSignal.addEventListener('abort', abort, { once: true });
  if (internalSignal.aborted) abort();
  else internalSignal.addEventListener('abort', abort, { once: true });

  return {
    signal: combined.signal,
    cleanup: () => {
      externalSignal.removeEventListener('abort', abort);
      internalSignal.removeEventListener('abort', abort);
    },
  };
}

function releaseResponseSignal(response: Response): void {
  const cleanup = responseSignalCleanups.get(response);
  if (!cleanup) return;
  responseSignalCleanups.delete(response);
  cleanup();
}

async function discardResponse(response: Response): Promise<void> {
  try {
    await response.body?.cancel();
  } catch {
    // A timed-out or already-consumed response may reject cancellation.
  } finally {
    releaseResponseSignal(response);
  }
}

function normalizedTimeoutMs(policy: RequestPolicy): number {
  return Number.isFinite(policy.timeoutMs)
    ? Math.min(120_000, Math.max(1_000, policy.timeoutMs!))
    : 30_000;
}

function requestUrl(input: RequestInfo | URL): URL | null {
  try {
    return new URL(typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url);
  } catch {
    return null;
  }
}

function sessionAuthEligible(input: RequestInfo | URL, init: RequestInit): URL | null {
  const request = typeof Request !== 'undefined' && input instanceof Request ? input : null;
  // Fetch replaces Request.headers when init.headers is supplied; inspect the
  // effective outgoing headers rather than credentials that will be discarded.
  const headers = request && init.headers === undefined
    ? new Headers(request.headers)
    : new Headers(init.headers);
  const method = (init.method ?? request?.method ?? 'GET').toUpperCase();

  if (headers.get('X-API-Key')?.trim() || headers.get('Authorization')?.trim() || method === 'OPTIONS') {
    return null;
  }

  const url = requestUrl(input);
  if (!url || !url.pathname.startsWith('/v1/') || url.pathname === '/v1/session') return null;
  return url;
}

function abortError(): Error {
  const error = new Error('The operation was aborted.');
  error.name = 'AbortError';
  return error;
}

// Make retry backoff cancellable so an offline or unmounted client does not
// retain a timer or issue another request after its caller has aborted.
function waitForRetry(delayMs: number, signal?: AbortSignal | null): Promise<void> {
  if (signal?.aborted) return Promise.reject(abortError());

  return new Promise<void>((resolve, reject) => {
    let timer: ReturnType<typeof setTimeout>;
    const cleanup = () => signal?.removeEventListener('abort', onAbort);
    const onAbort = () => {
      clearTimeout(timer);
      cleanup();
      reject(abortError());
    };

    timer = setTimeout(() => {
      cleanup();
      resolve();
    }, delayMs);
    signal?.addEventListener('abort', onAbort, { once: true });
    if (signal?.aborted) onAbort();
  });
}

// Wait for a shared session bootstrap without letting one caller's cancellation
// abort the bootstrap needed by other requests using the same API origin.
function runWithAbort<T>(operation: () => Promise<T>, signal?: AbortSignal | null): Promise<T> {
  if (!signal) return operation();
  if (signal.aborted) return Promise.reject(abortError());

  const promise = operation();
  return new Promise<T>((resolve, reject) => {
    let settled = false;
    const cleanup = () => signal.removeEventListener('abort', onAbort);
    const settle = (callback: () => void) => {
      if (settled) return;
      settled = true;
      cleanup();
      callback();
    };
    const onAbort = () => settle(() => reject(abortError()));

    signal.addEventListener('abort', onAbort, { once: true });
    promise.then(
      value => settle(() => resolve(value)),
      error => settle(() => reject(error)),
    );
    if (signal.aborted) onAbort();
  });
}


async function obtainSession(url: URL, forceRefresh = false): Promise<SessionState | null> {
  const now = Date.now();
  const cached = sessionStates.get(url.origin);
  if (!forceRefresh && cached && cached.expiresAt > now + 30_000) return cached;

  const existing = sessionPromises.get(url.origin);
  if (existing) return existing;

  const pending = Promise.resolve().then(async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), SESSION_BOOTSTRAP_TIMEOUT_MS);
    try {
      const response = await fetch(new URL('/v1/session', url.origin), {
        method: 'POST',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });
      if (!response.ok) return null;
      const payload: unknown = await response.json();
      if (!payload || typeof payload !== 'object') return null;
      const data = payload as { accessToken?: unknown; expiresAt?: unknown };
      if (typeof data.accessToken !== 'string' || typeof data.expiresAt !== 'number') return null;
      const session = { token: data.accessToken, expiresAt: data.expiresAt * 1000 };
      sessionStates.set(url.origin, session);
      return session;
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
      if (sessionPromises.get(url.origin) === pending) sessionPromises.delete(url.origin);
    }
  });

  sessionPromises.set(url.origin, pending);
  return pending;
}

function withSessionHeader(input: RequestInfo | URL, init: RequestInit, token: string): RequestInit {
  const request = typeof Request !== 'undefined' && input instanceof Request ? input : null;
  // When init.headers is omitted, Fetch inherits the Request headers. Preserve
  // them while adding the session token instead of replacing them with a
  // one-header object. Explicit init.headers still replaces Request headers.
  const headers = new Headers(init.headers ?? request?.headers);
  headers.set('Authorization', `Bearer ${token}`);
  return { ...init, headers };
}

export async function fetchWithPolicy(input: RequestInfo | URL, init: RequestInit = {}, policy: RequestPolicy = {}): Promise<Response> {
  const timeoutMs = normalizedTimeoutMs(policy);
  const attempts = Number.isInteger(policy.attempts) ? Math.min(4, Math.max(1, policy.attempts!)) : 2;
  const baseDelayMs = Number.isFinite(policy.baseDelayMs) ? Math.min(5_000, Math.max(0, policy.baseDelayMs!)) : 500;
  const requestSignal = init.signal ?? (typeof Request !== 'undefined' && input instanceof Request ? input.signal : undefined);
  const requestMethod = typeof Request !== 'undefined' && input instanceof Request ? input.method : 'GET';
  const method = (init.method ?? requestMethod).toUpperCase();
  // Retrying a POST after a timeout/5xx can duplicate AI work or other side effects.
  // No current backend endpoint enforces idempotency keys, so only replay safe methods.
  const retryAllowed = ['GET', 'HEAD', 'OPTIONS'].includes(method);
  const sessionUrl = sessionAuthEligible(input, init);
  // Request bodies are one-shot. Preserve an untouched copy before the first
  // fetch so a 401 session refresh can replay the same body exactly once.
  const requestForSessionRetry = sessionUrl && typeof Request !== 'undefined' && input instanceof Request
    ? input.clone()
    : null;
  let lastError: unknown;

  for (let attempt = 0; attempt < attempts; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const linkedSignal = combineAbortSignals(requestSignal, controller.signal);
    let preserveSignalCleanup = false;
    try {
      let requestInit = init;
      if (sessionUrl) {
        const session = await runWithAbort(() => obtainSession(sessionUrl), linkedSignal.signal);
        if (session) requestInit = withSessionHeader(input, init, session.token);
      }
      const response = await fetch(input, { ...requestInit, signal: linkedSignal.signal });

      if (response.status === 401 && sessionUrl) {
        sessionStates.delete(sessionUrl.origin);
        const refreshed = await runWithAbort(() => obtainSession(sessionUrl, true), linkedSignal.signal);
        if (refreshed) {
          await discardResponse(response);
          const retryController = new AbortController();
          const retryTimer = setTimeout(() => retryController.abort(), timeoutMs);
          const retrySignal = combineAbortSignals(requestSignal, retryController.signal);
          let preserveRetryCleanup = false;
          try {
            const retryResponse = await fetch(requestForSessionRetry ?? input, { ...withSessionHeader(input, init, refreshed.token), signal: retrySignal.signal });
            if (retryResponse.body) {
              responseSignalCleanups.set(retryResponse, retrySignal.cleanup);
              preserveRetryCleanup = true;
            }
            return retryResponse;
          } finally {
            clearTimeout(retryTimer);
            if (!preserveRetryCleanup) retrySignal.cleanup();
          }
        }
      }

      if (response.ok || response.status < 500 || !retryAllowed || attempt === attempts - 1) {
        if (response.body) {
          responseSignalCleanups.set(response, linkedSignal.cleanup);
          preserveSignalCleanup = true;
        }
        return response;
      }
      lastError = new Error(`Transient API error (${response.status}).`);
      await discardResponse(response);
    } catch (error) {
      lastError = error;
      if (!retryAllowed || attempt === attempts - 1 || requestSignal?.aborted) break;
    } finally {
      clearTimeout(timer);
      if (!preserveSignalCleanup) linkedSignal.cleanup();
    }
    await waitForRetry(baseDelayMs * 2 ** attempt, requestSignal);
  }
  throw lastError instanceof Error ? lastError : new Error('Intelligence request failed.');
}

export async function fetchJsonWithPolicy(
  input: RequestInfo | URL,
  init: RequestInit = {},
  policy: RequestPolicy = {},
  options: { requireJsonContentType?: boolean } = {},
): Promise<{ response: Response; payload?: unknown; parseError?: unknown }> {
  const timeoutMs = normalizedTimeoutMs(policy);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const requestSignal = init.signal ?? (typeof Request !== 'undefined' && input instanceof Request ? input.signal : undefined);
  const linkedSignal = combineAbortSignals(requestSignal, controller.signal);
  try {
    const response = await fetchWithPolicy(input, { ...init, signal: linkedSignal.signal }, policy);
    const hasJsonContentType = response.headers.get('content-type')?.includes('application/json') ?? false;
    if (!response.ok || (options.requireJsonContentType && !hasJsonContentType)) {
      await discardResponse(response);
      return { response };
    }

    try {
      return { response, payload: await response.json() };
    } catch (error) {
      if (error instanceof SyntaxError) return { response, parseError: error };
      throw error;
    } finally {
      releaseResponseSignal(response);
    }
  } finally {
    clearTimeout(timer);
    linkedSignal.cleanup();
  }
}
