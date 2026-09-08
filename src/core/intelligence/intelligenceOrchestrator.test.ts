import { describe, expect, it } from 'vitest';
import { runIntelligence } from './intelligenceOrchestrator';
import { analyzeDomain } from './domainAnalyzer';
import type { SceneModel } from './sceneModel';

function scene(overrides: Partial<SceneModel> = {}): SceneModel {
  return {
    imageId: 'test-image',
    domain: 'object',
    objects: [
      {
        id: 'o1',
        label: 'lamp',
        category: 'object',
        attributes: {},
        confidence: 0.95,
      },
    ],
    relations: [],
    globalAttributes: {},
    ...overrides,
  };
}

describe('runIntelligence', () => {
  it('completes an identification flow without requiring product providers', async () => {
    const current = scene();
    const result = await runIntelligence(current, analyzeDomain(current));

    expect(result.status).toBe('completed');
    expect(result.task.goal).toBe('object_identify');
    expect(result.clarification.needsClarification).toBe(false);
    expect(result.ranked).toBeUndefined();
  });

  it('stops for required room clarification before shopping providers are called', async () => {
    const current = scene({ domain: 'room' });
    let providerCalled = false;
    const provider = {
      id: 'test-provider',
      search: async () => {
        providerCalled = true;
        return [];
      },
    };

    const result = await runIntelligence(current, analyzeDomain(current), [provider]);

    expect(result.status).toBe('needs_clarification');
    expect(result.clarification.questions.map(question => question.id)).toEqual(
      expect.arrayContaining(['budget', 'furniture_mode', 'style']),
    );
    expect(providerCalled).toBe(false);
  });

  it('uses conservative fallback candidates when shopping providers return no candidates', async () => {
    const current = scene({
      domain: 'room',
      globalAttributes: { style: 'modern', roomType: 'living room' },
    });
    const provider = {
      id: 'empty-provider',
      search: async () => [],
    };

    const result = await runIntelligence(current, analyzeDomain(current), [provider], {
      budgetHuf: 500000,
      preserveExisting: true,
      preferredStyles: ['Modern'],
    });

    expect(result.status).toBe('completed');
    expect(result.candidates?.candidates.length).toBeGreaterThan(0);
    expect(result.candidates?.candidates.every(candidate => candidate.source === 'useit-fallback')).toBe(true);
    expect(result.ranked?.length).toBeGreaterThan(0);
  });
});
