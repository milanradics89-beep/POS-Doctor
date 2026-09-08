import type { ProductProvider } from './productCandidateCollector';
import type { ProductCandidate, ShoppingDecision } from './shoppingDecisionEngine';
import type { CandidateProvider } from './candidateProvider';
import type { Candidate } from './candidate';
import type { CandidateSearchRequest } from './needCandidates';

const PRODUCTS: ProductCandidate[] = [
  { id: 'mock-sofa-01', title: 'Modern 3-seat sofa', category: 'sofa', priceHuf: 129900, url: 'https://example.com/sofa-01', source: 'mock', availability: 'in_stock', attributes: { style: 'modern', color: 'beige' } },
  { id: 'mock-table-01', title: 'Oak coffee table', category: 'coffee_table', priceHuf: 44900, url: 'https://example.com/table-01', source: 'mock', availability: 'in_stock', attributes: { style: 'modern', color: 'oak' } },
  { id: 'mock-lamp-01', title: 'Minimal floor lamp', category: 'lighting', priceHuf: 29900, url: 'https://example.com/lamp-01', source: 'mock', availability: 'in_stock', attributes: { style: 'minimal', color: 'black', subtype: 'floor_lamp' } },
  { id: 'mock-rug-01', title: 'Neutral textured rug', category: 'rug', priceHuf: 35900, url: 'https://example.com/rug-01', source: 'mock', availability: 'in_stock', attributes: { style: 'modern', color: 'beige' } },
  { id: 'mock-chair-01', title: 'Accent lounge chair', category: 'chair', priceHuf: 69900, url: 'https://example.com/chair-01', source: 'mock', availability: 'in_stock', attributes: { style: 'modern', color: 'olive' } },
];

export const mockProductProvider: ProductProvider = {
  id: 'mock',
  async search(decision: ShoppingDecision): Promise<ProductCandidate[]> {
    const allowed = new Set(decision.categories);
    return PRODUCTS.filter(product => allowed.size === 0 || allowed.has(product.category));
  },
};

export const mockCandidateProvider: CandidateProvider = {
  id: 'mock',
  supports: (_request: CandidateSearchRequest) => true,
  async search(_request: CandidateSearchRequest): Promise<Candidate[]> {
    return PRODUCTS.map(product => ({
      id: product.id,
      kind: 'product',
      name: product.title,
      retailer: 'USEIT mock catalog',
      url: product.url,
      priceHuf: product.priceHuf,
      currency: 'HUF',
      availability: product.availability,
      category: product.category,
      styleTags: [String(product.attributes.style ?? '')].filter(Boolean),
      colorTags: [String(product.attributes.color ?? '')].filter(Boolean),
      evidence: ['Mock catalog candidate for Phase 3 runtime validation.'],
      uncertainty: ['Product data is synthetic and must not be treated as a real retailer offer.'],
    }));
  },
};
