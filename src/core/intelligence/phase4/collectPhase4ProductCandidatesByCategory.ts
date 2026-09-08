import type { ProductCandidate } from '../productCandidateCollector';
import type { ShoppingDecision } from '../shoppingDecisionEngine';
import type { ProductCatalogProvider } from './productCatalog';
import { ProductCatalogCandidateProvider } from './productCatalogAdapter';
import { rankPhase4ProductCandidates } from './rankPhase4ProductCandidates';
import { selectPhase4CandidatesWithCategoryCoverage } from './selectPhase4CandidatesWithCategoryCoverage';

export async function collectPhase4ProductCandidatesByCategory(
  decision: ShoppingDecision,
  catalogProvider: ProductCatalogProvider,
): Promise<ProductCandidate[]> {
  const categories = decision.categories.filter((category) => category.trim().length > 0);
  if (categories.length === 0 || decision.candidateSlots <= 0) return [];

  const provider = new ProductCatalogCandidateProvider(catalogProvider);
  const results = await Promise.all(
    categories.map((category) =>
      provider.search({
        ...decision,
        query: `${decision.query} ${category}`.trim(),
        categories: [category],
      }),
    ),
  );

  const seen = new Set<string>();
  const candidates: ProductCandidate[] = [];
  for (const candidate of results.flat()) {
    if (seen.has(candidate.id)) continue;
    seen.add(candidate.id);
    candidates.push(candidate);
  }

  const ranked = rankPhase4ProductCandidates(candidates, decision);
  return selectPhase4CandidatesWithCategoryCoverage(
    ranked,
    categories,
    decision.candidateSlots,
  );
}
