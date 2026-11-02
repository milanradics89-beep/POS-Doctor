import type { Opportunity, SceneAnalysis } from './types';

const kindWeight = (kind: Opportunity['kind']) => ({
  create: 1, improve: 1, fix: 1, cook: 1, reuse: 0.95, play: 0.9, organize: 0.85, surprise: 0.8,
}[kind]);

export function scoreOpportunity(opportunity: Opportunity, analysis: SceneAnalysis): number {
  const effortScore = { easy: 1, medium: 0.8, advanced: 0.6 }[opportunity.effort];
  const grounded = opportunity.requiredItems.length === 0
    ? 0.4
    : opportunity.requiredItems.filter(required => analysis.items.some(item => item.name.toLowerCase().includes(required.toLowerCase()))).length / opportunity.requiredItems.length;
  const missingPenalty = Math.min((opportunity.missingItems?.length ?? 0) * 0.12, 0.36);
  return Math.max(0, Math.min(1, 0.35 * grounded + 0.25 * effortScore + 0.2 * Number(opportunity.visualizable) + 0.2 * kindWeight(opportunity.kind) - missingPenalty));
}

export function qualityRank(analysis: SceneAnalysis): Opportunity[] {
  return [...analysis.opportunities].sort((a, b) => scoreOpportunity(b, analysis) - scoreOpportunity(a, analysis));
}
