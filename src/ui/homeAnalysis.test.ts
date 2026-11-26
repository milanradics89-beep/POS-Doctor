import { describe, expect, it, vi } from 'vitest';
import { UseitApiError } from '../core/intelligence/apiClient';
import {
  createAnalysisFailureNotice,
  executeHomeAnalysis,
  isAnalysisRequestCurrent,
  prepareAnalysisStart,
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

  it('fails closed before starting when busy, unconfigured, or missing a photo', () => {
    const base = {
      active: false,
      apiUrl: 'https://api.example.test',
      photo: 'data:image/jpeg;base64,AA==',
      intent: 'create' as const,
      existing: null,
      createKey: () => 'analysis-key',
    };

    expect(prepareAnalysisStart({ ...base, active: true })).toEqual({ kind: 'busy' });
    expect(prepareAnalysisStart({ ...base, apiUrl: '  ' })).toEqual({ kind: 'missing-api' });
    expect(prepareAnalysisStart({ ...base, photo: null })).toEqual({ kind: 'missing-photo' });
    expect(prepareAnalysisStart(base)).toMatchObject({
      kind: 'ready',
      photo: base.photo,
      intent: 'create',
      idempotencyState: { photo: base.photo, intent: 'create', key: 'analysis-key' },
    });
  });

  it('recognizes aborted and stale responses as non-current', () => {
    const controller = new AbortController();
    expect(isAnalysisRequestCurrent(controller.signal, 4, 4)).toBe(true);
    expect(isAnalysisRequestCurrent(controller.signal, 4, 5)).toBe(false);
    controller.abort();
    expect(isAnalysisRequestCurrent(controller.signal, 4, 4)).toBe(false);
  });

  it('does not publish a stale response and always runs finalization', async () => {
    const onSuccess = vi.fn();
    const onFailure = vi.fn();
    const onFinally = vi.fn();

    await executeHomeAnalysis(
      async () => 'analysis',
      () => false,
      onSuccess,
      onFailure,
      onFinally,
    );

    expect(onSuccess).not.toHaveBeenCalled();
    expect(onFailure).not.toHaveBeenCalled();
    expect(onFinally).toHaveBeenCalledOnce();
  });

  it('forwards a current request failure and finalizes it', async () => {
    const failure = new Error('network');
    const onFailure = vi.fn();
    const onFinally = vi.fn();

    await executeHomeAnalysis(
      async () => { throw failure; },
      () => true,
      vi.fn(),
      onFailure,
      onFinally,
    );

    expect(onFailure).toHaveBeenCalledWith(failure);
    expect(onFinally).toHaveBeenCalledOnce();
  });

  it('does not turn an aborted request into a visible failure notice', () => {
    expect(createAnalysisFailureNotice(new DOMException('Aborted', 'AbortError'))).toBeNull();
  });

  it('explains an idempotent duplicate without offering a billable retry', () => {
    expect(createAnalysisFailureNotice(new UseitApiError('duplicate', 409))).toEqual({
      kind: 'error',
      title: 'Analysis already received',
      description: 'This analysis request has already been accepted or is still processing. Choose a new photo or a different action to start another analysis.',
    });
  });

  it('provides an explicit retry action for offline failures', () => {
    const retry = vi.fn();
    const notice = createAnalysisFailureNotice(new TypeError('Network request failed'), retry);
    expect(notice).toMatchObject({
      kind: 'offline',
      title: 'No connection',
      actionLabel: 'TRY AGAIN',
    });
    notice?.onAction?.();
    expect(retry).toHaveBeenCalledOnce();
  });
});
