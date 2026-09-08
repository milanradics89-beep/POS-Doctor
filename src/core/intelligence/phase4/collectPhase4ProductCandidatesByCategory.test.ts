import { describe, expect, it, vi } from 'vitest';
import type { ProductCatalogProvider } from './productCatalog';
import type { ShoppingDecision } from '../shoppingDecisionEngine';
import { collectPhase4ProductCandidatesByCategory } from './collectPhase4ProductCandidatesByCategory';

const decision: ShoppingDecision = {
  query: 'modern room',
  categories: ['sofa', 'lighting'],
  budgetHuf: 500000,
  preserveExisting: true,
  constraints: {},
  candidateSlots: 8,
};

describe('collectPhase4ProductCandidatesByCategory', () => {
  it('queries every category independently and deduplicates candidates', async () => {
    const search = vi.fn(async (query) => {
      if (query.category === 'sofa') {
        return [{ id: 'sofa-1', title: 'Sofa', category: 'sofa', retailer: 'A', productUrl: 'https://example.com/sofa' }];
      }
      return [
        { id: 'light-1', title: 'Light', category: 'lighting', retailer: 'A', productUrl: 'https://example.com/light' },
        { id: 'sofa-1', title: 'Sofa duplicate', category: 'sofa', retailer: 'A', productUrl: 'https://example.com/sofa' },
      ];
    });
    const provider: ProductCatalogProvider = { search };

    const result = await collectPhase4ProductCandidatesByCategory(decision, provider);

    expect(search).toHaveBeenCalledTimes(2);
    expect(search).toHaveBeenCalledWith(expect.objectContaining({ category: 'sofa', categories: ['sofa'] }));
    expect(search).toHaveBeenCalledWith(expect.objectContaining({ category: 'lighting', categories: ['lighting'] }));
    expect(result.map((candidate) => candidate.id)).toEqual(['sofa-1', 'light-1']);
  });

  it('does not call the provider when there are no usable categories', async () => {
    const search = vi.fn();
    const decisionWithoutCategories = { ...decision, categories: [' ', ''] };

    await expect(collectPhase4ProductCandidatesByCategory(decisionWithoutCategories, { search })).resolves.toEqual([]);
    expect(search).not.toHaveBeenCalled();
  });
});
