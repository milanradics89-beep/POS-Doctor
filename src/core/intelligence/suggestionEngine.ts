import type { Opportunity, OpportunityKind, SceneAnalysis } from './types';
import { buildSceneContext } from './sceneContext';

const PRIORITY: Record<string, OpportunityKind[]> = {
  room:['improve','organize','create'], table:['create','reuse','play','organize'], fridge:['cook','reuse','organize'], wardrobe:['organize','reuse','improve'], garage:['reuse','fix','create','organize'], garden:['improve','create','organize'], objects:['reuse','create','play','fix'], food:['cook','reuse'], mixed:['create','improve','reuse','organize','surprise'], unknown:['surprise','create','reuse']
};

function rank(o: Opportunity, preferred: OpportunityKind[], items: string[]) {
  const position=preferred.indexOf(o.kind);
  let score=position<0?1:12-position;
  const text=`${o.title} ${o.description} ${o.requiredItems.join(' ')}`.toLowerCase();
  score+=items.filter(i=>text.includes(i.toLowerCase())).length*2;
  score-=Math.min(3,(o.missingItems?.length||0)*.5);
  if(o.effort==='easy')score+=1;
  if(o.visualizable)score+=2;
  return score;
}

export function rankSuggestions(analysis: SceneAnalysis, intent?: OpportunityKind): Opportunity[] {
  const ctx=buildSceneContext(analysis);
  const base=PRIORITY[ctx.sceneType]||PRIORITY.mixed;
  const preferred=intent?[intent,...base.filter(k=>k!==intent)]:base;
  return [...analysis.opportunities].sort((a,b)=>rank(b,preferred,ctx.primaryItems)-rank(a,preferred,ctx.primaryItems)).slice(0,5);
}
