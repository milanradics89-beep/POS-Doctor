export type UseitMode = 'CREATE' | 'IMPROVE' | 'FIX' | 'COOK' | 'SURPRISE';

export type SceneType = 'object' | 'food' | 'materials' | 'room' | 'mixed' | 'unknown';

export interface SceneObservation {
  sceneType: SceneType;
  summary: string;
  objects: Array<{ name: string; quantity?: number; confidence?: number }>;
  spatialNotes?: string[];
  constraints?: string[];
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  mode: UseitMode;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  durationMinutes?: number;
  requiredItems?: string[];
  whyItFits?: string;
}

export interface AnalysisResult {
  observation: SceneObservation;
  ideas: Idea[];
}

export interface IntelligenceRequest {
  imageUri: string;
  mode?: UseitMode;
  locale?: string;
}

export interface IntelligenceProvider {
  analyze(request: IntelligenceRequest): Promise<AnalysisResult>;
}
