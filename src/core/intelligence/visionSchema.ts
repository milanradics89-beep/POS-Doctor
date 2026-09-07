import type { SceneModel } from './sceneModel';

export const SCENE_MODEL_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['imageId', 'domain', 'objects', 'relations', 'globalAttributes'],
  properties: {
    imageId: { type: 'string' },
    domain: { type: 'string', enum: ['room', 'food', 'wardrobe', 'object', 'unknown'] },
    objects: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['id', 'label', 'category', 'attributes', 'confidence'], properties: { id: { type: 'string' }, label: { type: 'string' }, category: { type: 'string', enum: ['furniture', 'fixture', 'appliance', 'food', 'clothing', 'accessory', 'object', 'person', 'unknown'] }, attributes: { type: 'object', additionalProperties: true }, confidence: { type: 'number', minimum: 0, maximum: 1 } } } },
    relations: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['subjectId', 'relation', 'objectId', 'confidence'], properties: { subjectId: { type: 'string' }, relation: { type: 'string', enum: ['near', 'inside', 'on', 'under', 'beside', 'worn_with', 'part_of'] }, objectId: { type: 'string' }, confidence: { type: 'number', minimum: 0, maximum: 1 } } } },
    globalAttributes: { type: 'object', additionalProperties: true },
  },
} as const;

export function buildVisionSystemPrompt(): string {
  return 'Analyze the supplied image and return ONLY JSON matching SceneModel. Identify visible objects conservatively. Do not invent hidden objects, brands, measurements, prices, or unsupported facts. Use confidence 0..1 and add relations only when visually supported. Use unknown rather than guessing.';
}

export function isSceneModel(value: unknown): value is SceneModel {
  if (!value || typeof value !== 'object') return false;
  const scene = value as Record<string, unknown>;
  return typeof scene.imageId === 'string' && Array.isArray(scene.objects) && Array.isArray(scene.relations) && typeof scene.globalAttributes === 'object';
}
