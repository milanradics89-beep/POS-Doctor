import { describe, expect, it, vi } from 'vitest';
import type { PlannedTask } from '../taskPlanner';
import type { SceneModel } from '../sceneModel';
import { collectPhase4ProductCandidates } from './collectPhase4ProductCandidates';

describe('collectPhase4ProductCandidates', () => {
  const scene: SceneModel = {
    imageId: 'scene-1',
    domain: 'room',
    objects: [{
      id: 'sofa-1',
      label: 'sofa',
      category: 'furniture',
      attributes: {},
      confidence: 0.95,
    }],
    relations: [],
    globalAttributes: {},
  };

  const task: PlannedTask = {
    domain: 'room',
    goal: 'room_shopping',
    secondaryGoals: ['room_redesign'],
    shoppingRequired: true,
    preserveExisting: true,
    budgetHuf: 150000,
    requiredItems: ['sofa'],
    constraints: { preferredStyles: ['modern'], preferredColors: ['beige'], userText: 'új kanapé' },
    output: ['analysis', 'recommendations', 'visual_redesign', 'shopping_list'],
  };

  it('connects the existing shopping decision to the Phase 4 runtime', async () => {
    const search = vi.fn().mockResolvedValue([{
      id: 'p-1',
      title: 'Modern Sofa',
      category: 'sofa',
      retailer: 'Retailer A',
      productUrl: 'https://a.example/p-1',
      price: 120000,
      currency: 'HUF',
      available: true,
    }]);

    const result = await collectPhase4ProductCandidates(scene, task, {
      providers: [{ id: 'catalog-a', retailer: 'Retailer A', endpoint: 'https://a.example/catalog' }],
    }, { factory: () => ({ search }) });

    expect(search).toHaveBeenCalledWith(expect.objectContaining({
      query: expect.stringContaining('room'),
      categories: expect.arrayContaining(['sofa']),
      budgetHuf: 150000,
      preserveExisting: true,
    }));
    expect(result).toEqual({
      candidates: [expect.objectContaining({ id: 'p-1', priceHuf: 120000, availability: 'in_stock' })],
      providersUsed: ['phase4-catalog'],
      errors: [],
    });
  });

  it('does not invoke the catalog when shopping is not required', async () => {
    const search = vi.fn();
    const result = await collectPhase4ProductCandidates(scene, { ...task, shoppingRequired: false }, {
      providers: [{ id: 'catalog-a', retailer: 'Retailer A', endpoint: 'https://a.example/catalog' }],
    }, { factory: () => ({ search }) });

    expect(search).not.toHaveBeenCalled();
    expect(result).toEqual({ candidates: [], providersUsed: [], errors: [] });
  });
});
