import type { Opportunity, SceneAnalysis } from './types';

export function rankOpportunities(analysis: SceneAnalysis): Opportunity[] {
  return [...analysis.opportunities].sort((a, b) => {
    const effort = { easy: 0, medium: 1, advanced: 2 };
    const visual = Number(b.visualizable) - Number(a.visualizable);
    if (visual) return visual;
    return effort[a.effort] - effort[b.effort];
  });
}
