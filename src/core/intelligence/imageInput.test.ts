import { describe, expect, it } from 'vitest';
import { assertImagePayload } from './imagePayload';
import { createImageInput, MAX_IMAGE_DATA_URL_BYTES, validateImageInput, validateImageUri } from './imageInput';

describe('image input validation', () => {
  it('accepts supported base64 image data', () => {
    expect(() => validateImageUri('data:image/jpeg;base64,AAAA')).not.toThrow();
    expect(() => validateImageUri('data:image/gif;base64,AAAA')).not.toThrow();
  });

  it.each(['image/heic', 'image/heif'])('rejects unsupported %s data URLs', (mimeType) => {
    expect(() => validateImageUri(`data:${mimeType};base64,AAAA`)).toThrow(`Unsupported image type: ${mimeType}`);
  });

  it('accepts a data URL at the shared client/server-safe limit', () => {
    const prefix = 'data:image/jpeg;base64,';
    const uri = prefix + 'A'.repeat(MAX_IMAGE_DATA_URL_BYTES - prefix.length);
    expect(() => validateImageUri(uri)).not.toThrow();
  });

  it('applies the same limit to the normalized image payload helper', () => {
    const prefix = 'data:image/jpeg;base64,';
    const dataUrl = prefix + 'A'.repeat(MAX_IMAGE_DATA_URL_BYTES - prefix.length + 1);
    expect(() => assertImagePayload({ dataUrl, mimeType: 'image/jpeg' })).toThrow('Image is too large.');
  });

  it('accepts GIF in the normalized image payload contract', () => {
    const payload = { dataUrl: 'data:image/gif;base64,AAAA', mimeType: 'image/gif' as const };
    expect(assertImagePayload(payload)).toEqual(payload);
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

  it('rejects a declared MIME type that differs from the data URL', () => {
    expect(() => validateImageInput({
      id: 'gallery-1',
      uri: 'data:image/png;base64,AAAA',
      mimeType: 'image/jpeg',
      source: 'gallery',
    })).toThrow('Image MIME type does not match its data URL');
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
