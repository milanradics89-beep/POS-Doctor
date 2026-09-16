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

let cachedSession: SessionResponse | null = null;
let pendingSession: Promise<string> | null = null;

export async function getSessionToken(baseUrl: string, apiKey?: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (cachedSession && cachedSession.expiresAt - now > 30) {
    return cachedSession.accessToken;
  }
  if (pendingSession) return pendingSession;

  pendingSession = createSession(baseUrl, apiKey).finally(() => {
    pendingSession = null;
  });
  return pendingSession;
}

async function createSession(baseUrl: string, apiKey?: string): Promise<string> {
  const base = normalizeApiBaseUrl(baseUrl);
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(apiKey ? { 'X-API-Key': apiKey } : {}),
  };

  const direct = await fetch(`${base}/v1/session`, {
    method: 'POST',
    headers,
    body: '{}',
  });

  if (direct.ok) {
    return cacheSession(await parseSession(direct));
  }

  if (direct.status !== 401) {
    throw new Error(`USEIT session bootstrap failed (${direct.status}).`);
  }

  const challengeResponse = await fetch(`${base}/v1/session/challenge`, {
    method: 'POST',
    headers,
  });
  if (!challengeResponse.ok) {
    throw new Error(`USEIT attestation challenge failed (${challengeResponse.status}).`);
  }

  const challenge = (await challengeResponse.json()) as Partial<ChallengeResponse>;
  if (!challenge.challenge || !challenge.provider || !challenge.appId) {
    throw new Error('USEIT attestation challenge was malformed.');
  }

  if (challenge.provider !== 'google_play_integrity') {
    throw new Error(`USEIT attestation provider is not supported on this client yet (${challenge.provider}).`);
  }

  const projectNumber = Number(process.env.EXPO_PUBLIC_GOOGLE_CLOUD_PROJECT_NUMBER);
  if (!Number.isSafeInteger(projectNumber) || projectNumber <= 0) {
    throw new Error('EXPO_PUBLIC_GOOGLE_CLOUD_PROJECT_NUMBER is not configured.');
  }

  const nativeModule = await import('../../../modules/useit-play-integrity');
  if (!nativeModule.default.isAvailable()) {
    throw new Error('Google Play Integrity is not available on this Android device.');
  }

  const assertion = await nativeModule.default.requestIntegrityToken(projectNumber, challenge.challenge);
  const attested = await fetch(`${base}/v1/session`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      provider: challenge.provider,
      challenge: challenge.challenge,
      assertion,
      appId: challenge.appId,
    }),
  });

  if (!attested.ok) {
    const detail = await safeErrorDetail(attested);
    throw new Error(`USEIT attestation failed (${attested.status})${detail ? `: ${detail}` : '.'}`);
  }

  return cacheSession(await parseSession(attested));
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

function cacheSession(session: SessionResponse): string {
  cachedSession = session;
  return session.accessToken;
}

export function clearSessionToken(): void {
  cachedSession = null;
}
