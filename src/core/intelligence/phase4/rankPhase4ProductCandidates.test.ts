import { describe, expect, it } from 'vitest';
import type { ProductCandidate } from '../productCandidateCollector';
import type { ShoppingDecision } from '../shoppingDecisionEngine';
import { rankPhase4ProductCandidates } from './rankPhase4ProductCandidates';

const decision: ShoppingDecision = {
  query: 'room sofa',
  categories: ['sofa'],
  budgetHuf: 500000,
  preserveExisting: true,
  constraints: {
    preferredStyles: ['modern'],
    preferredColors: ['beige'],
  },
  candidateSlots: 6,
};

function candidate(overrides: Partial<ProductCandidate>): ProductCandidate {
  return {
    id: 'candidate',
    title: 'Candidate',
    url: 'https://example.com/candidate',
    category: 'sofa',
    attributes: {},
    availability: 'unknown',
    source: 'test',
    ...overrides,
  };
}

describe('rankPhase4ProductCandidates', () => {
  it('prioritizes in-stock candidates within budget', () => {
    const result = rankPhase4ProductCandidates(
      [
        candidate({ id: 'over', priceHuf: 700000, availability: 'in_stock' }),
        candidate({ id: 'fit', priceHuf: 450000, availability: 'in_stock' }),
      ],
      decision,
    );

    expect(result.map(item => item.id)).toEqual(['fit', 'over']);
  });

  it('rewards preferred style and color attributes', () => {
    const result = rankPhase4ProductCandidates(
      [
        candidate({ id: 'plain', priceHuf: 450000, availability: 'in_stock', attributes: {} }),
        candidate({ id: 'match', priceHuf: 450000, availability: 'in_stock', attributes: { preferredStyles: ['modern'], preferredColors: ['beige'] } }),
      ],
      decision,
    );

    expect(result[0].id).toBe('match');
  });

  it('preserves input order for equal scores', () => {
    const result = rankPhase4ProductCandidates(
      [
        candidate({ id: 'first', priceHuf: 450000, availability: 'in_stock' }),
        candidate({ id: 'second', priceHuf: 450000, availability: 'in_stock' }),
      ],
      decision,
    );

    expect(result.map(item => item.id)).toEqual(['first', 'second']);
  });

  it('does not mutate the input array', () => {
    const input = [
      candidate({ id: 'first', priceHuf: 450000 }),
      candidate({ id: 'second', priceHuf: 300000 }),
    ];
    const originalIds = input.map(item => item.id);

    rankPhase4ProductCandidates(input, decision);

    expect(input.map(item => item.id)).toEqual(originalIds);
  });
});
