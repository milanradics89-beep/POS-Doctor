import type { Candidate } from './candidate';
import type { CandidateSearchRequest } from './needCandidates';

export interface CandidateProvider {
  readonly id: string;
  supports(request: CandidateSearchRequest): boolean;
  search(request: CandidateSearchRequest): Promise<Candidate[]>;
}

export type CandidateSearchResult = { providerId: string; candidates: Candidate[] };

export async function searchCandidates(provider: CandidateProvider, request: CandidateSearchRequest): Promise<CandidateSearchResult> {
  if (!provider.supports(request)) throw new Error(`Provider ${provider.id} does not support ${request.needKind}/${request.domain}.`);
  return { providerId: provider.id, candidates: await provider.search(request) };
}
