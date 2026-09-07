export type SceneType = 'room' | 'table' | 'fridge' | 'wardrobe' | 'garage' | 'garden' | 'objects' | 'food' | 'mixed' | 'unknown';
export type OpportunityKind = 'create' | 'improve' | 'fix' | 'cook' | 'reuse' | 'play' | 'organize' | 'surprise';
export interface DetectedItem { name: string; category?: string; confidence: number; attributes?: string[]; }
export interface Opportunity { id: string; title: string; description: string; kind: OpportunityKind; effort: 'easy' | 'medium' | 'advanced'; durationMinutes?: number; requiredItems: string[]; missingItems?: string[]; visualizable: boolean; }
export interface SceneAnalysis { sceneType: SceneType; summary: string; items: DetectedItem[]; constraints: string[]; opportunities: Opportunity[]; safetyNotes: string[]; }
export interface IntelligenceProvider { analyzeImage(imageUri: string, userIntent?: OpportunityKind): Promise<SceneAnalysis>; }
