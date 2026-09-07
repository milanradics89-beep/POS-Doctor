import type { IntelligenceProvider, OpportunityKind, SceneAnalysis } from './types';
import { analyzeImage } from './analyzeImage';
import { evaluateQuality } from './qualityGate';
import { buildSafeFallback } from './fallback';

export async function analyzeWithQualityRetry(provider: IntelligenceProvider, imageUri: string, intent?: OpportunityKind): Promise<SceneAnalysis> {
  try {
    const first = await analyzeImage(provider, imageUri, intent);
    const gate = evaluateQuality(first);
    if (gate.pass) return first;

    const retry = await analyzeImage(provider, imageUri, intent ?? 'surprise');
    return evaluateQuality(retry).score >= gate.score ? retry : first;
  } catch (error) {
    return buildSafeFallback(error instanceof Error ? error.message : undefined);
  }
}
