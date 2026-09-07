import type { SceneAnalysis } from './types';

export type ObservationSummary = { highConfidence: string[]; uncertain: string[]; count: number };

export function summarizeObservations(analysis: SceneAnalysis): ObservationSummary {
  const highConfidence: string[] = [];
  const uncertain: string[] = [];
  for (const item of analysis.items) {
    (item.confidence >= 0.7 ? highConfidence : uncertain).push(item.name);
  }
  return { highConfidence: highConfidence.slice(0, 12), uncertain: uncertain.slice(0, 8), count: analysis.items.length };
}
