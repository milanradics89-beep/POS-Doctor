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
});
