import { describe, expect, it } from 'vitest';
import { rankProducts } from './productRankingEngine';
import type { ProductCandidate, ShoppingDecision } from './shoppingDecisionEngine';
import type { SceneModel } from './sceneModel';

const scene: SceneModel = {
  imageId: 'test',
  domain: 'room',
  objects: [],
  relations: [],
  globalAttributes: {},
};

const decision = (budgetHuf: number): ShoppingDecision => ({
  query: 'room sofa',
  categories: ['sofa'],
  budgetHuf,
  preserveExisting: true,
  constraints: {},
  candidateSlots: 6,
});

const candidate = (id: string, priceHuf: number): ProductCandidate => ({
  id,
  title: id,
  url: `https://example.test/${id}`,
  priceHuf,
  category: 'sofa',
  attributes: {},
  availability: 'in_stock',
  source: 'test',
});

describe('rankProducts', () => {
  it('scores a zero-price candidate perfectly against a zero budget', () => {
    const [result] = rankProducts(scene, decision(0), [candidate('free', 0)]);
    expect(result.scoreBreakdown.budgetFit).toBe(1);
    expect(Number.isFinite(result.score)).toBe(true);
  });

  it('scores a priced candidate outside a zero budget at zero budget fit', () => {
    const [result] = rankProducts(scene, decision(0), [candidate('paid', 1)]);
    expect(result.scoreBreakdown.budgetFit).toBe(0);
    expect(Number.isFinite(result.score)).toBe(true);
  });

  it('keeps all ranking scores finite for invalid numeric inputs', () => {
    const invalid = candidate('invalid', Number.NaN);
    const result = rankProducts(scene, { ...decision(100000), budgetHuf: Number.NaN }, [invalid]);
    expect(Number.isFinite(result[0].score)).toBe(true);
    expect(Object.values(result[0].scoreBreakdown).every(Number.isFinite)).toBe(true);
  });

  it('uses deterministic title and id tie-breakers', () => {
    const results = rankProducts(scene, decision(100000), [candidate('b', 10000), candidate('a', 10000)]);
    expect(results.map(item => item.id)).toEqual(['a', 'b']);
  });
});
