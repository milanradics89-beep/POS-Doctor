import type { ProductCandidate, ProductProvider } from './productCandidateCollector';
import type { ShoppingDecision } from './shoppingDecisionEngine';

type GoogleSearchItem = {
  id: string;
  title: string;
  url: string;
  source: string;
  snippet?: string;
  rank: number;
};

type GoogleSearchResponse = {
  query: string;
  results: GoogleSearchItem[];
};

const API_BASE_URL = process.env.EXPO_PUBLIC_USEIT_API_URL ?? '';

function normalizeCategory(decision: ShoppingDecision): string {
  return decision.categories[0] ?? 'general';
}

function extractPriceHuf(text: string): number | undefined {
  const match = text.match(/(\d[\d\s.]*)\s*(?:Ft|HUF)/i);
  if (!match) return undefined;
  const value = Number(match[1].replace(/[\s.]/g, ''));
  return Number.isFinite(value) ? value : undefined;
}

export const googleProductProvider: ProductProvider = {
  id: 'google-web-search',

  async search(decision: ShoppingDecision): Promise<ProductCandidate[]> {
    if (!API_BASE_URL) {
      throw new Error('USEIT API URL is not configured.');
    }

    const response = await fetch(`${API_BASE_URL}/v1/products/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: decision.query,
        limit: Math.min(Math.max(decision.candidateSlots, 6), 20),
        locale: 'hu-HU',
        region: 'HU',
      }),
    });

    if (!response.ok) {
      const message = await response.text().catch(() => 'Google search failed');
      throw new Error(`Google product search failed (${response.status}): ${message}`);
    }

    const payload = (await response.json()) as GoogleSearchResponse;
    return payload.results.map((item) => ({
      id: item.id,
      title: item.title,
      url: item.url,
      priceHuf: extractPriceHuf(`${item.title} ${item.snippet ?? ''}`),
      category: normalizeCategory(decision),
      attributes: {
        retailer: item.source,
        googleRank: item.rank,
        snippet: item.snippet ?? '',
      },
      availability: 'unknown',
      source: item.source,
    }));
  },
};
