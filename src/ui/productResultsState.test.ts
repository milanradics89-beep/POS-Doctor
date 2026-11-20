import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { shouldShowEmptyProductPanel } from './productResultsState';

const appSource = readFileSync(new URL('../../app/index.tsx', import.meta.url), 'utf8');

describe('empty product result state', () => {
  it('shows the empty panel for a unified shop intent with no candidates', () => {
    expect(shouldShowEmptyProductPanel('shop', 'shop', 0)).toBe(true);
  });

  it('supports legacy providers that mark the action as shop', () => {
    expect(shouldShowEmptyProductPanel(undefined, 'shop', undefined)).toBe(true);
  });

  it('does not show a shopping empty state for non-shop intents', () => {
    for (const [intent, action] of [
      ['improve', 'visualize'],
      ['cook', 'recipe'],
      ['fix', 'repair_guide'],
      ['create', 'visualize'],
      ['surprise', 'recommend'],
    ]) {
      expect(shouldShowEmptyProductPanel(intent, action, 0)).toBe(false);
    }
  });

  it('does not show the empty panel when matching products exist', () => {
    expect(shouldShowEmptyProductPanel('shop', 'shop', 2)).toBe(false);
  });

  it('wires the Home result panel to the requested intent and candidate count', () => {
    expect(appSource).toContain('shouldShowEmptyProductPanel(');
    expect(appSource).toContain('result.unified?.intent.name');
    expect(appSource).toContain('result.intelligence?.rankedCandidates?.length');
  });
});
