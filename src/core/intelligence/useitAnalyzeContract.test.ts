import { describe, expect, it } from 'vitest';
import { validateUseitAnalyzeResponse } from './useitAnalyzeContract';

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
  scene,
  intent: { name: 'shop', confidence: 0.91 },
  specialist: { profile: 'home-design' },
  suggestions: [{
    id: 's1', title: 'Improve the room', description: 'Try a new layout.', kind: 'improve', effort: 'easy',
    visualizable: true, score: 0.8, rank: 1, reasons: ['Matches the scene.'],
  }],
  shopping: { query: 'room furniture', candidates: [] },
  pipeline: ['see', 'understand', 'reason', 'intent', 'specialist', 'suggest', 'shop'],
};

describe('validateUseitAnalyzeResponse', () => {
  it('accepts the complete unified analysis contract', () => {
    const result = validateUseitAnalyzeResponse(validResponse);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.scene.sceneType).toBe('room');
      expect(result.data.suggestions[0]?.id).toBe('s1');
      expect(result.data.pipeline).toContain('specialist');
    }
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

  it('allows shopping to be explicitly absent', () => {
    const result = validateUseitAnalyzeResponse({ ...validResponse, shopping: null });
    expect(result.ok).toBe(true);
  });
});
