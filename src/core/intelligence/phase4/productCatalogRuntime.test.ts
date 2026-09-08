import { describe, expect, it, vi } from 'vitest';
import { ProductCatalogRuntime } from './productCatalogRuntime';

describe('ProductCatalogRuntime', () => {
  it('builds enabled providers in priority order and searches them as one catalog', async () => {
    const calls: string[] = [];
    const factory = vi.fn((config) => ({
      search: vi.fn(async () => {
        calls.push(config.id);
        return [{ id: config.id, title: config.id, category: 'test', retailer: config.retailer }];
      }),
    }));

    const runtime = new ProductCatalogRuntime({
      providers: [
        { id: 'second', retailer: 'B', endpoint: 'https://b.example', priority: 20 },
        { id: 'disabled', retailer: 'X', endpoint: 'https://x.example', enabled: false },
        { id: 'first', retailer: 'A', endpoint: 'https://a.example', priority: 10 },
      ],
    }, { factory });

    await expect(runtime.search({ query: 'test' })).resolves.toEqual([
      expect.objectContaining({ id: 'first' }),
      expect.objectContaining({ id: 'second' }),
    ]);
    expect(calls).toEqual(['first', 'second']);
  });

  it('propagates strict provider error handling to the composite layer', async () => {
    const error = new Error('upstream unavailable');
    const runtime = new ProductCatalogRuntime({
      providers: [{ id: 'broken', retailer: 'A', endpoint: 'https://a.example' }],
    }, {
      factory: () => ({ search: vi.fn().mockRejectedValue(error) }),
      continueOnProviderError: false,
    });

    await expect(runtime.search({ query: 'test' })).rejects.toBe(error);
  });
});
