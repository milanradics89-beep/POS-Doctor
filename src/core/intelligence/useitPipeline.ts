import type { IntelligenceProvider, OpportunityKind, SceneAnalysis } from './types';
import { analyzeImage } from './analyzeImage';
import { inferIntent } from './intent';
import { normalizeAnalysis } from './normalizeAnalysis';
import { validateAnalysis } from './validateAnalysis';

export async function runUseitPipeline(provider: IntelligenceProvider, imageUri: string, requestedIntent?: OpportunityKind): Promise<SceneAnalysis> {
  const initial = await analyzeImage(provider, imageUri, requestedIntent);
  const intent = inferIntent(initial.sceneType, requestedIntent);
  const withIntent = await provider.analyzeImage(imageUri, intent);
  const validation = validateAnalysis(withIntent);
  if (!validation.ok) throw new Error(`Vision response validation failed: ${validation.issues.map(i => `${i.path}: ${i.message}`).join('; ')}`);
  return normalizeAnalysis(validation.data);
}
