import type { ProductCandidate, ProductProvider } from './productCandidateCollector';
import type { ShoppingDecision } from './shoppingDecisionEngine';
import { fetchWithPolicy } from './request';

type DiscoveryCandidate = {
  id?: unknown;
  name?: unknown;
  url?: unknown;
  retailer?: unknown;
  imageUrl?: unknown;
  price?: unknown;
  priceHuf?: unknown;
  currency?: unknown;
  availability?: unknown;
  brand?: unknown;
  category?: unknown;
  color?: unknown;
  material?: unknown;
  evidence?: unknown;
  qualityScore?: unknown;
  searchRank?: unknown;
};

type DiscoveryResponse = {
  query?: unknown;
  candidates?: unknown;
};

function safeHttpUrl(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return undefined;
  try {
    const parsed = new URL(value.trim());
    if (!['https:', 'http:'].includes(parsed.protocol) || !parsed.hostname || parsed.username || parsed.password) return undefined;
    if (parsed.port && parsed.port !== (parsed.protocol === 'https:' ? '443' : '80')) return undefined;
    return parsed.toString();
  } catch {
    return undefined;
  }
}

function textValue(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function finiteNonNegative(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : undefined;
}

const API_BASE_URL = process.env.EXPO_PUBLIC_USEIT_API_URL ?? '';

export const googleProductProvider: ProductProvider = {
  id: 'google-web-search',

  async search(decision: ShoppingDecision): Promise<ProductCandidate[]> {
    const base = API_BASE_URL.trim().replace(/\/$/, '');
    if (!base) throw new Error('USEIT API URL is not configured.');
    const response = await fetchWithPolicy(`${base}/v1/products/discover`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ query: decision.query, limit: Math.min(Math.max(decision.candidateSlots, 6), 20), locale: 'hu-HU', region: 'HU', max_resolve: Math.min(Math.max(decision.candidateSlots, 6), 12) }),
    });
    if (!response.ok) {
      // Keep upstream response bodies out of client-facing errors; they may
      // contain implementation details or provider-supplied sensitive text.
      throw new Error(`Google product discovery failed (${response.status}).`);
    }

    let payload: DiscoveryResponse;
    try {
      payload = await response.json() as DiscoveryResponse;
    } catch {
      throw new Error('Google product discovery returned invalid JSON.');
    }
    if (!payload || typeof payload !== 'object' || !Array.isArray(payload.candidates)) {
      throw new Error('Google product discovery returned an invalid response.');
    }

    const candidates: ProductCandidate[] = [];
    for (const raw of payload.candidates) {
      if (!raw || typeof raw !== 'object') continue;
      const item = raw as DiscoveryCandidate;
      const url = safeHttpUrl(item.url);
      const name = textValue(item.name);
      if (!url || !name || item.availability === 'out_of_stock') continue;

      const priceHuf = finiteNonNegative(item.priceHuf)
        ?? (textValue(item.currency)?.toUpperCase() === 'HUF' ? finiteNonNegative(item.price) : undefined);
      const evidence = Array.isArray(item.evidence)
        ? item.evidence.filter((entry): entry is string => typeof entry === 'string' && Boolean(entry.trim())).map(entry => entry.trim())
        : [];
      const qualityScore = finiteNonNegative(item.qualityScore);
      const searchRank = finiteNonNegative(item.searchRank);
      const retailer = textValue(item.retailer);
      const imageUrl = safeHttpUrl(item.imageUrl);
      const brand = textValue(item.brand);
      const productCategory = textValue(item.category);
      const color = textValue(item.color);
      const material = textValue(item.material);
      const id = textValue(item.id) ?? url;

      candidates.push({
        id,
        title: name,
        url,
        ...(priceHuf !== undefined ? { priceHuf: Math.round(priceHuf) } : {}),
        category: decision.categories[0] ?? 'general',
        attributes: {
          ...(brand ? { brand } : {}),
          ...(productCategory ? { productCategory } : {}),
          ...(color ? { color } : {}),
          ...(material ? { material } : {}),
          ...(retailer ? { retailer } : {}),
          ...(imageUrl ? { imageUrl } : {}),
          ...(qualityScore !== undefined ? { qualityScore } : {}),
          ...(searchRank !== undefined ? { searchRank } : {}),
          evidence,
        },
        availability: item.availability === 'in_stock' ? 'in_stock' : 'unknown',
        source: retailer ?? 'google-web-search',
      });
    }
    return candidates;
  },
};
