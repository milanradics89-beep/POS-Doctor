import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { hu } from '../i18n/hu';

const photoResult = readFileSync(new URL('./PhotoResult.tsx', import.meta.url), 'utf8');

describe('product discovery query review contract', () => {
  it('shows the exact editable text query before the product-search action', () => {
    const reviewField = photoResult.indexOf('accessibilityLabel={hu.result.whatToSearch}');
    const searchAction = photoResult.indexOf('label={hu.result.findMatchingProducts}');

    expect(reviewField).toBeGreaterThan(-1);
    expect(searchAction).toBeGreaterThan(reviewField);
    expect(photoResult).toContain('value={discovery.reviewedQuery}');
    expect(photoResult).toContain('onChangeText={discovery.setReviewedQuery}');
    expect(photoResult).toContain('{hu.result.findMatchingProductsHint}');
    expect(hu.result.findMatchingProductsHint).toContain('A fotót nem küldi el újra.');
  });

  it('normalizes and bounds the user-reviewed query before external discovery', () => {
    expect(photoResult).toContain("value.replace(/\\s+/g, ' ').trim().slice(0, 200)");
    expect(photoResult).toContain('const query = normalizeReviewedProductSearchQuery(reviewedQuery)');
    expect(photoResult).toContain('discoverProducts(\n        query,');
  });
});
