import type { ProductCatalogItem, ProductCatalogProvider, ProductCatalogQuery } from './productCatalog';

/**
 * Combines multiple Phase 4 catalog providers without changing the Phase 3
 * intelligence contract. Provider order is preserved and duplicate catalog
 * records are removed deterministically by retailer + product id.
 */
export class CompositeProductCatalogProvider implements ProductCatalogProvider {
  constructor(private readonly providers: readonly ProductCatalogProvider[]) {}

  async search(query: ProductCatalogQuery): Promise<ProductCatalogItem[]> {
    const results = await Promise.all(this.providers.map(provider => provider.search(query)));
    const seen = new Set<string>();
    const items: ProductCatalogItem[] = [];

    for (const providerItems of results) {
      for (const item of providerItems) {
        const key = `${item.retailer}\u0000${item.id}`;
        if (seen.has(key)) continue;
        seen.add(key);
        items.push(item);
      }
    }

    return items;
  }
}
