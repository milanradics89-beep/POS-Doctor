import { describe, expect, it } from 'vitest';
import { analyzeAndAct } from './intelligencePipeline';
import type { CandidateProvider } from './candidateProvider';
import type { Candidate } from './candidate';

const candidate = (id: string, kind: Candidate['kind'], name: string, priceHuf?: number): Candidate => ({
  id, kind, name, priceHuf, availability: 'in_stock', styleTags: ['modern', 'smart casual'], colorTags: ['brown'], evidence: ['provider'], uncertainty: [], url: `https://example.com/${id}`,
});

function provider(id: string, items: Candidate[]): CandidateProvider {
  return { id, supports: () => true, search: async () => items };
}

describe('USEIT intelligence pipeline', () => {
  it('handles room redesign and shopping', async () => {
    const result = await analyzeAndAct({ domain: 'room', userText: 'Rendezd át modernebbre új bútorokkal', sceneSignals: ['sofa', 'living room'], budgetHuf: 250000, preferredStyles: ['modern'], providers: [provider('furniture', [candidate('sofa-1', 'product', 'Modern sofa', 180000)])] });
    expect(result.need.kind).toBe('redesign');
    expect(result.action.type).toBe('visualize');
    expect(result.rankedCandidates[0].id).toBe('sofa-1');
  });

  it('handles food and missing ingredients', async () => {
    const result = await analyzeAndAct({ domain: 'food', userText: 'Mit főzzek ebből?', sceneSignals: ['egg', 'tomato', 'cheese'], providers: [provider('grocery', [candidate('rice-1', 'ingredient', 'Rice')])] });
    expect(result.need.kind).toBe('cook');
    expect(result.action.type).toBe('recipe');
  });

  it('handles wardrobe styling', async () => {
    const result = await analyzeAndAct({ domain: 'wardrobe', userText: 'Milyen szettet rakjak össze?', sceneSignals: ['white shirt', 'navy trousers'], providers: [provider('fashion', [candidate('belt-1', 'accessory', 'Brown leather belt')])] });
    expect(result.need.kind).toBe('style');
    expect(result.action.type).toBe('style');
  });

  it('handles repair intent', async () => {
    const result = await analyzeAndAct({ domain: 'object', userText: 'Hogyan javítsam meg? Alkatrész kell', sceneSignals: ['broken hinge'], providers: [provider('parts', [candidate('hinge-1', 'replacement_part', 'Replacement hinge')])] });
    expect(result.need.kind).toBe('repair');
    expect(result.action.type).toBe('repair_guide');
  });
});
