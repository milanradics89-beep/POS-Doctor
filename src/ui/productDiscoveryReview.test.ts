import { describe, expect, it } from 'vitest';
import {
  isCurrentProductDiscoveryResult,
  MAX_REVIEWED_PRODUCT_QUERY_LENGTH,
  normalizeReviewedProductSearchQuery,
} from './productDiscoveryReview';

describe('reviewed product discovery query', () => {
  it('normalizes whitespace and bounds the text before dispatch', () => {
    expect(normalizeReviewedProductSearchQuery('  vintage   desk  lamp  ')).toBe('vintage desk lamp');
    expect(normalizeReviewedProductSearchQuery('x'.repeat(MAX_REVIEWED_PRODUCT_QUERY_LENGTH + 30)))
      .toHaveLength(MAX_REVIEWED_PRODUCT_QUERY_LENGTH);
  });

  it('hides results as soon as the reviewed query changes', () => {
    expect(isCurrentProductDiscoveryResult('  vintage desk lamp  ', 'vintage desk lamp')).toBe(true);
    expect(isCurrentProductDiscoveryResult('vintage desk', 'vintage desk lamp')).toBe(false);
    expect(isCurrentProductDiscoveryResult('x', 'vintage desk lamp')).toBe(false);
    expect(isCurrentProductDiscoveryResult('vintage desk lamp', null)).toBe(false);
  });
});
