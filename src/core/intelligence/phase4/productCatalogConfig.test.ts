import { describe, expect, it, vi } from 'vitest';
import { createProductCatalogProviders, validateProductCatalogConfig } from './productCatalogConfig';
import type { ProductCatalogProviderConfig } from './productCatalogConfig';

describe('productCatalogConfig', () => {
  const base = { id: 'a', retailer: 'Retailer A', endpoint: 'https://a.example/catalog' };

  it('validates provider ids and rejects duplicates', () => {
    expect(() => validateProductCatalogConfig({ providers: [base, base] })).toThrow('Duplicate');
  });

  it('rejects invalid priority and timeout', () => {
    expect(() => validateProductCatalogConfig({ providers: [{ ...base, priority: -1 }] })).toThrow('Priority');
    expect(() => validateProductCatalogConfig({ providers: [{ ...base, timeoutMs: 0 }] })).toThrow('Timeout');
  });

  it('filters disabled providers and orders enabled providers by priority', () => {
    const factory = vi.fn((config: ProductCatalogProviderConfig) => ({ search: vi.fn(async () => []) }));
    createProductCatalogProviders({
      providers: [
        { ...base, id: 'low', priority: 20 },
        { ...base, id: 'disabled', enabled: false, priority: 0 },
        { ...base, id: 'high', priority: 5 },
      ],
    }, factory);

    expect(factory.mock.calls.map(([config]) => config.id)).toEqual(['high', 'low']);
  });

  it('defaults providers to enabled and priority to zero', () => {
    const factory = vi.fn((config: ProductCatalogProviderConfig) => ({ search: vi.fn(async () => []) }));
    createProductCatalogProviders({ providers: [base] }, factory);
    expect(factory.mock.calls[0][0]).toEqual(expect.objectContaining({ id: 'a' }));
  });

  it('allows an injected factory for retailer-specific adapters', () => {
    const provider = { search: vi.fn(async () => []) };
    const factory = vi.fn((_config: ProductCatalogProviderConfig) => provider);
    const result = createProductCatalogProviders({ providers: [base] }, factory);
    expect(result).toEqual([provider]);
  });
});
