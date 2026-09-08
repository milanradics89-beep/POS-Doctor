import type { VisionSceneAnalysis } from './visionContract';

/** Normalize and validate the versioned Vision DTO before it crosses into SceneModel. */
export function normalizeAnalysis(analysis: VisionSceneAnalysis): VisionSceneAnalysis {
  return {
    ...analysis,
    responseFormat: 'scene_analysis_v1',
    summary: analysis.summary.trim(),
    items: analysis.items.filter(item => item.name.trim()).map(item => ({
      ...item,
      name: item.name.trim(),
      category: item.category?.trim() || undefined,
      confidence: Math.max(0, Math.min(1, item.confidence)),
      attributes: (item.attributes ?? []).map(value => value.trim()).filter(Boolean),
    })),
    constraints: analysis.constraints.map(value => value.trim()).filter(Boolean),
    safetyNotes: analysis.safetyNotes.map(value => value.trim()).filter(Boolean),
    opportunities: analysis.opportunities.filter(item => item.id.trim() && item.title.trim()).map(item => ({
      ...item,
      id: item.id.trim(),
      title: item.title.trim(),
      description: item.description.trim(),
      requiredItems: item.requiredItems ?? [],
      missingItems: item.missingItems ?? [],
    })),
  };
}
