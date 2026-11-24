import { describe, expect, it } from 'vitest';
import { getResizeAction, IMAGE_NORMALIZATION_MAX_DIMENSION } from './imageNormalization';

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
