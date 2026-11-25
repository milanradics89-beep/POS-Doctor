import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const home = readFileSync(new URL('../../app/index.tsx', import.meta.url), 'utf8');

describe('premium USEIT home and visual result structure', () => {
  it('renders all four discovery categories as distinct cards', () => {
    for (const category of ['ROOMS', 'OBJECTS', 'FOOD', 'MATERIALS']) {
      expect(home).toContain(`<Text style={s.categoryLabel}>${category}</Text>`);
    }
    expect(home).toContain('categoryGrid: { flexDirection: \'row\', flexWrap: \'wrap\'');
  });

  it('renders all five primary modes as responsive, color-coded tiles', () => {
    for (const mode of ['create', 'improve', 'fix', 'cook', 'surprise']) {
      expect(home).toContain(`['${mode}'`);
      expect(home).toContain(`s.mode${mode[0].toUpperCase() + mode.slice(1)}`);
    }
    expect(home).toContain('modeGrid: { flexDirection: \'row\', flexWrap: \'wrap\'');
    expect(home).toContain("width: '48.5%'");
    expect(home).toContain('modeWide: { width: \'100%\'');
  });

  it('keeps the Surprise mode foreground readable on the graphite tile', () => {
    expect(home.split("a === 'surprise' ? s.modeSurpriseForeground : null").length - 1).toBe(3);
    expect(home).toContain("a === 'surprise' ? s.modeSurpriseDescription : null");
    expect(home).toContain('modeSurpriseForeground: { color: theme.colors.surface }');
    expect(home).toContain('modeSurpriseDescription: { color: theme.colors.captureTextMuted }');
  });

  it('provides a before-and-after comparison instead of replacing the source photo', () => {
    expect(home).toContain('comparisonImage');
    expect(home).toContain('BEFORE');
    expect(home).toContain('AFTER');
    expect(home).toContain('<Image source={{ uri: photo }} style={s.comparisonImage} />');
    expect(home).toContain('<Image source={{ uri: rendered }} style={s.comparisonImage} />');
  });

  it('keeps the approved warm-neutral, graphite and lime visual palette', () => {
    expect(home).toContain('theme.colors.accent');
    expect(home).toContain('theme.colors.ink');
    expect(home).toContain('theme.colors.canvas');
    expect(home).toContain('theme.colors.peach');
    expect(home).toContain('theme.colors.lavender');
  });
});
