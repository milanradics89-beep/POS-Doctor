import type { ProductCandidate, ShoppingDecision } from './shoppingDecisionEngine';
import type { SceneModel } from './sceneModel';

export type RankedProduct = ProductCandidate & { score: number; scoreBreakdown: Record<string, number>; reasons: string[] };

function finiteScore(value: number, fallback = 0.5): number {
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : fallback;
}

export function rankProducts(scene: SceneModel, decision: ShoppingDecision, candidates: ProductCandidate[]): RankedProduct[] {
  return candidates.map(candidate => {
    const scoreBreakdown = {
      categoryFit: finiteScore(decision.categories.some(category => normalizeText(category) === normalizeText(candidate.category)) ? 1 : 0.35),
      budgetFit: finiteScore(scoreBudget(candidate, decision)),
      styleFit: finiteScore(scoreAttribute(candidate, decision, 'style')),
      colorFit: finiteScore(scoreAttribute(candidate, decision, 'color')),
      availability: finiteScore(candidate.availability === 'in_stock' ? 1 : candidate.availability === 'out_of_stock' ? 0 : 0.35),
    };
    const score = finiteScore(
      scoreBreakdown.categoryFit * 0.30 + scoreBreakdown.budgetFit * 0.25 + scoreBreakdown.styleFit * 0.20 + scoreBreakdown.colorFit * 0.10 + scoreBreakdown.availability * 0.15,
    );
    return { ...candidate, score, scoreBreakdown, reasons: buildReasons(candidate, scoreBreakdown, scene) };
  }).sort((a, b) => b.score - a.score || a.title.localeCompare(b.title) || a.id.localeCompare(b.id));
}

function normalizeText(value: string): string {
  return typeof value === 'string' ? value.trim().toLocaleLowerCase() : '';
}

function scoreBudget(candidate: ProductCandidate, decision: ShoppingDecision): number {
  const price = candidate.priceHuf;
  const budget = decision.budgetHuf;
  if (budget == null) return 0.5;
  if (price == null) return 0.35;
  if (!Number.isFinite(price) || price < 0 || !Number.isFinite(budget) || budget < 0) return 0.35;
  if (budget === 0) return price === 0 ? 1 : 0;
  if (price <= budget) return 1 - 0.5 * (price / budget);
  return Math.max(0, 0.5 - (price - budget) / budget);
}

function scoreAttribute(candidate: ProductCandidate, decision: ShoppingDecision, key: string): number {
  const preferredValue = decision.constraints[`preferred${key[0].toUpperCase()}${key.slice(1)}s`];
  if (!Array.isArray(preferredValue)) return 0.5;
  const preferred = preferredValue.filter((item): item is string => typeof item === 'string' && Boolean(item.trim())).map(item => item.trim().toLocaleLowerCase());
  if (preferred.length === 0) return 0.5;
  const tagsKey = key === 'style' ? 'styleTags' : key === 'color' ? 'colorTags' : '';
  const rawValue = candidate.attributes[key] ?? (tagsKey ? candidate.attributes[tagsKey] : undefined);
  const values = (typeof rawValue === 'string' ? [rawValue] : Array.isArray(rawValue) ? rawValue : [])
    .filter((item): item is string => typeof item === 'string' && Boolean(item.trim()))
    .map(item => item.trim().toLocaleLowerCase());
  if (values.length === 0) return 0.5;
  return preferred.some(item => values.includes(item)) ? 1 : 0.25;
}

function buildReasons(candidate: ProductCandidate, scores: Record<string, number>, scene: SceneModel): string[] {
  const reasons: string[] = [];
  if (scores.categoryFit >= 0.9) reasons.push(`Matches the required ${candidate.category} category.`);
  if (scores.budgetFit >= 0.8) reasons.push('Fits the available budget well.');
  if (scores.styleFit >= 0.9) reasons.push('Matches the requested style.');
  if (scores.colorFit >= 0.9) reasons.push('Matches the requested color.');
  if (scores.availability >= 0.9) reasons.push('Currently marked in stock.');
  if (scene.domain === 'room') reasons.push('Evaluated in the context of the photographed room.');
  return reasons;
}
