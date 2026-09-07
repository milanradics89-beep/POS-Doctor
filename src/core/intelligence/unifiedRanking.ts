import type { Candidate } from './candidate';
import type { Need } from './intentNeed';

export type RankedCandidate = Candidate & { score: number; reasons: string[] };
export type RankingContext = { budgetHuf?: number; preferredStyles?: string[]; preferredColors?: string[]; requiredCategory?: string };

export function rankCandidates(need: Need, candidates: Candidate[], context: RankingContext = {}): RankedCandidate[] {
  const styles = new Set((context.preferredStyles ?? []).map(v => v.toLowerCase()));
  const colors = new Set((context.preferredColors ?? []).map(v => v.toLowerCase()));
  return candidates.filter(c => c.availability !== 'out_of_stock').map(candidate => {
    let score = Math.min(need.confidence * 20, 20);
    const reasons: string[] = [];
    const styleMatches = candidate.styleTags.filter(v => styles.has(v.toLowerCase())).length;
    const colorMatches = candidate.colorTags.filter(v => colors.has(v.toLowerCase())).length;
    if (styleMatches) { score += styleMatches * 20; reasons.push('style match'); }
    if (colorMatches) { score += colorMatches * 10; reasons.push('color match'); }
    if (context.requiredCategory && candidate.category === context.requiredCategory) { score += 15; reasons.push('category match'); }
    if (context.budgetHuf !== undefined && candidate.priceHuf !== undefined) {
      if (candidate.priceHuf <= context.budgetHuf) { score += 20; reasons.push('within budget'); }
      else { score -= Math.min(30, ((candidate.priceHuf - context.budgetHuf) / context.budgetHuf) * 30); reasons.push('over budget'); }
    }
    if (candidate.evidence.length) score += Math.min(10, candidate.evidence.length * 2);
    if (candidate.uncertainty.length) score -= Math.min(15, candidate.uncertainty.length * 3);
    return { ...candidate, score: Math.max(0, score), reasons };
  }).sort((a, b) => b.score - a.score);
}
