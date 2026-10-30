import { normalizeApiBaseUrl } from './apiConfig';

type SessionResponse = {
  accessToken: string;
  expiresAt: number;
  expiresIn: number;
  tokenType: string;
};

type ChallengeResponse = {
  challenge: string;
  provider: 'apple_app_attest' | 'google_play_integrity';
  appId: string;
  expiresAt: number;
};

const cachedSessions = new Map<string, SessionResponse>();
const pendingSessions = new Map<string, Promise<string>>();
let sessionCacheGeneration = 0;

export async function getSessionToken(baseUrl: string, apiKey?: string): Promise<string> {
  if (apiKey?.trim()) return '';
  const base = normalizeApiBaseUrl(baseUrl);
  const generation = sessionCacheGeneration;
  const now = Math.floor(Date.now() / 1000);
  const cached = cachedSessions.get(base);
  if (cached && cached.expiresAt - now > 30) {
    return cached.accessToken;
  }
  if (cached) cachedSessions.delete(base);

  const pending = pendingSessions.get(base);
  if (pending) return pending;

  const request = createSession(base, generation).finally(() => {
    if (pendingSessions.get(base) === request) pendingSessions.delete(base);
  });
  pendingSessions.set(base, request);
  return request;
}

async function createSession(base: string, generation: number): Promise<string> {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const direct = await fetch(`${base}/v1/session`, {
    method: 'POST',
    headers,
    body: '{}',
  });

  if (direct.ok) {
    return cacheSession(await parseSession(direct), base, generation);
  }

  // Only the explicit missing-session-secret response means this deployment intentionally
  // runs without session auth. Other 503 responses represent outages and must fail closed.
  if (direct.status === 503) {
    const detail = await safeErrorDetail(direct);
    if (detail === 'Session authentication is not configured.') return '';
    throw new Error(`USEIT session bootstrap failed (503)${detail ? `: ${detail}` : '.'}`);
  }
  if (direct.status !== 401) {
    throw new Error(`USEIT session bootstrap failed (${direct.status}).`);
  }

  let challenge: ChallengeResponse;
  let assertion: string;
  let keyId: string | undefined;
  let clientData: string | undefined;

  const existingNativeModule = await import('../../../modules/useit-app-attest');
  const existingKeyId = existingNativeModule.default.isAvailable()
    ? await existingNativeModule.default.getOrCreateKeyId()
    : null;
  const existingPending = existingKeyId
    ? existingNativeModule.default.getPendingAttestation?.(existingKeyId)
    : null;
  if (existingPending) {
    // An unexpired pending Apple enrollment takes precedence over fetching a new nonce.
    challenge = JSON.parse(existingPending) as ChallengeResponse;
  } else {
    challenge = await requestAttestationChallenge(base, headers);
  }
  if (challenge.provider === 'google_play_integrity') {
    if (challenge.provider !== 'google_play_integrity') {
      throw new Error('USEIT attestation provider changed during bootstrap.');
    }
    const projectNumber = Number(process.env.EXPO_PUBLIC_GOOGLE_CLOUD_PROJECT_NUMBER);
    if (!Number.isSafeInteger(projectNumber) || projectNumber <= 0) {
      throw new Error('EXPO_PUBLIC_GOOGLE_CLOUD_PROJECT_NUMBER is not configured.');
    }
    const nativeModule = await import('../../../modules/useit-play-integrity');
    if (!nativeModule.default.isAvailable()) {
      throw new Error('Google Play Integrity is not available on this Android device.');
    }
    assertion = await nativeModule.default.requestIntegrityToken(projectNumber, challenge.challenge);
  } else {
    const nativeModule = existingNativeModule;
    if (!nativeModule.default.isAvailable()) {
      throw new Error('Apple App Attest is not available on this iOS device.');
    }

    keyId = existingKeyId ?? await nativeModule.default.getOrCreateKeyId();
    let pending: {
      challenge: string;
      provider: 'apple_app_attest';
      appId: string;
      expiresAt: number;
      attestationObject?: string;
    } | null = null;
    const pendingRaw = existingPending ?? nativeModule.default.getPendingAttestation?.(keyId);
    if (pendingRaw) {
      try {
        const parsed = JSON.parse(pendingRaw) as typeof pending;
        if (
          parsed &&
          parsed.provider === 'apple_app_attest' &&
          typeof parsed.challenge === 'string' &&
          typeof parsed.appId === 'string' &&
          typeof parsed.expiresAt === 'number' &&
          parsed.expiresAt > Math.floor(Date.now() / 1000) + 5
        ) {
          pending = parsed;
        }
      } catch {
        pending = null;
      }
    }

    if (!pending) {
      if (pendingRaw) {
        nativeModule.default.discardKey?.(keyId);
        keyId = await nativeModule.default.getOrCreateKeyId();
      }
      if (challenge.provider !== 'apple_app_attest') {
        throw new Error('USEIT attestation provider changed during bootstrap.');
      }
      pending = {
        challenge: challenge.challenge,
        provider: 'apple_app_attest',
        appId: challenge.appId,
        expiresAt: challenge.expiresAt,
      };
      nativeModule.default.markKeyAttestationPending(keyId);
      nativeModule.default.storePendingAttestation?.(keyId, JSON.stringify(pending));
    } else {
      challenge = pending;
    }

    if (pending.attestationObject) {
      assertion = pending.attestationObject;
    } else {
      try {
        assertion = await nativeModule.default.attest(challenge.challenge, keyId);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (message.includes('USEIT_APP_ATTEST_SERVER_UNAVAILABLE')) {
          // Apple explicitly requires retrying with the same key and clientDataHash.
          // The key and server challenge remain in the device Keychain for the next attempt.
          throw new Error('Apple App Attest is temporarily unavailable. The same key and challenge have been retained for retry.');
        }
        nativeModule.default.discardKey?.(keyId);
        throw error;
      }
      pending.attestationObject = assertion;
      nativeModule.default.storePendingAttestation?.(keyId, JSON.stringify(pending));
    }
  }

  let attested: Response;
  try {
    attested = await submitAttestation(base, headers, challenge, assertion, keyId, clientData);
  } catch {
    // A rejected fetch is ambiguous: the server may not have received the request,
    // or it may have consumed the challenge and registered the key before the
    // response was lost. Retry the exact same evidence once before recovery.
    try {
      attested = await submitAttestation(base, headers, challenge, assertion, keyId, clientData);
    } catch {
      throw new Error('USEIT attestation request failed; retry session creation.');
    }
  }
  if (!attested.ok) {
    let detail = await safeErrorDetail(attested);

    if (
      challenge.provider === 'apple_app_attest' &&
      keyId &&
      !clientData &&
      attested.status === 401 &&
      (detail === 'attestation_invalid' || detail === 'challenge_invalid_or_replayed')
    ) {
      const recoveryChallenge = await requestAttestationChallenge(base, headers);
      if (recoveryChallenge.provider !== 'apple_app_attest') {
        throw new Error('USEIT App Attest recovery returned a different provider.');
      }

      const recoveryClientData = JSON.stringify({
        challenge: recoveryChallenge.challenge,
        action: 'session',
      });
      const nativeModule = await import('../../../modules/useit-app-attest');
      const recoveryAssertion = await nativeModule.default.generateAssertion(
        recoveryChallenge.challenge,
        keyId,
        recoveryClientData,
      );
      attested = await submitAttestation(
        base,
        headers,
        recoveryChallenge,
        recoveryAssertion,
        keyId,
        recoveryClientData,
      );

      if (!attested.ok) {
        detail = await safeErrorDetail(attested);
        if (attested.status === 401 && detail === 'attestation_invalid') {
          const replacement = await createFreshAppleEnrollment(base, headers, keyId);
          attested = replacement.response;
          keyId = replacement.keyId;
        } else {
          throw new Error('USEIT attestation failed (' + attested.status + ')' + (detail ? ': ' + detail : '.'));
        }
      }
    } else if (
      challenge.provider === 'apple_app_attest' &&
      keyId &&
      clientData &&
      attested.status === 401 &&
      detail === 'attestation_invalid'
    ) {
      const replacement = await createFreshAppleEnrollment(base, headers, keyId);
      attested = replacement.response;
      keyId = replacement.keyId;
    } else {
      throw new Error('USEIT attestation failed (' + attested.status + ')' + (detail ? ': ' + detail : '.'));
    }
  }

  if (challenge.provider === 'apple_app_attest' && keyId) {
    const nativeModule = await import('../../../modules/useit-app-attest');
    nativeModule.default.markKeyAttested(keyId);
  }

  return cacheSession(await parseSession(attested), base, generation);
}

async function createFreshAppleEnrollment(
  base: string,
  headers: Record<string, string>,
  previousKeyId: string,
): Promise<{ response: Response; keyId: string }> {
  const challenge = await requestAttestationChallenge(base, headers);
  if (challenge.provider !== 'apple_app_attest') {
    throw new Error('USEIT App Attest re-enrollment returned a different provider.');
  }

  const nativeModule = await import('../../../modules/useit-app-attest');
  const keyId = await nativeModule.default.createNewKeyId();
  if (keyId === previousKeyId) {
    throw new Error('USEIT App Attest did not generate a replacement key.');
  }

  const attestation = await nativeModule.default.attest(challenge.challenge, keyId);
  nativeModule.default.markKeyAttestationPending(keyId);
  const response = await submitAttestation(base, headers, challenge, attestation, keyId);

  if (!response.ok) {
    const detail = await safeErrorDetail(response);
    throw new Error(
      'USEIT App Attest re-enrollment failed (' + response.status + ')' + (detail ? ': ' + detail : '.'),
    );
  }

  return { response, keyId };
}

async function requestAttestationChallenge(
  base: string,
  headers: Record<string, string>,
): Promise<ChallengeResponse> {
  const response = await fetch(base + '/v1/session/challenge', {
    method: 'POST',
    headers,
  });
  if (!response.ok) {
    throw new Error('USEIT attestation challenge failed (' + response.status + ').');
  }

  const payload = (await response.json()) as Partial<ChallengeResponse>;
  if (
    !payload.challenge ||
    (payload.provider !== 'apple_app_attest' && payload.provider !== 'google_play_integrity') ||
    !payload.appId
  ) {
    throw new Error('USEIT attestation challenge was malformed.');
  }
  return payload as ChallengeResponse;
}

async function submitAttestation(
  base: string,
  headers: Record<string, string>,
  challenge: ChallengeResponse,
  assertion: string,
  keyId?: string,
  clientData?: string,
): Promise<Response> {
  return fetch(base + '/v1/session', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      provider: challenge.provider,
      challenge: challenge.challenge,
      assertion,
      appId: challenge.appId,
      ...(keyId ? { keyId } : {}),
      ...(clientData ? { clientData } : {}),
    }),
  });
}

async function parseSession(response: Response): Promise<SessionResponse> {
  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new Error('USEIT session API returned malformed JSON.');
  }
  if (!payload || typeof payload !== 'object') throw new Error('USEIT session API returned an invalid result.');
  const session = payload as Partial<SessionResponse>;
  if (typeof session.accessToken !== 'string' || typeof session.expiresAt !== 'number') {
    throw new Error('USEIT session API returned an invalid credential.');
  }
  return {
    accessToken: session.accessToken,
    expiresAt: session.expiresAt,
    expiresIn: typeof session.expiresIn === 'number' ? session.expiresIn : Math.max(0, session.expiresAt - Math.floor(Date.now() / 1000)),
    tokenType: typeof session.tokenType === 'string' ? session.tokenType : 'Bearer',
  };
}

async function safeErrorDetail(response: Response): Promise<string> {
  try {
    const payload = await response.json() as { detail?: unknown };
    return typeof payload.detail === 'string' ? payload.detail : '';
  } catch {
    return '';
  }
}

function cacheSession(session: SessionResponse, base: string, generation: number): string {
  // A response started before clearSessionToken() must neither repopulate the
  // cache nor return an invalidated credential to its original caller.
  if (generation !== sessionCacheGeneration) {
    throw new Error('USEIT session request was invalidated before completion.');
  }
  cachedSessions.set(base, session);
  return session.accessToken;
}

export function clearSessionToken(): void {
  sessionCacheGeneration += 1;
  cachedSessions.clear();
  pendingSessions.clear();
}
