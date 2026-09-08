import { describe, expect, it, vi } from 'vitest';
import { createPhase4ProductProvider } from './createPhase4ProductProvider';

describe('createPhase4ProductProvider', () => {
  it('returns a Phase 3 ProductProvider backed by the Phase 4 runtime', async () => {
    const provider = createPhase4ProductProvider(
      { providers: [{ id: 'catalog-a', retailer: 'Retailer A', endpoint: 'https://a.example/catalog' }] },
      {
        factory: () => ({
          search: vi.fn().mockResolvedValue([
            {
              id: 'p-1',
              title: 'Sofa',
              category: 'sofa',
              retailer: 'Retailer A',
              productUrl: 'https://a.example/p-1',
              price: 100000,
              currency: 'HUF',
              available: true,
            },
          ]),
        }),
      },
    );

    const results = await provider.search({
      query: 'modern sofa',
      categories: ['sofa'],
      budgetHuf: 150000,
      preserveExisting: true,
      constraints: {},
      candidateSlots: 6,
    });

    expect(provider.id).toBe('phase4-catalog');
    expect(results).toEqual([expect.objectContaining({
      id: 'p-1',
      title: 'Sofa',
      source: 'Retailer A',
      priceHuf: 100000,
      availability: 'in_stock',
    })]);
  });
});
