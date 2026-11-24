import { MAX_IMAGE_DATA_URL_BYTES } from './imageInput';

export type ImagePayload = { dataUrl: string; mimeType: 'image/jpeg' | 'image/png' | 'image/webp' };

export function assertImagePayload(payload: ImagePayload): ImagePayload {
  if (!payload.dataUrl.startsWith(`data:${payload.mimeType};base64,`)) throw new Error('Invalid image payload.');
  if (payload.dataUrl.length > MAX_IMAGE_DATA_URL_BYTES) throw new Error('Image is too large.');
  return payload;
}

export function uriToDataUrl(uri: string, mimeType: ImagePayload['mimeType'], base64: string): ImagePayload {
  if (!uri || !base64) throw new Error('Image data is required.');
  return assertImagePayload({ dataUrl: `data:${mimeType};base64,${base64}`, mimeType });
}
