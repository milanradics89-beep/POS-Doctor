import type { ProductCandidate } from '../productCandidateCollector';
import type { ShoppingDecision } from '../shoppingDecisionEngine';
import type { ProductCatalogProvider } from './productCatalog';
import { ProductCatalogCandidateProvider } from './productCatalogAdapter';

export async function collectPhase4ProductCandidatesByCategory(
  decision: ShoppingDecision,
  catalogProvider: ProductCatalogProvider,
): Promise<ProductCandidate[]> {
  const categories = decision.categories.filter((category) => category.trim().length > 0);
  if (categories.length === 0) return [];

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
  return results.flat().filter((candidate) => {
    if (seen.has(candidate.id)) return false;
    seen.add(candidate.id);
    return true;
  });
}
