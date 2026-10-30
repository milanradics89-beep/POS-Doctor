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
    vi.doUnmock('../../../modules/useit-app-attest');
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
  it('returns an empty session only when session authentication is explicitly unconfigured', async () => {
    const fetchMock = vi.fn(async () => new Response(
      JSON.stringify({ detail: 'Session authentication is not configured.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    ));
    vi.stubGlobal('fetch', fetchMock);

    const { getSessionToken } = await import('./attestationClient');
    await expect(getSessionToken('https://api-a.example')).resolves.toBe('');

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('fails closed when session bootstrap returns a transient attestation storage outage', async () => {
    const fetchMock = vi.fn(async () => new Response(
      JSON.stringify({ detail: 'Attestation challenge service is temporarily unavailable.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    ));
    vi.stubGlobal('fetch', fetchMock);

    const { getSessionToken } = await import('./attestationClient');
    await expect(getSessionToken('https://api-a.example')).rejects.toThrow(
      'USEIT session bootstrap failed (503): Attestation challenge service is temporarily unavailable.',
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('retries the same Apple attestation after a transient fetch failure', async () => {
    const nativeModule = {
      isAvailable: vi.fn(() => true),
      isKeyAttested: vi.fn(() => false),
      markKeyAttested: vi.fn(),
      getOrCreateKeyId: vi.fn(async () => 'apple-key-id'),
      attest: vi.fn(async () => 'attestation-object'),
      generateAssertion: vi.fn(async () => 'assertion-object'),
    };
    vi.doMock('../../../modules/useit-app-attest', () => ({ default: nativeModule }));

    let challengeCount = 0;
    let enrollmentAttempts = 0;
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith('/v1/session/challenge')) {
        challengeCount += 1;
        return new Response(JSON.stringify({
          challenge: 'challenge-initial',
          provider: 'apple_app_attest',
          appId: 'TEAMID.com.useit.app',
          expiresAt: Math.floor(Date.now() / 1000) + 300,
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      const payload = JSON.parse(String(init?.body ?? '{}')) as Record<string, unknown>;
      if (!payload.provider) {
        return new Response(JSON.stringify({ detail: 'attestation_required' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      enrollmentAttempts += 1;
      if (enrollmentAttempts === 1) throw new TypeError('Network request failed');
      return new Response(JSON.stringify({
        accessToken: 'session-token',
        expiresAt: Math.floor(Date.now() / 1000) + 600,
        expiresIn: 600,
        tokenType: 'Bearer',
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    });
    vi.stubGlobal('fetch', fetchMock);

    const { getSessionToken } = await import('./attestationClient');
    await expect(getSessionToken('https://api-a.example')).resolves.toBe('session-token');

    expect(challengeCount).toBe(1);
    expect(enrollmentAttempts).toBe(2);
    expect(nativeModule.attest).toHaveBeenCalledTimes(1);
    expect(nativeModule.generateAssertion).not.toHaveBeenCalled();
    expect(nativeModule.markKeyAttested).toHaveBeenCalledWith('apple-key-id');
    expect(fetchMock).toHaveBeenCalledTimes(4);
  });

  it('does not persist Apple enrollment after network failures before server acceptance', async () => {
    const nativeModule = {
      isAvailable: vi.fn(() => true),
      isKeyAttested: vi.fn(() => false),
      markKeyAttested: vi.fn(),
      getOrCreateKeyId: vi.fn(async () => 'apple-key-id'),
      attest: vi.fn(async () => 'attestation-object'),
      generateAssertion: vi.fn(async () => 'assertion-object'),
    };
    vi.doMock('../../../modules/useit-app-attest', () => ({ default: nativeModule }));

    let challengeCount = 0;
    let enrollmentAttempts = 0;
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith('/v1/session/challenge')) {
        challengeCount += 1;
        return new Response(JSON.stringify({
          challenge: `challenge-${challengeCount}`,
          provider: 'apple_app_attest',
          appId: 'TEAMID.com.useit.app',
          expiresAt: Math.floor(Date.now() / 1000) + 300,
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      const payload = JSON.parse(String(init?.body ?? '{}')) as Record<string, unknown>;
      if (!payload.provider) {
        return new Response(JSON.stringify({ detail: 'attestation_required' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      enrollmentAttempts += 1;
      if (enrollmentAttempts <= 2) throw new TypeError('Network request failed');
      return new Response(JSON.stringify({
        accessToken: 'session-token-after-retry',
        expiresAt: Math.floor(Date.now() / 1000) + 600,
        expiresIn: 600,
        tokenType: 'Bearer',
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    });
    vi.stubGlobal('fetch', fetchMock);

    const { getSessionToken } = await import('./attestationClient');
    await expect(getSessionToken('https://api-a.example')).rejects.toThrow(
      'USEIT attestation request failed; retry session creation.',
    );

    expect(nativeModule.markKeyAttested).not.toHaveBeenCalled();
    expect(nativeModule.attest).toHaveBeenCalledTimes(1);
    expect(nativeModule.generateAssertion).not.toHaveBeenCalled();

    await expect(getSessionToken('https://api-a.example')).resolves.toBe('session-token-after-retry');

    expect(nativeModule.attest).toHaveBeenCalledTimes(2);
    expect(nativeModule.generateAssertion).not.toHaveBeenCalled();
    expect(nativeModule.markKeyAttested).toHaveBeenCalledTimes(1);
    expect(nativeModule.markKeyAttested).toHaveBeenCalledWith('apple-key-id');
    expect(challengeCount).toBe(2);
    expect(enrollmentAttempts).toBe(3);
    expect(fetchMock).toHaveBeenCalledTimes(7);
  });

  it('recovers with an assertion when the first attestation response is lost after server acceptance', async () => {
    const nativeModule = {
      isAvailable: vi.fn(() => true),
      isKeyAttested: vi.fn(() => false),
      markKeyAttested: vi.fn(),
      getOrCreateKeyId: vi.fn(async () => 'apple-key-id'),
      attest: vi.fn(async () => 'attestation-object'),
      generateAssertion: vi.fn(async () => 'assertion-object'),
    };
    vi.doMock('../../../modules/useit-app-attest', () => ({ default: nativeModule }));

    let challengeCount = 0;
    let enrollmentAttempts = 0;
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith('/v1/session/challenge')) {
        challengeCount += 1;
        return new Response(JSON.stringify({
          challenge: challengeCount === 1 ? 'challenge-initial' : 'challenge-recovery',
          provider: 'apple_app_attest',
          appId: 'TEAMID.com.useit.app',
          expiresAt: Math.floor(Date.now() / 1000) + 300,
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      const payload = JSON.parse(String(init?.body ?? '{}')) as Record<string, unknown>;
      if (!payload.provider) {
        return new Response(JSON.stringify({ detail: 'attestation_required' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      if (!payload.clientData) {
        enrollmentAttempts += 1;
        if (enrollmentAttempts === 1) throw new TypeError('Network request failed');
        return new Response(JSON.stringify({ detail: 'challenge_invalid_or_replayed' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({
        accessToken: 'recovered-session-token',
        expiresAt: Math.floor(Date.now() / 1000) + 600,
        expiresIn: 600,
        tokenType: 'Bearer',
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    });
    vi.stubGlobal('fetch', fetchMock);

    const { getSessionToken } = await import('./attestationClient');
    await expect(getSessionToken('https://api-a.example')).resolves.toBe('recovered-session-token');

    expect(challengeCount).toBe(2);
    expect(enrollmentAttempts).toBe(2);
    expect(nativeModule.attest).toHaveBeenCalledTimes(1);
    expect(nativeModule.generateAssertion).toHaveBeenCalledWith(
      'challenge-recovery',
      'apple-key-id',
      JSON.stringify({ challenge: 'challenge-recovery', action: 'session' }),
    );
    expect(nativeModule.markKeyAttested).toHaveBeenCalledWith('apple-key-id');
    expect(fetchMock).toHaveBeenCalledTimes(6);
  });

  it('recovers when the server already registered an Apple key but the first response was lost', async () => {
    const nativeModule = {
      isAvailable: vi.fn(() => true),
      isKeyAttested: vi.fn(() => false),
      markKeyAttested: vi.fn(),
      getOrCreateKeyId: vi.fn(async () => 'apple-key-id'),
      attest: vi.fn(async () => 'attestation-object'),
      generateAssertion: vi.fn(async () => 'assertion-object'),
    };
    vi.doMock('../../../modules/useit-app-attest', () => ({ default: nativeModule }));

    let challengeCount = 0;
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith('/v1/session/challenge')) {
        challengeCount += 1;
        return new Response(JSON.stringify({
          challenge: challengeCount === 1 ? 'challenge-initial' : 'challenge-recovery',
          provider: 'apple_app_attest',
          appId: 'TEAMID.com.useit.app',
          expiresAt: Math.floor(Date.now() / 1000) + 300,
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      const payload = JSON.parse(String(init?.body ?? '{}')) as Record<string, unknown>;
      if (!payload.provider) {
        return new Response(JSON.stringify({ detail: 'attestation_required' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      if (!payload.clientData) {
        // Simulate a retry after the server stored the key but the prior
        // response never reached the client: duplicate attestation is rejected.
        return new Response(JSON.stringify({ detail: 'attestation_invalid' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({
        accessToken: 'recovered-session-token',
        expiresAt: Math.floor(Date.now() / 1000) + 600,
        expiresIn: 600,
        tokenType: 'Bearer',
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    });
    vi.stubGlobal('fetch', fetchMock);

    const { getSessionToken } = await import('./attestationClient');
    await expect(getSessionToken('https://api-a.example')).resolves.toBe('recovered-session-token');

    expect(challengeCount).toBe(2);
    expect(nativeModule.attest).toHaveBeenCalledWith('challenge-initial', 'apple-key-id');
    expect(nativeModule.generateAssertion).toHaveBeenCalledWith(
      'challenge-recovery',
      'apple-key-id',
      JSON.stringify({ challenge: 'challenge-recovery', action: 'session' }),
    );
    expect(nativeModule.markKeyAttested).toHaveBeenCalledWith('apple-key-id');
    expect(fetchMock).toHaveBeenCalledTimes(5);
  });

});
