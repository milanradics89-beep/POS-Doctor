import type { ProductCatalogItem, ProductCatalogProvider, ProductCatalogQuery } from './productCatalog';

export type CompositeProviderOptions = {
  continueOnProviderError?: boolean;
};

/**
 * Combines multiple Phase 4 catalog providers without changing the Phase 3
 * intelligence contract. Provider order is preserved and duplicate catalog
 * records are removed deterministically by retailer + product id.
 */
export class CompositeProductCatalogProvider implements ProductCatalogProvider {
  private readonly continueOnProviderError: boolean;

  constructor(
    private readonly providers: readonly ProductCatalogProvider[],
    options: CompositeProviderOptions = {},
  ) {
    this.continueOnProviderError = options.continueOnProviderError ?? true;
  }

  async search(query: ProductCatalogQuery): Promise<ProductCatalogItem[]> {
    const settled = await Promise.allSettled(
      this.providers.map(provider => provider.search(query)),
    );

    const items: ProductCatalogItem[] = [];
    const seen = new Set<string>();

    for (const result of settled) {
      if (result.status === 'rejected') {
        if (!this.continueOnProviderError) {
          throw result.reason;
        }
        continue;
      }

      for (const item of result.value) {
        const key = `${item.retailer}\u0000${item.id}`;
        if (seen.has(key)) continue;
        seen.add(key);
        items.push(item);
      }
    }

    return items;
  }
}
