import type { ProductCandidate, ProductProvider } from './productCandidateCollector';
import type { ShoppingDecision } from './shoppingDecisionEngine';
import { fetchWithPolicy } from './request';

type DiscoveryResponse = {
  query: string;
  candidates: Array<{
    id: string;
    name: string;
    url: string;
    retailer?: string;
    imageUrl?: string;
    price?: number;
    currency?: string;
    availability?: 'in_stock' | 'limited' | 'out_of_stock' | 'unknown';
    brand?: string;
    evidence?: string[];
    qualityScore?: number;
    searchRank?: number;
  }>;
};

const API_BASE_URL = process.env.EXPO_PUBLIC_USEIT_API_URL ?? '';

export const googleProductProvider: ProductProvider = {
  id: 'google-web-search',

  async search(decision: ShoppingDecision): Promise<ProductCandidate[]> {
    const base = API_BASE_URL.trim().replace(/\/$/, '');
    if (!base) throw new Error('USEIT API URL is not configured.');

    const response = await fetchWithPolicy(`${base}/v1/products/discover`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        query: decision.query,
        limit: Math.min(Math.max(decision.candidateSlots, 6), 20),
        locale: 'hu-HU',
        region: 'HU',
        max_resolve: Math.min(Math.max(decision.candidateSlots, 6), 12),
      }),
    });

    if (!response.ok) {
      const message = await response.text().catch(() => 'Google product discovery failed');
      throw new Error(`Google product discovery failed (${response.status}): ${message}`);
    }

    const payload = await response.json() as DiscoveryResponse;
    return payload.candidates
      .filter(item => item.url && item.name && item.availability !== 'out_of_stock')
      .map(item => ({
        id: item.id,
        title: item.name,
        url: item.url,
        priceHuf: item.currency?.toUpperCase() === 'HUF' && typeof item.price === 'number' ? item.price : undefined,
        category: decision.categories[0] ?? 'general',
        attributes: {
          ...(item.brand ? { brand: item.brand } : {}),
          ...(item.retailer ? { retailer: item.retailer } : {}),
          ...(item.imageUrl ? { imageUrl: item.imageUrl } : {}),
          ...(item.qualityScore !== undefined ? { qualityScore: item.qualityScore } : {}),
          ...(item.searchRank !== undefined ? { searchRank: item.searchRank } : {}),
          evidence: item.evidence ?? [],
        },
        availability: item.availability === 'in_stock' ? 'in_stock' : 'unknown',
        source: item.retailer ?? 'google-web-search',
      }));
  },
};
