export type RequestPolicy = { timeoutMs?: number; attempts?: number; baseDelayMs?: number };

type SessionState = { token: string; expiresAt: number };
let sessionState: SessionState | null = null;
let sessionPromise: Promise<SessionState | null> | null = null;

function requestUrl(input: RequestInfo | URL): URL | null {
  try {
    return new URL(typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url);
  } catch {
    return null;
  }
}

function hasHeader(headers: HeadersInit | undefined, name: string): boolean {
  if (!headers) return false;
  return Boolean(new Headers(headers).get(name)?.trim());
}

function sessionAuthEligible(input: RequestInfo | URL, init: RequestInit): URL | null {
  if (hasHeader(init.headers, 'X-API-Key') || hasHeader(init.headers, 'Authorization') || (init.method || 'GET').toUpperCase() === 'OPTIONS') return null;
  const url = requestUrl(input);
  if (!url || !url.pathname.startsWith('/v1/') || url.pathname === '/v1/session') return null;
  return url;
}

async function obtainSession(url: URL, forceRefresh = false, timeoutMs = 10_000): Promise<SessionState | null> {
  const now = Date.now();
  if (!forceRefresh && sessionState && sessionState.expiresAt > now + 30_000) return sessionState;
  if (sessionPromise) return sessionPromise;

  sessionPromise = (async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), Math.min(30_000, Math.max(1_000, timeoutMs)));
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
      sessionState = { token: data.accessToken, expiresAt: data.expiresAt * 1000 };
      return sessionState;
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
      sessionPromise = null;
    }
  })();

  return sessionPromise;
}

function withSessionHeader(init: RequestInit, token: string): RequestInit {
  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${token}`);
  return { ...init, headers };
}

export async function fetchWithPolicy(input: RequestInfo | URL, init: RequestInit = {}, policy: RequestPolicy = {}): Promise<Response> {
  const timeoutMs = Number.isFinite(policy.timeoutMs) ? Math.min(120_000, Math.max(1_000, policy.timeoutMs!)) : 30_000;
  const attempts = Number.isInteger(policy.attempts) ? Math.min(4, Math.max(1, policy.attempts!)) : 2;
  const baseDelayMs = Number.isFinite(policy.baseDelayMs) ? Math.min(5_000, Math.max(0, policy.baseDelayMs!)) : 500;
  const method = (init.method ?? 'GET').toUpperCase();
  // Retrying a POST after a timeout/5xx can duplicate AI work or other side effects.
  // Only replay safe HTTP methods unless the caller supplies an idempotency key.
  const retryAllowed = ['GET', 'HEAD', 'OPTIONS'].includes(method) || hasHeader(init.headers, 'Idempotency-Key');
  const sessionUrl = sessionAuthEligible(input, init);
  let lastError: unknown;

  for (let attempt = 0; attempt < attempts; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      let requestInit = init;
      if (sessionUrl) {
        const session = await obtainSession(sessionUrl, false, timeoutMs);
        if (session) requestInit = withSessionHeader(init, session.token);
      }
      const response = await fetch(input, { ...requestInit, signal: controller.signal });

      if (response.status === 401 && sessionUrl) {
        sessionState = null;
        const refreshed = await obtainSession(sessionUrl, true, timeoutMs);
        if (refreshed) {
          const retryController = new AbortController();
          const retryTimer = setTimeout(() => retryController.abort(), timeoutMs);
          try {
            return await fetch(input, { ...withSessionHeader(init, refreshed.token), signal: retryController.signal });
          } finally {
            clearTimeout(retryTimer);
          }
        }
      }

      if (response.ok || response.status < 500 || !retryAllowed || attempt === attempts - 1) return response;
      lastError = new Error(`Transient API error (${response.status}).`);
    } catch (error) {
      lastError = error;
      if (!retryAllowed || attempt === attempts - 1) break;
    } finally { clearTimeout(timer); }
    await new Promise(resolve => setTimeout(resolve, baseDelayMs * 2 ** attempt));
  }
  throw lastError instanceof Error ? lastError : new Error('Intelligence request failed.');
}
