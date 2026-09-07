export type RequestPolicy = { timeoutMs?: number; attempts?: number; baseDelayMs?: number };

export async function fetchWithPolicy(input: RequestInfo | URL, init: RequestInit = {}, policy: RequestPolicy = {}): Promise<Response> {
  const timeoutMs = policy.timeoutMs ?? 30_000;
  const attempts = Math.max(1, policy.attempts ?? 2);
  const baseDelayMs = policy.baseDelayMs ?? 500;
  let lastError: unknown;
  for (let attempt = 0; attempt < attempts; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(input, { ...init, signal: controller.signal });
      if (response.ok || response.status < 500 || attempt === attempts - 1) return response;
      lastError = new Error(`Transient API error (${response.status}).`);
    } catch (error) {
      lastError = error;
      if (attempt === attempts - 1) break;
    } finally { clearTimeout(timer); }
    await new Promise(resolve => setTimeout(resolve, baseDelayMs * 2 ** attempt));
  }
  throw lastError instanceof Error ? lastError : new Error('Intelligence request failed.');
}
