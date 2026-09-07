import type { SceneAnalysis } from './types';
import { scoreOpportunity } from './resultQuality';

export type QualityGate = { pass: boolean; score: number; reasons: string[] };

export function evaluateQuality(analysis: SceneAnalysis): QualityGate {
  const reasons: string[] = [];
  if (analysis.sceneType === 'unknown') reasons.push('Scene type is uncertain.');
  if (!analysis.summary.trim()) reasons.push('Missing scene summary.');
  if (!analysis.opportunities.length) reasons.push('No actionable opportunities found.');
  const topScore = analysis.opportunities.length ? Math.max(...analysis.opportunities.map(o => scoreOpportunity(o, analysis))) : 0;
  if (topScore < 0.45) reasons.push('No sufficiently grounded opportunity.');
  return { pass: reasons.length === 0, score: topScore, reasons };
}
