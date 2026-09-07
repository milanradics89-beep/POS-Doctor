import type { IntelligenceProvider, OpportunityKind, SceneAnalysis } from './types';
import { qualityRank } from './resultQuality';

export async function analyzeImage(provider: IntelligenceProvider, imageUri: string, intent?: OpportunityKind): Promise<SceneAnalysis> {
  if (!imageUri) throw new Error('An image is required.');
  const result = await provider.analyzeImage(imageUri, intent);
  return { ...result, opportunities: qualityRank(result).slice(0, 5) };
}
