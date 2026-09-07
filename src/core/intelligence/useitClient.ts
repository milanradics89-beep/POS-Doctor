import type { UseitAnalyzeRequest } from './useitApi';
import type { UseitResponse } from './useitResponse';

export type UseitClientConfig = { baseUrl: string; token?: string; timeoutMs?: number };

export async function callUseitAnalyze(config: UseitClientConfig, request: UseitAnalyzeRequest): Promise<UseitResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs ?? 30000);
  try {
    const response = await fetch(`${config.baseUrl.replace(/\/$/, '')}/api/useit/analyze`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...(config.token ? { authorization: `Bearer ${config.token}` } : {}) },
      body: JSON.stringify(request),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`USEIT API returned HTTP ${response.status}`);
    return await response.json() as UseitResponse;
  } finally {
    clearTimeout(timeout);
  }
}
