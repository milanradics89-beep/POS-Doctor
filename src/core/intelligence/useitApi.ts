import { runIntelligence } from './intelligenceOrchestrator';
import { toUseitResponse, type UseitResponse } from './useitResponse';
import type { SceneModel } from './sceneModel';
import type { DomainAnalysis } from './domainAnalyzer';
import type { ProductProvider } from './productCandidateCollector';

export type UseitAnalyzeRequest = {
  scene: SceneModel;
  analysis: DomainAnalysis;
  userText?: string;
  budgetHuf?: number;
  preserveExisting?: boolean;
  preferredStyles?: string[];
  preferredColors?: string[];
};

export async function analyzeWithUseit(request: UseitAnalyzeRequest, providers: ProductProvider[] = []): Promise<UseitResponse> {
  const run = await runIntelligence(request.scene, request.analysis, providers, {
    userText: request.userText,
    budgetHuf: request.budgetHuf,
    preserveExisting: request.preserveExisting,
    preferredStyles: request.preferredStyles,
    preferredColors: request.preferredColors,
  });
  return toUseitResponse(run);
}
