import { describe, expect, it } from 'vitest';
import type { ProductCandidate } from '../productCandidateCollector';
import { selectPhase4CandidatesWithCategoryCoverage } from './selectPhase4CandidatesWithCategoryCoverage';

function candidate(id: string, category: string): ProductCandidate {
  return {
    id,
    title: id,
    url: `https://example.com/${id}`,
    category,
    attributes: {},
    availability: 'in_stock',
    source: 'catalog',
  };
}

describe('selectPhase4CandidatesWithCategoryCoverage', () => {
  it('keeps at least one candidate from each requested category when available', () => {
    const ranked = [
      candidate('sofa-1', 'sofa'),
      candidate('sofa-2', 'sofa'),
      candidate('light-1', 'lighting'),
    ];

    expect(selectPhase4CandidatesWithCategoryCoverage(ranked, ['sofa', 'lighting'], 2)
      .map(item => item.id)).toEqual(['sofa-1', 'light-1']);
  });

  it('fills remaining slots in ranked order after coverage is satisfied', () => {
    const ranked = [
      candidate('sofa-1', 'sofa'),
      candidate('sofa-2', 'sofa'),
      candidate('light-1', 'lighting'),
      candidate('decor-1', 'decor'),
    ];

    expect(selectPhase4CandidatesWithCategoryCoverage(ranked, ['sofa', 'lighting'], 4)
      .map(item => item.id)).toEqual(['sofa-1', 'light-1', 'sofa-2', 'decor-1']);
  });

  it('does not exceed the requested limit', () => {
    const ranked = [candidate('1', 'sofa'), candidate('2', 'lighting'), candidate('3', 'decor')];

    expect(selectPhase4CandidatesWithCategoryCoverage(ranked, ['sofa', 'lighting', 'decor'], 2))
      .toHaveLength(2);
  });

  it('normalizes category whitespace and casing', () => {
    const ranked = [candidate('light-1', ' Lighting ')];

    expect(selectPhase4CandidatesWithCategoryCoverage(ranked, ['lighting'], 1)
      .map(item => item.id)).toEqual(['light-1']);
  });

  it('returns an empty list for a non-positive limit', () => {
    expect(selectPhase4CandidatesWithCategoryCoverage([candidate('1', 'sofa')], ['sofa'], 0))
      .toEqual([]);
  });
});
