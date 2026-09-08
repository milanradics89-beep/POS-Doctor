import type { ProductCandidate } from '../productCandidateCollector';
import type { ShoppingDecision } from '../shoppingDecisionEngine';

function stringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string').map(item => item.toLowerCase()) : [];
}

function matchesPreferred(candidate: ProductCandidate, key: 'preferredStyles' | 'preferredColors', attributeKeys: string[]): number {
  const preferred = stringList((candidate as ProductCandidate & { attributes: Record<string, unknown> }).attributes?.[key]);
  if (!preferred.length) return 0;
  const values = attributeKeys.flatMap(attributeKey => stringList(candidate.attributes?.[attributeKey]));
  return preferred.some(value => values.includes(value)) ? 1 : 0;
}

function score(candidate: ProductCandidate, decision: ShoppingDecision): number {
  let value = candidate.availability === 'in_stock' ? 100 : candidate.availability === 'unknown' ? 40 : 0;

  if (typeof candidate.priceHuf === 'number' && typeof decision.budgetHuf === 'number') {
    value += candidate.priceHuf <= decision.budgetHuf ? 50 : -50;
    const distance = Math.abs(candidate.priceHuf - decision.budgetHuf) / Math.max(decision.budgetHuf, 1);
    value -= Math.min(distance * 20, 20);
  } else if (typeof candidate.priceHuf !== 'number') {
    value -= 5;
  }

  const constraints = decision.constraints ?? {};
  const preferredStyles = stringList(constraints.preferredStyles);
  const preferredColors = stringList(constraints.preferredColors);
  const candidateValues = Object.values(candidate.attributes).flatMap(value => stringList(value));
  if (preferredStyles.some(value => candidateValues.includes(value))) value += 20;
  if (preferredColors.some(value => candidateValues.includes(value))) value += 15;

  return value;
}

export function rankPhase4ProductCandidates(
  candidates: ProductCandidate[],
  decision: ShoppingDecision,
): ProductCandidate[] {
  return candidates
    .map((candidate, index) => ({ candidate, index, score: score(candidate, decision) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(({ candidate }) => candidate);
}
