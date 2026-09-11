import type { ProductCandidate, ShoppingDecision } from './shoppingDecisionEngine';

export type { ProductCandidate } from './shoppingDecisionEngine';

export interface ProductProvider {
  id: string;
  search(decision: ShoppingDecision): Promise<ProductCandidate[]>;
}

export type CandidateCollection = {
  candidates: ProductCandidate[];
  providersUsed: string[];
  errors: Array<{ provider: string; message: string }>;
};

function isProductCandidate(value: unknown): value is ProductCandidate {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<ProductCandidate>;
  if (typeof candidate.id !== 'string' || !candidate.id.trim()) return false;
  if (typeof candidate.title !== 'string' || !candidate.title.trim()) return false;
  if (typeof candidate.url !== 'string') return false;
  if (typeof candidate.category !== 'string' || !candidate.category.trim()) return false;
  if (!candidate.attributes || typeof candidate.attributes !== 'object' || Array.isArray(candidate.attributes)) return false;
  if (typeof candidate.source !== 'string' || !candidate.source.trim()) return false;
  if (candidate.priceHuf !== undefined && (!Number.isFinite(candidate.priceHuf) || candidate.priceHuf < 0)) return false;
  if (candidate.availability !== undefined && !['in_stock', 'out_of_stock', 'unknown'].includes(candidate.availability)) return false;
  return true;
}

export async function collectProductCandidates(decision: ShoppingDecision, providers: ProductProvider[]): Promise<CandidateCollection> {
  const results = await Promise.all(
    providers.map(async provider => {
      try {
        const candidates = await provider.search(decision);
        if (!Array.isArray(candidates)) {
          return { provider: provider.id, candidates: [], error: 'Provider returned a non-array candidate payload.' };
        }

        const validCandidates: ProductCandidate[] = [];
        let invalidCount = 0;
        for (const candidate of candidates) {
          if (isProductCandidate(candidate)) validCandidates.push(candidate);
          else invalidCount += 1;
        }

        return {
          provider: provider.id,
          candidates: validCandidates,
          error: invalidCount > 0 ? `Ignored ${invalidCount} invalid candidate payload${invalidCount === 1 ? '' : 's'}.` : undefined,
        };
      } catch (reason) {
        return {
          provider: provider.id,
          candidates: [],
          error: reason instanceof Error ? reason.message : String(reason),
        };
      }
    }),
  );

  const candidates: ProductCandidate[] = [];
  const providersUsed: string[] = [];
  const errors: Array<{ provider: string; message: string }> = [];

  for (const result of results) {
    if (result.candidates.length > 0) providersUsed.push(result.provider);
    if (result.error) errors.push({ provider: result.provider, message: result.error });
    candidates.push(...result.candidates);
  }

  const deduped = new Map<string, ProductCandidate>();
  for (const candidate of candidates) {
    const key = candidate.url || `${candidate.source}:${candidate.title.toLowerCase()}`;
    if (!deduped.has(key)) deduped.set(key, candidate);
  }

  return { candidates: [...deduped.values()], providersUsed, errors };
}
