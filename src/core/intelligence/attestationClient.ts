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

type PendingAppleAttestation = {
  challenge: string;
  provider: 'apple_app_attest';
  appId: string;
  expiresAt: number;
  attestationObject?: string;
  needsAssertionRecovery?: boolean;
};

const cachedSessions = new Map<string, SessionResponse>();
const pendingSessions = new Map<string, Promise<string>>();
let sessionCacheGeneration = 0;

const ATTESTATION_REQUEST_TIMEOUT_MS = 10_000;

async function fetchWithAttestationTimeout(
  input: RequestInfo | URL,
  init: RequestInit,
): Promise<Response> {
  const controller = new AbortController();
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const timeoutError = new Error('USEIT attestation request timed out.');
  const deadline = new Promise<never>((_, reject) => {
    timeout = setTimeout(() => {
      controller.abort();
      reject(timeoutError);
    }, ATTESTATION_REQUEST_TIMEOUT_MS);
  });

  try {
    const response = await Promise.race([
      fetch(input, { ...init, signal: controller.signal }),
      deadline,
    ]);
    // Fetch resolves when response headers arrive. Keep the deadline active
    // while consuming the body so a stalled JSON response is bounded too.
    const body = [204, 205, 304].includes(response.status)
      ? null
      : await Promise.race([response.arrayBuffer(), deadline]);
    return new Response(body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    if (controller.signal.aborted) throw timeoutError;
    throw error;
  } finally {
    if (timeout !== undefined) clearTimeout(timeout);
  }
}

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

  const direct = await fetchWithAttestationTimeout(`${base}/v1/session`, {
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
  let markAppleRecoveryPending: (() => void) | undefined;

  challenge = await requestAttestationChallenge(base, headers);
  if (challenge.provider === 'google_play_integrity') {
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
    const nativeModule = await import('../../../modules/useit-app-attest');
    if (!nativeModule.default.isAvailable()) {
      throw new Error('Apple App Attest is not available on this iOS device.');
    }

    keyId = await nativeModule.default.getOrCreateKeyId();
    let pending: PendingAppleAttestation | null = null;
    const pendingRaw = nativeModule.default.getPendingAttestation?.(keyId);
    const hasPendingMarker = nativeModule.default.isKeyAttestationPending(keyId);
    if (pendingRaw) {
      try {
        const parsed = JSON.parse(pendingRaw) as PendingAppleAttestation | null;
        if (
          parsed &&
          parsed.provider === 'apple_app_attest' &&
          typeof parsed.challenge === 'string' &&
          typeof parsed.appId === 'string' &&
          typeof parsed.expiresAt === 'number' &&
          (parsed.needsAssertionRecovery === true || parsed.expiresAt > Math.floor(Date.now() / 1000) + 5)
        ) {
          pending = parsed;
        }
      } catch {
        pending = null;
      }
    }

    if (!pending) {
      if (pendingRaw || hasPendingMarker) {
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
    } else if (!pending.needsAssertionRecovery) {
      // Reuse the original nonce and evidence while the server outcome is ambiguous.
      challenge = pending;
    }

    markAppleRecoveryPending = () => {
      if (!pending || !keyId) return;
      pending.needsAssertionRecovery = true;
      nativeModule.default.storePendingAttestation?.(keyId, JSON.stringify(pending));
    };

    if (pending.needsAssertionRecovery) {
      // The enrollment result is ambiguous after a lost response or verifier outage.
      // A fresh assertion distinguishes a stored key from an enrollment that must
      // be safely recreated.
      if (challenge.provider !== 'apple_app_attest') {
        throw new Error('USEIT App Attest recovery returned a different provider.');
      }
      clientData = JSON.stringify({
        challenge: challenge.challenge,
        action: 'session',
      });
      assertion = await nativeModule.default.generateAssertion(
        challenge.challenge,
        keyId,
        clientData,
      );
    } else if (pending.attestationObject) {
      assertion = pending.attestationObject;
    } else {
      try {
        assertion = await nativeModule.default.attest(challenge.challenge, keyId);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (message.includes('USEIT_APP_ATTEST_SERVER_UNAVAILABLE')) {
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
      markAppleRecoveryPending?.();
      throw new Error('USEIT attestation request failed; retry session creation.');
    }
  }
  if (!attested.ok) {
    let detail = await safeErrorDetail(attested);

    if (
      challenge.provider === 'apple_app_attest' &&
      keyId &&
      !clientData &&
      attested.status === 503 &&
      detail === 'Attestation verification service is temporarily unavailable.'
    ) {
      markAppleRecoveryPending?.();
      throw new Error('USEIT attestation failed (' + attested.status + ')' + (detail ? ': ' + detail : '.'));
    }

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
  // Persist the exact challenge and evidence before contacting the server.
  // If the response is lost, the next bootstrap can safely retry the same
  // attestation instead of generating a second one for this key.
  const pending: PendingAppleAttestation = {
    challenge: challenge.challenge,
    provider: 'apple_app_attest',
    appId: challenge.appId,
    expiresAt: challenge.expiresAt,
    attestationObject: attestation,
  };
  nativeModule.default.markKeyAttestationPending(keyId);
  nativeModule.default.storePendingAttestation?.(keyId, JSON.stringify(pending));
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
  const response = await fetchWithAttestationTimeout(base + '/v1/session/challenge', {
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
  return fetchWithAttestationTimeout(base + '/v1/session', {
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
