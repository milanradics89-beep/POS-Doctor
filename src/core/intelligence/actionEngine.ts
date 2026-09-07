import type { RankedCandidate } from './unifiedRanking';
import type { Need } from './intentNeed';

export type ActionType = 'visualize' | 'shop' | 'recipe' | 'style' | 'repair_guide' | 'book_service' | 'recommend' | 'explain';
export type Action = { type: ActionType; title: string; candidateIds: string[]; requiresConfirmation: boolean; payload: Record<string, unknown> };

export function buildAction(need: Need, candidates: RankedCandidate[]): Action {
  const candidateIds = candidates.slice(0, 10).map(c => c.id);
  switch (need.kind) {
    case 'redesign': return { type: 'visualize', title: 'Create the redesigned view', candidateIds, requiresConfirmation: true, payload: { preserveSource: true } };
    case 'cook': return { type: 'recipe', title: 'Build a recipe from the visible ingredients', candidateIds, requiresConfirmation: false, payload: { includeMissingIngredients: true } };
    case 'style': return { type: 'style', title: 'Complete the outfit', candidateIds, requiresConfirmation: true, payload: { showAlternatives: true } };
    case 'repair': return { type: 'repair_guide', title: 'Show the repair path', candidateIds, requiresConfirmation: true, payload: { safetyFirst: true } };
    case 'buy':
    case 'complete':
    case 'replace': return { type: 'shop', title: 'Show the best matching options', candidateIds, requiresConfirmation: true, payload: { comparePrices: true } };
    default: return { type: 'recommend', title: 'Show recommendations', candidateIds, requiresConfirmation: false, payload: {} };
  }
}
