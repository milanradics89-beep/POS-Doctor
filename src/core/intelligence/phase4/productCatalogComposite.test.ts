import { describe, expect, it, vi } from 'vitest';
import { CompositeProductCatalogProvider } from './productCatalogComposite';
import type { ProductCatalogQuery } from './productCatalog';

const query: ProductCatalogQuery = {
  query: 'modern beige sofa',
  category: 'sofa',
  budgetMax: 500000,
  currency: 'HUF',
  locale: 'hu-HU',
};

describe('CompositeProductCatalogProvider', () => {
  it('queries every provider with the same catalog query and preserves provider order', async () => {
    const first = vi.fn().mockResolvedValue([
      {
        id: 'a-1',
        title: 'A sofa',
        category: 'sofa',
        retailer: 'Retailer A',
        productUrl: 'https://a.example/a-1',
      },
    ]);
    const second = vi.fn().mockResolvedValue([
      {
        id: 'b-1',
        title: 'B sofa',
        category: 'sofa',
        retailer: 'Retailer B',
        productUrl: 'https://b.example/b-1',
      },
    ]);

    const provider = new CompositeProductCatalogProvider([
      { search: first },
      { search: second },
    ]);

    await expect(provider.search(query)).resolves.toEqual([
      expect.objectContaining({ id: 'a-1' }),
      expect.objectContaining({ id: 'b-1' }),
    ]);
    expect(first).toHaveBeenCalledWith(query);
    expect(second).toHaveBeenCalledWith(query);
  });

  it('deduplicates the same retailer and product id deterministically', async () => {
    const provider = new CompositeProductCatalogProvider([
      {
        search: vi.fn().mockResolvedValue([
          {
            id: 'same-1',
            title: 'First title',
            category: 'sofa',
            retailer: 'Retailer A',
            productUrl: 'https://a.example/same-1',
          },
        ]),
      },
      {
        search: vi.fn().mockResolvedValue([
          {
            id: 'same-1',
            title: 'Duplicate title',
            category: 'sofa',
            retailer: 'Retailer A',
            productUrl: 'https://a.example/same-1',
          },
          {
            id: 'same-1',
            title: 'Same id, different retailer',
            category: 'sofa',
            retailer: 'Retailer B',
            productUrl: 'https://b.example/same-1',
          },
        ]),
      },
    ]);

    const results = await provider.search(query);

    expect(results).toHaveLength(2);
    expect(results[0].title).toBe('First title');
    expect(results[1].retailer).toBe('Retailer B');
  });

  it('returns an empty list when no catalog providers are configured', async () => {
    const provider = new CompositeProductCatalogProvider([]);

    await expect(provider.search(query)).resolves.toEqual([]);
  });
});
