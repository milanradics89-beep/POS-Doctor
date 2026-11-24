import { describe, expect, it } from 'vitest';
import { createImageInput, MAX_IMAGE_DATA_URL_BYTES, validateImageInput, validateImageUri } from './imageInput';

describe('image input validation', () => {
  it('accepts supported base64 image data', () => {
    expect(() => validateImageUri('data:image/jpeg;base64,AAAA')).not.toThrow();
  });

  it('accepts a data URL at the shared client/server-safe limit', () => {
    const prefix = 'data:image/jpeg;base64,';
    const uri = prefix + 'A'.repeat(MAX_IMAGE_DATA_URL_BYTES - prefix.length);
    expect(() => validateImageUri(uri)).not.toThrow();
  });

  it('rejects a data URL above the shared client/server-safe limit', () => {
    const prefix = 'data:image/jpeg;base64,';
    const uri = prefix + 'A'.repeat(MAX_IMAGE_DATA_URL_BYTES - prefix.length + 1);
    expect(() => validateImageUri(uri)).toThrow('Image is too large. Please choose a smaller photo.');
  });

  it('rejects malformed data URLs', () => {
    expect(() => validateImageUri('data:image/jpeg,AAAA')).toThrow('Invalid image data format');
  });

  it('rejects unsupported image types', () => {
    expect(() => validateImageUri('data:image/svg+xml;base64,AAAA')).toThrow('Unsupported image type');
  });

  it('rejects an invalid structured image input', () => {
    expect(() => validateImageInput({ id: '', uri: 'x', mimeType: 'image/jpeg', source: 'camera' })).toThrow('Image id is required');
  });

  it('creates a valid camera image input', () => {
    const input = createImageInput({ uri: 'data:image/jpeg;base64,AAAA', source: 'camera' });
    expect(input.source).toBe('camera');
    expect(input.mimeType).toBe('image/jpeg');
    expect(input.id).toMatch(/^camera-/);
  });
});
