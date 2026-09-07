import type { VisionProvider } from './sceneAnalyzer';

export type VisionProviderConfig = { id: string; endpoint: string; apiKey?: string; headers?: Record<string, string> };

export function createHttpVisionProvider(config: VisionProviderConfig): VisionProvider {
  return {
    id: config.id,
    async analyzeImage(input) {
      const response = await fetch(config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(config.headers ?? {}), ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}) },
        body: JSON.stringify({ imageUri: input.imageUri, mimeType: input.mimeType }),
      });
      if (!response.ok) throw new Error(`Vision provider failed: ${response.status}`);
      return response.json();
    },
  };
}
