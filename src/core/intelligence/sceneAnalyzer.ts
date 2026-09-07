import type { SceneModel } from './sceneModel';

export type VisionProvider = {
  id: string;
  analyzeImage(input: { imageUri: string; mimeType?: string }): Promise<SceneModel>;
};

export async function analyzeScene(
  imageUri: string,
  provider: VisionProvider,
  mimeType?: string,
): Promise<SceneModel> {
  if (!imageUri) throw new Error('imageUri is required');
  const scene = await provider.analyzeImage({ imageUri, mimeType });
  if (!scene.imageId) throw new Error('Vision provider returned no imageId');
  if (!Array.isArray(scene.objects)) throw new Error('Vision provider returned invalid objects');
  if (!Array.isArray(scene.relations)) throw new Error('Vision provider returned invalid relations');
  return scene;
}

export async function analyzeSceneSafely(
  imageUri: string,
  provider: VisionProvider,
  mimeType?: string,
): Promise<{ scene?: SceneModel; error?: string }> {
  try {
    return { scene: await analyzeScene(imageUri, provider, mimeType) };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Scene analysis failed' };
  }
}
