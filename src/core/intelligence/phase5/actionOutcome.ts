import type { ActionType } from '../actionEngine';
import type { ActionExecutionResult } from './actionDispatcher';

export type ActionOutcome = {
  actionType: ActionType;
  status: 'SUCCEEDED' | 'FAILED';
  output?: unknown;
  error?: {
    code: Extract<ActionExecutionResult, { ok: false }>['code'];
    message: string;
  };
};

export function toActionOutcome(result: ActionExecutionResult): ActionOutcome {
  if (result.ok) {
    return {
      actionType: result.actionType,
      status: 'SUCCEEDED',
      output: result.output,
    };
  }

  return {
    actionType: result.actionType,
    status: 'FAILED',
    error: {
      code: result.code,
      message: result.message,
    },
  };
}
