import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

async function flushMicrotasks(): Promise<void> {
  for (let index = 0; index < 24; index += 1) await Promise.resolve();
}

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
    vi.useRealTimers();
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
      isKeyAttestationPending: vi.fn(() => false),
      markKeyAttestationPending: vi.fn(),
      markKeyAttested: vi.fn(),
      getOrCreateKeyId: vi.fn(async () => 'apple-key-id'),
      createNewKeyId: vi.fn(async () => 'replacement-apple-key-id'),
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

  it('keeps Apple enrollment pending after network failures and resumes with an assertion', async () => {
    let activeKeyId = 'apple-key-id';
    let pendingKeyId: string | null = null;
    let pendingAttestation: string | null = null;
    let attestedKeyId: string | null = null;
    const nativeModule = {
      isAvailable: vi.fn(() => true),
      isKeyAttested: vi.fn((keyId: string) => attestedKeyId === keyId),
      isKeyAttestationPending: vi.fn((keyId: string) => pendingKeyId === keyId),
      getPendingAttestation: vi.fn((keyId: string) => pendingKeyId === keyId ? pendingAttestation : null),
      storePendingAttestation: vi.fn((keyId: string, state: string) => {
        if (pendingKeyId === keyId) pendingAttestation = state;
      }),
      discardKey: vi.fn((keyId: string) => {
        if (activeKeyId === keyId) {
          pendingKeyId = null;
          pendingAttestation = null;
          attestedKeyId = null;
        }
      }),
      markKeyAttestationPending: vi.fn((keyId: string) => { pendingKeyId = keyId; }),
      markKeyAttested: vi.fn((keyId: string) => {
        attestedKeyId = keyId;
        if (pendingKeyId === keyId) {
          pendingKeyId = null;
          pendingAttestation = null;
        }
      }),
      getOrCreateKeyId: vi.fn(async () => activeKeyId),
      createNewKeyId: vi.fn(async () => {
        activeKeyId = 'replacement-apple-key-id';
        pendingKeyId = null;
        pendingAttestation = null;
        attestedKeyId = null;
        return activeKeyId;
      }),
      attest: vi.fn(async (_challenge: string, keyId: string) => 'attestation-' + keyId),
      generateAssertion: vi.fn(async (_challenge: string, keyId: string) => 'assertion-' + keyId),
    };
    vi.doMock('../../../modules/useit-app-attest', () => ({ default: nativeModule }));

    let challengeCount = 0;
    let enrollmentAttempts = 0;
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith('/v1/session/challenge')) {
        challengeCount += 1;
        return new Response(JSON.stringify({
          challenge: 'challenge-' + challengeCount,
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

    expect(JSON.parse(pendingAttestation ?? '{}')).toMatchObject({
      challenge: 'challenge-1',
      needsAssertionRecovery: true,
    });
    expect(nativeModule.markKeyAttested).not.toHaveBeenCalled();
    expect(nativeModule.markKeyAttestationPending).toHaveBeenCalledWith('apple-key-id');
    expect(nativeModule.attest).toHaveBeenCalledTimes(1);
    expect(nativeModule.generateAssertion).not.toHaveBeenCalled();

    await expect(getSessionToken('https://api-a.example')).resolves.toBe('session-token-after-retry');

    expect(nativeModule.attest).toHaveBeenCalledTimes(1);
    expect(nativeModule.generateAssertion).toHaveBeenCalledWith(
      'challenge-2',
      'apple-key-id',
      JSON.stringify({ challenge: 'challenge-2', action: 'session' }),
    );
    expect(nativeModule.markKeyAttested).toHaveBeenCalledTimes(1);
    expect(nativeModule.markKeyAttested).toHaveBeenCalledWith('apple-key-id');
    expect(nativeModule.createNewKeyId).not.toHaveBeenCalled();
    expect(challengeCount).toBe(2);
    expect(enrollmentAttempts).toBe(3);
    expect(fetchMock).toHaveBeenCalledTimes(7);
  });

  it('recovers from backend attestation storage failure by rotating an unregistered pending key', async () => {
    let activeKeyId = 'apple-key-id';
    let pendingKeyId: string | null = null;
    let pendingAttestation: string | null = null;
    let attestedKeyId: string | null = null;
    const nativeModule = {
      isAvailable: vi.fn(() => true),
      isKeyAttested: vi.fn((keyId: string) => attestedKeyId === keyId),
      isKeyAttestationPending: vi.fn((keyId: string) => pendingKeyId === keyId),
      getPendingAttestation: vi.fn((keyId: string) => pendingKeyId === keyId ? pendingAttestation : null),
      storePendingAttestation: vi.fn((keyId: string, state: string) => {
        if (pendingKeyId === keyId) pendingAttestation = state;
      }),
      discardKey: vi.fn((keyId: string) => {
        if (activeKeyId === keyId) {
          pendingKeyId = null;
          pendingAttestation = null;
          attestedKeyId = null;
        }
      }),
      markKeyAttestationPending: vi.fn((keyId: string) => { pendingKeyId = keyId; }),
      markKeyAttested: vi.fn((keyId: string) => {
        attestedKeyId = keyId;
        if (pendingKeyId === keyId) {
          pendingKeyId = null;
          pendingAttestation = null;
        }
      }),
      getOrCreateKeyId: vi.fn(async () => activeKeyId),
      createNewKeyId: vi.fn(async () => {
        activeKeyId = 'apple-key-id-2';
        pendingKeyId = null;
        pendingAttestation = null;
        attestedKeyId = null;
        return activeKeyId;
      }),
      attest: vi.fn(async (_challenge: string, keyId: string) => 'attestation-' + keyId),
      generateAssertion: vi.fn(async (_challenge: string, keyId: string) => 'assertion-' + keyId),
    };
    vi.doMock('../../../modules/useit-app-attest', () => ({ default: nativeModule }));

    let challengeCount = 0;
    let initialAttestationAttempts = 0;
    let assertionAttempts = 0;
    let replacementAttestationAttempts = 0;
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith('/v1/session/challenge')) {
        challengeCount += 1;
        return new Response(JSON.stringify({
          challenge: 'challenge-' + challengeCount,
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

      if (payload.clientData) {
        assertionAttempts += 1;
        return new Response(JSON.stringify({ detail: 'attestation_invalid' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (payload.keyId === 'apple-key-id') {
        initialAttestationAttempts += 1;
        return new Response(JSON.stringify({
          detail: 'Attestation verification service is temporarily unavailable.',
        }), { status: 503, headers: { 'Content-Type': 'application/json' } });
      }

      if (payload.keyId === 'apple-key-id-2') {
        replacementAttestationAttempts += 1;
        if (replacementAttestationAttempts === 1) throw new TypeError('Network request failed');
        return new Response(JSON.stringify({
          accessToken: 'session-token-after-key-rotation',
          expiresAt: Math.floor(Date.now() / 1000) + 600,
          expiresIn: 600,
          tokenType: 'Bearer',
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      throw new Error('Unexpected Apple App Attest key ID in test request.');
    });
    vi.stubGlobal('fetch', fetchMock);

    const { getSessionToken } = await import('./attestationClient');
    await expect(getSessionToken('https://api-a.example')).rejects.toThrow(
      'USEIT attestation failed (503): Attestation verification service is temporarily unavailable.',
    );

    expect(JSON.parse(pendingAttestation ?? '{}')).toMatchObject({
      challenge: 'challenge-1',
      needsAssertionRecovery: true,
    });
    pendingAttestation = JSON.stringify({
      ...JSON.parse(pendingAttestation ?? '{}'),
      expiresAt: Math.floor(Date.now() / 1000) - 1,
    });
    expect(nativeModule.markKeyAttestationPending).toHaveBeenCalledWith('apple-key-id');
    expect(nativeModule.markKeyAttested).not.toHaveBeenCalled();

    await expect(getSessionToken('https://api-a.example')).rejects.toThrow('Network request failed');
    expect(JSON.parse(pendingAttestation ?? '{}')).toMatchObject({
      challenge: 'challenge-3',
      provider: 'apple_app_attest',
      attestationObject: 'attestation-apple-key-id-2',
    });

    await expect(getSessionToken('https://api-a.example')).resolves.toBe('session-token-after-key-rotation');

    expect(nativeModule.generateAssertion).toHaveBeenCalledWith(
      'challenge-2',
      'apple-key-id',
      JSON.stringify({ challenge: 'challenge-2', action: 'session' }),
    );
    expect(nativeModule.createNewKeyId).toHaveBeenCalledTimes(1);
    expect(nativeModule.attest).toHaveBeenNthCalledWith(2, 'challenge-3', 'apple-key-id-2');
    expect(nativeModule.storePendingAttestation).toHaveBeenCalledWith('apple-key-id-2', expect.stringContaining('attestation-apple-key-id-2'));
    expect(nativeModule.markKeyAttestationPending).toHaveBeenNthCalledWith(2, 'apple-key-id-2');
    expect(nativeModule.markKeyAttested).toHaveBeenCalledWith('apple-key-id-2');
    expect(activeKeyId).toBe('apple-key-id-2');
    expect(pendingKeyId).toBeNull();
    expect(attestedKeyId).toBe('apple-key-id-2');
    expect(challengeCount).toBe(4);
    expect(initialAttestationAttempts).toBe(1);
    expect(assertionAttempts).toBe(1);
    expect(replacementAttestationAttempts).toBe(2);
    expect(fetchMock).toHaveBeenCalledTimes(11);
  });

  it('recovers with an assertion when the first attestation response is lost after server acceptance', async () => {
    const nativeModule = {
      isAvailable: vi.fn(() => true),
      isKeyAttested: vi.fn(() => false),
      isKeyAttestationPending: vi.fn(() => false),
      markKeyAttestationPending: vi.fn(),
      markKeyAttested: vi.fn(),
      getOrCreateKeyId: vi.fn(async () => 'apple-key-id'),
      createNewKeyId: vi.fn(async () => 'replacement-apple-key-id'),
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
      isKeyAttestationPending: vi.fn(() => false),
      markKeyAttestationPending: vi.fn(),
      markKeyAttested: vi.fn(),
      getOrCreateKeyId: vi.fn(async () => 'apple-key-id'),
      createNewKeyId: vi.fn(async () => 'replacement-apple-key-id'),
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


  it('retries Apple serverUnavailable with the same key and persisted challenge', async () => {
    const pending = {
      challenge: 'same-server-challenge',
      provider: 'apple_app_attest' as const,
      appId: 'TEAMID.com.useit.app',
      expiresAt: Math.floor(Date.now() / 1000) + 300,
    };
    let attestationAttempts = 0;
    const nativeModule = {
      isAvailable: vi.fn(() => true),
      isKeyAttested: vi.fn(() => false),
      isKeyAttestationPending: vi.fn(() => true),
      markKeyAttestationPending: vi.fn(),
      markKeyAttested: vi.fn(),
      getPendingAttestation: vi.fn(() => JSON.stringify(pending)),
      storePendingAttestation: vi.fn((_keyId: string, state: string) => {
        Object.assign(pending, JSON.parse(state));
      }),
      discardKey: vi.fn(),
      getOrCreateKeyId: vi.fn(async () => 'same-apple-key'),
      createNewKeyId: vi.fn(async () => 'replacement-key'),
      attest: vi.fn(async (challenge: string, keyId: string) => {
        expect(challenge).toBe('same-server-challenge');
        expect(keyId).toBe('same-apple-key');
        attestationAttempts += 1;
        if (attestationAttempts === 1) {
          throw new Error('USEIT_APP_ATTEST_SERVER_UNAVAILABLE');
        }
        return 'attestation-object';
      }),
      generateAssertion: vi.fn(),
    };
    vi.doMock('../../../modules/useit-app-attest', () => ({ default: nativeModule }));

    let challengeRequests = 0;
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith('/v1/session/challenge')) {
        challengeRequests += 1;
        return new Response(JSON.stringify({
          challenge: 'new-challenge-must-not-be-used',
          provider: 'apple_app_attest',
          appId: 'TEAMID.com.useit.app',
          expiresAt: Math.floor(Date.now() / 1000) + 300,
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
      const payload = JSON.parse(String(init?.body ?? '{}')) as Record<string, unknown>;
      if (!payload.provider) {
        return new Response(JSON.stringify({ detail: 'attestation_required' }), {
          status: 401, headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({
        accessToken: 'session-after-retry',
        expiresAt: Math.floor(Date.now() / 1000) + 600,
        expiresIn: 600,
        tokenType: 'Bearer',
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    });
    vi.stubGlobal('fetch', fetchMock);

    const { getSessionToken } = await import('./attestationClient');
    await expect(getSessionToken('https://api-a.example')).rejects.toThrow(
      'Apple App Attest is temporarily unavailable.',
    );
    await expect(getSessionToken('https://api-a.example')).resolves.toBe('session-after-retry');

    expect(challengeRequests).toBe(2);
    expect(nativeModule.attest).toHaveBeenCalledTimes(2);
    expect(nativeModule.attest).toHaveBeenNthCalledWith(1, 'same-server-challenge', 'same-apple-key');
    expect(nativeModule.attest).toHaveBeenNthCalledWith(2, 'same-server-challenge', 'same-apple-key');
    expect(nativeModule.discardKey).not.toHaveBeenCalled();
    expect(nativeModule.markKeyAttested).toHaveBeenCalledWith('same-apple-key');
  });


  it('aborts session bootstrap after the attestation request deadline', async () => {
    vi.useFakeTimers();
    let signal: AbortSignal | undefined;
    const fetchMock = vi.fn((_input: RequestInfo | URL, init?: RequestInit) => {
      signal = init?.signal as AbortSignal;
      return new Promise<Response>(() => undefined);
    });
    vi.stubGlobal('fetch', fetchMock);

    const { getSessionToken } = await import('./attestationClient');
    const pending = getSessionToken('https://api-a.example');
    const rejection = expect(pending).rejects.toThrow('USEIT attestation request timed out.');
    await flushMicrotasks();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(10_000);
    await rejection;
    expect(signal?.aborted).toBe(true);
  });

  it('aborts attestation challenge requests after the bounded deadline', async () => {
    vi.useFakeTimers();
    let calls = 0;
    let challengeSignal: AbortSignal | undefined;
    const fetchMock = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      calls += 1;
      if (String(input).endsWith('/v1/session')) {
        return Promise.resolve(new Response(
          JSON.stringify({ detail: 'attestation_required' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } },
        ));
      }
      challengeSignal = init?.signal as AbortSignal;
      return new Promise<Response>(() => undefined);
    });
    vi.stubGlobal('fetch', fetchMock);

    const { getSessionToken } = await import('./attestationClient');
    const pending = getSessionToken('https://api-a.example');
    const rejection = expect(pending).rejects.toThrow('USEIT attestation request timed out.');
    await flushMicrotasks();

    expect(calls).toBe(2);
    expect(challengeSignal).toBeDefined();
    await vi.advanceTimersByTimeAsync(10_000);
    await rejection;
    expect(challengeSignal?.aborted).toBe(true);
  });

  it('aborts a timed-out attestation submission and retries the exact same evidence once', async () => {
    vi.useFakeTimers();
    const nativeModule = {
      isAvailable: vi.fn(() => true),
      isKeyAttestationPending: vi.fn(() => false),
      markKeyAttestationPending: vi.fn(),
      markKeyAttested: vi.fn(),
      getOrCreateKeyId: vi.fn(async () => 'apple-key-id'),
      attest: vi.fn(async () => 'attestation-object'),
    };
    vi.doMock('../../../modules/useit-app-attest', () => ({ default: nativeModule }));

    const submittedBodies: string[] = [];
    const submittedSignals: AbortSignal[] = [];
    const fetchMock = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.endsWith('/v1/session/challenge')) {
        return Promise.resolve(new Response(JSON.stringify({
          challenge: 'deadline-challenge',
          provider: 'apple_app_attest',
          appId: 'TEAMID.com.useit.app',
          expiresAt: Math.floor(Date.now() / 1000) + 300,
        }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
      }

      const body = String(init?.body ?? '{}');
      if (body === '{}') {
        return Promise.resolve(new Response(
          JSON.stringify({ detail: 'attestation_required' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } },
        ));
      }

      submittedBodies.push(body);
      submittedSignals.push(init?.signal as AbortSignal);
      if (submittedBodies.length === 1) return new Promise<Response>(() => undefined);

      return Promise.resolve(new Response(JSON.stringify({
        accessToken: 'session-token-after-timeout-retry',
        expiresAt: Math.floor(Date.now() / 1000) + 600,
        expiresIn: 600,
        tokenType: 'Bearer',
      }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
    });
    vi.stubGlobal('fetch', fetchMock);

    const { getSessionToken } = await import('./attestationClient');
    const pending = getSessionToken('https://api-a.example');
    await flushMicrotasks();

    expect(submittedBodies).toHaveLength(1);
    await vi.advanceTimersByTimeAsync(10_000);
    await expect(pending).resolves.toBe('session-token-after-timeout-retry');

    expect(submittedBodies).toHaveLength(2);
    expect(submittedBodies[1]).toBe(submittedBodies[0]);
    expect(submittedSignals[0].aborted).toBe(true);
    expect(submittedSignals[1].aborted).toBe(false);
    expect(nativeModule.attest).toHaveBeenCalledTimes(1);
    expect(nativeModule.markKeyAttested).toHaveBeenCalledWith('apple-key-id');
  });

});
