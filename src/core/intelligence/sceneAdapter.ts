import type { SceneAnalysis } from './types';
import type { CandidateProvider } from './candidateProvider';
import { analyzeAndAct, type IntelligenceOutput } from './intelligencePipeline';

export type SceneIntelligenceOptions = {
  userText?: string;
  providers?: CandidateProvider[];
  budgetHuf?: number;
  preferredStyles?: string[];
  preferredColors?: string[];
  requiredCategory?: string;
};

function sceneSignals(scene: SceneAnalysis): string[] {
  return [
    `scene:${scene.sceneType}`,
    ...scene.items.map(item => `item:${item.name}${item.category ? `:${item.category}` : ''}`),
    ...scene.constraints.map(value => `constraint:${value}`),
    ...scene.opportunities.map(value => `opportunity:${value.kind}:${value.title}`),
  ];
}

export async function analyzeSceneIntelligence(scene: SceneAnalysis, options: SceneIntelligenceOptions = {}): Promise<IntelligenceOutput> {
  const domain = scene.sceneType === 'wardrobe'
    ? 'wardrobe'
    : scene.sceneType === 'fridge' || scene.sceneType === 'food'
      ? 'food'
      : scene.sceneType === 'kitchen'
        ? 'room'
        : scene.sceneType === 'room' || scene.sceneType === 'table'
          ? 'room'
          : scene.sceneType === 'objects' || scene.sceneType === 'garage' || scene.sceneType === 'garden'
            ? 'object'
            : 'general';

  return analyzeAndAct({
    domain,
    userText: options.userText ?? '',
    sceneSignals: sceneSignals(scene),
    providers: options.providers ?? [],
    budgetHuf: options.budgetHuf,
    preferredStyles: options.preferredStyles,
    preferredColors: options.preferredColors,
    requiredCategory: options.requiredCategory,
  });
}
