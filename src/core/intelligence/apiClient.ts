import type { IntelligenceProvider, OpportunityKind, SceneAnalysis } from './types';
import { validateAnalysis } from './validateAnalysis';
import { normalizeAnalysis } from './normalizeAnalysis';
import { toPresentationResult, type PresentationResult } from './presentation';
import { fetchWithPolicy } from './request';
import { createPromptPolicy } from './promptPolicy';

export class UseitApiProvider implements IntelligenceProvider {
  constructor(private readonly baseUrl: string) {}

  async analyzeImage(imageUri: string, userIntent?: OpportunityKind): Promise<SceneAnalysis> {
    const base = this.baseUrl.trim().replace(/\/$/, '');
    if (!base) throw new Error('USEIT API base URL is required.');
    const policy = createPromptPolicy(userIntent, 'hu-HU');
    const response = await fetchWithPolicy(`${base}/v1/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ imageUri, userIntent: policy.intent, prompt: policy.system, locale: policy.locale }),
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
  return toPresentationResult(await provider.analyzeImage(imageUri, intent), intent);
}
