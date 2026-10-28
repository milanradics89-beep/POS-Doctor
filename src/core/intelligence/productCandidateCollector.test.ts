import { describe, expect, it, vi } from 'vitest';
import { collectProductCandidates, type ProductProvider } from './productCandidateCollector';
import type { ProductCandidate, ShoppingDecision } from './shoppingDecisionEngine';

const decision: ShoppingDecision = {
  query: 'room sofa',
  categories: ['sofa'],
  preserveExisting: true,
  constraints: {},
  candidateSlots: 6,
};

const candidate = (overrides: Partial<ProductCandidate> = {}): ProductCandidate => ({
  id: 'p-1',
  title: 'Sofa',
  url: 'https://shop.example/p-1',
  category: 'sofa',
  attributes: { material: 'linen' },
  source: 'test',
  availability: 'in_stock',
  ...overrides,
  it('canonicalizes accepted candidate URLs before returning them', async () => {
    const providers: ProductProvider[] = [{
      id: 'canonical',
      search: vi.fn().mockResolvedValue([
        candidate({ url: 'HTTPS://Shop.Example/p-1/?utm_source=campaign&b=2&a=1#details' }),
      ]),
    }];
    const result = await collectProductCandidates(decision, providers);
    expect(result.candidates[0].url).toBe('https://shop.example/p-1?a=1&b=2');
  });

  it('rejects candidates with malformed nested attribute values', async () => {
    const providers: ProductProvider[] = [{
      id: 'malformed-attributes',
      search: vi.fn().mockResolvedValue([
        candidate({ id: 'nested', attributes: { material: { name: 'linen' } } as never }),
        candidate({ id: 'infinite', attributes: { weight: Number.POSITIVE_INFINITY } }),
        candidate({ id: 'valid', attributes: { material: 'linen', tags: ['soft', 'neutral'] } }),
      ]),
    }];
    const result = await collectProductCandidates(decision, providers);
    expect(result.candidates.map(item => item.id)).toEqual(['valid']);
    expect(result.errors).toEqual([{ provider: 'malformed-attributes', message: 'Ignored 2 invalid candidate payloads.' }]);
  });

});

describe('collectProductCandidates', () => {
  it('keeps provider identity when a provider fails', async () => {
    const providers: ProductProvider[] = [
      { id: 'good', search: vi.fn().mockResolvedValue([candidate()]) },
      { id: 'broken', search: vi.fn().mockRejectedValue(new Error('upstream unavailable')) },
    ];

    const result = await collectProductCandidates(decision, providers);

    expect(result.candidates).toHaveLength(1);
    expect(result.providersUsed).toEqual(['good']);
    expect(result.errors).toEqual([{ provider: 'broken', message: 'Provider request failed.' }]);
  });

  it('ignores malformed provider candidates without failing the collection', async () => {
    const providers: ProductProvider[] = [
      {
        id: 'mixed',
        search: vi.fn().mockResolvedValue([
          candidate(),
          { id: '', title: 'Broken', url: 'https://shop.example/broken', category: 'sofa', attributes: {}, source: 'test' },
          null,
        ] as never),
      },
    ];

    const result = await collectProductCandidates(decision, providers);

    expect(result.candidates).toHaveLength(1);
    expect(result.candidates[0].id).toBe('p-1');
    expect(result.providersUsed).toEqual(['mixed']);
    expect(result.errors).toEqual([{ provider: 'mixed', message: 'Ignored 2 invalid candidate payloads.' }]);
  });

  it('reports a non-array provider payload as a provider error', async () => {
    const providers: ProductProvider[] = [
      { id: 'malformed', search: vi.fn().mockResolvedValue({ candidates: [] } as never) },
    ];

    const result = await collectProductCandidates(decision, providers);

    expect(result.candidates).toEqual([]);
    expect(result.providersUsed).toEqual([]);
    expect(result.errors).toEqual([{ provider: 'malformed', message: 'Provider returned a non-array candidate payload.' }]);
  });

  it('deduplicates candidates by URL after validation', async () => {
    const providers: ProductProvider[] = [
      { id: 'a', search: vi.fn().mockResolvedValue([candidate()]) },
      { id: 'b', search: vi.fn().mockResolvedValue([candidate({ id: 'p-2', source: 'other' })]) },
    ];

    const result = await collectProductCandidates(decision, providers);

    expect(result.candidates).toHaveLength(1);
    expect(result.candidates[0].id).toBe('p-1');
    expect(result.providersUsed).toEqual(['a', 'b']);
  });

  it('deduplicates tracking variants and URL fragments of the same product', async () => {
    const providers: ProductProvider[] = [
      { id: 'a', search: vi.fn().mockResolvedValue([candidate({ url: 'https://shop.example/p-1?utm_source=google&utm_campaign=summer#details' })]) },
      { id: 'b', search: vi.fn().mockResolvedValue([candidate({ id: 'p-2', url: 'https://shop.example/p-1?utm_medium=cpc', source: 'other' })]) },
    ];

    const result = await collectProductCandidates(decision, providers);

    expect(result.candidates).toHaveLength(1);
    expect(result.candidates[0].id).toBe('p-1');
  });

  it('rejects unsafe candidate URLs before ranking', async () => {
    const providers: ProductProvider[] = [{
      id: 'unsafe',
      search: vi.fn().mockResolvedValue([
        candidate({ id: 'js', url: 'javascript:alert(1)' }),
        candidate({ id: 'credentials', url: 'https://user:pass@shop.example/product' }),
        candidate({ id: 'port', url: 'https://shop.example:8443/product' }),
        candidate({ id: 'safe', url: 'https://shop.example/product' }),
      ]),
    }];
    const result = await collectProductCandidates(decision, providers);
    expect(result.candidates.map(item => item.id)).toEqual(['safe']);
    expect(result.errors).toEqual([{ provider: 'unsafe', message: 'Ignored 3 invalid candidate payloads.' }]);
  });

  it('normalizes trailing slashes and query order for duplicate detection', async () => {
    const providers: ProductProvider[] = [
      { id: 'a', search: vi.fn().mockResolvedValue([candidate({ url: 'https://shop.example/product/?b=2&a=1' })]) },
      { id: 'b', search: vi.fn().mockResolvedValue([candidate({ id: 'second', url: 'https://shop.example/product?a=1&b=2' })]) },
    ];
    const result = await collectProductCandidates(decision, providers);
    expect(result.candidates).toHaveLength(1);
  });

  it('does not expose raw provider exception messages', async () => {
    const providers: ProductProvider[] = [{ id: 'leaky', search: vi.fn().mockRejectedValue(new Error('secret-token=abc')) }];
    const result = await collectProductCandidates(decision, providers);
    expect(result.errors).toEqual([{ provider: 'leaky', message: 'Provider request failed.' }]);
    expect(JSON.stringify(result)).not.toContain('secret-token');
  });
});
