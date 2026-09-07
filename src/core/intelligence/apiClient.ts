import type { IntelligenceProvider, OpportunityKind, SceneAnalysis } from './types';
import { validateAnalysis } from './validateAnalysis';
import { normalizeAnalysis } from './normalizeAnalysis';
import { toPresentationResult, type PresentationResult } from './presentation';

export class UseitApiProvider implements IntelligenceProvider {
  constructor(private readonly baseUrl: string) {}

  async analyzeImage(imageUri: string, userIntent?: OpportunityKind): Promise<SceneAnalysis> {
    const response = await fetch(`${this.baseUrl.replace(/\/$/, '')}/v1/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUri, userIntent }),
    });
    if (!response.ok) throw new Error(`USEIT API request failed (${response.status}).`);
    const payload = await response.json();
    const checked = validateAnalysis(payload);
    if (!checked.ok) throw new Error('USEIT API returned an invalid analysis.');
    return normalizeAnalysis(checked.data);
  }
}

export async function analyzeForConsumer(provider: IntelligenceProvider, imageUri: string, intent?: OpportunityKind): Promise<PresentationResult> {
  const analysis = await provider.analyzeImage(imageUri, intent);
  return toPresentationResult(analysis);
}
