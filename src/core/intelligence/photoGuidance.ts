import type { SceneAnalysis } from './types';
import { sceneConfidence } from './sceneConfidence';

export type PhotoGuidance = { title: string; tips: string[]; severity: 'none' | 'helpful' | 'recommended' };

export function photoGuidance(analysis: SceneAnalysis): PhotoGuidance {
  const confidence = sceneConfidence(analysis);
  if (analysis.sceneType !== 'unknown' && confidence >= 0.7) return { title: 'Good view', tips: [], severity: 'none' };
  if (confidence >= 0.55) return { title: 'A clearer view could improve the result', tips: ['Include the whole scene', 'Use brighter, even lighting', 'Avoid covering important objects'], severity: 'helpful' };
  return { title: 'Take another photo for a better result', tips: ['Step back and capture the full scene', 'Keep the camera steady', 'Make sure important details are visible'], severity: 'recommended' };
}
