import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  manipulate: vi.fn(),
  deleteAsync: vi.fn(),
}));

vi.mock('expo-image-manipulator', () => ({
  SaveFormat: { JPEG: 'jpeg' },
  ImageManipulator: { manipulate: mocks.manipulate },
}));

vi.mock('expo-file-system/legacy', () => ({
  deleteAsync: mocks.deleteAsync,
}));

import { ImageManipulator } from 'expo-image-manipulator';
import { fingerprintImage } from './imageFingerprint';
import * as FileSystem from 'expo-file-system/legacy';
import {
  normalizeImageAsset,
  getResizeAction,
  resolveVisualDimensions,
  IMAGE_NORMALIZATION_MAX_DIMENSION,
  matchesImageFidelity,
} from './imageNormalization';

describe('image normalization resize policy', () => {
  it.each([5, 6, 7, 8])('swaps encoded axes for EXIF orientation %s', (orientation) => {
    expect(resolveVisualDimensions(4032, 3024, orientation)).toEqual({ width: 3024, height: 4032 });
  });

  it.each([1, 2, 3, 4, undefined, '6'])('preserves or parses non-rotating EXIF orientation %s', (orientation) => {
    const result = resolveVisualDimensions(4032, 3024, orientation);
    if (orientation === '6') {
      expect(result).toEqual({ width: 3024, height: 4032 });
    } else {
      expect(result).toEqual({ width: 4032, height: 3024 });
    }
  });

  it('rejects invalid dimensions before choosing an orientation', () => {
    expect(() => resolveVisualDimensions(0, 3024, 6)).toThrow('Image dimensions are unavailable.');
  });

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
    const releaseImage = vi.fn();
    const renderAsync = vi.fn().mockResolvedValue({ saveAsync, release: releaseImage });
    const resize = vi.fn();
    const releaseContext = vi.fn();
    const context = { resize, renderAsync, release: releaseContext };

    mocks.manipulate.mockReturnValue(context as unknown as ReturnType<typeof ImageManipulator.manipulate>);

    const result = await normalizeImageAsset('file:///photos/source.heic', 4032, 3024, 'image/heic');

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
      fidelity: {
        sourceWidth: 4032,
        sourceHeight: 3024,
        sourceMimeType: 'image/heic',
        outputWidth: 2048,
        outputHeight: 1536,
        mimeType: 'image/jpeg',
        outputBytes: 3,
        payloadBytes: new TextEncoder().encode('data:image/jpeg;base64,Zm9v').byteLength,
        payloadFingerprint: await fingerprintImage('data:image/jpeg;base64,Zm9v'),
        jpegQuality: 0.82,
        resizeLimit: 2048,
        aspectRatioDelta: 0,
      },
    });
    expect(await matchesImageFidelity(result.dataUrl, result.fidelity)).toBe(true);
    expect(await matchesImageFidelity('data:image/jpeg;base64,YmFy', result.fidelity)).toBe(false);
    expect(await matchesImageFidelity(`${result.dataUrl}x`, result.fidelity)).toBe(false);
    expect(FileSystem.deleteAsync).toHaveBeenCalledWith('file:///cache/normalized.jpg', { idempotent: true });
    expect(releaseImage).toHaveBeenCalledOnce();
    expect(releaseContext).toHaveBeenCalledOnce();
  });

  it('retries with a smaller bound and cleans every temporary output', async () => {
    const firstRelease = vi.fn();
    const firstContextRelease = vi.fn();
    const secondRelease = vi.fn();
    const secondContextRelease = vi.fn();
    const firstDelete = 'file:///cache/oversized.jpg';
    const secondDelete = 'file:///cache/reduced.jpg';
    const firstSave = vi.fn().mockResolvedValue({
      uri: firstDelete,
      width: 2048,
      height: 1536,
      base64: 'A'.repeat(7_900_000),
    });
    const secondSave = vi.fn().mockResolvedValue({
      uri: secondDelete,
      width: 1600,
      height: 1200,
      base64: 'Zm9v',
    });
    const firstContext = {
      resize: vi.fn(),
      renderAsync: vi.fn().mockResolvedValue({ saveAsync: firstSave, release: firstRelease }),
      release: firstContextRelease,
    };
    const secondContext = {
      resize: vi.fn(),
      renderAsync: vi.fn().mockResolvedValue({ saveAsync: secondSave, release: secondRelease }),
      release: secondContextRelease,
    };
    mocks.manipulate
      .mockReturnValueOnce(firstContext as unknown as ReturnType<typeof ImageManipulator.manipulate>)
      .mockReturnValueOnce(secondContext as unknown as ReturnType<typeof ImageManipulator.manipulate>);

    const result = await normalizeImageAsset('file:///photos/source.heic', 4032, 3024, 'image/heic');

    expect(mocks.manipulate).toHaveBeenCalledTimes(2);
    expect(firstContext.resize).toHaveBeenCalledWith({ width: 2048 });
    expect(secondContext.resize).toHaveBeenCalledWith({ width: 1600 });
    expect(result.fidelity.resizeLimit).toBe(1600);
    expect(result.fidelity.outputBytes).toBe(3);
    expect(FileSystem.deleteAsync).toHaveBeenNthCalledWith(1, firstDelete, { idempotent: true });
    expect(FileSystem.deleteAsync).toHaveBeenNthCalledWith(2, secondDelete, { idempotent: true });
    expect(firstRelease).toHaveBeenCalledOnce();
    expect(firstContextRelease).toHaveBeenCalledOnce();
    expect(secondRelease).toHaveBeenCalledOnce();
    expect(secondContextRelease).toHaveBeenCalledOnce();
  });

  it('rejects invalid base64 output and still releases temporary resources', async () => {
    const releaseImage = vi.fn();
    const releaseContext = vi.fn();
    const saveAsync = vi.fn().mockResolvedValue({
      uri: 'file:///cache/invalid.jpg',
      width: 1200,
      height: 800,
      base64: 'not-base64',
    });
    mocks.manipulate.mockReturnValue({
      resize: vi.fn(),
      renderAsync: vi.fn().mockResolvedValue({ saveAsync, release: releaseImage }),
      release: releaseContext,
    } as unknown as ReturnType<typeof ImageManipulator.manipulate>);

    await expect(normalizeImageAsset('file:///photos/source.heic', 1200, 800)).rejects.toThrow('The image could not be encoded.');
    expect(FileSystem.deleteAsync).toHaveBeenCalledWith('file:///cache/invalid.jpg', { idempotent: true });
    expect(releaseImage).toHaveBeenCalledOnce();
    expect(releaseContext).toHaveBeenCalledOnce();
  });

  it('rejects corrupt or undecodable source files', async () => {
    const releaseContext = vi.fn();
    const renderAsync = vi.fn().mockRejectedValue(new Error('decode failed'));
    mocks.manipulate.mockReturnValue({ resize: vi.fn(), renderAsync, release: releaseContext } as unknown as ReturnType<typeof ImageManipulator.manipulate>);

    await expect(normalizeImageAsset('file:///photos/corrupt.heic', 4032, 3024)).rejects.toThrow('decode failed');
    expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
    expect(releaseContext).toHaveBeenCalledOnce();
  });
});
