import * as FileSystem from 'expo-file-system/legacy';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import { validateImageUri } from './imageInput';

export const IMAGE_NORMALIZATION_MAX_DIMENSION = 2048;
const MAX_DATA_URL_ATTEMPTS = [2048, 1600, 1280, 960, 720] as const;
const JPEG_QUALITY = 0.82;

export type NormalizedImageFidelity = {
  sourceWidth: number;
  sourceHeight: number;
  outputWidth: number;
  outputHeight: number;
  mimeType: 'image/jpeg';
  payloadBytes: number;
  aspectRatioDelta: number;
};

export type NormalizedImage = {
  dataUrl: string;
  width: number;
  height: number;
  fidelity: NormalizedImageFidelity;
};

/**
 * Image.getSize can return encoded dimensions for EXIF-rotated assets.
 * Orientations 5-8 rotate the visual axes; correct them before choosing
 * the resize direction. Only the orientation scalar is consumed.
 */
export function resolveVisualDimensions(
  width: number,
  height: number,
  orientation?: unknown
): { width: number; height: number } {
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    throw new Error('Image dimensions are unavailable.');
  }

  const parsedOrientation = typeof orientation === 'number'
    ? orientation
    : typeof orientation === 'string' && orientation.trim() !== ''
      ? Number(orientation)
      : Number.NaN;
  const swapsAxes = [5, 6, 7, 8].includes(parsedOrientation);

  return swapsAxes ? { width: height, height: width } : { width, height };
}

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
    let rendered: Awaited<ReturnType<typeof context.renderAsync>> | undefined;
    let outputUri: string | undefined;

    try {
      const resize = getResizeAction(sourceWidth, sourceHeight, maxDimension);
      if (resize) context.resize(resize);

      rendered = await context.renderAsync();
      const saved = await rendered.saveAsync({
        format: SaveFormat.JPEG,
        compress: JPEG_QUALITY,
        base64: true,
      });
      outputUri = saved.uri;

      if (!saved.base64) throw new Error('The image could not be encoded.');
      const dataUrl = `data:image/jpeg;base64,${saved.base64}`;
      try {
        validateImageUri(dataUrl);
        if (!Number.isFinite(saved.width) || !Number.isFinite(saved.height) || saved.width <= 0 || saved.height <= 0) {
          throw new Error('Normalized image dimensions are unavailable.');
        }
        const sourceAspectRatio = sourceWidth / sourceHeight;
        const outputAspectRatio = saved.width / saved.height;
        const base64Padding = saved.base64.endsWith('==') ? 2 : saved.base64.endsWith('=') ? 1 : 0;
        const payloadBytes = Math.max(0, Math.floor(saved.base64.length * 3 / 4) - base64Padding);
        return {
          dataUrl,
          width: saved.width,
          height: saved.height,
          fidelity: {
            sourceWidth,
            sourceHeight,
            outputWidth: saved.width,
            outputHeight: saved.height,
            mimeType: 'image/jpeg',
            // A base64 data URL is ASCII-only, so character count equals byte count.
            payloadBytes,
            aspectRatioDelta: Math.abs(outputAspectRatio / sourceAspectRatio - 1),
          },
        };
      } catch (error) {
        if (!(error instanceof Error) || error.message !== 'Image is too large. Please choose a smaller photo.') {
          throw error;
        }
      }
    } finally {
      if (outputUri) {
        await FileSystem.deleteAsync(outputUri, { idempotent: true }).catch(() => undefined);
      }
      rendered?.release();
      context.release();
    }
  }

  throw new Error('This photo is too large to process. Choose a smaller image.');
}
