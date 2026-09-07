import type { SceneModel, SceneObject, SceneRelation } from './sceneModel';

const OBJECT_CATEGORIES = new Set<SceneObject['category']>(['furniture','fixture','appliance','food','clothing','accessory','object','person','unknown']);
const RELATIONS = new Set<SceneRelation['relation']>(['near','inside','on','under','beside','worn_with','part_of']);

export function normalizeScene(scene: SceneModel): SceneModel {
  const objects = (scene.objects ?? []).filter(Boolean).map((object, index) => ({
    ...object,
    id: object.id || `object-${index + 1}`,
    label: object.label?.trim() || 'unknown object',
    category: OBJECT_CATEGORIES.has(object.category) ? object.category : 'unknown',
    confidence: clamp(object.confidence),
    attributes: object.attributes ?? {},
  }));
  const ids = new Set(objects.map(object => object.id));
  const relations = (scene.relations ?? []).filter(relation => ids.has(relation.subjectId) && ids.has(relation.objectId) && RELATIONS.has(relation.relation)).map(relation => ({ ...relation, confidence: clamp(relation.confidence) }));
  return { ...scene, domain: ['room','food','wardrobe','object','unknown'].includes(scene.domain) ? scene.domain : 'unknown', objects, relations, globalAttributes: scene.globalAttributes ?? {} };
}

function clamp(value: number): number {
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;
}
