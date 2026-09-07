import type { ProductCandidate } from './shoppingDecisionEngine';
import type { ShoppingDecision } from './shoppingDecisionEngine';

export interface ProductProvider {
  id: string;
  search(decision: ShoppingDecision): Promise<ProductCandidate[]>;
}

export type CandidateCollection = {
  candidates: ProductCandidate[];
  providersUsed: string[];
  errors: Array<{ provider: string; message: string }>;
};

export async function collectProductCandidates(decision: ShoppingDecision, providers: ProductProvider[]): Promise<CandidateCollection> {
  const results = await Promise.allSettled(providers.map(async provider => ({ provider: provider.id, candidates: await provider.search(decision) })));
  const candidates: ProductCandidate[] = [];
  const providersUsed: string[] = [];
  const errors: Array<{ provider: string; message: string }> = [];

  for (const result of results) {
    if (result.status === 'fulfilled') {
      providersUsed.push(result.value.provider);
      candidates.push(...result.value.candidates);
    } else {
      errors.push({ provider: 'unknown', message: result.reason instanceof Error ? result.reason.message : String(result.reason) });
    }
  }

  const deduped = new Map<string, ProductCandidate>();
  for (const candidate of candidates) {
    const key = candidate.url || `${candidate.source}:${candidate.title.toLowerCase()}`;
    if (!deduped.has(key)) deduped.set(key, candidate);
  }

  return { candidates: [...deduped.values()], providersUsed, errors };
}
