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
  it('scores products monotonically around the budget boundary', () => {
    const results = rankProducts(scene, decision(10000), [
      candidate('under', 8000),
      candidate('at', 10000),
      candidate('over', 11000),
      candidate('far-over', 16000),
    ]);
    const byId = Object.fromEntries(results.map(item => [item.id, item.scoreBreakdown.budgetFit]));
    expect(byId.under).toBeCloseTo(0.6);
    expect(byId.at).toBe(0.5);
    expect(byId.over).toBeCloseTo(0.4);
    expect(byId['far-over']).toBe(0);
    expect(byId.under).toBeGreaterThan(byId.at);
    expect(byId.at).toBeGreaterThan(byId.over);
  });

  it('gives unpriced products a lower budget confidence than priced products', () => {
    const results = rankProducts(scene, decision(10000), [
      candidate('priced', 9000),
      { ...candidate('unknown-price', 0), priceHuf: undefined },
    ]);
    const byId = Object.fromEntries(results.map(item => [item.id, item.scoreBreakdown.budgetFit]));
    expect(byId.priced).toBeCloseTo(0.55);
    expect(byId['unknown-price']).toBe(0.35);
  });

  it('matches category names case-insensitively and penalizes unknown availability', () => {
    const results = rankProducts(scene, decision(10000), [
      { ...candidate('category-case', 5000), category: 'SOFA', availability: 'unknown' },
      { ...candidate('wrong-category', 5000), category: 'lamp', availability: 'unknown' },
    ]);
    const byId = Object.fromEntries(results.map(item => [item.id, item.scoreBreakdown]));
    expect(byId['category-case'].categoryFit).toBe(1);
    expect(byId['wrong-category'].categoryFit).toBe(0.35);
    expect(byId['category-case'].availability).toBe(0.35);
  });

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

  it('matches normalized style and color tag arrays without throwing on malformed preferences', () => {
    const tagged = { ...candidate('tagged', 10000), attributes: { styleTags: ['Scandinavian', 'Minimalist'], colorTags: ['Warm White'] } };
    const result = rankProducts(scene, {
      ...decision(20000),
      constraints: { preferredStyles: [' scandinavian ', 7, null], preferredColors: ['warm white'] },
    }, [tagged as ProductCandidate]);
    expect(result[0].scoreBreakdown.styleFit).toBe(1);
    expect(result[0].scoreBreakdown.colorFit).toBe(1);
    expect(Number.isFinite(result[0].score)).toBe(true);
  });

  it('handles empty and malformed preferred attribute arrays deterministically', () => {
    const result = rankProducts(scene, { ...decision(20000), constraints: { preferredStyles: [null, 4], preferredColors: [] } }, [candidate('plain', 10000)]);
    expect(result[0].scoreBreakdown.styleFit).toBe(0.5);
    expect(result[0].scoreBreakdown.colorFit).toBe(0.5);
  });
});
