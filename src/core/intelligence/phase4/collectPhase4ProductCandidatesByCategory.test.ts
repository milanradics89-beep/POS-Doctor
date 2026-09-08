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
    expect(search).toHaveBeenCalledWith(expect.objectContaining({ category: 'sofa' }));
    expect(search).toHaveBeenCalledWith(expect.objectContaining({ category: 'lighting' }));
    expect(result.map((candidate) => candidate.id)).toEqual(['sofa-1', 'light-1']);
  });

  it('enforces candidateSlots after deduplication', async () => {
    const search = vi.fn(async () => [
      { id: '1', title: 'One', category: 'sofa', retailer: 'A', productUrl: 'https://example.com/1' },
      { id: '2', title: 'Two', category: 'sofa', retailer: 'A', productUrl: 'https://example.com/2' },
      { id: '3', title: 'Three', category: 'sofa', retailer: 'A', productUrl: 'https://example.com/3' },
    ]);
    const provider: ProductCatalogProvider = { search };

    const result = await collectPhase4ProductCandidatesByCategory(
      { ...decision, categories: ['sofa'], candidateSlots: 2 },
      provider,
    );

    expect(result.map((candidate) => candidate.id)).toEqual(['1', '2']);
  });

  it('returns no candidates when candidateSlots is zero', async () => {
    const search = vi.fn();
    const result = await collectPhase4ProductCandidatesByCategory(
      { ...decision, candidateSlots: 0 },
      { search },
    );

    expect(result).toEqual([]);
    expect(search).not.toHaveBeenCalled();
  });

  it('does not call the provider when there are no usable categories', async () => {
    const search = vi.fn();
    const decisionWithoutCategories = { ...decision, categories: [' ', ''] };

    await expect(collectPhase4ProductCandidatesByCategory(decisionWithoutCategories, { search })).resolves.toEqual([]);
    expect(search).not.toHaveBeenCalled();
  });
});
