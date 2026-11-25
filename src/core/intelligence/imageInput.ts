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

// Stay below the backend's 8,000,000-character imageUri limit with room for the JSON envelope.
export const MAX_IMAGE_DATA_URL_BYTES = 7_900_000;
// Keep this set aligned with backend/main.py's accepted data-URI MIME contract.
const ALLOWED_IMAGE_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

function byteLength(value: string): number {
  return new TextEncoder().encode(value).byteLength;
}

export function validateImageUri(uri: string): string | undefined {
  if (typeof uri !== 'string' || uri.trim().length === 0) throw new Error('Image uri is required');
  if (!uri.startsWith('data:')) return undefined;

  const match = /^data:([^;,]+);base64,/.exec(uri);
  if (!match) throw new Error('Invalid image data format');

  const mimeType = match[1].toLowerCase();
  if (!ALLOWED_IMAGE_MIME_TYPES.has(mimeType)) throw new Error(`Unsupported image type: ${mimeType}`);
  if (byteLength(uri) > MAX_IMAGE_DATA_URL_BYTES) throw new Error('Image is too large. Please choose a smaller photo.');
  return mimeType;
}

export function validateImageInput(input: ImageInput): ImageInput {
  if (!input.id) throw new Error('Image id is required');
  const dataUrlMimeType = validateImageUri(input.uri);
  const declaredMimeType = input.mimeType.toLowerCase();
  if (!declaredMimeType.startsWith('image/')) throw new Error('Only image inputs are supported');
  if (dataUrlMimeType && dataUrlMimeType !== declaredMimeType) {
    throw new Error('Image MIME type does not match its data URL');
  }
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
