import { describe, expect, it } from 'vitest';
import { theme } from './theme';

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255);
  const linear = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(foreground: string, background: string): number {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

describe('USEIT text contrast tokens', () => {
  it('keeps secondary text and links at WCAG AA contrast on light surfaces', () => {
    for (const foreground of [theme.colors.muted, theme.colors.subtle, theme.colors.accentDark, theme.colors.productLink]) {
      for (const background of [theme.colors.canvas, theme.colors.surface]) {
        expect(contrast(foreground, background)).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  it('keeps error text at WCAG AA contrast on the error surface', () => {
    expect(contrast(theme.colors.danger, theme.colors.errorSurface)).toBeGreaterThanOrEqual(4.5);
  });

  it('keeps the status indicator at WCAG AA non-text contrast on the canvas', () => {
    expect(contrast(theme.colors.status, theme.colors.canvas)).toBeGreaterThanOrEqual(3);
  });

  it('keeps the camera outline at WCAG AA non-text contrast on its dark surface', () => {
    expect(contrast(theme.colors.cameraOutline, theme.colors.captureStart)).toBeGreaterThanOrEqual(3);
  });

  it('keeps interactive outlines at WCAG AA non-text contrast on light surfaces', () => {
    for (const background of [theme.colors.canvas, theme.colors.surface]) {
      expect(contrast(theme.colors.controlBorder, background)).toBeGreaterThanOrEqual(3);
    }
  });

  it('keeps muted capture text at WCAG AA contrast on the capture surface', () => {
    expect(contrast(theme.colors.captureTextMuted, theme.colors.captureStart)).toBeGreaterThanOrEqual(4.5);
  });

  it('keeps muted dark-surface text at WCAG AA contrast', () => {
    expect(contrast(theme.colors.darkMuted, theme.colors.confidenceSurface)).toBeGreaterThanOrEqual(4.5);
  });
});
