import type { OpportunityKind } from './types';
import { createPromptPolicy } from './promptPolicy';

export type VisionRequest = { imageUri:string; userIntent?:OpportunityKind; prompt:string; locale:string; responseFormat:'scene_analysis_v1' };

export function buildVisionRequest(imageUri:string,userIntent?:OpportunityKind,locale='hu-HU'):VisionRequest {
  if(!imageUri.trim()) throw new Error('An image is required for vision analysis.');
  const policy=createPromptPolicy(userIntent,locale);
  return {imageUri,userIntent:policy.intent,prompt:policy.system,locale:policy.locale,responseFormat:'scene_analysis_v1'};
}
