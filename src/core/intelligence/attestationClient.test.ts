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

  it('rejects an in-flight token invalidated by clearSessionToken', async () => {
    let resolveFirst!: (response: Response) => void;
    let callCount = 0;
    const responseFor = (accessToken: string) => new Response(JSON.stringify({
      accessToken,
      expiresAt: Math.floor(Date.now() / 1000) + 600,
      expiresIn: 600,
      tokenType: 'Bearer',
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      callCount += 1;
      if (callCount === 1) {
        return new Promise<Response>((resolve) => {
          resolveFirst = resolve;
        });
      }
      return Promise.resolve(responseFor('token-fresh'));
    });
    vi.stubGlobal('fetch', fetchMock);

    const { getSessionToken, clearSessionToken } = await import('./attestationClient');
    const staleRequest = getSessionToken('https://api-a.example');

    expect(resolveFirst).toBeDefined();
    clearSessionToken();

    const freshToken = await getSessionToken('https://api-a.example');
    expect(freshToken).toBe('token-fresh');

    resolveFirst(responseFor('token-stale'));
    await expect(staleRequest).rejects.toThrow('USEIT session request was invalidated before completion.');
    expect(await getSessionToken('https://api-a.example')).toBe('token-fresh');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
