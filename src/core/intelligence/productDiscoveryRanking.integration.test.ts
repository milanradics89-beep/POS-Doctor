import { describe, expect, it, vi } from 'vitest';
import { collectProductCandidates, type ProductProvider } from './productCandidateCollector';
import { rankProducts } from './productRankingEngine';
import type { ProductCandidate, ShoppingDecision } from './shoppingDecisionEngine';
import type { SceneModel } from './sceneModel';

const scene: SceneModel = {
  imageId: 'integration-test',
  domain: 'room',
  objects: [],
  relations: [],
  globalAttributes: {},
};

const decision: ShoppingDecision = {
  query: 'sofa',
  categories: ['sofa'],
  budgetHuf: 100000,
  preserveExisting: true,
  constraints: {},
  candidateSlots: 6,
};

const product = (overrides: Partial<ProductCandidate> = {}): ProductCandidate => ({
  id: 'sofa-default',
  title: 'Sofa',
  url: 'https://shop.example/sofa',
  priceHuf: 90000,
  category: 'sofa',
  attributes: {},
  availability: 'in_stock',
  source: 'test-provider',
  ...overrides,
});

describe('product discovery to ranking integration', () => {
  it('filters unsafe URLs, deduplicates equivalent products, and ranks the remaining candidates', async () => {
    const providers: ProductProvider[] = [
      {
        id: 'primary',
        search: vi.fn().mockResolvedValue([
          product({ id: 'best-value', title: 'Best Value Sofa', priceHuf: 80000, url: 'https://shop.example/sofa?utm_source=campaign' }),
          product({ id: 'unsafe', title: 'Unsafe Sofa', url: 'javascript:alert(1)' }),
        ]),
      },
      {
        id: 'secondary',
        search: vi.fn().mockResolvedValue([
          product({ id: 'duplicate', title: 'Duplicate Listing', priceHuf: 85000, url: 'https://shop.example/sofa' }),
          product({ id: 'over-budget', title: 'Premium Sofa', priceHuf: 130000, url: 'https://shop.example/premium' }),
        ]),
      },
    ];

    const collection = await collectProductCandidates(decision, providers);
    const ranked = rankProducts(scene, decision, collection.candidates);

    expect(collection.candidates.map(item => item.id)).toEqual(['best-value', 'over-budget']);
    expect(collection.errors).toEqual([
      { provider: 'primary', message: 'Ignored 1 invalid candidate payload.' },
    ]);
    expect(ranked.map(item => item.id)[0]).toBe('best-value');
    expect(ranked.find(item => item.id === 'best-value')?.scoreBreakdown.budgetFit).toBeCloseTo(0.6);
    expect(ranked.find(item => item.id === 'over-budget')?.scoreBreakdown.budgetFit).toBeCloseTo(0.2);
    expect(ranked.every(item => Number.isFinite(item.score))).toBe(true);
  });

  it('keeps collection usable when one provider fails and ranks valid results from another', async () => {
    const providers: ProductProvider[] = [
      { id: 'offline', search: vi.fn().mockRejectedValue(new Error('token=private')) },
      { id: 'healthy', search: vi.fn().mockResolvedValue([product({ id: 'available', priceHuf: 75000 })]) },
    ];

    const collection = await collectProductCandidates(decision, providers);
    const ranked = rankProducts(scene, decision, collection.candidates);

    expect(collection.candidates.map(item => item.id)).toEqual(['available']);
    expect(collection.errors).toEqual([{ provider: 'offline', message: 'Provider request failed.' }]);
    expect(JSON.stringify(collection)).not.toContain('private');
    expect(ranked).toHaveLength(1);
    expect(ranked[0].score).toBeGreaterThan(0);
  });
});
