import type { OpportunityKind } from './types';
import { buildSceneAnalysisPrompt } from './scenePrompt';

export type PromptPolicy = { system: string; intent?: OpportunityKind; locale: string };

export function createPromptPolicy(intent?: OpportunityKind, locale = 'hu-HU'): PromptPolicy {
  return { system: buildSceneAnalysisPrompt({ intent, locale }), intent, locale };
}
