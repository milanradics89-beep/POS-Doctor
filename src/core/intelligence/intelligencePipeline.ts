import type { CandidateProvider } from './candidateProvider';
import { searchAcrossProviders } from './candidateOrchestrator';
import { buildAction, type Action } from './actionEngine';
import { classifyIntent } from './intentClassifier';
import { inferNeed, type IntentNeedContext, type Need } from './intentNeed';
import { buildCandidateSearchRequest } from './needCandidates';
import { rankCandidates, type RankedCandidate, type RankingContext } from './unifiedRanking';

export type IntelligenceInput = IntentNeedContext & { providers: CandidateProvider[]; budgetHuf?: number; preferredStyles?: string[]; preferredColors?: string[]; requiredCategory?: string };
export type IntelligenceOutput = { need: Need; rankedCandidates: RankedCandidate[]; action: Action; providers: string[]; warnings: string[]; intentConfidence: number; clarificationRequired: boolean };

export async function analyzeAndAct(input: IntelligenceInput): Promise<IntelligenceOutput> {
  const intent = classifyIntent(input.userText, input.sceneSignals);
  const need = inferNeed({ ...input, domain: intent.domain, userText: input.userText });
  const warnings: string[] = [];
  if (intent.confidence < 0.6) warnings.push('Intent confidence is low; user clarification is recommended before taking a consequential action.');
  const request = buildCandidateSearchRequest(need, { sceneSignals: input.sceneSignals, budgetHuf: input.budgetHuf });
  const search = await searchAcrossProviders(request, input.providers);
  const rankingContext: RankingContext = { budgetHuf: input.budgetHuf, preferredStyles: input.preferredStyles, preferredColors: input.preferredColors, requiredCategory: input.requiredCategory };
  const rankedCandidates = rankCandidates(need, search.candidates, rankingContext);
  const action = buildAction(need, rankedCandidates);
  return { need, rankedCandidates, action, providers: search.providers, warnings: [...warnings, ...search.warnings], intentConfidence: intent.confidence, clarificationRequired: intent.confidence < 0.6 };
}
