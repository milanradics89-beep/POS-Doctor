import { describe, expect, it } from 'vitest';
import { buildVisualConceptPlan } from './visualConceptPlan';
import type { UseitAnalyzeResponse } from './useitAnalyzeContract';

function unifiedResult(overrides: Partial<UseitAnalyzeResponse> = {}): UseitAnalyzeResponse {
  return {
    contractVersion: 'useit_analyze_v1',
    scene: {
      responseFormat: 'scene_analysis_v1',
      sceneType: 'room',
      summary: 'A small living room with a sofa and a side table.',
      items: [],
      constraints: [],
      opportunities: [],
      safetyNotes: [],
    },
    intent: { name: 'improve', confidence: 0.9 },
    specialist: {},
    suggestions: [{
      id: 'idea-1',
      title: 'Create a calmer reading corner',
      description: 'Rearrange the seating and add focused lighting.',
      kind: 'improve',
      effort: 'easy',
      visualizable: true,
      score: 0.9,
      rank: 1,
      reasons: ['Uses the existing room layout'],
    }],
    shopping: {
      query: 'reading corner lamp',
      candidates: [{
        id: 'lamp-1',
        name: 'Warm floor lamp',
        url: 'https://shop.example.test/lamp',
        category: 'lighting',
        price: null,
      }],
    },
    pipeline: ['see', 'understand', 'reason', 'intent', 'specialist', 'suggest', 'plan'],
    ...overrides,
  };
}

describe('buildVisualConceptPlan', () => {
  it('builds a room visual concept from the unified API response', () => {
    const plan = buildVisualConceptPlan({ unified: unifiedResult() });
    expect(plan?.prompt).toContain('Create a calmer reading corner');
    expect(plan?.products).toHaveLength(1);
    expect(plan?.products[0]?.priceHuf).toBeUndefined();
    expect(plan?.products[0]?.id).toBe('lamp-1');
    expect(plan?.actions[0]?.target).toBe('Create a calmer reading corner');
  });

  it('does not offer room redesign for non-room scenes', () => {
    const response = unifiedResult({ scene: { ...unifiedResult().scene, sceneType: 'wardrobe' } });
    expect(buildVisualConceptPlan({ unified: response })).toBeNull();
  });

  it('does not offer redesign when no suggestion is visualizable', () => {
    const response = unifiedResult({ suggestions: unifiedResult().suggestions.map(item => ({ ...item, visualizable: false })) });
    expect(buildVisualConceptPlan({ unified: response })).toBeNull();
  });

  it('prefers the legacy redesign plan when one is present', () => {
    const result = {
      phase3: {
        redesign: {
          prompt: 'Legacy room redesign prompt with enough detail.',
          products: [{ category: 'lighting', productId: 'legacy-1', title: 'Legacy lamp', url: 'https://shop.example.test/legacy' }],
          actions: [{ type: 'add', target: 'Legacy lamp', rationale: 'Adds task lighting.' }],
        },
      },
      unified: unifiedResult(),
    } as unknown as Parameters<typeof buildVisualConceptPlan>[0];
    expect(buildVisualConceptPlan(result)?.prompt).toBe('Legacy room redesign prompt with enough detail.');
  });
});
