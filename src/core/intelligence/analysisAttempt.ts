import type { OpportunityKind } from './types';

export type AnalysisAttempt = Readonly<{
  intent: OpportunityKind | undefined;
  idempotencyKey: string;
}>;

export function createIdempotencyKey(
  cryptoApi: Crypto | undefined = (globalThis as typeof globalThis & { crypto?: Crypto }).crypto,
): string {
  if (typeof cryptoApi?.randomUUID === 'function') {
    return `analysis-${cryptoApi.randomUUID()}`;
  }

  if (typeof cryptoApi?.getRandomValues === 'function') {
    const bytes = cryptoApi.getRandomValues(new Uint8Array(16));
    const suffix = Array.from(bytes, value => value.toString(16).padStart(2, '0')).join('');
    return `analysis-${suffix}`;
  }

  throw new Error('Secure random generation is unavailable for USEIT analysis idempotency keys.');
}

export function getOrCreateAnalysisAttempt(
  current: AnalysisAttempt | null,
  intent: OpportunityKind | undefined,
  createKey: () => string = createIdempotencyKey,
): AnalysisAttempt {
  if (current && current.intent === intent) return current;
  return { intent, idempotencyKey: createKey() };
}
