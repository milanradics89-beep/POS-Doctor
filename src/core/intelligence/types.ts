import type { VisionDetectedItem, VisionOpportunity, VisionOpportunityKind, VisionSceneAnalysis, VisionSceneType } from './visionContract';

/** Public intelligence types. VisionSceneAnalysis is the only backend DTO. */
export type SceneType = VisionSceneType;
export type OpportunityKind = VisionOpportunityKind;
export type DetectedItem = VisionDetectedItem;
export type Opportunity = VisionOpportunity;
export type SceneAnalysis = VisionSceneAnalysis;

export interface IntelligenceProvider {
  analyzeImage(imageUri: string, userIntent?: OpportunityKind): Promise<SceneAnalysis>;
}
