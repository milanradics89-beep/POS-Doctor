import type { IntelligenceProvider, OpportunityKind, SceneAnalysis } from './types';
import { analyzeImage } from './analyzeImage';
import { inferIntent } from './intent';
import { normalizeAnalysis } from './normalizeAnalysis';
import { validateAnalysis } from './validateAnalysis';
import { validateUseitAnalyzeResponse } from './useitAnalyzeContract';

export async function runUseitPipeline(provider: IntelligenceProvider, imageUri: string, requestedIntent?: OpportunityKind): Promise<SceneAnalysis> {
  if (provider.analyzeUseit) {
    const unified = await provider.analyzeUseit(imageUri, requestedIntent);
    const validation = validateUseitAnalyzeResponse(unified);
    if (!validation.ok) throw new Error(`Unified intelligence response validation failed: ${validation.issues.join('; ')}`);
    return normalizeAnalysis(validation.data.scene);
  }

  const initial = await analyzeImage(provider, imageUri, requestedIntent);
  const intent = inferIntent(initial.sceneType, requestedIntent);
  const withIntent = await provider.analyzeImage(imageUri, intent);
  const validation = validateAnalysis(withIntent);
  if (!validation.ok) throw new Error(`Vision response validation failed: ${validation.issues.map(i => `${i.path}: ${i.message}`).join('; ')}`);
  return normalizeAnalysis(validation.data);
}
