import type { SceneModel } from './sceneModel';

export type DomainAnalysis = {
  domain: SceneModel['domain'];
  primaryObjects: string[];
  actionableObjects: string[];
  missingContext: string[];
};

export function analyzeDomain(scene: SceneModel): DomainAnalysis {
  const primaryObjects = scene.objects.filter(o => o.confidence >= 0.55).map(o => o.label);
  const actionableObjects = scene.objects.filter(o => o.confidence >= 0.7 && o.category !== 'person').map(o => o.label);
  const missingContext: string[] = [];
  if (scene.domain === 'room' && !scene.globalAttributes.style) missingContext.push('style');
  if (scene.domain === 'room' && !scene.globalAttributes.roomType) missingContext.push('roomType');
  if (scene.domain === 'food' && !scene.globalAttributes.servings) missingContext.push('servings');
  if (scene.domain === 'wardrobe' && !scene.globalAttributes.occasion) missingContext.push('occasion');
  return { domain: scene.domain, primaryObjects, actionableObjects, missingContext };
}
