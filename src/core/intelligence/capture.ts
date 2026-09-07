export type CapturedImage = { uri: string; width?: number; height?: number; mimeType?: string };
const SUPPORTED = new Set(['image/jpeg', 'image/png', 'image/webp']);
export function prepareCapturedImage(image: CapturedImage): CapturedImage {
  if (!image.uri) throw new Error('Captured image has no URI.');
  if (image.mimeType && !SUPPORTED.has(image.mimeType)) throw new Error('Unsupported image format.');
  if (image.width !== undefined && image.width < 320) throw new Error('Image resolution is too low.');
  if (image.height !== undefined && image.height < 320) throw new Error('Image resolution is too low.');
  return image;
}
