import { describe, expect, it, vi } from 'vitest';
import type { ShoppingDecision } from '../shoppingDecisionEngine';
import type { ProductCatalogProvider } from './productCatalog';
import { collectPhase4ProductCandidatesByCategory } from './collectPhase4ProductCandidatesByCategory';

const decision: ShoppingDecision = {
  query: 'modern home',
  categories: ['sofa', 'lighting'],
  budgetHuf: 300000,
  preserveExisting: true,
  constraints: {
    preferredStyles: ['modern'],
    preferredColors: ['beige'],
  },
  candidateSlots: 3,
};

describe('Phase 4 product candidate end-to-end flow', () => {
  it('collects, deduplicates, ranks and limits candidates in one flow', async () => {
    const search = vi.fn(async (query) => {
      if (query.category === 'sofa') {
        return [
          {
            id: 'sofa-weak',
            title: 'Classic Sofa',
            category: 'sofa',
            price: 450000,
            currency: 'HUF',
            productUrl: 'https://example.com/sofa-weak',
            retailer: 'retailer-a',
            available: false,
            attributes: { style: 'classic', color: 'black' },
          },
          {
            id: 'sofa-best',
            title: 'Modern Beige Sofa',
            category: 'sofa',
            price: 280000,
            currency: 'HUF',
            productUrl: 'https://example.com/sofa-best',
            retailer: 'retailer-a',
            available: true,
            attributes: { style: 'modern', color: 'beige' },
          },
        ];
      }

      return [
        {
          id: 'light-good',
          title: 'Modern Light',
          category: 'lighting',
          price: 90000,
          currency: 'HUF',
          productUrl: 'https://example.com/light-good',
          retailer: 'retailer-b',
          available: true,
          attributes: { style: 'modern', color: 'beige' },
        },
        {
          id: 'sofa-best',
          title: 'Duplicate Sofa',
          category: 'sofa',
          price: 280000,
          currency: 'HUF',
          productUrl: 'https://example.com/sofa-best',
          retailer: 'retailer-a',
          available: true,
          attributes: { style: 'modern', color: 'beige' },
        },
        {
          id: 'light-weak',
          title: 'Out of Stock Light',
          category: 'lighting',
          price: 350000,
          currency: 'HUF',
          productUrl: 'https://example.com/light-weak',
          retailer: 'retailer-b',
          available: false,
          attributes: { style: 'classic', color: 'black' },
        },
      ];
    });

    const catalogProvider: ProductCatalogProvider = { search };
    const result = await collectPhase4ProductCandidatesByCategory(decision, catalogProvider);

    expect(search).toHaveBeenCalledTimes(2);
    expect(search).toHaveBeenCalledWith(expect.objectContaining({
      query: 'modern home sofa',
      category: 'sofa',
      budgetMax: 300000,
      currency: 'HUF',
      locale: 'hu-HU',
    }));
    expect(search).toHaveBeenCalledWith(expect.objectContaining({
      query: 'modern home lighting',
      category: 'lighting',
      budgetMax: 300000,
      currency: 'HUF',
      locale: 'hu-HU',
    }));

    expect(result).toHaveLength(3);
    expect(result.map(candidate => candidate.id)).toEqual([
      'sofa-best',
      'light-good',
      'sofa-weak',
    ]);
    expect(new Set(result.map(candidate => candidate.id)).size).toBe(result.length);
  });
});
