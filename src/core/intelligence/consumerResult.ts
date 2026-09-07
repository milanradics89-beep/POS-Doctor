import type { SceneAnalysis } from './types';
import { SCENE_PROFILES } from './sceneProfiles';
import { toPresentationResult, type PresentationResult } from './presentation';

export type ConsumerResult = PresentationResult & {
  sceneLabel: string;
  summary: string;
  hasUncertainty: boolean;
};

export function buildConsumerResult(analysis: SceneAnalysis): ConsumerResult {
  const presentation = toPresentationResult(analysis);
  const profile = SCENE_PROFILES[analysis.sceneType];
  return {
    ...presentation,
    sceneLabel: profile.label,
    summary: analysis.summary,
    hasUncertainty: analysis.items.some(item => item.confidence < 0.7),
  };
}
