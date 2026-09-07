import type { SceneAnalysis } from './types';
import { photoGuidance } from './photoGuidance';
import { evaluateQuality } from './qualityGate';
import { toPresentationResult, type PresentationResult } from './presentation';

export type ExperienceDecision = {
  mode: 'results' | 'retake' | 'clarify';
  presentation: PresentationResult;
  photoGuidance: ReturnType<typeof photoGuidance>;
  qualityScore: number;
};

export function decideExperience(analysis: SceneAnalysis): ExperienceDecision {
  const quality = evaluateQuality(analysis);
  const guidance = photoGuidance(analysis);
  const mode = guidance.severity === 'recommended' ? 'retake' : quality.pass ? 'results' : 'clarify';
  return { mode, presentation: toPresentationResult(analysis), photoGuidance: guidance, qualityScore: quality.score };
}
