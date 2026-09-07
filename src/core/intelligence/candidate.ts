export type CandidateKind = 'product' | 'ingredient' | 'accessory' | 'replacement_part' | 'service' | 'activity';

export type Candidate = {
  id: string;
  kind: CandidateKind;
  name: string;
  retailer?: string;
  url?: string;
  priceHuf?: number;
  currency?: 'HUF';
  availability?: 'in_stock' | 'limited' | 'out_of_stock' | 'unknown';
  dimensions?: { widthCm?: number; heightCm?: number; depthCm?: number };
  category?: string;
  imageUrl?: string;
  styleTags: string[];
  colorTags: string[];
  evidence: string[];
  uncertainty: string[];
};

export function isActionableCandidate(candidate: Candidate): boolean {
  if (!candidate.id || !candidate.name) return false;
  if (candidate.kind === 'product' || candidate.kind === 'accessory' || candidate.kind === 'replacement_part') {
    return Boolean(candidate.url && candidate.availability !== 'out_of_stock');
  }
  return true;
}
