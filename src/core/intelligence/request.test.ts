import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchJsonWithPolicy, fetchWithPolicy } from './request';

describe('fetchWithPolicy', () => {
  it('aborts a Request while waiting for shared session bootstrap without cancelling other callers', async () => {
    let resolveBootstrap!: (response: Response) => void;
    const bootstrap = new Promise<Response>((resolve) => {
      resolveBootstrap = resolve;
    });
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      if (String(input).endsWith('/v1/session')) return bootstrap;
      return new Response('{}', { status: 200 });
    });
    const controller = new AbortController();
    const request = new Request('https://abort-bootstrap.example.test/v1/action', {
      signal: controller.signal,
    });

    const cancelled = fetchWithPolicy(request, {}, { attempts: 1 });
    const active = fetchWithPolicy('https://abort-bootstrap.example.test/v1/action', {}, { attempts: 1 });
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    controller.abort();
    await expect(cancelled).rejects.toMatchObject({ name: 'AbortError' });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    resolveBootstrap(new Response(JSON.stringify({
      accessToken: 'shared-session',
      expiresAt: Math.floor(Date.now() / 1000) + 3600,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }));

    const response = await active;
    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(new Headers(fetchMock.mock.calls[1][1]?.headers).get('Authorization')).toBe('Bearer shared-session');
  });

  it('aborts promptly while waiting for a 401 session refresh', async () => {
    let sessionCalls = 0;
    let resolveRefresh!: (response: Response) => void;
    const refresh = new Promise<Response>((resolve) => {
      resolveRefresh = resolve;
    });
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      if (String(input).endsWith('/v1/session')) {
        sessionCalls += 1;
        if (sessionCalls === 1) {
          return new Response(JSON.stringify({
            accessToken: 'old-session',
            expiresAt: Math.floor(Date.now() / 1000) + 3600,
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        return refresh;
      }
      return new Response('{}', { status: 401 });
    });
    const controller = new AbortController();
    const pending = fetchWithPolicy(
      'https://refresh-abort.example.test/v1/action',
      { signal: controller.signal },
      { attempts: 1 },
    );

    await vi.waitFor(() => expect(sessionCalls).toBe(2));
    controller.abort();
    await expect(pending).rejects.toMatchObject({ name: 'AbortError' });
    expect(fetchMock).toHaveBeenCalledTimes(3);

    resolveRefresh(new Response(JSON.stringify({
      accessToken: 'new-session',
      expiresAt: Math.floor(Date.now() / 1000) + 3600,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }));
  });

  it('keeps the request deadline active while reading the response body', async () => {
    vi.useFakeTimers();
    try {
      let markBodyReadStarted!: () => void;
      const bodyReadStarted = new Promise<void>((resolve) => {
        markBodyReadStarted = resolve;
      });
      const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(async (_input, init) => {
        const signal = init?.signal as AbortSignal;
        return {
          ok: true,
          status: 200,
          headers: new Headers({ 'Content-Type': 'application/json' }),
          body: { cancel: vi.fn(async () => undefined) },
          json: vi.fn(() => {
            markBodyReadStarted();
            return new Promise<never>((_resolve, reject) => {
              const abort = () => reject(new DOMException('The operation was aborted.', 'AbortError'));
              if (signal.aborted) abort();
              else signal.addEventListener('abort', abort, { once: true });
            });
          }),
        } as unknown as Response;
      });

      const pending = fetchJsonWithPolicy(
        'https://example.test/analyze',
        {},
        { attempts: 1, timeoutMs: 1_000 },
      );
      // Attach the rejection observer before advancing the timeout. Otherwise
      // Vitest sees the expected abort as an unhandled rejection for one tick.
      const rejection = expect(pending).rejects.toMatchObject({ name: 'AbortError' });
      await bodyReadStarted;
      await vi.advanceTimersByTimeAsync(1_000);

      await rejection;
      expect(fetchMock).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });

  it('returns the parsed JSON payload after a successful body read', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    const result = await fetchJsonWithPolicy(
      'https://example.test/analyze',
      {},
      { attempts: 1 },
    );

    expect(result.response.status).toBe(200);
    expect(result.payload).toEqual({ ok: true });
    expect(result.parseError).toBeUndefined();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns successful responses without retrying', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}', { status: 200 }));

    const response = await fetchWithPolicy('https://example.test', {}, { attempts: 3, baseDelayMs: 0 });

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('does not retry client errors', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}', { status: 400 }));

    const response = await fetchWithPolicy('https://example.test', {}, { attempts: 3, baseDelayMs: 0 });

    expect(response.status).toBe(400);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('retries transient server errors and returns the next successful response', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response('{}', { status: 503 }))
      .mockResolvedValueOnce(new Response('{}', { status: 200 }));

    const response = await fetchWithPolicy('https://example.test', {}, { attempts: 2, baseDelayMs: 0 });

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('retries a network failure and preserves the final error', async () => {
    const error = new Error('network unavailable');
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockRejectedValueOnce(error)
      .mockResolvedValueOnce(new Response('{}', { status: 200 }));

    const response = await fetchWithPolicy('https://example.test', {}, { attempts: 2, baseDelayMs: 0 });

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('aborts during retry backoff and does not issue another request', async () => {
    vi.useFakeTimers();
    try {
      const controller = new AbortController();
      const fetchMock = vi.spyOn(globalThis, 'fetch')
        .mockResolvedValue(new Response('{}', { status: 503 }));
      const pending = fetchWithPolicy(
        'https://example.test/retry-abort',
        { signal: controller.signal },
        { attempts: 3, baseDelayMs: 1_000 },
      );
      const rejection = pending.then(
        () => { throw new Error('Expected request to abort during retry backoff.'); },
        error => error,
      );

      // The request deadline is cleared after the 503; only retry backoff remains.
      for (let i = 0; i < 20 && vi.getTimerCount() < 1; i += 1) {
        await Promise.resolve();
      }
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(vi.getTimerCount()).toBe(1);

      controller.abort();
      const error = await rejection;
      expect(error).toMatchObject({ name: 'AbortError' });

      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not retry a POST after a server error without an idempotency key', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 503 }));

    const response = await fetchWithPolicy('https://example.test/v1/analyze', {
      method: 'POST',
      headers: { 'X-API-Key': 'test-key' },
      body: JSON.stringify({ prompt: 'analyze once' }),
    }, { attempts: 3, baseDelayMs: 0 });

    expect(response.status).toBe(503);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('does not retry a POST merely because an idempotency header is present', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 503 }));

    const response = await fetchWithPolicy('https://example.test/v1/action', {
      method: 'POST',
      headers: {
        'X-API-Key': 'test-key',
        'Idempotency-Key': 'action-123',
      },
      body: JSON.stringify({ action: 'save' }),
    }, { attempts: 2, baseDelayMs: 0 });

    expect(response.status).toBe(503);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('detects non-idempotent methods from a Request object', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 503 }));
    const request = new Request('https://example.test/v1/action', {
      method: 'POST',
      headers: { 'X-API-Key': 'test-key' },
      body: JSON.stringify({ action: 'save' }),
    });

    const response = await fetchWithPolicy(request, {}, { attempts: 2, baseDelayMs: 0 });

    expect(response.status).toBe(503);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });


  it('uses Request headers and method when deciding whether session bootstrap is needed', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 503 }));
    const request = new Request('https://example.test/v1/action', {
      method: 'POST',
      headers: { 'X-API-Key': 'test-key' },
      body: JSON.stringify({ action: 'save' }),
    });

    const response = await fetchWithPolicy(request, {}, { attempts: 3, baseDelayMs: 0 });

    expect(response.status).toBe(503);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe(request);
  });

  it('uses init headers for session eligibility when supplied', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 503 }));
    const request = new Request('https://example.test/v1/action', {
      method: 'POST',
      body: JSON.stringify({ action: 'save' }),
    });

    const response = await fetchWithPolicy(request, {
      headers: { Authorization: 'Bearer explicit-token' },
    }, { attempts: 3, baseDelayMs: 0 });

    expect(response.status).toBe(503);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('preserves Request headers when adding session auth without init headers', async () => {
    const expiresAt = Math.floor(Date.now() / 1000) + 3600;
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(JSON.stringify({
        accessToken: 'session-token',
        expiresAt,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }))
      .mockResolvedValueOnce(new Response('{}', { status: 200 }));
    const request = new Request('https://example.test/v1/action', {
      headers: {
        Accept: 'application/json',
        'X-Trace-ID': 'trace-123',
      },
    });

    const response = await fetchWithPolicy(request, {}, { attempts: 1, baseDelayMs: 0 });

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(String(fetchMock.mock.calls[0][0])).toBe('https://example.test/v1/session');
    const outgoingHeaders = new Headers(fetchMock.mock.calls[1][1]?.headers);
    expect(outgoingHeaders.get('Authorization')).toBe('Bearer session-token');
    expect(outgoingHeaders.get('Accept')).toBe('application/json');
    expect(outgoingHeaders.get('X-Trace-ID')).toBe('trace-123');
  });

  it('does not trust Request credentials when init.headers replaces them', async () => {
    const expiresAt = Math.floor(Date.now() / 1000) + 3600;
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(JSON.stringify({
        accessToken: 'session-token',
        expiresAt,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }))
      .mockResolvedValueOnce(new Response('{}', { status: 503 }));
    const request = new Request('https://another.example.test/v1/action', {
      method: 'POST',
      headers: { Authorization: 'Bearer request-token' },
      body: JSON.stringify({ action: 'save' }),
    });

    const response = await fetchWithPolicy(request, {
      headers: { 'Content-Type': 'application/json' },
    }, { attempts: 3, baseDelayMs: 0 });

    expect(response.status).toBe(503);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(String(fetchMock.mock.calls[0][0])).toBe('https://another.example.test/v1/session');
    expect(fetchMock.mock.calls[1][0]).toBe(request);
    const outgoingHeaders = new Headers(fetchMock.mock.calls[1][1]?.headers);
    expect(outgoingHeaders.get('Authorization')).toBe('Bearer session-token');
    expect(outgoingHeaders.get('Content-Type')).toBe('application/json');
  });


  it('replays a Request body from its untouched clone after a 401 session refresh', async () => {
    const expiresAt = Math.floor(Date.now() / 1000) + 3600;
    let sessionCalls = 0;
    let actionCalls = 0;
    const actionBodies: string[] = [];
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      if (String(input).endsWith('/v1/session')) {
        sessionCalls += 1;
        return new Response(JSON.stringify({
          accessToken: sessionCalls === 1 ? 'old-session' : 'new-session',
          expiresAt,
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (!(input instanceof Request)) {
        throw new Error('Expected the original Request or its retry clone.');
      }
      actionCalls += 1;
      actionBodies.push(await input.text());
      return new Response('{}', { status: actionCalls === 1 ? 401 : 200 });
    });

    const expectedBody = JSON.stringify({ action: 'preserve-this-body' });
    const request = new Request('https://request-body-refresh.example.test/v1/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: expectedBody,
    });

    const response = await fetchWithPolicy(request, {}, { attempts: 1, baseDelayMs: 0 });

    expect(response.status).toBe(200);
    expect(sessionCalls).toBe(2);
    expect(actionCalls).toBe(2);
    expect(actionBodies).toEqual([expectedBody, expectedBody]);
    expect(fetchMock).toHaveBeenCalledTimes(4);
    expect(fetchMock.mock.calls[1][0]).toBe(request);
    expect(fetchMock.mock.calls[3][0]).not.toBe(request);
    expect(new Headers(fetchMock.mock.calls[3][1]?.headers).get('Authorization')).toBe('Bearer new-session');
  });

});
