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
    expect(result.errors).toEqual([{ provider: 'broken', message: 'upstream unavailable' }]);
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
});
