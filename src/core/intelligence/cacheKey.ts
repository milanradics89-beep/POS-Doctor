import type { OpportunityKind } from './types';

export function createAnalysisCacheKey(imageFingerprint: string, intent?: OpportunityKind): string {
  const normalized = imageFingerprint.trim().toLowerCase();
  return `analysis:${normalized}:${intent ?? 'auto'}`;
}
