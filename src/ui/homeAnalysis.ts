import { UseitApiError, type ConsumerIntent } from '../core/intelligence/apiClient';
import { requestFailureKind } from './requestFailure';

export type AnalysisIdempotencyState = {
  photo: string;
  intent: ConsumerIntent | undefined;
  key: string;
} | null;

export type HomeAnalysisNotice = {
  kind: 'error' | 'offline';
  title: string;
  description: string;
  actionLabel?: string;
  actionAccessibilityHint?: string;
};

export function resolveAnalysisIdempotencyKey(
  existing: AnalysisIdempotencyState,
  photo: string,
  intent: ConsumerIntent | undefined,
  createKey: () => string,
): string {
  if (existing?.photo === photo && existing.intent === intent) return existing.key;
  return createKey();
}

export function createAnalysisFailureNotice(error: unknown): HomeAnalysisNotice | null {
  if (error instanceof Error && error.name === 'AbortError') return null;

  if (error instanceof UseitApiError && error.status === 409) {
    return {
      kind: 'error',
      title: 'Analysis already received',
      description: 'This analysis request has already been accepted or is still processing. Choose a new photo or a different action to start another analysis.',
    };
  }

  const kind = requestFailureKind(error);
  const description = kind === 'offline'
    ? 'Check your internet connection, then retry the analysis.'
    : error instanceof Error
      ? error.message
      : 'Please try again with a clearer photo.';

  return {
    kind,
    title: kind === 'offline' ? 'No connection' : 'Could not understand the image',
    description,
    actionLabel: 'TRY AGAIN',
    actionAccessibilityHint: 'Retries image analysis for the selected photo.',
  };
}
