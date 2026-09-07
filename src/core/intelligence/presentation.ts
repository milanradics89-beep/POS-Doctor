import type { Opportunity, SceneAnalysis } from './types';

export type PresentationResult = {
  hero: Opportunity | null;
  alternatives: Opportunity[];
  observed: string[];
  cautions: string[];
};

/** Turns raw intelligence into the small set of decisions the consumer UI should expose first. */
export function toPresentationResult(analysis: SceneAnalysis): PresentationResult {
  const [hero, ...alternatives] = analysis.opportunities;
  return {
    hero: hero ?? null,
    alternatives: alternatives.slice(0, 3),
    observed: analysis.items.slice(0, 8).map(item => item.name),
    cautions: analysis.safetyNotes.slice(0, 3),
  };
}
