import type { DesignBrief } from './designBrief';
import type { ProductCandidate } from './productCandidate';

export type RankedProduct = ProductCandidate & { score: number; reasons: string[] };

export function rankProducts(brief: DesignBrief, candidates: ProductCandidate[], maxSpendHuf?: number): RankedProduct[] {
  return candidates
    .filter(p => p.availability !== 'out_of_stock')
    .filter(p => maxSpendHuf === undefined || p.priceHuf === undefined || p.priceHuf <= maxSpendHuf)
    .map(p => {
      let score = 0;
      const reasons: string[] = [];
      const style = new Set(brief.stylePreferences.map(x => x.toLowerCase()));
      const colors = new Set(brief.colorPreferences.map(x => x.toLowerCase()));
      score += p.styleTags.filter(x => style.has(x.toLowerCase())).length * 25;
      score += p.colorTags.filter(x => colors.has(x.toLowerCase())).length * 15;
      if (p.priceHuf !== undefined && maxSpendHuf !== undefined) {
        score += Math.max(0, 20 - (p.priceHuf / maxSpendHuf) * 20);
        reasons.push(`${Math.round((p.priceHuf / maxSpendHuf) * 100)}% of category budget`);
      }
      if (p.availability === 'in_stock') { score += 10; reasons.push('in stock'); }
      if (p.dimensions) { score += 5; reasons.push('dimensions available'); }
      return { ...p, score, reasons };
    })
    .sort((a, b) => b.score - a.score);
}
