import type { IntelligenceProvider, OpportunityKind, SceneAnalysis } from './types';

export const mockProvider: IntelligenceProvider = {
  async analyzeImage(_imageUri: string, userIntent?: OpportunityKind): Promise<SceneAnalysis> {
    const kind = userIntent ?? 'surprise';
    return {
      sceneType: 'mixed',
      summary: 'A mixed everyday scene with several items that can be used together.',
      items: [{ name: 'Everyday materials', category: 'mixed', confidence: 0.78, attributes: ['varied', 'reusable'] }],
      constraints: [],
      opportunities: [{ id: 'starter', title: kind === 'surprise' ? 'A useful unexpected project' : `A ${kind} idea`, description: 'A practical idea built around what is already available.', kind, effort: 'easy', durationMinutes: 20, requiredItems: ['items in the photo'], missingItems: [], visualizable: true }],
      safetyNotes: [],
    };
  },
};
