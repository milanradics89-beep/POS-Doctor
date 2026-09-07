import type { Opportunity, OpportunityKind, SceneAnalysis } from './types';
import { buildSceneContext } from './sceneContext';

const priorities: Record<string, OpportunityKind[]> = {
  room: ['improve','organize','create'], table: ['create','reuse','organize','play'], fridge: ['cook','reuse','organize'], wardrobe: ['organize','reuse','improve'], garage: ['reuse','fix','organize','create'], garden: ['improve','create','organize'], objects: ['reuse','create','play','fix'], food: ['cook','reuse'], mixed: ['create','improve','reuse','organize','surprise'], unknown: ['surprise','create','reuse']
};

function score(o: Opportunity, preferred: OpportunityKind[], itemNames: string[]): number {
  let value = Math.max(0, 10 - preferred.indexOf(o.kind));
  if (preferred.indexOf(o.kind) < 0) value -= 2;
  const text = `${o.title} ${o.description} ${o.requiredItems.join(' ')}`.toLowerCase();
  value += itemNames.filter(i => text.includes(i.toLowerCase())).length * 1.5;
  if (o.missingItems?.length) value -= Math.min(3, o.missingItems.length * .5);
  if (o.effort === 'easy') value += 1;
  if (o.visualizable) value += 1;
  return value;
}

export function rankSuggestions(analysis: SceneAnalysis, preferredIntent?: OpportunityKind): Opportunity[] {
  const context = buildSceneContext(analysis);
  const preferred = preferredIntent ? [preferredIntent, ...(priorities[context.sceneType] || [])] : (priorities[context.sceneType] || priorities.mixed);
  return [...analysis.opportunities].sort((a,b)=>score(b,preferred,context.primaryItems)-score(a,preferred,context.primaryItems)).slice(0,5);
}
