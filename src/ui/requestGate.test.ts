import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { createRequestGate } from './requestGate';

describe('createRequestGate', () => {
  it('allows only the newest overlapping request to publish results', () => {
    const gate = createRequestGate();
    const first = gate.begin();
    const second = gate.begin();

    expect(gate.isCurrent(first)).toBe(false);
    expect(gate.isCurrent(second)).toBe(true);
  });

  it('invalidates pending work when a photo is replaced or the screen resets', () => {
    const gate = createRequestGate();
    const pending = gate.begin();

    gate.invalidate();

    expect(gate.isCurrent(pending)).toBe(false);
  });

  it('does not resurrect a stale token after a later request begins', () => {
    const gate = createRequestGate();
    const stale = gate.begin();
    gate.invalidate();
    const current = gate.begin();

    expect(gate.isCurrent(stale)).toBe(false);
    expect(gate.isCurrent(current)).toBe(true);
  });
});

describe('Home asynchronous request lifecycle', () => {
  const source = readFileSync(new URL('../../app/index.tsx', import.meta.url), 'utf8');

  it('guards analysis and visual rendering before publishing stale completions', () => {
    expect(source).toContain('analysisRequests.current.begin()');
    expect(source).toContain('analysisRequests.current.isCurrent(requestToken)');
    expect(source).toContain('renderRequests.current.begin()');
    expect(source).toContain('renderRequests.current.isCurrent(requestToken)');
  });

  it('invalidates both request types when the photo or screen state is reset', () => {
    expect(source).toContain('const invalidatePendingRequests = () => {');
    expect(source.match(/invalidatePendingRequests\(\);/g)?.length).toBeGreaterThanOrEqual(3);
    expect(source).toContain('analysisRequests.current.invalidate();');
    expect(source).toContain('renderRequests.current.invalidate();');
  });
});
