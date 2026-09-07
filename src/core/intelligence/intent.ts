import type { OpportunityKind, SceneType } from './types';
import { SCENE_PROFILES } from './sceneProfiles';

export const INTENTS: OpportunityKind[] = ['create','improve','fix','cook','reuse','play','organize','surprise'];

export function inferIntent(sceneType: SceneType, requested?: OpportunityKind): OpportunityKind {
  if (requested && INTENTS.includes(requested)) return requested;
  return SCENE_PROFILES[sceneType].defaultIntent;
}
