import type { SceneAnalysis, SceneType } from './types';

export type SceneContext = {
  sceneType: SceneType;
  label: string;
  primaryItems: string[];
  constraints: string[];
  safetyNotes: string[];
};

const labels: Record<SceneType,string> = {
  room:'Your space', table:'What is on the table', fridge:'What you have in the kitchen', wardrobe:'What you have to work with', garage:'What is in the garage', garden:'Your outdoor space', objects:'Your objects', food:'What you have to eat', mixed:'What I can see', unknown:'What I can see'
};

export function buildSceneContext(analysis: SceneAnalysis): SceneContext {
  return {
    sceneType: analysis.sceneType,
    label: labels[analysis.sceneType],
    primaryItems: analysis.items.filter(i=>i.confidence>=0.65).slice(0,12).map(i=>i.name),
    constraints: analysis.constraints.slice(0,8),
    safetyNotes: analysis.safetyNotes.slice(0,8),
  };
}
