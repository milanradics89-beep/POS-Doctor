import { describe, expect, it } from 'vitest';
import { USEIT_ANALYZE_CONTRACT_VERSION, validateUseitAnalyzeResponse } from './useitAnalyzeContract';

const scene = {
  responseFormat: 'scene_analysis_v1',
  sceneType: 'room',
  summary: 'A room scene for contract validation.',
  items: [],
  constraints: [],
  opportunities: [],
  safetyNotes: [],
};

const validResponse = {
  contractVersion: USEIT_ANALYZE_CONTRACT_VERSION,
  scene,
  intent: { name: 'shop', confidence: 0.91 },
  specialist: { profile: 'home-design' },
  suggestions: [{
    id: 's1', title: 'Improve the room', description: 'Try a new layout.', kind: 'improve', effort: 'easy',
    visualizable: true, score: 0.8, rank: 1, reasons: ['Matches the scene.'],
  }],
  shopping: {
    query: 'room furniture',
    candidates: [{ id: 'p1', name: 'Chair', url: 'https://shop.example.test/chair', price: 24990, currency: 'HUF', qualityScore: 0.82, searchRank: 1 }],
    errors: [],
  },
  pipeline: ['see', 'understand', 'reason', 'intent', 'specialist', 'suggest', 'shop'],
};

describe('validateUseitAnalyzeResponse', () => {
  it('accepts the complete versioned unified analysis contract', () => {
    const result = validateUseitAnalyzeResponse(validResponse);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.contractVersion).toBe(USEIT_ANALYZE_CONTRACT_VERSION);
      expect(result.data.scene.sceneType).toBe('room');
      expect(result.data.suggestions[0]?.id).toBe('s1');
      expect(result.data.shopping?.candidates[0]?.name).toBe('Chair');
      expect(result.data.pipeline).toContain('specialist');
    }
  });

  it('rejects a response with an invalid contract version', () => {
    const result = validateUseitAnalyzeResponse({ ...validResponse, contractVersion: 'useit_analyze_v0' });
    expect(result.ok).toBe(false);
  });

  it('rejects a response with an invalid scene', () => {
    const result = validateUseitAnalyzeResponse({ ...validResponse, scene: { sceneType: 'room' } });
    expect(result.ok).toBe(false);
  });

  it('rejects malformed suggestions instead of trusting backend shape', () => {
    const result = validateUseitAnalyzeResponse({ ...validResponse, suggestions: [{ id: 'broken' }] });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.issues.some(issue => issue.includes('suggestions.0'))).toBe(true);
  });

  it('rejects invalid confidence and malformed product candidates', () => {
    const invalidConfidence = validateUseitAnalyzeResponse({ ...validResponse, intent: { name: 'shop', confidence: 2 } });
    expect(invalidConfidence.ok).toBe(false);

    const invalidProduct = validateUseitAnalyzeResponse({
      ...validResponse,
      shopping: { query: 'room furniture', candidates: [{ id: 'p1', name: 'Chair', url: 'https://shop.example.test/chair', qualityScore: 4 }] },
    });
    expect(invalidProduct.ok).toBe(false);
  });

  it('allows shopping to be explicitly absent', () => {
    const result = validateUseitAnalyzeResponse({ ...validResponse, shopping: null });
    expect(result.ok).toBe(true);
  });
});
