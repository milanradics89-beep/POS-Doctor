import type { RankedProduct } from './productRankingEngine';
import type { ShoppingSolution } from './solutionOptimizer';
import type { SceneModel } from './sceneModel';

export type CompatibilityResult = ShoppingSolution & { visualCompatibility: number; finalScore: number; compatibilityReasons: string[] };

export function scoreSolutionCompatibility(scene: SceneModel, solutions: ShoppingSolution[]): CompatibilityResult[] {
  return solutions.map(solution => {
    const products = solution.items.map(item => item.product);
    const visualCompatibility = calculateVisualCompatibility(scene, products);
    return { ...solution, visualCompatibility, finalScore: solution.score * 0.65 + visualCompatibility * 0.35, compatibilityReasons: buildCompatibilityReasons(scene, products, visualCompatibility) };
  }).sort((a, b) => b.finalScore - a.finalScore);
}

function calculateVisualCompatibility(scene: SceneModel, products: RankedProduct[]): number {
  if (!products.length) return 0;
  const sceneStyle = normalize(scene.globalAttributes.style);
  const sceneColor = normalize(scene.globalAttributes.colorPalette);
  let total = 0;
  for (const product of products) {
    const style = normalize(product.attributes.style);
    const color = normalize(product.attributes.color);
    let score = 0.5;
    if (sceneStyle && style && sceneStyle === style) score += 0.25;
    if (sceneColor && color && sceneColor.includes(color)) score += 0.15;
    total += Math.min(1, score);
  }
  return total / products.length;
}
function normalize(value: unknown): string { return Array.isArray(value) ? value.map(String).join(' ').toLowerCase() : typeof value === 'string' ? value.toLowerCase() : ''; }
function buildCompatibilityReasons(scene: SceneModel, products: RankedProduct[], score: number): string[] {
  const reasons: string[] = [];
  if (score >= 0.8) reasons.push('Strong visual compatibility with the analyzed scene.');
  else if (score >= 0.6) reasons.push('Good overall visual compatibility with the analyzed scene.');
  else reasons.push('Visual compatibility is moderate and should be validated with the redesign preview.');
  if (scene.domain === 'room' && products.length > 1) reasons.push('Products were evaluated as a combined room solution.');
  return reasons;
}
