import type { RankedProduct } from './productRankingEngine';
import type { ShoppingDecision } from './shoppingDecisionEngine';

export type SolutionItem = { category: string; product: RankedProduct };
export type ShoppingSolution = { items: SolutionItem[]; totalHuf: number; budgetHuf?: number; score: number; budgetUtilization: number; rationale: string[]; preserveExisting: boolean };

export function optimizeShoppingSolution(decision: ShoppingDecision, ranked: RankedProduct[]): ShoppingSolution[] {
  const grouped = new Map<string, RankedProduct[]>();
  for (const category of decision.categories) grouped.set(category, ranked.filter(p => p.category === category).slice(0, 5));
  const solutions: ShoppingSolution[] = [];
  const categories = [...grouped.keys()];
  function build(index: number, items: SolutionItem[], total: number, score: number) {
    if (index === categories.length) {
      const budget = decision.budgetHuf;
      if (budget != null && total > budget) return;
      const utilization = budget ? total / budget : 0;
      solutions.push({ items, totalHuf: total, budgetHuf: budget, score: score / Math.max(1, items.length), budgetUtilization: utilization, preserveExisting: decision.preserveExisting, rationale: buildRationale(items, utilization) });
      return;
    }
    const category = categories[index];
    for (const product of grouped.get(category) ?? []) build(index + 1, [...items, { category, product }], total + (product.priceHuf ?? 0), score + product.score);
  }
  build(0, [], 0, 0);
  return solutions.sort((a, b) => b.score - a.score || b.budgetUtilization - a.budgetUtilization).slice(0, 5);
}

function buildRationale(items: SolutionItem[], utilization: number): string[] {
  const reasons = [`Combines ${items.length} product categories into one solution.`];
  if (utilization >= 0.8 && utilization <= 1) reasons.push('Uses the available budget efficiently.');
  if (utilization < 0.5) reasons.push('Leaves substantial budget headroom for later additions.');
  return reasons;
}
