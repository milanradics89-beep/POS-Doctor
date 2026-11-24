import * as FileSystem from 'expo-file-system/legacy';
import * as ImageManipulator from 'expo-image-manipulator';
import { MAX_IMAGE_DATA_URL_BYTES, validateImageUri } from './imageInput';

export const IMAGE_NORMALIZATION_MAX_DIMENSION = 2048;
const MAX_DATA_URL_ATTEMPTS = [2048, 1600, 1280, 960, 720] as const;
const JPEG_QUALITY = 0.82;

export type NormalizedImage = {
  dataUrl: string;
  width: number;
  height: number;
};

export function getResizeAction(
  width: number,
  height: number,
  maxDimension: number
): { width: number } | { height: number } | undefined {
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    throw new Error('Image dimensions are unavailable.');
  }
  if (!Number.isFinite(maxDimension) || maxDimension <= 0) {
    throw new Error('Image resize limit is invalid.');
  }
  if (Math.max(width, height) <= maxDimension) return undefined;
  return width >= height ? { width: maxDimension } : { height: maxDimension };
}

export async function normalizeImageAsset(
  uri: string,
  sourceWidth: number,
  sourceHeight: number
): Promise<NormalizedImage> {
  if (typeof uri !== 'string' || uri.trim().length === 0) {
    throw new Error('Image file is unavailable.');
  }

  for (const maxDimension of MAX_DATA_URL_ATTEMPTS) {
    const context = ImageManipulator.manipulate(uri);
    const resize = getResizeAction(sourceWidth, sourceHeight, maxDimension);
    if (resize) context.resize(resize);

    const rendered = await context.renderAsync();
    const saved = await rendered.saveAsync({
      format: ImageManipulator.SaveFormat.JPEG,
      compress: JPEG_QUALITY,
      base64: true,
    });

    try {
      if (!saved.base64) throw new Error('The image could not be encoded.');
      const dataUrl = `data:image/jpeg;base64,${saved.base64}`;
      try {
        validateImageUri(dataUrl);
        return { dataUrl, width: saved.width, height: saved.height };
      } catch (error) {
        if (!(error instanceof Error) || error.message !== 'Image is too large. Please choose a smaller photo.') {
          throw error;
        }
        if (dataUrl.length <= MAX_IMAGE_DATA_URL_BYTES) throw error;
      }
    } finally {
      await FileSystem.deleteAsync(saved.uri, { idempotent: true }).catch(() => undefined);
    }
  }

  throw new Error('This photo is too large to process. Choose a smaller image.');
}
