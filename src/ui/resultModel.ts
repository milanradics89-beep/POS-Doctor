import type { ConsumerAnalysis, ConsumerIntent } from '../core/intelligence/apiClient';
import { hu } from '../i18n/hu';

export const modeCopy = hu.modes;

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
