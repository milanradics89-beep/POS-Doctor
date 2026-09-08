import type { IntelligenceProvider, OpportunityKind, SceneAnalysis } from './types';
import { validateAnalysis } from './validateAnalysis';
import { normalizeAnalysis } from './normalizeAnalysis';
import { toPresentationResult, type PresentationResult } from './presentation';
import { fetchWithPolicy } from './request';
import { createPromptPolicy } from './promptPolicy';
import { analyzeAndAct, type IntelligenceOutput } from './intelligencePipeline';
import type { CandidateProvider } from './candidateProvider';
import type { IntentDomain } from './intentNeed';
import { analyzeDomain } from './domainAnalyzer';
import { runIntelligence, type IntelligenceRun } from './intelligenceOrchestrator';
import { toSceneModel } from './sceneAnalysisAdapter';
import type { ProductProvider } from './productCandidateCollector';

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

  async renderRedesign(imageUri: string, prompt: string, products: Array<{ title: string; category: string; priceHuf?: number; url: string }>): Promise<{ imageDataUrl: string; disclosure: string }> {
    const base = this.baseUrl.trim().replace(/\/$/, '');
    if (!base) throw new Error('USEIT API base URL is required.');
    const response = await fetchWithPolicy(`${base}/v1/redesign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ imageUri, prompt, products }),
    });
    if (!response.ok) throw new Error(`USEIT redesign request failed (${response.status}).`);
    return response.json();
  }
}

export type ConsumerAnalysis = PresentationResult & {
  intelligence: IntelligenceOutput;
  phase3?: IntelligenceRun;
  analysis?: SceneAnalysis;
};

function sceneSignals(scene: SceneAnalysis): string[] {
  return [
    `scene:${scene.sceneType}`,
    ...scene.items.map(item => `item:${item.name}${item.category ? `:${item.category}` : ''}`),
    ...scene.constraints.map(value => `constraint:${value}`),
    ...scene.opportunities.map(value => `opportunity:${value.kind}:${value.title}`),
  ];
}

function domainForScene(sceneType: SceneAnalysis['sceneType']): IntentDomain {
  if (sceneType === 'wardrobe') return 'wardrobe';
  if (sceneType === 'fridge' || sceneType === 'food') return 'food';
  if (sceneType === 'kitchen' || sceneType === 'room' || sceneType === 'table' || sceneType === 'bathroom') return 'room';
  if (sceneType === 'objects' || sceneType === 'garage' || sceneType === 'garden') return 'object';
  return 'general';
}

function intentText(intent: OpportunityKind | undefined, sceneType: SceneAnalysis['sceneType']): string {
  if (sceneType === 'wardrobe') {
    if (intent === 'fix') return 'fix this garment';
    if (intent === 'surprise') return 'style this outfit';
    return 'create or complete an outfit';
  }
  if (sceneType === 'fridge' || sceneType === 'food') return 'cook a recipe from what I have';
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
  options: { providers?: CandidateProvider[]; phase3Providers?: ProductProvider[]; budgetHuf?: number; preferredStyles?: string[]; preferredColors?: string[]; requiredCategory?: string; preserveExisting?: boolean } = {},
): Promise<ConsumerAnalysis> {
  const analysis = await provider.analyzeImage(imageUri, intent);
  const intelligence = await analyzeAndAct({
    domain: domainForScene(analysis.sceneType),
    userText: intentText(intent, analysis.sceneType),
    sceneSignals: sceneSignals(analysis),
    providers: options.providers ?? [],
    budgetHuf: options.budgetHuf,
    preferredStyles: options.preferredStyles,
    preferredColors: options.preferredColors,
    requiredCategory: options.requiredCategory,
  });
  const scene = toSceneModel(analysis, imageUri.slice(0, 80));
  const phase3 = await runIntelligence(scene, analyzeDomain(scene), options.phase3Providers ?? [], {
    budgetHuf: options.budgetHuf,
    preserveExisting: options.preserveExisting ?? true,
    preferredStyles: options.preferredStyles,
    preferredColors: options.preferredColors,
    userText: intentText(intent, analysis.sceneType),
  });
  return { ...toPresentationResult(analysis, intent), intelligence, phase3, analysis };
}
