import type { SceneModel } from './sceneModel';
import type { DomainAnalysis } from './domainAnalyzer';
import { inferDomainNeeds } from './domainNeedEngine';
import { planTask } from './taskPlanner';
import { buildClarificationGate } from './clarificationGate';
import { buildShoppingDecision, type ProductCandidate } from './shoppingDecisionEngine';
import { collectProductCandidates, type ProductProvider } from './productCandidateCollector';
import { rankProducts } from './productRankingEngine';
import { optimizeShoppingSolution } from './solutionOptimizer';
import { scoreSolutionCompatibility } from './visualCompatibilityEngine';
import { buildRedesignPlan } from './redesignPlan';

export type IntelligenceRun = { status: 'needs_clarification'|'completed'|'no_candidates'; scene: SceneModel; task: ReturnType<typeof planTask>; clarification: ReturnType<typeof buildClarificationGate>; candidates?: Awaited<ReturnType<typeof collectProductCandidates>>; ranked?: ReturnType<typeof rankProducts>; solutions?: ReturnType<typeof scoreSolutionCompatibility>; redesign?: ReturnType<typeof buildRedesignPlan> };

function buildFallbackCandidates(task: ReturnType<typeof planTask>): ProductCandidate[] {
  const required = task.requiredItems.filter(item => typeof item === 'string' && item.trim()).slice(0, 6);
  return required.map((item, index) => ({
    id: `useit-fallback-${index + 1}`,
    title: item,
    url: '',
    category: 'fallback',
    attributes: {},
    source: 'useit-fallback',
    availability: 'unknown',
  }));
}

export async function runIntelligence(scene: SceneModel, analysis: DomainAnalysis, providers: ProductProvider[] = [], options: Parameters<typeof planTask>[2] = {}): Promise<IntelligenceRun> {
  const needs = inferDomainNeeds(scene, analysis, options.userText);
  const task = planTask(scene, needs, options);
  const clarification = buildClarificationGate(scene, task, analysis);
  if (clarification.needsClarification) return { status: 'needs_clarification', scene, task, clarification };
  if (!task.shoppingRequired) return { status: 'completed', scene, task, clarification };
  const decision = buildShoppingDecision(scene, task);
  const candidates = await collectProductCandidates(decision, providers);
  const candidatesToRank = candidates.candidates.length > 0 ? candidates.candidates : buildFallbackCandidates(task);
  if (!candidatesToRank.length) return { status: 'no_candidates', scene, task, clarification, candidates };
  const ranked = rankProducts(scene, decision, candidatesToRank);
  const solutions = scoreSolutionCompatibility(scene, optimizeShoppingSolution(decision, ranked));
  const top = solutions[0];
  const redesign = top && scene.domain === 'room' ? buildRedesignPlan(scene, top) : undefined;
  return { status: 'completed', scene, task, clarification, candidates: { ...candidates, candidates: candidatesToRank }, ranked, solutions, redesign };
}
