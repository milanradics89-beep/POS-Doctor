export type BudgetPlan = {
  totalHuf: number;
  maxProductSpendHuf: number;
  reserveHuf: number;
  currency: 'HUF';
};

export function createBudgetPlan(totalHuf: number): BudgetPlan {
  if (!Number.isFinite(totalHuf) || totalHuf <= 0) {
    throw new Error('Budget must be a positive number.');
  }

  const reserveHuf = Math.round(totalHuf * 0.05);
  return {
    totalHuf: Math.round(totalHuf),
    maxProductSpendHuf: Math.round(totalHuf - reserveHuf),
    reserveHuf,
    currency: 'HUF',
  };
}
