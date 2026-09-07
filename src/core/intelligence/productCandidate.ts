export type ProductCandidate = {
  id: string;
  name: string;
  retailer: string;
  url: string;
  priceHuf?: number;
  currency: 'HUF';
  availability: 'in_stock' | 'limited' | 'out_of_stock' | 'unknown';
  dimensions?: { widthCm?: number; heightCm?: number; depthCm?: number };
  category: 'furniture' | 'lighting' | 'decor' | 'storage' | 'textiles' | 'other';
  imageUrl?: string;
  styleTags: string[];
  colorTags: string[];
  evidence: string[];
  uncertainty: string[];
};

export function isPurchasableCandidate(candidate: ProductCandidate): boolean {
  return Boolean(candidate.id && candidate.name && candidate.retailer && candidate.url && candidate.availability !== 'out_of_stock');
}
