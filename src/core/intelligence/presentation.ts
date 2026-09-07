import type { Opportunity, OpportunityKind, SceneAnalysis } from './types';
import { rankSuggestions } from './suggestions';

export type PresentationResult = {
  hero: Opportunity | null;
  alternatives: Opportunity[];
  observed: string[];
  cautions: string[];
};

/** Turns scene intelligence into a small, ranked set of decisions for the consumer UI. */
export function toPresentationResult(analysis: SceneAnalysis, intent?: OpportunityKind): PresentationResult {
  const ranked = rankSuggestions(analysis, intent);
  const [hero, ...alternatives] = ranked;
  return {
    hero: hero ?? null,
    alternatives: alternatives.slice(0, 3),
    observed: analysis.items.slice(0, 8).map(item => item.name),
    cautions: analysis.safetyNotes.slice(0, 3),
  };
}
