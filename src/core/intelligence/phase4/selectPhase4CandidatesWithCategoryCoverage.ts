import type { ProductCandidate } from '../productCandidateCollector';

export function selectPhase4CandidatesWithCategoryCoverage(
  rankedCandidates: ProductCandidate[],
  categories: string[],
  limit: number,
): ProductCandidate[] {
  if (limit <= 0 || rankedCandidates.length === 0) return [];

  const normalizedCategories = [...new Set(
    categories
      .map(category => category.trim().toLowerCase())
      .filter(Boolean),
  )];
  const selected: ProductCandidate[] = [];
  const selectedIds = new Set<string>();

  for (const category of normalizedCategories) {
    if (selected.length >= limit) break;
    const candidate = rankedCandidates.find(
      item => item.category.trim().toLowerCase() === category && !selectedIds.has(item.id),
    );
    if (!candidate) continue;
    selected.push(candidate);
    selectedIds.add(candidate.id);
  }

  for (const candidate of rankedCandidates) {
    if (selected.length >= limit) break;
    if (selectedIds.has(candidate.id)) continue;
    selected.push(candidate);
    selectedIds.add(candidate.id);
  }

  return selected;
}
