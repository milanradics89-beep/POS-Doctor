import type { IntelligenceProvider } from './types';
import { UseitApiProvider } from './apiClient';

export type ProviderConfig = { apiBaseUrl?: string };

export function createIntelligenceProvider(config: ProviderConfig): IntelligenceProvider {
  const baseUrl = config.apiBaseUrl?.trim();
  if (!baseUrl) throw new Error('USEIT API base URL is not configured.');
  return new UseitApiProvider(baseUrl);
}
