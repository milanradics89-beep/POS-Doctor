import type { PlannedTask } from './taskPlanner';
import type { SceneModel } from './sceneModel';

export type ProductCandidate = { id: string; title: string; url: string; priceHuf?: number; category: string; attributes: Record<string, string | number | boolean | string[]>; availability?: 'in_stock'|'out_of_stock'|'unknown'; source: string };
export type ShoppingDecision = { query: string; categories: string[]; budgetHuf?: number; preserveExisting: boolean; constraints: Record<string, unknown>; candidateSlots: number };

export function buildShoppingDecision(scene: SceneModel, task: PlannedTask): ShoppingDecision {
  const categories = inferCategories(scene, task);
  return { query: buildQuery(scene, task, categories), categories, budgetHuf: task.budgetHuf, preserveExisting: task.preserveExisting ?? true, constraints: { ...task.constraints, sceneDomain: scene.domain, requiredItems: task.requiredItems }, candidateSlots: Math.max(6, categories.length * 4) };
}
function inferCategories(scene: SceneModel, task: PlannedTask): string[] {
  if (scene.domain === 'room') return task.goal === 'room_shopping' ? ['sofa','coffee_table','lighting','decor'] : ['lighting','decor'];
  if (scene.domain === 'wardrobe') return ['top','bottom','shoes','accessory'];
  if (scene.domain === 'food') return ['ingredient'];
  if (scene.domain === 'object') return task.goal === 'object_replace' ? ['replacement'] : ['repair_part'];
  return ['general'];
}
function buildQuery(scene: SceneModel, task: PlannedTask, categories: string[]): string {
  const style = task.constraints.preferredStyles;
  const colors = task.constraints.preferredColors;
  return [scene.domain, ...categories, ...(Array.isArray(style) ? style : []), ...(Array.isArray(colors) ? colors : [])].join(' ');
}
