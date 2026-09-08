import { describe, expect, it } from 'vitest';
import {
  CompositeProductCatalogProvider,
  EmptyProductCatalogProvider,
  ProductCatalogCandidateProvider,
  ProductCatalogHttpProvider,
  ProductCatalogRuntime,
  createPhase4ProductProvider,
  createProductCatalogProviders,
  validateProductCatalogConfig,
} from './index';

describe('Phase 4 public API', () => {
  it('exposes the complete catalog runtime surface', () => {
    expect(CompositeProductCatalogProvider).toBeDefined();
    expect(EmptyProductCatalogProvider).toBeDefined();
    expect(ProductCatalogCandidateProvider).toBeDefined();
    expect(ProductCatalogHttpProvider).toBeDefined();
    expect(ProductCatalogRuntime).toBeDefined();
    expect(createPhase4ProductProvider).toBeDefined();
    expect(createProductCatalogProviders).toBeDefined();
    expect(validateProductCatalogConfig).toBeDefined();
  });
});
