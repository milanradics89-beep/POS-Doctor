import type { ProductProvider } from './productCandidateCollector';
import type { ProductCandidate, ShoppingDecision } from './shoppingDecisionEngine';

type Mapper = (raw: unknown) => ProductCandidate | null;

export class HttpProductProvider implements ProductProvider {
  constructor(public readonly id: string, private readonly config: { endpoint: string; apiKey?: string; headers?: Record<string,string>; map: Mapper }) {}

  async search(decision: ShoppingDecision): Promise<ProductCandidate[]> {
    const response = await fetch(this.config.endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...(this.config.headers ?? {}), ...(this.config.apiKey ? { authorization: `Bearer ${this.config.apiKey}` } : {}) },
      body: JSON.stringify({ query: decision.query, categories: decision.categories, budgetHuf: decision.budgetHuf, constraints: decision.constraints, limit: decision.candidateSlots })
    });
    if (!response.ok) throw new Error(`Provider ${this.id} returned HTTP ${response.status}`);
    const payload = await response.json() as { products?: unknown[] } | unknown[];
    const rows = Array.isArray(payload) ? payload : payload.products ?? [];
    return rows.map(this.config.map).filter((item): item is ProductCandidate => item !== null);
  }
}
