import type { OpportunityKind } from './types';

export type UseitAnalyzeRequest = {
  imageUri: string;
  userIntent?: OpportunityKind;
  prompt?: string;
  locale?: string;
  responseFormat?: string;
};

export type UseitApiConfig = {
  baseUrl: string;
  token?: string;
  timeoutMs?: number;
};
