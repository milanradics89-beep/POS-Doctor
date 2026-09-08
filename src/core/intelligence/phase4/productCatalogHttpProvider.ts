import type { ProductCatalogItem, ProductCatalogProvider, ProductCatalogQuery } from './productCatalog';

export type ProductCatalogHttpProviderOptions = {
  endpoint: string;
  retailer: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
};

/**
 * Generic Phase 4 HTTP catalog adapter.
 * The retailer-specific response mapping stays outside the Phase 3 intelligence layer.
 */
export class ProductCatalogHttpProvider implements ProductCatalogProvider {
  private readonly timeoutMs: number;
  private readonly fetchImpl: typeof fetch;

  constructor(private readonly options: ProductCatalogHttpProviderOptions) {
    this.timeoutMs = options.timeoutMs ?? 5000;
    this.fetchImpl = options.fetchImpl ?? fetch;
    if (!/^https?:\/\//i.test(options.endpoint)) {
      throw new Error('Product catalog endpoint must use HTTP(S).');
    }
  }

  async search(query: ProductCatalogQuery): Promise<ProductCatalogItem[]> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const url = new URL(this.options.endpoint);
      url.searchParams.set('query', query.query);
      if (query.category) url.searchParams.set('category', query.category);
      if (query.budgetMax !== undefined) url.searchParams.set('budgetMax', String(query.budgetMax));
      if (query.currency) url.searchParams.set('currency', query.currency);
      if (query.locale) url.searchParams.set('locale', query.locale);

      const response = await this.fetchImpl(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Product catalog request failed: HTTP ${response.status}`);
      }

      const payload: unknown = await response.json();
      if (!Array.isArray(payload)) {
        throw new Error('Product catalog response must be an array.');
      }

      return payload.map((item, index) => this.normalizeItem(item, index));
    } finally {
      clearTimeout(timeout);
    }
  }

  private normalizeItem(value: unknown, index: number): ProductCatalogItem {
    if (!value || typeof value !== 'object') {
      throw new Error(`Invalid product catalog item at index ${index}.`);
    }

    const item = value as Record<string, unknown>;
    if (typeof item.id !== 'string' || typeof item.title !== 'string' || typeof item.category !== 'string') {
      throw new Error(`Invalid product catalog item at index ${index}: id, title and category are required.`);
    }

    if (item.productUrl !== undefined && typeof item.productUrl !== 'string') {
      throw new Error(`Invalid productUrl at index ${index}.`);
    }

    if (item.price !== undefined && (typeof item.price !== 'number' || !Number.isFinite(item.price) || item.price < 0)) {
      throw new Error(`Invalid price at index ${index}.`);
    }

    if (item.currency !== undefined && typeof item.currency !== 'string') {
      throw new Error(`Invalid currency at index ${index}.`);
    }

    return {
      id: item.id,
      title: item.title,
      category: item.category,
      price: item.price as number | undefined,
      currency: item.currency as string | undefined,
      imageUrl: typeof item.imageUrl === 'string' ? item.imageUrl : undefined,
      productUrl: item.productUrl as string | undefined,
      retailer: this.options.retailer,
      available: item.available === undefined ? undefined : Boolean(item.available),
      attributes: item.attributes && typeof item.attributes === 'object' ? item.attributes as Record<string, string | number | boolean> : undefined,
    };
  }
}
