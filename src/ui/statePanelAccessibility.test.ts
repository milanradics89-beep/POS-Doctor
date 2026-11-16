import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const components = readFileSync(new URL('./components.tsx', import.meta.url), 'utf8');

describe('StatePanel VoiceOver announcements', () => {
  it('announces state changes explicitly on iOS instead of relying on live regions', () => {
    expect(components).toContain("if (Platform.OS === 'ios')");
    expect(components).toContain('AccessibilityInfo.announceForAccessibility(`${title}. ${description}`)');
  });

  it('exposes a meaningful role and combined label for each panel state', () => {
    expect(components).toContain("accessibilityRole={kind === 'loading' ? 'progressbar' : isAlert ? 'alert' : 'summary'}");
    expect(components).toContain('accessibilityLabel={`${title}. ${description}`}');
  });

  it('keeps the recovery action as a separately labelled button', () => {
    expect(components).toContain('accessibilityRole="button"');
    expect(components).toContain('accessibilityLabel={actionLabel}');
    expect(components).toContain('accessibilityHint={actionAccessibilityHint?.trim()');
  });
});
