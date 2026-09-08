export type VisionSceneType = 'room' | 'table' | 'fridge' | 'wardrobe' | 'garage' | 'garden' | 'objects' | 'food' | 'mixed' | 'unknown';
export type VisionOpportunityKind = 'create' | 'improve' | 'fix' | 'cook' | 'reuse' | 'play' | 'organize' | 'surprise';

export interface VisionDetectedItem {
  name: string;
  category?: string;
  confidence: number;
  attributes?: string[];
}

export interface VisionOpportunity {
  id: string;
  title: string;
  description: string;
  kind: VisionOpportunityKind;
  effort: 'easy' | 'medium' | 'advanced';
  durationMinutes?: number;
  requiredItems: string[];
  missingItems?: string[];
  visualizable: boolean;
}

/** Stable versioned DTO returned by the Vision backend. */
export interface VisionSceneAnalysis {
  responseFormat?: 'scene_analysis_v1';
  sceneType: VisionSceneType;
  summary: string;
  items: VisionDetectedItem[];
  constraints: string[];
  opportunities: VisionOpportunity[];
  safetyNotes: string[];
}
