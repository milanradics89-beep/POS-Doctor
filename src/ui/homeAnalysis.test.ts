import { describe, expect, it, vi } from 'vitest';
import { UseitApiError } from '../core/intelligence/apiClient';
import {
  createAnalysisFailureNotice,
  resolveAnalysisIdempotencyKey,
} from './homeAnalysis';

describe('Home analysis orchestration helpers', () => {
  it('reuses the idempotency key only for the same photo and intent', () => {
    const existing = { photo: 'photo-a', intent: 'improve' as const, key: 'analysis-key-a' };
    const createKey = vi.fn(() => 'analysis-key-b');

    expect(resolveAnalysisIdempotencyKey(existing, 'photo-a', 'improve', createKey)).toBe('analysis-key-a');
    expect(resolveAnalysisIdempotencyKey(existing, 'photo-b', 'improve', createKey)).toBe('analysis-key-b');
    expect(resolveAnalysisIdempotencyKey(existing, 'photo-a', 'fix', createKey)).toBe('analysis-key-b');
    expect(createKey).toHaveBeenCalledTimes(2);
  });

  it('does not turn an aborted request into a visible failure notice', () => {
    expect(createAnalysisFailureNotice(new DOMException('Aborted', 'AbortError'))).toBeNull();
  });

  it('explains an idempotent duplicate without offering a billable retry', () => {
    expect(createAnalysisFailureNotice(new UseitApiError('duplicate', 409))).toEqual({
      kind: 'error',
      title: 'Analysis already received',
      description: 'This analysis request has already been accepted or is still processing. Choose a new photo or a different action to start another analysis.',
      actionLabel: '',
      actionAccessibilityHint: '',
    });
  });

  it('provides a retry path for offline failures', () => {
    const notice = createAnalysisFailureNotice(new TypeError('Network request failed'));
    expect(notice).toMatchObject({
      kind: 'offline',
      title: 'No connection',
      actionLabel: 'TRY AGAIN',
    });
  });
});
