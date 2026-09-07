import type { SceneModel } from './sceneModel';
import type { DomainNeed, DomainNeedResult } from './domainNeedEngine';

export type PlannedTask = {
  domain: SceneModel['domain'];
  goal: DomainNeed;
  secondaryGoals: DomainNeed[];
  shoppingRequired: boolean;
  preserveExisting?: boolean;
  budgetHuf?: number;
  requiredItems: string[];
  constraints: Record<string, string | number | boolean | string[]>;
  output: Array<'analysis' | 'recommendations' | 'visual_redesign' | 'shopping_list' | 'missing_ingredients' | 'repair_guidance'>;
};

export function planTask(scene: SceneModel, needs: DomainNeedResult, options: { budgetHuf?: number; preserveExisting?: boolean; preferredStyles?: string[]; preferredColors?: string[]; userText?: string } = {}): PlannedTask {
  const goal = needs.priority;
  const secondaryGoals = needs.needs.filter(n => n !== goal);
  const shoppingRequired = ['room_shopping', 'wardrobe_shopping', 'food_missing_ingredients', 'object_replace'].includes(goal) || secondaryGoals.some(n => ['room_shopping', 'wardrobe_shopping', 'food_missing_ingredients', 'object_replace'].includes(n));
  const requiredItems = scene.objects.filter(o => o.confidence >= 0.7 && o.category !== 'person').map(o => o.label);
  const output: PlannedTask['output'] = ['analysis', 'recommendations'];
  if (goal === 'room_redesign' || goal === 'room_shopping') output.push('visual_redesign', 'shopping_list');
  if (goal === 'food_recipe') output.push('missing_ingredients');
  if (goal === 'food_missing_ingredients') output.push('shopping_list');
  if (goal === 'wardrobe_styling' || goal === 'wardrobe_shopping') output.push('shopping_list');
  if (goal === 'object_repair') output.push('repair_guidance');
  return { domain: scene.domain, goal, secondaryGoals, shoppingRequired, preserveExisting: scene.domain === 'room' ? options.preserveExisting : undefined, budgetHuf: options.budgetHuf, requiredItems, constraints: { preferredStyles: options.preferredStyles ?? [], preferredColors: options.preferredColors ?? [], userText: options.userText ?? '' }, output: [...new Set(output)] };
}
