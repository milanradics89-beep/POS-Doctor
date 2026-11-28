import type { IntelligenceProvider, OpportunityKind, SceneAnalysis } from './types';
import { validateAnalysis } from './validateAnalysis';
import { normalizeAnalysis } from './normalizeAnalysis';
import { toPresentationResult, type PresentationResult } from './presentation';
import { fetchJsonWithPolicy } from './request';
import { createPromptPolicy } from './promptPolicy';
import type { IntentDomain } from './intentNeed';
import { analyzeDomain } from './domainAnalyzer';
import { runIntelligence, type IntelligenceRun } from './intelligenceOrchestrator';
import type { ProductProvider } from './productCandidateCollector';
import { googleProductProvider } from './googleProductProvider';
import { validateImageUri } from './imageInput';
import { normalizeApiBaseUrl } from './apiConfig';
import { validateProductDiscoveryResponse, validateUseitAnalyzeResponse, type UseitAnalyzeResponse, type UseitShopping } from './useitAnalyzeContract';
import { isSafeExternalHttpUrl } from './externalLink';
import { getSessionToken } from './attestationClient';
import type { RedesignPlan } from './redesignPlan';
import type { SceneModel } from './sceneModel';

export type UseitApiClientOptions = { apiKey?: string };

type UseitAnalyzeOptions = {
  budgetHuf?: number;
  preferredStyles?: string[];
  preferredColors?: string[];
  discoverProducts?: boolean;
  productLimit?: number;
  idempotencyKey?: string;
  actionable?: boolean;
  refinement?: string;
  refinementTarget?: string;
  retry?: boolean;
  locale?: string;
};

function buildUseitAnalyzePayload(
  imageUri: string,
  intent: OpportunityKind | undefined,
  options: UseitAnalyzeOptions,
) {
  const policy = createPromptPolicy(intent, options.locale ?? 'hu-HU');
  return {
    imageUri,
    userIntent: intent ?? policy.intent,
    prompt: policy.system,
    locale: policy.locale,
    budgetHuf: options.budgetHuf,
    preferredStyles: options.preferredStyles ?? [],
    preferredColors: options.preferredColors ?? [],
    discoverProducts: options.discoverProducts ?? false,
    productLimit: options.productLimit ?? 8,
    actionable: options.actionable,
    refinement: options.refinement,
    refinementTarget: options.refinementTarget,
  };
}

function buildUseitAnalyzeHeaders(
  headers: Record<string, string>,
  idempotencyKey?: string,
  retry?: boolean,
) {
  return {
    ...headers,
    ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}),
    ...(retry ? { 'X-USEIT-Retry': 'true' } : {}),
  };
}

export class UseitApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = 'UseitApiError';
  }
}

// The backend request middleware returns 504 at 45 seconds. Keep the client
// deadline above that limit so it can receive the controlled server response.
// Billable POSTs remain single-attempt. The caller reuses an idempotency key only for an explicit retry of the same user action.
const AI_REQUEST_TIMEOUT_MS = 50_000;

function postJsonOnce(
  base: string,
  path: string,
  headers: Record<string, string>,
  body: unknown,
  signal?: AbortSignal,
) {
  return fetchJsonWithPolicy(
    `${base}${path}`,
    { method: 'POST', headers, body: JSON.stringify(body), signal },
    { attempts: 1, timeoutMs: AI_REQUEST_TIMEOUT_MS },
  );
}

function prepareImageRequest(baseUrl: string, imageUri: string): string {
  const base = normalizeApiBaseUrl(baseUrl);
  validateImageUri(imageUri);
  return base;
}

export class UseitApiProvider implements IntelligenceProvider {
  private readonly apiKey?: string;

  constructor(private readonly baseUrl: string, options: UseitApiClientOptions = {}) {
    this.apiKey = options.apiKey?.trim() || undefined;
  }

  private async headers(): Promise<Record<string, string>> {
    const token = await getSessionToken(this.baseUrl, this.apiKey);
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(this.apiKey ? { 'X-API-Key': this.apiKey } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  async analyzeImage(imageUri: string, userIntent?: OpportunityKind, signal?: AbortSignal): Promise<SceneAnalysis> {
    const base = prepareImageRequest(this.baseUrl, imageUri);
    const policy = createPromptPolicy(userIntent, 'hu-HU');
    const { response, payload, parseError } = await fetchJsonWithPolicy(`${base}/v1/analyze`, { method: 'POST', headers: await this.headers(), body: JSON.stringify({ imageUri, userIntent: policy.intent, prompt: policy.system, locale: policy.locale }), signal }, { attempts: 1, timeoutMs: AI_REQUEST_TIMEOUT_MS });
    if (!response.ok) throw new Error(`USEIT API request failed (${response.status}).`);
    if (parseError) throw new Error('USEIT API returned malformed JSON.');
    const checked = validateAnalysis(payload);
    if (!checked.ok) throw new Error(`USEIT API returned an invalid analysis: ${checked.issues.map(issue => `${issue.path}: ${issue.message}`).join('; ')}`);
    return normalizeAnalysis(checked.data);
  }
  async analyzeUseit(imageUri: string, intent?: OpportunityKind, options: UseitAnalyzeOptions = {}, signal?: AbortSignal): Promise<UseitAnalyzeResponse> {
    const base = prepareImageRequest(this.baseUrl, imageUri);
    const body = buildUseitAnalyzePayload(imageUri, intent, options);
    const headers = buildUseitAnalyzeHeaders(await this.headers(), options.idempotencyKey, options.retry);
    const request = await postJsonOnce(base, '/v1/useit/analyze', headers, body, signal);
    if (!request.response.ok) {
      throw new UseitApiError(`USEIT unified analysis failed (${request.response.status}).`, request.response.status);
    }
    if (request.parseError) throw new Error('USEIT unified analysis returned malformed JSON.');
    const checked = validateUseitAnalyzeResponse(request.payload);
    if (!checked.ok) {
      throw new Error(`USEIT unified analysis returned an invalid response: ${checked.issues.join('; ')}`);
    }
    return checked.data;
  }
  async discoverProducts(
    query: string,
    options: { limit?: number; locale?: string; region?: string; maxResolve?: number } = {},
    signal?: AbortSignal,
  ): Promise<NonNullable<UseitShopping>> {
    const base = normalizeApiBaseUrl(this.baseUrl);
    const normalizedQuery = query.trim().replace(/\s+/g, ' ').slice(0, 500);
    if (normalizedQuery.length < 2) throw new Error('Product discovery needs at least two characters.');
    const request = await postJsonOnce(
      base,
      '/v1/products/discover',
      await this.headers(),
      {
        query: normalizedQuery,
        limit: options.limit ?? 8,
        locale: options.locale ?? 'hu-HU',
        region: options.region ?? 'HU',
        max_resolve: options.maxResolve ?? 8,
      },
      signal,
    );
    if (!request.response.ok) {
      throw new UseitApiError(`USEIT product discovery failed (${request.response.status}).`, request.response.status);
    }
    if (request.parseError) throw new Error('USEIT product discovery returned malformed JSON.');
    const checked = validateProductDiscoveryResponse(request.payload);
    if (!checked.ok) {
      throw new Error(`USEIT product discovery returned an invalid response: ${checked.issues.join('; ')}`);
    }
    return checked.data;
  }

  async renderRedesign(imageUri: string, prompt: string, products: Array<{ title: string; category: string; priceHuf?: number; sourcePrice?: number; currency?: string; url: string; id?: string; confidence?: number }>, signal?: AbortSignal, idempotencyKey?: string, retry?: boolean): Promise<{ imageDataUrl: string; disclosure: string; products: typeof products }> {
    const base = prepareImageRequest(this.baseUrl, imageUri);
    const { response, payload, parseError } = await fetchJsonWithPolicy(`${base}/v1/redesign`, { method: 'POST', headers: buildUseitAnalyzeHeaders(await this.headers(), idempotencyKey, retry), body: JSON.stringify({ imageUri, prompt, products }), signal }, { attempts: 1, timeoutMs: AI_REQUEST_TIMEOUT_MS }, { requireJsonContentType: true });
    if (!response.ok) throw new UseitApiError(`USEIT redesign request failed (${response.status}).`, response.status);
    if (!response.headers.get('content-type')?.includes('application/json')) throw new Error('USEIT redesign API returned an unexpected response.');
    if (parseError) throw parseError;
    if (!payload || typeof payload !== 'object' || typeof (payload as { imageDataUrl?: unknown }).imageDataUrl !== 'string') throw new Error('USEIT redesign API returned an invalid result.');
    const result = payload as { imageDataUrl: string; disclosure?: unknown; products?: unknown };
    const appliedProducts = Array.isArray(result.products) ? result.products as typeof products : products;
    return { imageDataUrl: result.imageDataUrl, disclosure: typeof result.disclosure === 'string' ? result.disclosure : 'AI-generated visual concept. Product availability and appearance may differ from the source.', products: appliedProducts };
  }
}

export type ConsumerIntent = OpportunityKind;

export type ConsumerIntelligence = {
  action: { type: string; title: string };
  need: { kind: string };
  rankedCandidates: Array<{ id: string; title: string; category: string; source: string; priceHuf?: number; sourcePrice?: number; brand?: string; currency?: string; availability?: string; url: string }>;
  intentConfidence: number;
  clarificationRequired: boolean;
};
export type ConsumerAnalysis = PresentationResult & { intelligence: ConsumerIntelligence; phase3?: IntelligenceRun; analysis: SceneAnalysis; unified?: UseitAnalyzeResponse; redesign?: RedesignPlan };

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
type LegacyRankedCandidate = NonNullable<IntelligenceRun["ranked"]>[number];
type UnifiedShoppingCandidate = NonNullable<UseitShopping>["candidates"][number];

function legacyActionType(goal: string, shoppingRequired: boolean): string {
  switch (goal) {
    case "food_recipe": return "recipe";
    case "wardrobe_styling": return "style";
    case "object_repair": return "repair_guide";
    case "room_redesign":
    case "room_shopping": return "visualize";
    default: return shoppingRequired ? "product_discovery" : "recommend";
  }
}

function unifiedActionType(intent: string): string {
  switch (intent) {
    case "cook": return "recipe";
    case "fix": return "repair_guide";
    case "improve":
    case "create": return "visualize";
    default: return "recommend";
  }
}

function actionTitleFor(type: string): string {
  switch (type) {
    case "visualize": return "Create the redesigned view";
    case "recipe": return "Build a recipe from the visible ingredients";
    case "style": return "Complete the outfit";
    case "repair_guide": return "Show the repair path";
    case "product_discovery": return "Show the best matching options";
    default: return "Show recommendations";
  }
}

function toLegacyRankedCandidate(candidate: LegacyRankedCandidate): ConsumerIntelligence["rankedCandidates"][number] {
  return {
    id: candidate.id,
    title: candidate.title,
    category: candidate.category,
    source: candidate.source,
    priceHuf: candidate.priceHuf ?? undefined,
    url: candidate.url,
  };
}

function toUnifiedRankedCandidate(candidate: UnifiedShoppingCandidate): ConsumerIntelligence["rankedCandidates"][number] {
  return {
    id: candidate.id,
    title: candidate.name,
    category: candidate.category ?? "general",
    source: candidate.retailer ?? "USEIT",
    priceHuf: priceHufForCandidate(candidate),
    sourcePrice: candidate.price ?? undefined,
    brand: candidate.brand ?? undefined,
    currency: candidate.currency ?? undefined,
    availability: candidate.availability ?? undefined,
    url: candidate.url,
  };
}

function toConsumerIntelligence(run: IntelligenceRun): ConsumerIntelligence {
  const actionType = legacyActionType(run.task.goal, run.task.shoppingRequired);
  const ranked = (run.ranked ?? [])
    .filter(candidate => isSafeExternalHttpUrl(candidate.url))
    .slice(0, 10)
    .map(toLegacyRankedCandidate);
  return {
    action: { type: actionType, title: actionTitleFor(actionType) },
    need: { kind: run.task.goal },
    rankedCandidates: ranked,
    intentConfidence: run.clarification.needsClarification ? 0.5 : 1,
    clarificationRequired: run.clarification.needsClarification,
  };
}

function priceHufForCandidate(candidate: UnifiedShoppingCandidate): number | undefined {
  if (typeof candidate.priceHuf === "number") return candidate.priceHuf;
  if (candidate.currency?.toUpperCase() === "HUF" && typeof candidate.price === "number") return candidate.price;
  return undefined;
}

function toUnifiedConsumerIntelligence(result: UseitAnalyzeResponse): ConsumerIntelligence {
  const intent = result.intent.name;
  const actionType = unifiedActionType(intent);
  const ranked = (result.shopping?.candidates ?? [])
    .filter(candidate => isSafeExternalHttpUrl(candidate.url))
    .slice(0, 10)
    .map(toUnifiedRankedCandidate);
  return {
    action: { type: actionType, title: actionTitleFor(actionType) },
    need: { kind: intent },
    rankedCandidates: ranked,
    intentConfidence: result.intent.confidence ?? 0.5,
    clarificationRequired: (result.intent.confidence ?? 0.5) < 0.6,
  };
}
function redesignProducts(result: UseitAnalyzeResponse): RedesignPlan['products'] {
  return (result.shopping?.candidates ?? [])
    .filter(candidate => isSafeExternalHttpUrl(candidate.url))
    .slice(0, 8)
    .map(candidate => ({
      category: candidate.category?.trim() || 'general',
      productId: candidate.id,
      title: candidate.name,
      priceHuf: priceHufForCandidate(candidate),
      sourcePrice: candidate.price ?? undefined,
      currency: candidate.currency && /^[a-z]{3}$/i.test(candidate.currency) ? candidate.currency.toUpperCase() : undefined,
      url: candidate.url,
    }));
}

function preserveInConcept(result: UseitAnalyzeResponse, id: string) {
  const keep = result.actionable?.guides[id]?.keep;
  return keep?.length ? 'Specifically preserve: ' + keep.join('; ') : '';
}

function visualRecommendations(result: UseitAnalyzeResponse) {
  const ordered = result.suggestions.slice().sort((a, b) => a.rank - b.rank);
  const guides = result.actionable?.guides;
  if (!guides) return ordered.filter(idea => idea.visualizable).slice(0, 5);
  if (result.intent.name !== 'improve') return [];
  const primary = ordered.find(idea => idea.kind === 'improve' && Object.hasOwn(guides, idea.id));
  return primary?.visualizable && guides[primary.id].steps.length ? [primary] : [];
}

function toUnifiedRedesignPlan(result: UseitAnalyzeResponse, scene: SceneModel): RedesignPlan | undefined {
  if (scene.domain !== 'room') return undefined;

  const recommendations = visualRecommendations(result);
  if (!recommendations.length) return undefined;

  const products = redesignProducts(result);

  const actions: RedesignPlan['actions'] = scene.objects
    .filter(object => object.confidence >= 0.7 && object.category !== 'person')
    .map(object => ({
      type: 'keep',
      target: object.label,
      rationale: 'Preserve this existing item unless a selected recommendation explicitly changes it.',
    }));

  for (const recommendation of recommendations) {
    const kind = recommendation.kind.toLowerCase();
    const type: RedesignPlan['actions'][number]['type'] = /reposition|layout|move/.test(kind) ? 'reposition' : /replace/.test(kind) ? 'replace' : 'add';
    actions.push({ type, target: recommendation.title, rationale: recommendation.description });
  }

  const sceneSummary = typeof scene.globalAttributes.sceneSummary === 'string' ? scene.globalAttributes.sceneSummary : '';
  const constraints = typeof scene.globalAttributes.constraints === 'string' ? scene.globalAttributes.constraints : '';
  const recommendationText = recommendations
    .map(recommendation => '- ' + recommendation.title + ': ' + recommendation.description)
    .join('\n');
  const selectedProducts = products.length
    ? products.map(product => product.title + ' (' + product.category + ')').join('; ')
    : 'No retailer products selected; use generic styling only.';

  const prompt = [
    'Create a photorealistic redesign of the supplied room photograph.',
    'Preserve the original camera viewpoint, architecture, room geometry, and existing items unless an action explicitly changes them.',
    sceneSummary ? 'Observed scene: ' + sceneSummary : '',
    constraints ? 'Scene constraints: ' + constraints : '',
    'Apply these visualizable recommendations:\n' + recommendationText,
    preserveInConcept(result, recommendations[0].id),
    'Selected retailer products: ' + selectedProducts,
    'Use only the selected retailer products where relevant. Do not invent product names, brands, prices, logos, or URLs. If no selected product fits, use neutral generic styling.',
  ].filter(Boolean).join('\n\n');

  return {
    domain: 'room',
    sourceImageRequired: true,
    actions,
    products,
    prompt,
    disclosure: 'AI-generated visualization. Product appearance, scale, color and placement may differ from the real item. Verify product details on the linked retailer page.',
  };
}
export async function analyzeForConsumer(provider: IntelligenceProvider, imageUri: string, intent?: ConsumerIntent, options: { phase3Providers?: ProductProvider[]; budgetHuf?: number; preferredStyles?: string[]; preferredColors?: string[]; preserveExisting?: boolean; signal?: AbortSignal; idempotencyKey?: string; actionable?: boolean; refinement?: string; refinementTarget?: string; locale?: string; retry?: boolean } = {}): Promise<ConsumerAnalysis> {
  validateImageUri(imageUri);
  if (provider.analyzeUseit) {
    const unified = await provider.analyzeUseit(imageUri, intent, { budgetHuf: options.budgetHuf, preferredStyles: options.preferredStyles, preferredColors: options.preferredColors, idempotencyKey: options.idempotencyKey, actionable: options.actionable, refinement: options.refinement, refinementTarget: options.refinementTarget, locale: options.locale, retry: options.retry }, options.signal);
    const analysis = normalizeAnalysis(unified.scene);
    const scene = (await import('./sceneAnalysisAdapter')).toSceneModel(unified.scene, imageUri.slice(0, 80));
    const redesign = toUnifiedRedesignPlan(unified, scene);
    return { ...toPresentationResult(analysis, intent), intelligence: toUnifiedConsumerIntelligence(unified), analysis, unified, ...(redesign ? { redesign } : {}) };
  }
  const legacyIntent = intent;
  const analysis = await provider.analyzeImage(imageUri, legacyIntent, options.signal);
  const scene = (await import('./sceneAnalysisAdapter')).toSceneModel(analysis, imageUri.slice(0, 80));
  const providers = options.phase3Providers ?? [googleProductProvider];
  const phase3 = await runIntelligence(scene, analyzeDomain(scene), providers, { budgetHuf: options.budgetHuf, preserveExisting: options.preserveExisting ?? true, preferredStyles: options.preferredStyles, preferredColors: options.preferredColors, userText: intentText(legacyIntent, analysis.sceneType) });
  return { ...toPresentationResult(analysis, legacyIntent), intelligence: toConsumerIntelligence(phase3), phase3, analysis };
}
