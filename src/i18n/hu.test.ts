import { describe, expect, it } from 'vitest';
import { HU_LOCALE, hu } from './hu';

describe('Hungarian launch locale', () => {
  it('uses the exact supported locale', () => {
    expect(HU_LOCALE).toBe('hu-HU');
  });

  it('exposes only the five canonical consumer intents', () => {
    expect(Object.keys(hu.modes)).toEqual(['create', 'improve', 'fix', 'cook', 'surprise']);
  });

  it('provides complete chooser and result copy for each intent', () => {
    for (const mode of Object.values(hu.modes)) {
      expect(mode.title.trim()).not.toBe('');
      expect(mode.description.trim()).not.toBe('');
      expect(mode.chip.trim()).not.toBe('');
      expect(mode.next.trim()).not.toBe('');
      expect(mode.needs.trim()).not.toBe('');
      expect(mode.alternatives.trim()).not.toBe('');
    }
  });

  it('provides localized capture, recovery, and privacy copy', () => {
    expect(hu.home.capture).toBe('Készíts fotót');
    expect(hu.home.privacy).toContain('OpenAI');
    expect(hu.home.privacy).toContain('ezen az eszközön');
    expect(hu.product.searchingDescription).toContain('nem küldjük el újra');
    expect(hu.product.searchingDescription).toContain('USEIT szervere');
    expect(hu.product.searchingDescription).toContain('Google Web Search');
    expect(hu.product.findDisclosure).toContain('USEIT szerverére');
    expect(hu.product.findDisclosure).toContain('Google Web Search');
    expect(hu.product.findDisclosure).toContain('nem küldjük el újra');
    expect(hu.product.findHint).toContain('USEIT szervere');
    expect(hu.product.findHint).toContain('Google Web Search');
    expect(hu.common.productOpen).toBe('Termék megnyitása');
    expect(hu.home.privacy.length).toBeGreaterThan(20);
    expect(hu.picker.camera.ask).not.toBe('');
    expect(hu.picker.gallery.ask).not.toBe('');
    expect(hu.notice.failureDescription).not.toBe('');
    expect(hu.result.conceptPrivacy).toContain('OpenAI');
    expect(hu.refinement.privacy).toContain('OpenAI');
    expect(hu.appError.description).not.toBe('');
    expect(hu.common.priceUnavailable).toBe('Ár nem érhető el');
  });
});
