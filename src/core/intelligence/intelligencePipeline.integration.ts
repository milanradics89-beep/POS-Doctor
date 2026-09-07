import { runIntelligence } from './intelligenceOrchestrator';
import { toUseitResponse } from './useitResponse';
import { mockProductProvider } from './mockProductProvider';
import type { SceneModel } from './sceneModel';
import type { DomainAnalysis } from './domainAnalyzer';

export async function runUseitIntegration(scene: SceneModel, analysis: DomainAnalysis, userText?: string) {
  const run = await runIntelligence(scene, analysis, [mockProductProvider], { userText });
  return toUseitResponse(run);
}

export function assertCompletedShoppingResponse(response: Awaited<ReturnType<typeof runUseitIntegration>>) {
  if (response.status !== 'completed') throw new Error(`Expected completed response, received ${response.status}`);
  if (!response.scene) throw new Error('Scene is missing from USEIT response');
  if (!response.products?.length) throw new Error('Products are missing from USEIT response');
  if (!response.recommendations?.length) throw new Error('Recommendations are missing from USEIT response');
}
