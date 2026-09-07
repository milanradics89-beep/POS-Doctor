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

export function validateImageInput(input: ImageInput): ImageInput {
  if (!input.id) throw new Error('Image id is required');
  if (!input.uri) throw new Error('Image uri is required');
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
