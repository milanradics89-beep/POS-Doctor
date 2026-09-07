import type { AnalysisResult, IntelligenceProvider, IntelligenceRequest, SceneType } from '../types';

const API_URL = process.env.EXPO_PUBLIC_USEIT_API_URL;

async function uriToBase64(uri: string): Promise<string> {
  const response = await fetch(uri);
  const blob = await response.blob();
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error ?? new Error('Unable to read image'));
    reader.onloadend = () => {
      const result = String(reader.result ?? '');
      const comma = result.indexOf(',');
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.readAsDataURL(blob);
  });
}

export class HttpIntelligenceProvider implements IntelligenceProvider {
  async analyze(request: IntelligenceRequest): Promise<AnalysisResult> {
    if (!API_URL) throw new Error('USEIT API URL is not configured');

    const imageBase64 = await uriToBase64(request.imageUri);
    const response = await fetch(`${API_URL}/v1/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_base64: imageBase64, mime_type: 'image/jpeg', mode: request.mode }),
    });

    if (!response.ok) throw new Error(`USEIT Intelligence API returned ${response.status}`);
    const data = await response.json();
    const sceneType = (data.scene_type === 'material' ? 'materials' : data.scene_type) as SceneType;

    return {
      observation: {
        sceneType,
        summary: data.summary,
        objects: (data.objects ?? []).map((name: string) => ({ name })),
        spatialNotes: data.context ?? [],
        constraints: data.cautions ?? [],
      },
      ideas: (data.opportunities ?? []).map((description: string, index: number) => ({
        id: `vision-${index + 1}`,
        title: description,
        description,
        mode: request.mode ?? 'SURPRISE',
        difficulty: 'MEDIUM',
      })),
    };
  }
}
