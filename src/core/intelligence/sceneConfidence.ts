import type { SceneAnalysis, SceneType } from './types';

const MIN_CONFIDENCE = 0.55;

export function sceneConfidence(analysis: SceneAnalysis): number {
  if (!analysis.items.length) return 0;
  const avg = analysis.items.reduce((sum, item) => sum + item.confidence, 0) / analysis.items.length;
  return Math.max(0, Math.min(1, avg));
}

export function shouldAskForBetterPhoto(analysis: SceneAnalysis): boolean {
  return analysis.sceneType === 'unknown' || sceneConfidence(analysis) < MIN_CONFIDENCE;
}

export function sceneLabel(sceneType: SceneType): string {
  return {
    room: 'Room', table: 'Materials', fridge: 'Fridge', wardrobe: 'Wardrobe', garage: 'Workshop',
    garden: 'Outdoor space', objects: 'Objects', food: 'Food', mixed: 'Everyday scene', unknown: 'Scene',
  }[sceneType];
}
