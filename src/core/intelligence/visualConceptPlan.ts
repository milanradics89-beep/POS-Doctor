import type { IntelligenceRun } from './intelligenceOrchestrator';
import type { UseitAnalyzeResponse } from './useitAnalyzeContract';

export type VisualConceptPlan = {
  prompt: string;
  products: Array<{ title: string; category: string; priceHuf?: number; url: string; id?: string }>;
  actions: Array<{ type: string; target: string }>;
};

type VisualConceptSource = {
  phase3?: IntelligenceRun;
  unified?: UseitAnalyzeResponse;
} | null;

export function buildVisualConceptPlan(result: VisualConceptSource): VisualConceptPlan | null {
  if (!result) return null;

  const legacy = result.phase3?.redesign;
  if (legacy) {
    return {
      prompt: legacy.prompt,
      products: legacy.products.map(product => ({
        title: product.title,
        category: product.category,
        priceHuf: product.priceHuf,
        url: product.url,
        id: product.productId,
      })),
      actions: legacy.actions.map(action => ({ type: action.type, target: action.target })),
    };
  }

  const unified = result.unified;
  if (!unified || unified.scene.sceneType !== 'room') return null;
  const suggestion = unified.suggestions.find(item => item.visualizable);
  if (!suggestion) return null;

  return {
    prompt: `Redesign the photographed room based on this USEIT direction: ${suggestion.title}. ${suggestion.description} Preserve the room's architecture, camera viewpoint and realistic proportions. Integrate selected products naturally and keep unrelated existing elements unchanged.`,
    products: (unified.shopping?.candidates ?? []).map(candidate => ({
      title: candidate.name,
      category: candidate.category || 'general',
      priceHuf: candidate.price ?? undefined,
      url: candidate.url,
      id: candidate.id,
    })),
    actions: [{ type: 'add', target: suggestion.title }],
  };
}
