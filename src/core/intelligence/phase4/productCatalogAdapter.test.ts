import { describe, expect, it, vi } from 'vitest';
import { ProductCatalogCandidateProvider } from './productCatalogAdapter';
import type { ProductCatalogProvider } from './productCatalog';
import type { ShoppingDecision } from '../shoppingDecisionEngine';

const decision: ShoppingDecision = {
  query: 'room sofa modern beige',
  categories: ['sofa', 'lighting'],
  budgetHuf: 500000,
  preserveExisting: true,
  constraints: { preferredStyles: ['modern'], preferredColors: ['beige'] },
  candidateSlots: 8,
};

describe('ProductCatalogCandidateProvider', () => {
  it('maps a valid catalog item into the existing candidate contract', async () => {
    const search = vi.fn().mockResolvedValue([
      {
        id: 'sku-1',
        title: 'Modern beige sofa',
        category: 'furniture',
        price: 299000,
        currency: 'HUF',
        retailer: 'Example Retailer',
        productUrl: 'https://example.com/sku-1',
        imageUrl: 'https://example.com/sku-1.jpg',
        available: true,
        attributes: { style: 'modern', color: 'beige', widthCm: 220 },
      },
    ]);
    const provider = new ProductCatalogCandidateProvider({ search });

    const candidates = await provider.search(decision);

    expect(search).toHaveBeenCalledWith({
      query: decision.query,
      category: 'sofa',
      budgetMax: 500000,
      currency: 'HUF',
      locale: 'hu-HU',
    });
    expect(candidates).toHaveLength(1);
    expect(candidates[0]).toMatchObject({
      id: 'sku-1',
      title: 'Modern beige sofa',
      url: 'https://example.com/sku-1',
      priceHuf: 299000,
      source: 'Example Retailer',
      availability: 'in_stock',
    });
  });

  it('does not invent a HUF price for a non-HUF catalog item', async () => {
    const catalog: ProductCatalogProvider = {
      search: vi.fn().mockResolvedValue([
        {
          id: 'sku-eur',
          title: 'Imported chair',
          category: 'furniture',
          price: 900,
          currency: 'EUR',
          retailer: 'Example EU Retailer',
          productUrl: 'https://example.eu/sku-eur',
          available: true,
        },
      ]),
    };
    const provider = new ProductCatalogCandidateProvider(catalog);

    const candidates = await provider.search(decision);

    expect(candidates[0]).not.toHaveProperty('priceHuf');
  });

  it('drops catalog items without a canonical product URL', async () => {
    const catalog: ProductCatalogProvider = {
      search: vi.fn().mockResolvedValue([
        {
          id: 'sku-no-url',
          title: 'Unlinkable product',
          category: 'furniture',
          retailer: 'Example Retailer',
        },
      ]),
    };
    const provider = new ProductCatalogCandidateProvider(catalog);

    await expect(provider.search(decision)).resolves.toEqual([]);
  });
});
