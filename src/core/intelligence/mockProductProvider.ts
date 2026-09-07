import type { ProductProvider } from './productCandidateCollector';
import type { ProductCandidate, ShoppingDecision } from './shoppingDecisionEngine';

const PRODUCTS: ProductCandidate[] = [
  { id: 'mock-sofa-01', title: 'Modern 3-seat sofa', category: 'sofa', priceHuf: 129900, url: 'https://example.com/sofa-01', source: 'mock', availability: 'in_stock', attributes: { style: 'modern', color: 'beige' } },
  { id: 'mock-table-01', title: 'Oak coffee table', category: 'coffee_table', priceHuf: 44900, url: 'https://example.com/table-01', source: 'mock', availability: 'in_stock', attributes: { style: 'modern', color: 'oak' } },
  { id: 'mock-lamp-01', title: 'Minimal floor lamp', category: 'floor_lamp', priceHuf: 29900, url: 'https://example.com/lamp-01', source: 'mock', availability: 'in_stock', attributes: { style: 'minimal', color: 'black' } },
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
