export type ProductCatalogItem = {
  id: string;
  title: string;
  category: string;
  price?: number;
  currency?: string;
  imageUrl?: string;
  productUrl?: string;
  retailer: string;
  available?: boolean;
  attributes?: Record<string, string | number | boolean>;
};

export type ProductCatalogQuery = {
  query: string;
  category?: string;
  budgetMax?: number;
  currency?: string;
  locale?: string;
};

export interface ProductCatalogProvider {
  search(query: ProductCatalogQuery): Promise<ProductCatalogItem[]>;
}

/**
 * Phase 4 boundary for real product data.
 *
 * The provider owns catalog/retailer access only. Existing Phase 3 candidate,
 * ranking, solution and redesign logic remains responsible for intelligence.
 */
export class EmptyProductCatalogProvider implements ProductCatalogProvider {
  async search(_query: ProductCatalogQuery): Promise<ProductCatalogItem[]> {
    return [];
  }
}
