import type { CandidateKind, Need } from './intentNeed';

export type CandidateSearchRequest = {
  needKind: Need['kind']; domain: Need['domain']; candidateKinds: CandidateKind[];
  query: string; constraints: string[]; budgetHuf?: number;
};

export function buildCandidateSearchRequest(need: Need, context: { sceneSignals: string[]; constraints?: string[]; budgetHuf?: number }): CandidateSearchRequest {
  return {
    needKind: need.kind,
    domain: need.domain,
    candidateKinds: need.requiredCandidateKinds,
    query: [need.description, ...context.sceneSignals].join('; '),
    constraints: context.constraints ?? [],
    budgetHuf: context.budgetHuf,
  };
}
