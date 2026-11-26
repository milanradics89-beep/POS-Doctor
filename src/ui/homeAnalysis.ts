import { UseitApiError, type ConsumerIntent } from '../core/intelligence/apiClient';
import { requestFailureKind } from './requestFailure';

export type AnalysisIdempotencyState = {
  photo: string;
  intent: ConsumerIntent | undefined;
  key: string;
} | null;

type ReadyAnalysisStart = {
  kind: 'ready';
  photo: string;
  intent: ConsumerIntent | undefined;
  idempotencyState: Exclude<AnalysisIdempotencyState, null>;
};

export type AnalysisStartResult =
  | { kind: 'busy' }
  | { kind: 'missing-api' }
  | { kind: 'missing-photo' }
  | ReadyAnalysisStart;

type AnalysisStartInput = {
  active: boolean;
  apiUrl: string;
  photo: string | null;
  intent: ConsumerIntent | undefined;
  existing: AnalysisIdempotencyState;
  createKey: () => string;
};

export type HomeAnalysisNotice = {
  kind: 'error' | 'offline';
  title: string;
  description: string;
  actionLabel?: string;
  actionAccessibilityHint?: string;
  onAction?: () => void;
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

export function prepareAnalysisStart(input: AnalysisStartInput): AnalysisStartResult {
  if (input.active) return { kind: 'busy' };
  if (!input.apiUrl.trim()) return { kind: 'missing-api' };
  if (!input.photo) return { kind: 'missing-photo' };

  const idempotencyKey = resolveAnalysisIdempotencyKey(
    input.existing,
    input.photo,
    input.intent,
    input.createKey,
  );
  return {
    kind: 'ready',
    photo: input.photo,
    intent: input.intent,
    idempotencyState: { photo: input.photo, intent: input.intent, key: idempotencyKey },
  };
}

export function isAnalysisRequestCurrent(
  signal: AbortSignal,
  requestId: number,
  currentRequestId: number,
): boolean {
  return !signal.aborted && requestId === currentRequestId;
}

export async function executeHomeAnalysis<T>(
  request: () => Promise<T>,
  isCurrent: () => boolean,
  onSuccess: (response: T) => void,
  onFailure: (error: unknown) => void,
  onFinally: () => void,
): Promise<void> {
  try {
    const response = await request();
    if (isCurrent()) onSuccess(response);
  } catch (error) {
    if (isCurrent()) onFailure(error);
  } finally {
    onFinally();
  }
}

export function createAnalysisFailureNotice(
  error: unknown,
  retry?: () => void,
): HomeAnalysisNotice | null {
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
    onAction: retry,
  };
}
