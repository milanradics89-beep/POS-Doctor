import * as FileSystem from 'expo-file-system/legacy';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import { validateImageUri } from './imageInput';

export const IMAGE_NORMALIZATION_MAX_DIMENSION = 2048;
const MAX_DATA_URL_ATTEMPTS = [2048, 1600, 1280, 960, 720] as const;
const JPEG_QUALITY = 0.82;

export type NormalizedImageFidelity = {
  sourceWidth: number;
  sourceHeight: number;
  sourceMimeType: string | null;
  outputWidth: number;
  outputHeight: number;
  mimeType: 'image/jpeg';
  outputBytes: number;
  payloadBytes: number;
  jpegQuality: number;
  resizeLimit: number;
  aspectRatioDelta: number;
};

export type NormalizedImage = {
  dataUrl: string;
  width: number;
  height: number;
  fidelity: NormalizedImageFidelity;
};

function base64ByteLength(value: string): number {
  if (
    !value ||
    value.length % 4 !== 0 ||
    !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value)
  ) {
    throw new Error('The image could not be encoded.');
  }
  const padding = value.endsWith('==') ? 2 : value.endsWith('=') ? 1 : 0;
  return (value.length / 4) * 3 - padding;
}

export function matchesImageFidelity(
  dataUrl: string,
  fidelity: NormalizedImageFidelity | null | undefined
): boolean {
  if (!fidelity) return false;
  const prefix = `data:${fidelity.mimeType};base64,`;
  if (!dataUrl.startsWith(prefix)) return false;
  try {
    return base64ByteLength(dataUrl.slice(prefix.length)) === fidelity.outputBytes
      && new TextEncoder().encode(dataUrl).byteLength === fidelity.payloadBytes;
  } catch {
    return false;
  }
}

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
  sourceHeight: number,
  sourceMimeType: string | null = null
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
        if (
          !Number.isFinite(saved.width) ||
          !Number.isFinite(saved.height) ||
          saved.width <= 0 ||
          saved.height <= 0
        ) {
          throw new Error('Normalized image dimensions are unavailable.');
        }
        const outputBytes = base64ByteLength(saved.base64);
        const payloadBytes = new TextEncoder().encode(dataUrl).byteLength;
        const sourceAspectRatio = sourceWidth / sourceHeight;
        const outputAspectRatio = saved.width / saved.height;
        const fidelity: NormalizedImageFidelity = {
          sourceWidth,
          sourceHeight,
          sourceMimeType: typeof sourceMimeType === 'string' && sourceMimeType.trim()
            ? sourceMimeType.toLowerCase()
            : null,
          outputWidth: saved.width,
          outputHeight: saved.height,
          mimeType: 'image/jpeg',
          outputBytes,
          payloadBytes,
          jpegQuality: JPEG_QUALITY,
          resizeLimit: maxDimension,
          aspectRatioDelta: Math.abs(outputAspectRatio / sourceAspectRatio - 1),
        };
        if (!matchesImageFidelity(dataUrl, fidelity)) {
          throw new Error('Normalized image fidelity metadata is inconsistent.');
        }
        return { dataUrl, width: saved.width, height: saved.height, fidelity };
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
