import type { SceneAnalysis } from './types';
import { decideExperience, type ExperienceDecision } from './experience';

export type ExperienceState =
  | { status: 'idle' }
  | { status: 'analyzing' }
  | { status: 'ready'; decision: ExperienceDecision }
  | { status: 'error'; message: string };

export function resolveExperienceState(analysis: SceneAnalysis): ExperienceState {
  return { status: 'ready', decision: decideExperience(analysis) };
}

export function analyzingState(): ExperienceState { return { status: 'analyzing' }; }

export function errorState(error: unknown): ExperienceState {
  return { status: 'error', message: error instanceof Error ? error.message : 'Something went wrong.' };
}
