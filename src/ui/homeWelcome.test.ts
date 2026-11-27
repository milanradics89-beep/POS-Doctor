import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { hu } from '../i18n/hu';

const homeWelcome = readFileSync(new URL('./HomeWelcome.tsx', import.meta.url), 'utf8');

describe('HomeWelcome localization and legibility contract', () => {
  it('keeps all visible Hungarian Home copy in the central locale catalog', () => {
    expect(homeWelcome).toContain('{hu.home.captureEyebrow}');
    expect(homeWelcome).toContain('{hu.home.captureFooter}');
    expect(homeWelcome).toContain('label={hu.home.sceneTags[index]}');

    for (const literal of [
      '01  /  INDULÁS',
      'FOTÓ → FELFEDEZÉS → CSELEKVÉS',
      'KONYHA',
      'OTTHON',
      'JAVÍTÁS',
    ]) {
      expect(homeWelcome).not.toContain(literal);
    }
  });

  it('provides the three scene labels in the same order as the Home illustrations', () => {
    expect(hu.home.sceneTags).toEqual(['KONYHA', 'OTTHON', 'JAVÍTÁS']);
    expect(hu.home.sceneTags).toHaveLength(3);
  });

  it('keeps the capture sequence and photo-to-action message localized', () => {
    expect(hu.home.captureEyebrow).toBe('01  /  INDULÁS');
    expect(hu.home.captureFooter).toBe('FOTÓ → FELFEDEZÉS → CSELEKVÉS');
  });

  it('does not regress utility labels below the documented readable type scale', () => {
    for (const style of [
      "brandNoteText: { color: theme.colors.muted, fontSize: 11",
      "kicker: { color: theme.colors.accentDark, fontSize: 11",
      "captureEyebrow: { color: theme.colors.captureTextMuted, fontSize: 11",
      "captureFooterText: { color: theme.colors.captureTextMuted, fontSize: 11",
      "sceneTagText: { color: theme.colors.ink, fontSize: 10",
      "sectionMeta: { color: theme.colors.accentDark, fontSize: 11",
      "privacyText: { color: theme.colors.muted, flex: 1, fontSize: 12",
    ]) {
      expect(homeWelcome).toContain(style);
    }
  });
});
