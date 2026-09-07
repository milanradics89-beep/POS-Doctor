import type { IntelligenceProvider, OpportunityKind, SceneAnalysis } from './types';
import { validateAnalysis } from './validateAnalysis';
import { normalizeAnalysis } from './normalizeAnalysis';
import { toPresentationResult, type PresentationResult } from './presentation';
import { fetchWithPolicy } from './request';
import { createPromptPolicy } from './promptPolicy';
import { analyzeAndAct, type IntelligenceOutput } from './intelligencePipeline';
import type { CandidateProvider } from './candidateProvider';

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

export type ConsumerAnalysis = PresentationResult & {
  intelligence: IntelligenceOutput;
};

function sceneSignals(scene: SceneAnalysis): string[] {
  return [
    `scene:${scene.sceneType}`,
    ...scene.items.map(item => `item:${item.name}${item.category ? `:${item.category}` : ''}`),
    ...scene.constraints.map(value => `constraint:${value}`),
    ...scene.opportunities.map(value => `opportunity:${value.kind}:${value.title}`),
  ];
}

function intentText(intent?: OpportunityKind): string {
  switch (intent) {
    case 'create': return 'create redesign or new solution';
    case 'improve': return 'improve or redesign this';
    case 'fix': return 'fix this';
    case 'cook': return 'cook a recipe from what I have';
    case 'surprise': return 'find an unexpected useful idea';
    default: return '';
  }
}

export async function analyzeForConsumer(
  provider: IntelligenceProvider,
  imageUri: string,
  intent?: OpportunityKind,
  options: { providers?: CandidateProvider[]; budgetHuf?: number; preferredStyles?: string[]; preferredColors?: string[]; requiredCategory?: string } = {},
): Promise<ConsumerAnalysis> {
  const analysis = await provider.analyzeImage(imageUri, intent);
  const intelligence = await analyzeAndAct({
    domain: analysis.sceneType,
    userText: intentText(intent),
    sceneSignals: sceneSignals(analysis),
    providers: options.providers ?? [],
    budgetHuf: options.budgetHuf,
    preferredStyles: options.preferredStyles,
    preferredColors: options.preferredColors,
    requiredCategory: options.requiredCategory,
  });
  return { ...toPresentationResult(analysis, intent), intelligence };
}
