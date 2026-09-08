import type { OpportunityKind, SceneAnalysis } from './types';

export type DesignBrief = {
  sceneType: SceneAnalysis['sceneType'];
  intent?: OpportunityKind;
  keepExisting: 'keep' | 'replace' | 'mix' | 'unknown';
  budgetHuf?: number;
  mustKeep: string[];
  stylePreferences: string[];
  colorPreferences: string[];
  visibleItems: string[];
  constraints: string[];
  safetyNotes: string[];
  spatialNotes: string[];
  unknowns: string[];
};

export function buildDesignBrief(analysis: SceneAnalysis, options: Partial<Pick<DesignBrief, 'keepExisting'|'budgetHuf'|'mustKeep'|'stylePreferences'|'colorPreferences'>> = {}, intent?: OpportunityKind): DesignBrief {
  return {
    sceneType: analysis.sceneType,
    intent,
    keepExisting: options.keepExisting ?? 'unknown',
    budgetHuf: options.budgetHuf,
    mustKeep: options.mustKeep ?? [],
    stylePreferences: options.stylePreferences ?? [],
    colorPreferences: options.colorPreferences ?? [],
    visibleItems: analysis.items.map(item => item.name),
    constraints: analysis.constraints,
    safetyNotes: analysis.safetyNotes,
    spatialNotes: analysis.items.flatMap(item => item.attributes ?? []),
    unknowns: analysis.items.filter(item => item.confidence < 0.75).map(item => item.name),
  };
}
