import type { ActionOutcome } from './actionOutcome';

export type ActionPresentationModel = {
  status: ActionOutcome['status'];
  title: string;
  message: string;
  output?: unknown;
  errorCode?: string;
};

export function toActionPresentationModel(outcome: ActionOutcome): ActionPresentationModel {
  if (outcome.status === 'SUCCEEDED') {
    return {
      status: 'SUCCEEDED',
      title: 'Action completed',
      message: 'The requested action completed successfully.',
      output: outcome.output,
    };
  }

  return {
    status: 'FAILED',
    title: 'Action failed',
    message: outcome.error?.message ?? 'The requested action could not be completed.',
    errorCode: outcome.error?.code,
  };
}
