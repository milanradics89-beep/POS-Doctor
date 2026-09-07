import type { SceneAnalysis } from './types';

export function buildSafeFallback(reason = 'We could not confidently understand the image yet.'): SceneAnalysis {
  return {
    sceneType: 'unknown',
    summary: reason,
    items: [],
    constraints: ['No reliable visual interpretation available.'],
    opportunities: [{ id: 'retry-analysis', title: 'Try another photo', description: 'Use a clearer, well-lit photo showing the whole scene.', kind: 'surprise', effort: 'easy', requiredItems: [], missingItems: [], visualizable: false }],
    safetyNotes: [],
  };
}
