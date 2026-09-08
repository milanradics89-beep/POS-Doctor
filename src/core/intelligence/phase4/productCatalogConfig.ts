import type { ProductCatalogProvider } from './productCatalog';
import { ProductCatalogHttpProvider } from './productCatalogHttpProvider';

export type ProductCatalogProviderConfig = {
  id: string;
  retailer: string;
  endpoint: string;
  enabled?: boolean;
  priority?: number;
  timeoutMs?: number;
};

export type ProductCatalogRuntimeConfig = {
  providers: readonly ProductCatalogProviderConfig[];
};

export type ProductCatalogProviderFactory = (
  config: ProductCatalogProviderConfig,
) => ProductCatalogProvider;

export function validateProductCatalogConfig(config: ProductCatalogRuntimeConfig): void {
  if (!config || !Array.isArray(config.providers)) {
    throw new Error('Product catalog configuration must contain a providers array.');
  }

  const ids = new Set<string>();
  for (const provider of config.providers) {
    if (!provider.id?.trim()) throw new Error('Product catalog provider id is required.');
    if (ids.has(provider.id)) throw new Error(`Duplicate product catalog provider id: ${provider.id}`);
    ids.add(provider.id);
    if (!provider.retailer?.trim()) throw new Error(`Retailer is required for provider: ${provider.id}`);
    if (!provider.endpoint?.trim()) throw new Error(`Endpoint is required for provider: ${provider.id}`);
    if (!/^https?:\/\//i.test(provider.endpoint)) throw new Error(`Endpoint must use HTTP(S) for provider: ${provider.id}`);
    if (provider.priority !== undefined && (!Number.isInteger(provider.priority) || provider.priority < 0)) {
      throw new Error(`Priority must be a non-negative integer for provider: ${provider.id}`);
    }
    if (provider.timeoutMs !== undefined && (!Number.isFinite(provider.timeoutMs) || provider.timeoutMs <= 0)) {
      throw new Error(`Timeout must be greater than zero for provider: ${provider.id}`);
    }
  }
}

export function createProductCatalogProviders(
  config: ProductCatalogRuntimeConfig,
  factory: ProductCatalogProviderFactory = provider => new ProductCatalogHttpProvider(provider),
): ProductCatalogProvider[] {
  validateProductCatalogConfig(config);
  return config.providers
    .filter(provider => provider.enabled !== false)
    .slice()
    .sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))
    .map(factory);
}
