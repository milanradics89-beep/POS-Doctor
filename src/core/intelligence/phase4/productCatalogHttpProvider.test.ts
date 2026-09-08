import { describe, expect, it } from 'vitest';
import { ProductCatalogHttpProvider } from './productCatalogHttpProvider';

describe('ProductCatalogHttpProvider', () => {
  const query = { query: 'desk', category: 'office', budgetMax: 100, currency: 'HUF', locale: 'hu-HU' };

  it('maps a valid JSON catalog response', async () => {
    const fetchImpl = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = new URL(String(input));
      expect(url.searchParams.get('query')).toBe('desk');
      expect(init?.method).toBe('GET');
      return new Response(JSON.stringify([{ id: '1', title: 'Desk', category: 'office', price: 90, currency: 'HUF', productUrl: 'https://example.com/p/1', available: true }]), { status: 200 });
    };

    const provider = new ProductCatalogHttpProvider({ endpoint: 'https://example.com/catalog', retailer: 'example', fetchImpl });
    await expect(provider.search(query)).resolves.toEqual([expect.objectContaining({ id: '1', retailer: 'example', price: 90 })]);
  });

  it('rejects non-array responses', async () => {
    const fetchImpl = async () => new Response(JSON.stringify({ products: [] }), { status: 200 });
    const provider = new ProductCatalogHttpProvider({ endpoint: 'https://example.com/catalog', retailer: 'example', fetchImpl });
    await expect(provider.search(query)).rejects.toThrow('response must be an array');
  });

  it('rejects malformed products', async () => {
    const fetchImpl = async () => new Response(JSON.stringify([{ id: '1' }]), { status: 200 });
    const provider = new ProductCatalogHttpProvider({ endpoint: 'https://example.com/catalog', retailer: 'example', fetchImpl });
    await expect(provider.search(query)).rejects.toThrow('id, title and category are required');
  });

  it('rejects non-success HTTP responses', async () => {
    const fetchImpl = async () => new Response('', { status: 503 });
    const provider = new ProductCatalogHttpProvider({ endpoint: 'https://example.com/catalog', retailer: 'example', fetchImpl });
    await expect(provider.search(query)).rejects.toThrow('HTTP 503');
  });

  it('requires an HTTP(S) endpoint', () => {
    expect(() => new ProductCatalogHttpProvider({ endpoint: 'file:///tmp/catalog', retailer: 'example' })).toThrow('HTTP(S)');
  });

  it('aborts a request after the configured timeout', async () => {
    let aborted = false;
    const fetchImpl = async (_input: RequestInfo | URL, init?: RequestInit) => {
      init?.signal?.addEventListener('abort', () => { aborted = true; });
      await new Promise(resolve => setTimeout(resolve, 20));
      throw new DOMException('The operation was aborted.', 'AbortError');
    };

    const provider = new ProductCatalogHttpProvider({ endpoint: 'https://example.com/catalog', retailer: 'example', timeoutMs: 1, fetchImpl });
    await expect(provider.search(query)).rejects.toThrow('aborted');
    expect(aborted).toBe(true);
  });
});
