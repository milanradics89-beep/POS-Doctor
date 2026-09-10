import type { VisionDetectedItem, VisionOpportunity, VisionOpportunityKind, VisionSceneAnalysis, VisionSceneType } from './visionContract';
import type { UseitAnalyzeResponse } from './useitAnalyzeContract';

/** Public intelligence types. VisionSceneAnalysis is the only backend DTO. */
export type SceneType = VisionSceneType;
export type OpportunityKind = VisionOpportunityKind;
export type DetectedItem = VisionDetectedItem;
export type Opportunity = VisionOpportunity;
export type SceneAnalysis = VisionSceneAnalysis;

export type UnifiedIntelligenceProvider = {
  analyzeUseit(imageUri: string, intent?: OpportunityKind, options?: {
    budgetHuf?: number;
    preferredStyles?: string[];
    preferredColors?: string[];
    discoverProducts?: boolean;
    productLimit?: number;
  }): Promise<UseitAnalyzeResponse>;
};

export interface IntelligenceProvider {
  analyzeImage(imageUri: string, userIntent?: OpportunityKind): Promise<SceneAnalysis>;
  /** Optional canonical unified boundary. Legacy providers remain compatible during migration. */
  analyzeUseit?: UnifiedIntelligenceProvider['analyzeUseit'];
}
