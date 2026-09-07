import type { VisualizationRequest } from './visualizationContract';

export type ImageGenerationPayload = {
  sourceImageUri: string;
  prompt: string;
  preserveSource: true;
};

export interface VisualizationAdapter {
  generate(request: VisualizationRequest): Promise<ImageGenerationPayload>;
}

export function toGenerationPayload(request: VisualizationRequest): ImageGenerationPayload {
  const products = request.items.map(item => `${item.productName} [productId=${item.productId}]`).join(', ');
  return {
    sourceImageUri: request.sourceImageUri,
    preserveSource: true,
    prompt: [
      `Redesign this ${request.sceneType} using ONLY these selected products: ${products || 'no new products'}.`,
      request.stylePreferences.length ? `Style: ${request.stylePreferences.join(', ')}.` : '',
      request.preserveItems.length ? `Keep these existing items: ${request.preserveItems.join(', ')}.` : '',
      request.constraints.length ? `Respect these constraints: ${request.constraints.join('; ')}.` : '',
      ...request.fidelityRules,
      'Do not add or replace products that are not in the supplied product list.',
    ].filter(Boolean).join(' '),
  };
}
