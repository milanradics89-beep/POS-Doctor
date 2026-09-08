import type { ProductProvider } from '../productCandidateCollector';
import type { ProductCatalogRuntimeOptions } from './productCatalogRuntime';
import { ProductCatalogCandidateProvider } from './productCatalogAdapter';
import { ProductCatalogRuntime } from './productCatalogRuntime';
import type { ProductCatalogRuntimeConfig } from './productCatalogConfig';

/**
 * Creates a Phase 3-compatible ProductProvider without changing the Phase 3
 * collector or decision engine. Phase 4 owns the catalog runtime and adapter.
 */
export function createPhase4ProductProvider(
  config: ProductCatalogRuntimeConfig,
  options: ProductCatalogRuntimeOptions = {},
  providerId = 'phase4-catalog',
): ProductProvider {
  const runtime = new ProductCatalogRuntime(config, options);
  return new ProductCatalogCandidateProvider(runtime, providerId);
}
