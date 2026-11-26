import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { theme } from './theme';

const home = readFileSync(new URL('../../app/index.tsx', import.meta.url), 'utf8');

function linearChannel(value: number): number {
  const normalized = value / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(hex: string): number {
  const channels = hex.slice(1).match(/.{2}/g);
  if (!channels || channels.length !== 3) throw new Error(`Invalid hex color: ${hex}`);
  const [red, green, blue] = channels.map(channel => linearChannel(Number.parseInt(channel, 16)));
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(foreground: string, background: string): number {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

describe('USEIT SURPRISE mode contrast', () => {
  it('applies the light foreground styles to every label and symbol on the graphite tile', () => {
    expect(home).toContain("a === 'surprise' ? s.modeSurprise : null");
    expect(home.match(/s\.modeSurpriseForeground/g)).toHaveLength(3);
    expect(home).toContain('modeSurpriseForeground: { color: theme.colors.surface }');
    expect(home.match(/s\.modeSurpriseDescription/g)).toHaveLength(1);
    expect(home).toContain('modeSurpriseDescription: { color: theme.colors.surfaceMuted }');
  });

  it('keeps both text foreground tokens at WCAG AA contrast against the graphite background', () => {
    expect(contrastRatio(theme.colors.surface, theme.colors.ink)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(theme.colors.surfaceMuted, theme.colors.ink)).toBeGreaterThanOrEqual(4.5);
  });
});
