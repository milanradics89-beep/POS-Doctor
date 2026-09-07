import type { Candidate } from './candidate';
import type { CandidateProvider } from './candidateProvider';
import type { CandidateSearchRequest } from './needCandidates';

export type OrchestrationResult = { candidates: Candidate[]; providers: string[]; warnings: string[] };

function dedupe(candidates: Candidate[]): Candidate[] {
  const seen = new Set<string>();
  return candidates.filter(candidate => {
    const key = `${candidate.kind}:${candidate.name.trim().toLowerCase()}:${candidate.url ?? ''}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function searchAcrossProviders(request: CandidateSearchRequest, providers: CandidateProvider[]): Promise<OrchestrationResult> {
  const supported = providers.filter(provider => provider.supports(request));
  const results = await Promise.allSettled(supported.map(provider => provider.search(request)));
  const candidates: Candidate[] = [];
  const providersUsed: string[] = [];
  const warnings: string[] = [];
  results.forEach((result, index) => {
    const provider = supported[index];
    if (result.status === 'fulfilled') {
      candidates.push(...result.value);
      providersUsed.push(provider.id);
    } else warnings.push(`${provider.id} search failed.`);
  });
  return { candidates: dedupe(candidates), providers: providersUsed, warnings };
}
