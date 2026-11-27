import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const source = readFileSync(new URL('./PhotoResult.tsx', import.meta.url), 'utf8');

describe('product discovery review boundary', () => {
  it('shows an editable, bounded query before dispatching product search', () => {
    expect(source).toContain('value={discovery.query}');
    expect(source).toContain('onChangeText={discovery.updateQuery}');
    expect(source).toContain('maxLength={MAX_REVIEWED_PRODUCT_QUERY_LENGTH}');
    expect(source).toContain('const requestQuery = normalizeReviewedProductSearchQuery(query);');
    expect(source).toContain('discoverProducts(\n        requestQuery,');
    expect(source).not.toContain('discoverProducts(\n        query,');
  });

  it('only renders shopping results for the query that produced them', () => {
    expect(source).toContain('isCurrentProductDiscoveryResult(query, submittedQuery)');
    expect(source).toContain('setShopping(null);');
  });
});
