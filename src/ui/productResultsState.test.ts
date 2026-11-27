import { describe, expect, it } from 'vitest';
import { productResultsState } from './productResultsState';

describe('product results', () => {
  it('distinguishes a completed empty search from failure and insufficient context', () => {
    expect(productResultsState(0, { query: 'chair', candidates: [] }, true)).toBe('empty');
    expect(productResultsState(0, { query: 'chair', candidates: [], errors: [{url: '', message: 'search failed'}] }, true)).toBe('unavailable');
    expect(productResultsState(0, null, true)).toBe('unavailable');
    expect(productResultsState(0, null, false)).toBe('needs-context');
  });

  it('keeps usable candidates when just one product resolution failed', () => {
    expect(productResultsState(1, { query: 'chair', candidates: [], errors: [{url: 'https://store.example/item', message: 'not found'}] }, true)).toBe('matches');
  });
});
