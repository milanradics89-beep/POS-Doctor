export type SceneObject = {
  id: string;
  label: string;
  category: 'furniture' | 'fixture' | 'appliance' | 'food' | 'clothing' | 'accessory' | 'object' | 'person' | 'unknown';
  attributes: Record<string, string | number | boolean>;
  confidence: number;
  boundingBox?: { x: number; y: number; width: number; height: number };
};

export type SceneRelation = {
  subjectId: string;
  relation: 'near' | 'inside' | 'on' | 'under' | 'beside' | 'worn_with' | 'part_of';
  objectId: string;
  confidence: number;
};

export type SceneModel = {
  imageId: string;
  domain: 'room' | 'food' | 'wardrobe' | 'object' | 'unknown';
  objects: SceneObject[];
  relations: SceneRelation[];
  globalAttributes: Record<string, string | number | boolean>;
};

export function sceneSignals(scene: SceneModel): string[] {
  return [
    ...scene.objects.map(object => object.label),
    ...scene.objects.flatMap(object => Object.entries(object.attributes).map(([key, value]) => `${key}:${value}`)),
    ...scene.relations.map(relation => `${relation.subjectId}:${relation.relation}:${relation.objectId}`),
  ];
}
