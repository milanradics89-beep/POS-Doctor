import type { DesignBrief } from './designBrief';
import type { BudgetPlan } from './budgetPlan';

export type DesignCategory = 'furniture' | 'lighting' | 'decor' | 'storage' | 'textiles';
export type BudgetAllocation = { category: DesignCategory; targetHuf: number; priority: number };

const BASE_ALLOCATION: Record<DesignCategory, number> = { furniture: 0.45, lighting: 0.15, storage: 0.15, textiles: 0.10, decor: 0.15 };

export function allocateDesignBudget(brief: DesignBrief, budget: BudgetPlan): BudgetAllocation[] {
  const sceneFactor = brief.sceneType === 'room' ? 1 : 0.7;
  const entries = (Object.entries(BASE_ALLOCATION) as [DesignCategory, number][]).map(([category, share]) => ({
    category, targetHuf: Math.round(budget.maxProductSpendHuf * share * sceneFactor), priority: category === 'furniture' ? 1 : 2,
  }));
  const total = entries.reduce((sum, item) => sum + item.targetHuf, 0);
  entries[0].targetHuf += budget.maxProductSpendHuf - total;
  return entries;
}
