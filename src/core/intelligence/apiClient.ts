import type { IntelligenceProvider, OpportunityKind, SceneAnalysis } from './types';
import { validateAnalysis } from './validateAnalysis';
import { normalizeAnalysis } from './normalizeAnalysis';
import { toPresentationResult, type PresentationResult } from './presentation';
import { fetchWithPolicy } from './request';
import { buildSceneAnalysisPrompt } from './scenePrompt';

export class UseitApiProvider implements IntelligenceProvider {
  constructor(private readonly baseUrl: string) {}

  async analyzeImage(imageUri: string, userIntent?: OpportunityKind): Promise<SceneAnalysis> {
    const base = this.baseUrl.trim().replace(/\/$/, '');
    if (!base) throw new Error('USEIT API base URL is required.');
    const response = await fetchWithPolicy(`${base}/v1/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        imageUri,
        userIntent,
        scenePrompt: buildSceneAnalysisPrompt({ intent: userIntent, locale: 'hu-HU' }),
      }),
    });
    if (!response.ok) throw new Error(`USEIT API request failed (${response.status}).`);
    let payload: unknown;
    try { payload = await response.json(); } catch { throw new Error('USEIT API returned malformed JSON.'); }
    const checked = validateAnalysis(payload);
    if (!checked.ok) throw new Error('USEIT API returned an invalid analysis.');
    return normalizeAnalysis(checked.data);
  }
}

export async function analyzeForConsumer(provider: IntelligenceProvider, imageUri: string, intent?: OpportunityKind): Promise<PresentationResult> {
  const analysis = await provider.analyzeImage(imageUri, intent);
  return toPresentationResult(analysis);
}
