import { describe, expect, it } from 'vitest';
import { analyzeDomain } from './domainAnalyzer';
import { inferDomainNeeds } from './domainNeedEngine';
import { planTask } from './taskPlanner';
import type { SceneModel } from './sceneModel';

function scene(domain: SceneModel['domain']): SceneModel {
  return {
    imageId: `test-${domain}`,
    domain,
    objects: [{
      id: 'o1',
      label: domain === 'food' ? 'tomato' : domain === 'wardrobe' ? 'shirt' : domain === 'room' ? 'sofa' : 'lamp',
      category: domain === 'food' ? 'food' : domain === 'wardrobe' ? 'clothing' : domain === 'room' ? 'furniture' : 'object',
      attributes: {},
      confidence: 0.95,
    }],
    relations: [],
    globalAttributes: domain === 'room'
      ? { style: 'modern', roomType: 'living room' }
      : domain === 'food'
        ? { servings: 2 }
        : domain === 'wardrobe'
          ? { occasion: 'casual' }
          : {},
  };
}

describe('cross-domain intelligence architecture', () => {
  it.each([
    ['room', 'room_redesign'],
    ['food', 'food_recipe'],
    ['wardrobe', 'wardrobe_styling'],
    ['object', 'object_identify'],
  ] as const)('uses the same analysis → need → task pipeline for %s', (domain, expectedGoal) => {
    const current = scene(domain);
    const analysis = analyzeDomain(current);
    const needs = inferDomainNeeds(current, analysis);
    const task = planTask(current, needs);

    expect(analysis.domain).toBe(domain);
    expect(needs.priority).toBe(expectedGoal);
    expect(task.domain).toBe(domain);
    expect(task.goal).toBe(expectedGoal);
    expect(task.requiredItems).toContain(current.objects[0].label);
  });

  it('keeps shopping as a task capability instead of creating a domain-specific pipeline', () => {
    const current = scene('wardrobe');
    const analysis = analyzeDomain(current);
    const needs = inferDomainNeeds(current, analysis, 'venni szeretnék hozzá valamit');
    const task = planTask(current, needs, { budgetHuf: 150000, preferredColors: ['black'] });

    expect(needs.priority).toBe('wardrobe_shopping');
    expect(task.shoppingRequired).toBe(true);
    expect(task.budgetHuf).toBe(150000);
    expect(task.constraints.preferredColors).toEqual(['black']);
  });
});
