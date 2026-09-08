import type { IntelligenceProvider, OpportunityKind, SceneAnalysis } from './types';
import { validateAnalysis } from './validateAnalysis';
import { normalizeAnalysis } from './normalizeAnalysis';
import { toPresentationResult, type PresentationResult } from './presentation';
import { fetchWithPolicy } from './request';
import { createPromptPolicy } from './promptPolicy';
import type { IntentDomain } from './intentNeed';
import { analyzeDomain } from './domainAnalyzer';
import { runIntelligence, type IntelligenceRun } from './intelligenceOrchestrator';
import type { ProductProvider } from './productCandidateCollector';
import { googleProductProvider } from './googleProductProvider';
import { validateImageUri } from './imageInput';
import { normalizeApiBaseUrl } from './apiConfig';

export class UseitApiProvider implements IntelligenceProvider {
  constructor(private readonly baseUrl: string) {}
  async analyzeImage(imageUri: string, userIntent?: OpportunityKind): Promise<SceneAnalysis> {
    const base = normalizeApiBaseUrl(this.baseUrl);
    validateImageUri(imageUri);
    const policy = createPromptPolicy(userIntent, 'hu-HU');
    const response = await fetchWithPolicy(`${base}/v1/analyze`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ imageUri, userIntent: policy.intent, prompt: policy.system, locale: policy.locale }) });
    if (!response.ok) throw new Error(`USEIT API request failed (${response.status}).`);
    let payload: unknown;
    try { payload = await response.json(); } catch { throw new Error('USEIT API returned malformed JSON.'); }
    const checked = validateAnalysis(payload);
    if (!checked.ok) throw new Error(`USEIT API returned an invalid analysis: ${checked.issues.map(issue => `${issue.path}: ${issue.message}`).join('; ')}`);
    return normalizeAnalysis(checked.data);
  }
  async renderRedesign(imageUri: string, prompt: string, products: Array<{ title: string; category: string; priceHuf?: number; url: string; id?: string; confidence?: number }>): Promise<{ imageDataUrl: string; disclosure: string; products: typeof products }> {
    const base = normalizeApiBaseUrl(this.baseUrl);
    validateImageUri(imageUri);
    const response = await fetchWithPolicy(`${base}/v1/redesign`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ imageUri, prompt, products }) });
    if (!response.ok) throw new Error(`USEIT redesign request failed (${response.status}).`);
    if (!response.headers.get('content-type')?.includes('application/json')) throw new Error('USEIT redesign API returned an unexpected response.');
    const payload: unknown = await response.json();
    if (!payload || typeof payload !== 'object' || typeof (payload as { imageDataUrl?: unknown }).imageDataUrl !== 'string') throw new Error('USEIT redesign API returned an invalid result.');
    const result = payload as { imageDataUrl: string; disclosure?: unknown; products?: unknown };
    const appliedProducts = Array.isArray(result.products) ? result.products as typeof products : products;
    return { imageDataUrl: result.imageDataUrl, disclosure: typeof result.disclosure === 'string' ? result.disclosure : 'AI-generated visual concept. Product availability and appearance may differ from the source.', products: appliedProducts };
  }
}

export type ConsumerIntelligence = {
  action: { type: string; title: string };
  need: { kind: string };
  rankedCandidates: Array<{ id: string; title: string; category: string; source: string; priceHuf: number; url: string }>;
  intentConfidence: number;
  clarificationRequired: boolean;
};
export type ConsumerAnalysis = PresentationResult & { intelligence: ConsumerIntelligence; phase3: IntelligenceRun; analysis: SceneAnalysis };

function domainForScene(sceneType: SceneAnalysis['sceneType']): IntentDomain {
  if (sceneType === 'wardrobe') return 'wardrobe';
  if (sceneType === 'fridge' || sceneType === 'food') return 'food';
  if (sceneType === 'room' || sceneType === 'table') return 'room';
  if (sceneType === 'objects' || sceneType === 'garage' || sceneType === 'garden') return 'object';
  return 'general';
}
function intentText(intent: OpportunityKind | undefined, sceneType: SceneAnalysis['sceneType']): string {
  if (sceneType === 'wardrobe') { if (intent === 'fix') return 'fix this garment'; if (intent === 'surprise') return 'style this outfit'; return 'create or complete an outfit'; }
  if (sceneType === 'fridge' || sceneType === 'food') return 'cook a recipe from what I have';
  switch (intent) { case 'create': return 'create redesign or new solution'; case 'improve': return 'improve or redesign this'; case 'fix': return 'fix this'; case 'cook': return 'cook a recipe from what I have'; case 'surprise': return 'find an unexpected useful idea'; default: return ''; }
}
function toConsumerIntelligence(run: IntelligenceRun): ConsumerIntelligence {
  const goal = run.task.goal;
  const actionType = goal === 'food_recipe' ? 'recipe' : goal === 'wardrobe_styling' ? 'style' : goal === 'object_repair' ? 'repair_guide' : goal === 'room_redesign' || goal === 'room_shopping' ? 'visualize' : run.task.shoppingRequired ? 'shop' : 'recommend';
  const actionTitle = actionType === 'visualize' ? 'Create the redesigned view' : actionType === 'recipe' ? 'Build a recipe from the visible ingredients' : actionType === 'style' ? 'Complete the outfit' : actionType === 'repair_guide' ? 'Show the repair path' : actionType === 'shop' ? 'Show the best matching options' : 'Show recommendations';
  const ranked = (run.ranked ?? []).slice(0, 10).map(candidate => ({ id: candidate.id, title: candidate.title, category: candidate.category, source: candidate.source, priceHuf: candidate.priceHuf ?? 0, url: candidate.url }));
  return { action: { type: actionType, title: actionTitle }, need: { kind: goal }, rankedCandidates: ranked, intentConfidence: run.clarification.needsClarification ? 0.5 : 1, clarificationRequired: run.clarification.needsClarification };
}
export async function analyzeForConsumer(provider: IntelligenceProvider, imageUri: string, intent?: OpportunityKind, options: { phase3Providers?: ProductProvider[]; budgetHuf?: number; preferredStyles?: string[]; preferredColors?: string[]; preserveExisting?: boolean } = {}): Promise<ConsumerAnalysis> {
  validateImageUri(imageUri);
  const analysis = await provider.analyzeImage(imageUri, intent);
  const scene = (await import('./sceneAnalysisAdapter')).toSceneModel(analysis, imageUri.slice(0, 80));
  const providers = options.phase3Providers ?? [googleProductProvider];
  const phase3 = await runIntelligence(scene, analyzeDomain(scene), providers, { budgetHuf: options.budgetHuf, preserveExisting: options.preserveExisting ?? true, preferredStyles: options.preferredStyles, preferredColors: options.preferredColors, userText: intentText(intent, analysis.sceneType) });
  return { ...toPresentationResult(analysis, intent), intelligence: toConsumerIntelligence(phase3), phase3, analysis };
}
