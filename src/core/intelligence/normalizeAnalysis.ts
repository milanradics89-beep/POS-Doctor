import type { SceneAnalysis } from './types';

export function normalizeAnalysis(analysis: SceneAnalysis): SceneAnalysis {
  return {
    ...analysis,
    summary: analysis.summary.trim(),
    items: analysis.items.filter(item => item.name.trim()).map(item => ({ ...item, name: item.name.trim(), confidence: Math.max(0, Math.min(1, item.confidence)) })),
    constraints: analysis.constraints.map(v => v.trim()).filter(Boolean),
    safetyNotes: analysis.safetyNotes.map(v => v.trim()).filter(Boolean),
    opportunities: analysis.opportunities.map(item => ({ ...item, title: item.title.trim(), description: item.description.trim(), requiredItems: item.requiredItems ?? [], missingItems: item.missingItems ?? [] })),
  };
}
