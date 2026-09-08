import type { VisionSceneAnalysis } from './visionContract';
import type { SceneModel, SceneObject } from './sceneModel';

const categories: SceneObject['category'][] = ['furniture', 'fixture', 'appliance', 'food', 'clothing', 'accessory', 'object', 'person', 'unknown'];

function objectCategory(category = ''): SceneObject['category'] {
  const value = category.toLowerCase();
  if (categories.includes(value as SceneObject['category'])) return value as SceneObject['category'];
  if (/sofa|chair|table|bed|cabinet|shelf|desk|rug/.test(value)) return 'furniture';
  if (/lamp|light|sink|toilet|shower|tap/.test(value)) return 'fixture';
  if (/fridge|oven|dishwasher|washer|appliance/.test(value)) return 'appliance';
  if (/shirt|dress|trouser|shoe|jacket|clothing/.test(value)) return 'clothing';
  if (/food|ingredient|fruit|vegetable|meat/.test(value)) return 'food';
  return 'object';
}

/** The only translation boundary from the Vision API DTO into the intelligence SceneModel. */
export function toSceneModel(analysis: VisionSceneAnalysis, imageId: string): SceneModel {
  const domain: SceneModel['domain'] = analysis.sceneType === 'wardrobe'
    ? 'wardrobe'
    : analysis.sceneType === 'fridge' || analysis.sceneType === 'food'
      ? 'food'
      : analysis.sceneType === 'objects' || analysis.sceneType === 'garage' || analysis.sceneType === 'garden'
        ? 'object'
        : analysis.sceneType === 'room' || analysis.sceneType === 'table'
          ? 'room'
          : 'unknown';

  const objects: SceneObject[] = analysis.items.map((item, index) => ({
    id: `vision-${index + 1}`,
    label: item.name.trim(),
    category: objectCategory(item.category),
    attributes: Object.fromEntries((item.attributes ?? []).map(attribute => [attribute.trim(), true]).filter(([attribute]) => attribute.length > 0)),
    confidence: Math.max(0, Math.min(1, item.confidence)),
  }));

  return {
    imageId,
    domain,
    objects,
    relations: [],
    globalAttributes: {
      sceneType: analysis.sceneType,
      sceneSummary: analysis.summary.trim(),
      constraints: analysis.constraints.map(value => value.trim()).filter(Boolean).join('; '),
      safetyNotes: analysis.safetyNotes.map(value => value.trim()).filter(Boolean).join('; '),
    },
  };
}
