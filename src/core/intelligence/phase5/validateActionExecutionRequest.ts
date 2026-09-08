import type { Action } from '../actionEngine';

export type ActionExecutionValidationFailure = {
  ok: false;
  code: 'INVALID_ACTION_TYPE' | 'INVALID_ACTION_PAYLOAD' | 'INVALID_CANDIDATES';
  message: string;
};

export type ActionExecutionValidationSuccess = { ok: true };
export type ActionExecutionValidationResult =
  | ActionExecutionValidationSuccess
  | ActionExecutionValidationFailure;

const ACTION_TYPES = new Set<Action['type']>([
  'visualize',
  'shop',
  'recipe',
  'style',
  'repair_guide',
  'book_service',
  'recommend',
  'explain',
]);

export function validateActionExecutionRequest(
  action: Action,
): ActionExecutionValidationResult {
  if (!ACTION_TYPES.has(action.type)) {
    return {
      ok: false,
      code: 'INVALID_ACTION_TYPE',
      message: 'Action type is not supported by the execution boundary.',
    };
  }

  if (!Array.isArray(action.candidateIds) || action.candidateIds.some((id) => typeof id !== 'string')) {
    return {
      ok: false,
      code: 'INVALID_CANDIDATES',
      message: 'Action candidateIds must be an array of strings.',
    };
  }

  if (action.payload === null || typeof action.payload !== 'object' || Array.isArray(action.payload)) {
    return {
      ok: false,
      code: 'INVALID_ACTION_PAYLOAD',
      message: 'Action payload must be a plain object.',
    };
  }

  return { ok: true };
}
