import type { SceneModel } from './sceneModel';
import type { CompatibilityResult } from './visualCompatibilityEngine';

export type RedesignAction = { type: 'keep'|'replace'|'add'|'reposition'; target: string; rationale: string };
export type RedesignPlan = { domain: SceneModel['domain']; sourceImageRequired: true; actions: RedesignAction[]; products: Array<{ category: string; productId: string; title: string; priceHuf?: number; url: string }>; prompt: string; disclosure: string };

export function buildRedesignPlan(scene: SceneModel, solution: CompatibilityResult): RedesignPlan {
  const existing = scene.objects.filter(o => o.confidence >= 0.7 && o.category !== 'person');
  const selected = solution.items.map(item => ({ category: item.category, productId: item.product.id, title: item.product.title, priceHuf: item.product.priceHuf, url: item.product.url }));
  const actions: RedesignAction[] = [];
  if (scene.domain === 'room') {
    for (const object of existing) actions.push({ type: solution.preserveExisting ? 'keep' : 'replace', target: object.label, rationale: solution.preserveExisting ? 'Preserve existing item according to user preference.' : 'Replace as part of the selected redesign.' });
    for (const item of solution.items) actions.push({ type: 'add', target: item.product.title, rationale: `Add selected ${item.category} to the redesign.` });
  }
  return { domain: scene.domain, sourceImageRequired: true, actions, products: selected, prompt: buildPrompt(scene, solution), disclosure: 'AI-generated visualization. Product appearance, scale, color and placement may differ from the real item. Verify product details on the linked retailer page.' };
}
function buildPrompt(scene: SceneModel, solution: CompatibilityResult): string {
  const products = solution.items.map(item => item.product.title).join(', ');
  const style = typeof scene.globalAttributes.style === 'string' ? scene.globalAttributes.style : 'coherent with the existing room';
  return `Redesign the photographed ${scene.globalAttributes.roomType || 'room'} while preserving the camera viewpoint, architecture and realistic proportions. Use the selected products where appropriate: ${products}. Maintain a ${style} visual language. Keep non-replaced existing elements unchanged, integrate new items naturally, and produce a photorealistic result.`;
}
