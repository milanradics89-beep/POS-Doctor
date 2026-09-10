import type { SceneAnalysis } from './types';
import { validateAnalysis } from './validateAnalysis';

export const USEIT_ANALYZE_CONTRACT_VERSION = 'useit_analyze_v1';

export type UseitIntent = {
  name: string;
  confidence?: number;
  rationale?: string;
};

export type UseitSuggestion = {
  id: string;
  title: string;
  description: string;
  kind: string;
  effort: string;
  durationMinutes?: number;
  visualizable: boolean;
  score: number;
  preferenceScore?: number;
  rank: number;
  reasons: string[];
};

export type UseitShoppingCandidate = {
  id: string;
  name: string;
  url: string;
  category?: string | null;
  brand?: string | null;
  imageUrl?: string | null;
  price?: number | null;
  currency?: string | null;
  availability?: string;
  retailer?: string | null;
  qualityScore?: number;
  searchRank?: number;
};

export type UseitShopping = {
  query: string;
  candidates: UseitShoppingCandidate[];
  errors?: Array<{ url: string; message: string }>;
} | null;

export type UseitAnalyzeResponse = {
  contractVersion: typeof USEIT_ANALYZE_CONTRACT_VERSION;
  scene: SceneAnalysis;
  intent: UseitIntent;
  specialist: Record<string, unknown>;
  suggestions: UseitSuggestion[];
  shopping: UseitShopping;
  pipeline: string[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isOptionalString(value: unknown): value is string | null | undefined {
  return value === undefined || value === null || typeof value === 'string';
}

function isValidShoppingCandidate(value: unknown): value is UseitShoppingCandidate {
  if (!isRecord(value) || typeof value.id !== 'string' || !value.id || typeof value.name !== 'string' || !value.name || typeof value.url !== 'string' || !value.url) return false;
  if (!isOptionalString(value.category) || !isOptionalString(value.brand) || !isOptionalString(value.imageUrl) || !isOptionalString(value.currency) || !isOptionalString(value.retailer)) return false;
  if (value.price !== undefined && value.price !== null && !isFiniteNumber(value.price)) return false;
  if (value.qualityScore !== undefined && (!isFiniteNumber(value.qualityScore) || value.qualityScore < 0 || value.qualityScore > 1)) return false;
  if (value.searchRank !== undefined && (!isFiniteNumber(value.searchRank) || !Number.isInteger(value.searchRank) || value.searchRank < 1)) return false;
  return value.availability === undefined || typeof value.availability === 'string';
}

export function validateUseitAnalyzeResponse(payload: unknown):
  | { ok: true; data: UseitAnalyzeResponse }
  | { ok: false; issues: string[] } {
  if (!isRecord(payload)) return { ok: false, issues: ['response must be an object'] };

  if (payload.contractVersion !== USEIT_ANALYZE_CONTRACT_VERSION) {
    return { ok: false, issues: [`contractVersion: expected ${USEIT_ANALYZE_CONTRACT_VERSION}`] };
  }

  const sceneResult = validateAnalysis(payload.scene);
  if (!sceneResult.ok) {
    return { ok: false, issues: sceneResult.issues.map(issue => `scene.${issue.path}: ${issue.message}`) };
  }

  const issues: string[] = [];
  if (!isRecord(payload.intent) || typeof payload.intent.name !== 'string' || !payload.intent.name) {
    issues.push('intent.name: expected non-empty string');
  } else if (payload.intent.confidence !== undefined && (!isFiniteNumber(payload.intent.confidence) || payload.intent.confidence < 0 || payload.intent.confidence > 1)) {
    issues.push('intent.confidence: expected number between 0 and 1');
  }

  if (!isRecord(payload.specialist)) issues.push('specialist: expected object');
  if (!Array.isArray(payload.suggestions)) issues.push('suggestions: expected array');
  if (payload.shopping !== null && !isRecord(payload.shopping)) issues.push('shopping: expected object or null');
  if (!Array.isArray(payload.pipeline) || payload.pipeline.length === 0 || payload.pipeline.some(step => typeof step !== 'string' || !step)) issues.push('pipeline: expected non-empty string array');

  if (issues.length) return { ok: false, issues };

  const rawSuggestions = payload.suggestions as unknown[];
  const suggestions: UseitSuggestion[] = [];
  for (const [index, value] of rawSuggestions.entries()) {
    if (!isRecord(value) || typeof value.id !== 'string' || !value.id || typeof value.title !== 'string' || !value.title || typeof value.description !== 'string' || !value.description || typeof value.kind !== 'string' || typeof value.effort !== 'string' || typeof value.visualizable !== 'boolean' || !isFiniteNumber(value.score) || !isFiniteNumber(value.rank) || !Number.isInteger(value.rank) || value.rank < 1 || !Array.isArray(value.reasons) || value.reasons.some(reason => typeof reason !== 'string')) {
      issues.push(`suggestions.${index}: invalid suggestion`);
      continue;
    }
    if (value.durationMinutes !== undefined && (!isFiniteNumber(value.durationMinutes) || value.durationMinutes < 0)) {
      issues.push(`suggestions.${index}.durationMinutes: expected non-negative number`);
      continue;
    }
    if (value.preferenceScore !== undefined && !isFiniteNumber(value.preferenceScore)) {
      issues.push(`suggestions.${index}.preferenceScore: expected finite number`);
      continue;
    }
    suggestions.push({
      id: value.id,
      title: value.title,
      description: value.description,
      kind: value.kind,
      effort: value.effort,
      durationMinutes: typeof value.durationMinutes === 'number' ? value.durationMinutes : undefined,
      visualizable: value.visualizable,
      score: value.score,
      preferenceScore: typeof value.preferenceScore === 'number' ? value.preferenceScore : undefined,
      rank: value.rank,
      reasons: value.reasons as string[],
    });
  }

  let shopping: UseitShopping = null;
  if (payload.shopping !== null) {
    const rawShopping = payload.shopping as Record<string, unknown>;
    if (typeof rawShopping.query !== 'string' || !rawShopping.query) issues.push('shopping.query: expected non-empty string');
    if (!Array.isArray(rawShopping.candidates)) issues.push('shopping.candidates: expected array');
    if (rawShopping.errors !== undefined && (!Array.isArray(rawShopping.errors) || rawShopping.errors.some(error => !isRecord(error) || typeof error.url !== 'string' || typeof error.message !== 'string'))) {
      issues.push('shopping.errors: expected array of {url,message}');
    }
    if (Array.isArray(rawShopping.candidates)) {
      const candidates: UseitShoppingCandidate[] = [];
      for (const [index, candidate] of rawShopping.candidates.entries()) {
        if (!isValidShoppingCandidate(candidate)) issues.push(`shopping.candidates.${index}: invalid product candidate`);
        else candidates.push(candidate);
      }
      shopping = {
        query: typeof rawShopping.query === 'string' ? rawShopping.query : '',
        candidates,
        errors: Array.isArray(rawShopping.errors) ? rawShopping.errors as Array<{ url: string; message: string }> : undefined,
      };
    }
  }

  if (issues.length) return { ok: false, issues };
  return {
    ok: true,
    data: {
      contractVersion: USEIT_ANALYZE_CONTRACT_VERSION,
      scene: sceneResult.data,
      intent: payload.intent as UseitIntent,
      specialist: payload.specialist as Record<string, unknown>,
      suggestions,
      shopping,
      pipeline: payload.pipeline as string[],
    },
  };
}
