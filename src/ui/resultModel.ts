import type { ConsumerAnalysis, ConsumerIntent } from '../core/intelligence/apiClient';

export const modeCopy = {
  create: { title: 'Make something new', next: 'Project plan', needs: 'Tools and materials', alternatives: 'Other ways to build it' },
  improve: { title: 'Refresh the design', next: 'Improvement plan', needs: 'What you’ll need', alternatives: 'Other changes to consider' },
  fix: { title: 'Repair an item', next: 'Safe checks', needs: 'What you’ll need', alternatives: 'Other options' },
  cook: { title: 'Plan a meal', next: 'Cooking steps', needs: 'Ingredients', alternatives: 'Substitutions' },
  surprise: { title: 'Surprise me', next: 'Try it yourself', needs: 'What you’ll need', alternatives: 'Other ways to try it' },
} satisfies Record<string, { title: string; next: string; needs: string; alternatives: string }>;

export type ResultMode = keyof typeof modeCopy;

export function resultMode(intent?: ConsumerIntent): ResultMode {
  return intent && Object.prototype.hasOwnProperty.call(modeCopy, intent) ? intent as ResultMode : 'surprise';
}

export function selectResult(result: ConsumerAnalysis, mode: ResultMode) {
  const unified = result.unified;
  const details = unified?.actionable;
  const guides = details?.guides;
  const suggestions = (unified?.suggestions ?? [])
    .filter((idea) => idea.kind === mode && (!guides || Object.hasOwn(guides, idea.id)))
    .sort((a, b) => a.rank - b.rank);
  const seen = new Set<string>();
  const ideas = suggestions.filter((idea) => {
    if (seen.has(idea.id)) return false;
    seen.add(idea.id);
    return true;
  }).slice(0, 4);

  return {
    ideas,
    guides,
    clarification: details?.clarification,
    shoppingNeed: details?.shoppingNeed,
    cautions: result.analysis.safetyNotes,
  };
}
