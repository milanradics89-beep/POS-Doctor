import type { SceneAnalysis } from './types';
import { validateAnalysis } from './validateAnalysis';

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

export type UseitShopping = {
  query: string;
  candidates: unknown[];
} | null;

export type UseitAnalyzeResponse = {
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

export function validateUseitAnalyzeResponse(payload: unknown):
  | { ok: true; data: UseitAnalyzeResponse }
  | { ok: false; issues: string[] } {
  if (!isRecord(payload)) return { ok: false, issues: ['response must be an object'] };

  const sceneResult = validateAnalysis(payload.scene);
  if (!sceneResult.ok) {
    return { ok: false, issues: sceneResult.issues.map(issue => `scene.${issue.path}: ${issue.message}`) };
  }

  const issues: string[] = [];
  if (!isRecord(payload.intent) || typeof payload.intent.name !== 'string') issues.push('intent.name: expected string');
  if (!isRecord(payload.specialist)) issues.push('specialist: expected object');
  if (!Array.isArray(payload.suggestions)) issues.push('suggestions: expected array');
  if (payload.shopping !== null && !isRecord(payload.shopping)) issues.push('shopping: expected object or null');
  if (!Array.isArray(payload.pipeline) || payload.pipeline.some(step => typeof step !== 'string')) issues.push('pipeline: expected string array');

  if (issues.length) return { ok: false, issues };

  const suggestions: UseitSuggestion[] = [];
  for (const [index, value] of payload.suggestions.entries()) {
    if (!isRecord(value) || typeof value.id !== 'string' || typeof value.title !== 'string' || typeof value.description !== 'string' || typeof value.kind !== 'string' || typeof value.effort !== 'string' || typeof value.visualizable !== 'boolean' || typeof value.score !== 'number' || typeof value.rank !== 'number' || !Array.isArray(value.reasons) || value.reasons.some(reason => typeof reason !== 'string')) {
      issues.push(`suggestions.${index}: invalid suggestion`);
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

  if (issues.length) return { ok: false, issues };
  return {
    ok: true,
    data: {
      scene: sceneResult.data,
      intent: payload.intent as UseitIntent,
      specialist: payload.specialist as Record<string, unknown>,
      suggestions,
      shopping: payload.shopping as UseitShopping,
      pipeline: payload.pipeline as string[],
    },
  };
}
