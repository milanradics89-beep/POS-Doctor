import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('attestationClient session cache', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubGlobal('fetch', vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      const accessToken = url.includes('api-a.example') ? 'token-a' : 'token-b';
      return new Response(JSON.stringify({
        accessToken,
        expiresAt: Math.floor(Date.now() / 1000) + 600,
        expiresIn: 600,
        tokenType: 'Bearer',
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('keeps cached session tokens scoped to their normalized API base URL', async () => {
    const { getSessionToken } = await import('./attestationClient');

    const tokenA = await getSessionToken('https://api-a.example/');
    const tokenB = await getSessionToken('https://api-b.example');
    const tokenAAgain = await getSessionToken('https://api-a.example');

    expect(tokenA).toBe('token-a');
    expect(tokenB).toBe('token-b');
    expect(tokenAAgain).toBe('token-a');
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenNthCalledWith(1, 'https://api-a.example/v1/session', expect.any(Object));
    expect(fetch).toHaveBeenNthCalledWith(2, 'https://api-b.example/v1/session', expect.any(Object));
  });

  it('does not share an in-flight session request across different API base URLs', async () => {
    const { getSessionToken } = await import('./attestationClient');

    const [tokenA, tokenB] = await Promise.all([
      getSessionToken('https://api-a.example'),
      getSessionToken('https://api-b.example'),
    ]);

    expect(tokenA).toBe('token-a');
    expect(tokenB).toBe('token-b');
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
