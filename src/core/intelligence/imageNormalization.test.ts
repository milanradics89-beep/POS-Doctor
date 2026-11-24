import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  manipulate: vi.fn(),
  deleteAsync: vi.fn(),
}));

vi.mock('expo-image-manipulator', () => ({
  SaveFormat: { JPEG: 'jpeg' },
  manipulate: mocks.manipulate,
}));

vi.mock('expo-file-system/legacy', () => ({
  deleteAsync: mocks.deleteAsync,
}));

import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system/legacy';
import { normalizeImageAsset, getResizeAction, IMAGE_NORMALIZATION_MAX_DIMENSION } from './imageNormalization';

describe('image normalization resize policy', () => {
  it('keeps small landscape images at their source dimensions', () => {
    expect(getResizeAction(1600, 900, IMAGE_NORMALIZATION_MAX_DIMENSION)).toBeUndefined();
  });

  it('limits oversized landscape images by width', () => {
    expect(getResizeAction(4032, 3024, IMAGE_NORMALIZATION_MAX_DIMENSION)).toEqual({ width: 2048 });
  });

  it('limits oversized portrait images by height', () => {
    expect(getResizeAction(3024, 4032, IMAGE_NORMALIZATION_MAX_DIMENSION)).toEqual({ height: 2048 });
  });

  it('does not upscale an image smaller than the selected limit', () => {
    expect(getResizeAction(720, 1280, 1600)).toBeUndefined();
  });

  it('rejects missing or invalid source dimensions', () => {
    expect(() => getResizeAction(0, 1200, 2048)).toThrow('Image dimensions are unavailable.');
    expect(() => getResizeAction(Number.NaN, 1200, 2048)).toThrow('Image dimensions are unavailable.');
  });

  it('rejects an invalid resize limit', () => {
    expect(() => getResizeAction(1200, 800, 0)).toThrow('Image resize limit is invalid.');
  });
});

describe('normalizeImageAsset', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.deleteAsync.mockResolvedValue(undefined);
  });

  it('converts a local image to bounded JPEG data and removes the temporary output', async () => {
    const saveAsync = vi.fn().mockResolvedValue({
      uri: 'file:///cache/normalized.jpg',
      width: 2048,
      height: 1536,
      base64: 'Zm9v',
    });
    const renderAsync = vi.fn().mockResolvedValue({ saveAsync });
    const resize = vi.fn();
    const context = { resize, renderAsync };

    mocks.manipulate.mockReturnValue(context as unknown as ReturnType<typeof ImageManipulator.manipulate>);

    const result = await normalizeImageAsset('file:///photos/source.heic', 4032, 3024);

    expect(mocks.manipulate).toHaveBeenCalledWith('file:///photos/source.heic');
    expect(resize).toHaveBeenCalledWith({ width: 2048 });
    expect(saveAsync).toHaveBeenCalledWith({
      format: 'jpeg',
      compress: 0.82,
      base64: true,
    });
    expect(result).toEqual({
      dataUrl: 'data:image/jpeg;base64,Zm9v',
      width: 2048,
      height: 1536,
    });
    expect(FileSystem.deleteAsync).toHaveBeenCalledWith('file:///cache/normalized.jpg', { idempotent: true });
  });

  it('rejects corrupt or undecodable source files', async () => {
    const renderAsync = vi.fn().mockRejectedValue(new Error('decode failed'));
    mocks.manipulate.mockReturnValue({ resize: vi.fn(), renderAsync } as unknown as ReturnType<typeof ImageManipulator.manipulate>);

    await expect(normalizeImageAsset('file:///photos/corrupt.heic', 4032, 3024)).rejects.toThrow('decode failed');
    expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
  });
});
