import { describe, expect, it } from 'vitest';
import type { ConsumerAnalysis } from '../core/intelligence/apiClient';
import { validateUseitAnalyzeResponse } from '../core/intelligence/useitAnalyzeContract';
import { selectResult } from './resultModel';

const guide = {
  evidence: ['Tomato'], steps: ['Rinse the tomato.'], requiredItems: ['Tomato'], missingItems: [],
  alternatives: [], limits: [], keep: [],
};
const recommendation = (id: string, rank: number, kind = 'cook') => ({
  id, rank, kind, title: id, description: 'Use the tomato in view.', effort: 'easy',
  visualizable: false, score: 0.8, reasons: [],
});
const payload = {
  contractVersion: 'useit_analyze_v1',
  scene: { sceneType: 'fridge', summary: 'A tomato on the middle shelf.', items: [],
    opportunities: [], constraints: [], safetyNotes: ['Check for spoilage.'] },
  intent: { name: 'cook', confidence: 0.90 },
  specialist: {},
  suggestions: [recommendation('second', 2), recommendation('first', 1), recommendation('ungrounded', 1), recommendation('other', 1, 'fix')],
  shopping: null,
  pipeline: ['see'],
  actionable: { guides: { second: guide, first: guide, other: guide }, shoppingNeed: null, clarification: '' },
};

function fromPayload(input: unknown) {
  const checked = validateUseitAnalyzeResponse(input);
  if (!checked.ok) throw new Error(checked.issues.join('; '));
  const result: ConsumerAnalysis = {
    unified: checked.data, analysis: checked.data.scene, hero: null,
    observed: [], cautions: [], alternatives: [],
    intelligence: { action: { type: 'recipe', title: '' }, need: { kind: 'cook' },
      rankedCandidates: [], intentConfidence: 0.90, clarificationRequired: false },
  };
  return result;
}

describe('photo result presentation', () => {
  it('joins safeguards and plans to the ranked eligible ideas without promoting unrelated ideas', () => {
    const result = selectResult(fromPayload(payload), 'cook');
    expect(result.ideas.map((idea) => idea.id)).toEqual(['first', 'second']);
    expect(result.guides?.first.steps).toEqual(['Rinse the tomato.']);
    expect(result.cautions).toEqual(['Check for spoilage.']);
  });

  it('distinguishes no retailer results, missing context and service failure', () => {
    expect(selectResult(fromPayload(payload), 'shop').status).toBe('needs-context');
    const empty = { query: 'tray', candidates: [] };
    expect(selectResult(fromPayload({ ...payload, shopping: empty }), 'shop').status).toBe('empty');
    const failed = { ...empty, errors: [{ url: '', message: 'Unavailable' }] };
    expect(selectResult(fromPayload({ ...payload, shopping: failed }), 'shop').status).toBe('unavailable');
  });

  it('keeps old servers compatible and rejects malformed action plans', () => {
    expect(fromPayload({ ...payload, actionable: undefined }).unified?.actionable).toBeUndefined();
    expect(validateUseitAnalyzeResponse({ ...payload, actionable: { ...payload.actionable, guides: { first: { ...guide, evidence: [] } } } }).ok).toBe(false);
  });
});
