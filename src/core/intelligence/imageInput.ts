export type ImageInputSource = 'camera' | 'gallery';

export type ImageInput = {
  id: string;
  uri: string;
  mimeType: string;
  source: ImageInputSource;
  width?: number;
  height?: number;
  createdAt?: string;
};

const MAX_DATA_URL_BYTES = 12 * 1024 * 1024;
const ALLOWED_IMAGE_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']);

function byteLength(value: string): number {
  return new TextEncoder().encode(value).byteLength;
}

export function validateImageUri(uri: string): void {
  if (typeof uri !== 'string' || uri.trim().length === 0) throw new Error('Image uri is required');
  if (!uri.startsWith('data:')) return;

  const match = /^data:([^;,]+);base64,/.exec(uri);
  if (!match) throw new Error('Invalid image data format');

  const mimeType = match[1].toLowerCase();
  if (!ALLOWED_IMAGE_MIME_TYPES.has(mimeType)) throw new Error(`Unsupported image type: ${mimeType}`);
  if (byteLength(uri) > MAX_DATA_URL_BYTES) throw new Error('Image is too large. Please choose a smaller photo.');
}

export function validateImageInput(input: ImageInput): ImageInput {
  if (!input.id) throw new Error('Image id is required');
  validateImageUri(input.uri);
  if (!input.mimeType.startsWith('image/')) throw new Error('Only image inputs are supported');
  if (input.source !== 'camera' && input.source !== 'gallery') throw new Error('Unsupported image source');
  return input;
}

export function createImageInput(params: { uri: string; mimeType?: string; source: ImageInputSource; width?: number; height?: number }): ImageInput {
  const input: ImageInput = {
    id: `${params.source}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    uri: params.uri,
    mimeType: params.mimeType ?? 'image/jpeg',
    source: params.source,
    width: params.width,
    height: params.height,
  };
  return validateImageInput(input);
}
