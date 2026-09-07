import type { SceneModel } from './sceneModel';
import type { DomainAnalysis } from './domainAnalyzer';
import { inferDomainNeeds } from './domainNeedEngine';
import { planTask } from './taskPlanner';
import { buildClarificationGate } from './clarificationGate';
import { buildShoppingDecision } from './shoppingDecisionEngine';
import { collectProductCandidates, type ProductProvider } from './productCandidateCollector';
import { rankProducts } from './productRankingEngine';
import { optimizeShoppingSolution } from './solutionOptimizer';
import { scoreSolutionCompatibility } from './visualCompatibilityEngine';
import { buildRedesignPlan } from './redesignPlan';

export type IntelligenceRun = {
  status: 'needs_clarification'|'completed'|'no_candidates'; scene: SceneModel;
  task: ReturnType<typeof planTask>; clarification: ReturnType<typeof buildClarificationGate>;
  candidates?: Awaited<ReturnType<typeof collectProductCandidates>>;
  ranked?: ReturnType<typeof rankProducts>; solutions?: ReturnType<typeof scoreSolutionCompatibility>;
  redesign?: ReturnType<typeof buildRedesignPlan>;
};

export async function runIntelligence(scene: SceneModel, analysis: DomainAnalysis, providers: ProductProvider[] = [], options: Parameters<typeof planTask>[2] = {}): Promise<IntelligenceRun> {
  const needs = inferDomainNeeds(scene, analysis, options.userText);
  const task = planTask(scene, needs, options);
  const clarification = buildClarificationGate(scene, task, analysis);
  if (clarification.needsClarification) return { status: 'needs_clarification', scene, task, clarification };
  if (!task.shoppingRequired) return { status: 'completed', scene, task, clarification };
  const decision = buildShoppingDecision(scene, task);
  const candidates = await collectProductCandidates(decision, providers);
  if (!candidates.candidates.length) return { status: 'no_candidates', scene, task, clarification, candidates };
  const ranked = rankProducts(scene, decision, candidates.candidates);
  const rawSolutions = optimizeShoppingSolution(decision, ranked);
  const solutions = scoreSolutionCompatibility(scene, rawSolutions);
  const top = solutions[0];
  const redesign = top && scene.domain === 'room' ? buildRedesignPlan(scene, top) : undefined;
  return { status: 'completed', scene, task, clarification, candidates, ranked, solutions, redesign };
}
