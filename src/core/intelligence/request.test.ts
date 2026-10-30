import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchWithPolicy } from './request';

describe('fetchWithPolicy', () => {
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

  it('does not retry a POST after a server error without an idempotency key', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 503 }));

    const response = await fetchWithPolicy('https://example.test/analyze', {
      method: 'POST',
      body: JSON.stringify({ prompt: 'analyze once' }),
    }, { attempts: 3, baseDelayMs: 0 });

    expect(response.status).toBe(503);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('does not retry a POST merely because an idempotency header is present', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 503 }));

    const response = await fetchWithPolicy('https://example.test/action', {
      method: 'POST',
      headers: { 'Idempotency-Key': 'action-123' },
      body: JSON.stringify({ action: 'save' }),
    }, { attempts: 2, baseDelayMs: 0 });

    expect(response.status).toBe(503);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('detects non-idempotent methods from a Request object', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 503 }));
    const request = new Request('https://example.test/action', {
      method: 'POST',
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

});
