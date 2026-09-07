import type { RankedProduct } from './productRanking';
import type { DesignBrief } from './designBrief';

export type VisualizationItem = { productId: string; productName: string; placement: string; sourceUrl: string; imageUrl?: string };
export type VisualizationRequest = {
  sceneType: DesignBrief['sceneType']; sourceImageUri: string; preserveItems: string[];
  items: VisualizationItem[]; constraints: string[]; stylePreferences: string[]; fidelityRules: string[];
};

export function buildVisualizationRequest(brief: DesignBrief, sourceImageUri: string, products: RankedProduct[]): VisualizationRequest {
  return {
    sceneType: brief.sceneType,
    sourceImageUri,
    preserveItems: brief.mustKeep,
    items: products.map(product => ({ productId: product.id, productName: product.name, placement: 'determine from scene geometry; do not invent structural changes', sourceUrl: product.url, imageUrl: product.imageUrl })),
    constraints: brief.constraints,
    stylePreferences: brief.stylePreferences,
    fidelityRules: [
      'Use only the supplied product identities.',
      'Do not silently substitute a visually similar product.',
      'Preserve the source room architecture unless explicitly requested.',
      'If product appearance or placement is uncertain, expose that uncertainty.',
    ],
  };
}
