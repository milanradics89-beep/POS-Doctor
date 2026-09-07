import type { RankedProduct } from './productRanking';

export type VisualizationResultItem = {
  productId: string;
  productName: string;
  retailer: string;
  priceHuf?: number;
  sourceUrl: string;
};

export type VisualizationResult = {
  imageUri: string;
  items: VisualizationResultItem[];
  totalPriceHuf?: number;
  generatedFromSourceImage: boolean;
  fidelityWarnings: string[];
};

export function buildVisualizationResult(imageUri: string, products: RankedProduct[]): VisualizationResult {
  const items = products.map(product => ({
    productId: product.id,
    productName: product.name,
    retailer: product.retailer,
    priceHuf: product.priceHuf,
    sourceUrl: product.url,
  }));
  const priced = items.every(item => item.priceHuf !== undefined);
  return {
    imageUri,
    items,
    totalPriceHuf: priced ? items.reduce((sum, item) => sum + (item.priceHuf ?? 0), 0) : undefined,
    generatedFromSourceImage: true,
    fidelityWarnings: priced ? [] : ['Total price is incomplete because one or more selected products have no verified price.'],
  };
}
