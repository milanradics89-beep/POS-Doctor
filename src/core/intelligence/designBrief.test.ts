import { describe, expect, it } from 'vitest';
import { buildDesignBrief } from './designBrief';

const analysis = {
  sceneType: 'room',
  summary: 'Living room',
  items: [
    { name: 'sofa', category: 'furniture', confidence: 0.96, attributes: ['grey', 'against wall'] },
    { name: 'lamp', category: 'lighting', confidence: 0.72, attributes: ['floor lamp'] },
  ],
  constraints: ['narrow walking path'],
  opportunities: [],
  safetyNotes: [],
} as any;

describe('buildDesignBrief', () => {
  it('preserves scene facts and explicit design choices', () => {
    const brief = buildDesignBrief(analysis, {
      keepExisting: 'mix',
      budgetHuf: 250000,
      mustKeep: ['sofa'],
      stylePreferences: ['warm modern'],
      colorPreferences: ['beige'],
    }, 'improve');

    expect(brief.sceneType).toBe('room');
    expect(brief.keepExisting).toBe('mix');
    expect(brief.budgetHuf).toBe(250000);
    expect(brief.visibleItems).toEqual(['sofa', 'lamp']);
    expect(brief.constraints).toEqual(['narrow walking path']);
    expect(brief.unknowns).toEqual(['lamp']);
  });

  it('does not invent a budget or preferences', () => {
    const brief = buildDesignBrief(analysis);
    expect(brief.budgetHuf).toBeUndefined();
    expect(brief.stylePreferences).toEqual([]);
    expect(brief.keepExisting).toBe('unknown');
  });
});
