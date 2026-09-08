import type { ProductCatalogItem, ProductCatalogProvider, ProductCatalogQuery } from './productCatalog';
import { CompositeProductCatalogProvider, type CompositeProviderOptions } from './productCatalogComposite';
import {
  createProductCatalogProviders,
  type ProductCatalogProviderFactory,
  type ProductCatalogRuntimeConfig,
} from './productCatalogConfig';

export type ProductCatalogRuntimeOptions = CompositeProviderOptions & {
  factory?: ProductCatalogProviderFactory;
};

/** Builds the runtime catalog provider from validated Phase 4 configuration. */
export class ProductCatalogRuntime implements ProductCatalogProvider {
  private readonly composite: CompositeProductCatalogProvider;

  constructor(config: ProductCatalogRuntimeConfig, options: ProductCatalogRuntimeOptions = {}) {
    const providers = createProductCatalogProviders(config, options.factory);
    this.composite = new CompositeProductCatalogProvider(providers, options);
  }

  search(query: ProductCatalogQuery): Promise<ProductCatalogItem[]> {
    return this.composite.search(query);
  }
}
