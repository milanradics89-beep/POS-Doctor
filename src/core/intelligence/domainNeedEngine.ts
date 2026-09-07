import type { SceneModel } from './sceneModel';
import type { DomainAnalysis } from './domainAnalyzer';

export type DomainNeed = 'room_redesign'|'room_shopping'|'food_recipe'|'food_missing_ingredients'|'wardrobe_styling'|'wardrobe_shopping'|'object_identify'|'object_repair'|'object_replace';
export type DomainNeedResult = { needs: DomainNeed[]; priority: DomainNeed; rationale: string[] };

export function inferDomainNeeds(scene: SceneModel, analysis: DomainAnalysis, userText = ''): DomainNeedResult {
  const text = userText.toLowerCase();
  const rationale: string[] = [];
  let needs: DomainNeed[] = [];
  if (scene.domain === 'room') {
    needs = /venni|vásárol|új|bútor|berendez/.test(text) ? ['room_shopping','room_redesign'] : ['room_redesign','room_shopping'];
    rationale.push('Room scene detected; redesign and complementary shopping are linked actions.');
  } else if (scene.domain === 'food') {
    needs = /venni|bevásárl/.test(text) ? ['food_missing_ingredients','food_recipe'] : ['food_recipe','food_missing_ingredients'];
    rationale.push('Food scene detected; recipe and missing-ingredient planning are linked actions.');
  } else if (scene.domain === 'wardrobe') {
    needs = /venni|vásárol/.test(text) ? ['wardrobe_shopping','wardrobe_styling'] : ['wardrobe_styling','wardrobe_shopping'];
    rationale.push('Wardrobe scene detected; styling can identify complementary purchases.');
  } else if (scene.domain === 'object') {
    needs = text.includes('jav') ? ['object_repair','object_identify'] : text.includes('csere') ? ['object_replace','object_identify'] : ['object_identify','object_repair'];
    rationale.push('Object scene detected; identification precedes repair or replacement.');
  } else {
    rationale.push('Unknown scene domain requires clarification.');
  }
  if (analysis.actionableObjects.length === 0 && needs.length) rationale.push('No high-confidence actionable objects were detected.');
  return { needs, priority: needs[0] ?? 'object_identify', rationale };
}
