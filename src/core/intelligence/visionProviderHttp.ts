import type { SceneModel } from './sceneModel';
import { SCENE_MODEL_SCHEMA, buildVisionSystemPrompt, isSceneModel } from './visionSchema';
import type { VisionProvider } from './sceneAnalyzer';

export type StructuredVisionConfig = { id: string; endpoint: string; apiKey?: string; headers?: Record<string, string> };

export function createStructuredVisionProvider(config: StructuredVisionConfig): VisionProvider {
  return {
    id: config.id,
    async analyzeImage(input): Promise<SceneModel> {
      const response = await fetch(config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(config.headers ?? {}), ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}) },
        body: JSON.stringify({ imageUri: input.imageUri, mimeType: input.mimeType, systemPrompt: buildVisionSystemPrompt(), responseFormat: { type: 'json_schema', schema: SCENE_MODEL_SCHEMA } }),
      });
      if (!response.ok) throw new Error(`Structured vision provider failed: ${response.status}`);
      const payload = await response.json();
      const scene = payload.scene ?? payload.output ?? payload;
      if (!isSceneModel(scene)) throw new Error('Vision provider returned an invalid SceneModel');
      return scene;
    },
  };
}
