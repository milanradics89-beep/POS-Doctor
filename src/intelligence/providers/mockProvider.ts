import type { AnalysisResult, IntelligenceProvider, IntelligenceRequest } from '../types';

export class MockIntelligenceProvider implements IntelligenceProvider {
  async analyze(request: IntelligenceRequest): Promise<AnalysisResult> {
    const mode = request.mode ?? 'SURPRISE';
    return {
      observation: {
        sceneType: 'unknown',
        summary: 'Development placeholder. Connect a multimodal provider through the secure backend before production use.',
        objects: [],
      },
      ideas: [
        {
          id: 'dev-idea-1',
          title: 'Explore what is possible',
          description: 'The production intelligence layer will generate ideas from the photographed scene.',
          mode,
          difficulty: 'EASY',
          durationMinutes: 15,
        },
      ],
    };
  }
}
