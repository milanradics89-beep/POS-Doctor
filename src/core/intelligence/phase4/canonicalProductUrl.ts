export type CanonicalProductUrlResult = {
  url: string;
  canonical: boolean;
};

/**
 * Phase 4 URL boundary. Catalog URLs remain the source of truth; this helper
 * only normalizes obvious whitespace and rejects non-http(s) destinations.
 * Affiliate/deep-link rewriting is intentionally deferred until a provider
 * supplies an approved link strategy.
 */
export function canonicalizeProductUrl(value: string): CanonicalProductUrlResult | null {
  const url = value.trim();
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    return { url: parsed.toString(), canonical: true };
  } catch {
    return null;
  }
}
