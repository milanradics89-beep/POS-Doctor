import type { Action, ActionType } from '../actionEngine';

export type ActionExecutionSuccess = {
  ok: true;
  actionType: ActionType;
  output: unknown;
};

export type ActionExecutionFailure = {
  ok: false;
  actionType: ActionType;
  code: 'CONFIRMATION_REQUIRED' | 'HANDLER_NOT_FOUND' | 'HANDLER_FAILED';
  message: string;
};

export type ActionExecutionResult = ActionExecutionSuccess | ActionExecutionFailure;

export type ActionHandler = (action: Action) => unknown | Promise<unknown>;

export type ActionDispatcherOptions = {
  handlers: Partial<Record<ActionType, ActionHandler>>;
};

export class ActionDispatcher {
  private readonly handlers: Partial<Record<ActionType, ActionHandler>>;

  constructor(options: ActionDispatcherOptions) {
    this.handlers = options.handlers;
  }

  async dispatch(action: Action, confirmed = false): Promise<ActionExecutionResult> {
    if (action.requiresConfirmation && !confirmed) {
      return {
        ok: false,
        actionType: action.type,
        code: 'CONFIRMATION_REQUIRED',
        message: 'Explicit confirmation is required before executing this action.',
      };
    }

    const handler = this.handlers[action.type];
    if (!handler) {
      return {
        ok: false,
        actionType: action.type,
        code: 'HANDLER_NOT_FOUND',
        message: `No handler is registered for action type: ${action.type}`,
      };
    }

    try {
      const output = await handler(action);
      return { ok: true, actionType: action.type, output };
    } catch (error) {
      return {
        ok: false,
        actionType: action.type,
        code: 'HANDLER_FAILED',
        message: error instanceof Error ? error.message : 'Action handler failed.',
      };
    }
  }
}
