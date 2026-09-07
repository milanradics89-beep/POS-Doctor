import type { PlannedTask } from './taskPlanner';
import type { DomainAnalysis } from './domainAnalyzer';
import type { SceneModel } from './sceneModel';

export type ClarificationQuestion = { id: string; text: string; type: 'single_select'|'multi_select'|'number'|'text'; options?: string[]; required: boolean };
export type ClarificationResult = { needsClarification: boolean; questions: ClarificationQuestion[] };

export function buildClarificationGate(scene: SceneModel, task: PlannedTask, analysis: DomainAnalysis): ClarificationResult {
  const questions: ClarificationQuestion[] = [];
  if (scene.domain === 'room' && task.shoppingRequired && task.budgetHuf == null) questions.push({ id: 'budget', text: 'Mekkora költségkeretben gondolkodsz?', type: 'number', required: true });
  if (scene.domain === 'room' && task.goal === 'room_redesign' && task.preserveExisting == null) questions.push({ id: 'furniture_mode', text: 'A meglévő bútorokkal rendezzem át, vagy új bútorokat is keressek?', type: 'single_select', options: ['Meglévő bútorokkal', 'Új bútorokkal is'], required: true });
  if (scene.domain === 'room' && task.shoppingRequired && !task.constraints.preferredStyles?.length) questions.push({ id: 'style', text: 'Milyen stílust szeretnél?', type: 'single_select', options: ['Modern','Minimalista','Skandináv','Klasszikus','Industrial','Rád bízom'], required: false });
  if (scene.domain === 'food' && analysis.missingContext.includes('servings')) questions.push({ id: 'servings', text: 'Hány főre készítsük?', type: 'number', required: true });
  if (scene.domain === 'wardrobe' && analysis.missingContext.includes('occasion')) questions.push({ id: 'occasion', text: 'Milyen alkalomra állítsuk össze?', type: 'single_select', options: ['Munka','Hétköznapi','Randi','Elegáns esemény','Sport','Egyéb'], required: true });
  return { needsClarification: questions.some(q => q.required), questions };
}
