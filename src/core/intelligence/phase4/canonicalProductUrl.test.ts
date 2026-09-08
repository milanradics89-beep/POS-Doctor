import { describe, expect, it } from 'vitest';
import { canonicalizeProductUrl } from './canonicalProductUrl';

describe('canonicalizeProductUrl', () => {
  it('trims and normalizes a valid HTTPS URL', () => {
    expect(canonicalizeProductUrl('  https://example.com/product/123  ')).toEqual({
      url: 'https://example.com/product/123',
      canonical: true,
    });
  });

  it('accepts HTTP URLs', () => {
    expect(canonicalizeProductUrl('http://example.com/product')).toEqual({
      url: 'http://example.com/product',
      canonical: true,
    });
  });

  it('rejects empty, malformed and non-web URLs', () => {
    expect(canonicalizeProductUrl('')).toBeNull();
    expect(canonicalizeProductUrl('not-a-url')).toBeNull();
    expect(canonicalizeProductUrl('javascript:alert(1)')).toBeNull();
  });
});
