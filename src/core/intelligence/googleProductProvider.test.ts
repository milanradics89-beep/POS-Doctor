import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./request', () => ({ fetchWithPolicy: vi.fn() }));

describe('googleProductProvider', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv('EXPO_PUBLIC_USEIT_API_URL', 'https://api.example');
  });

  it('normalizes backend products and rejects unsafe or malformed candidates', async () => {
    const request = await import('./request');
    vi.mocked(request.fetchWithPolicy).mockResolvedValue(new Response(JSON.stringify({
      query: 'lamp',
      candidates: [
        { id: 'sku-1', name: ' Desk Lamp ', url: 'https://shop.example/lamp', price: 12990, priceHuf: 12990, currency: 'HUF', availability: 'in_stock', retailer: ' Shop ', evidence: [' product page ', 7], imageUrl: 'data:image/png;base64,unsafe', qualityScore: 0.9 },
        { id: 'unsafe', name: 'Unsafe', url: 'javascript:alert(1)', price: 10, currency: 'HUF' },
        { id: 'missing', name: 'Missing URL', url: '', currency: 'HUF' },
        null,
      ],
    }), { status: 200, headers: { 'Content-Type': 'application/json' } }));

    const { googleProductProvider } = await import('./googleProductProvider');
    const candidates = await googleProductProvider.search({
      query: 'lamp', categories: ['lighting'], preserveExisting: true, constraints: {}, candidateSlots: 6,
    });

    expect(candidates).toHaveLength(1);
    expect(candidates[0]).toMatchObject({
      id: 'sku-1',
      title: 'Desk Lamp',
      url: 'https://shop.example/lamp',
      priceHuf: 12990,
      availability: 'in_stock',
      source: 'Shop',
    });
    expect(candidates[0].attributes.evidence).toEqual(['product page']);
    expect(candidates[0].attributes).not.toHaveProperty('imageUrl');
  });

  it('does not expose raw upstream error response bodies', async () => {
    const request = await import('./request');
    vi.mocked(request.fetchWithPolicy).mockResolvedValue(new Response('secret-token=hidden', { status: 502 }));

    const { googleProductProvider } = await import('./googleProductProvider');
    let message = '';
    try {
      await googleProductProvider.search({
        query: 'lamp', categories: ['lighting'], preserveExisting: true, constraints: {}, candidateSlots: 6,
      });
    } catch (error) {
      message = error instanceof Error ? error.message : String(error);
    }
    expect(message).toBe('Google product discovery failed (502).');
    expect(message).not.toContain('secret-token');
  });

  it('reports invalid JSON and invalid response shapes clearly', async () => {
    const request = await import('./request');
    vi.mocked(request.fetchWithPolicy)
      .mockResolvedValueOnce(new Response('not-json', { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ candidates: {} }), { status: 200 }));

    const { googleProductProvider } = await import('./googleProductProvider');
    const decision = {
      query: 'lamp', categories: ['lighting'], preserveExisting: true, constraints: {}, candidateSlots: 6,
    };
    await expect(googleProductProvider.search(decision)).rejects.toThrow('returned invalid JSON');
    await expect(googleProductProvider.search(decision)).rejects.toThrow('returned an invalid response');
  });
});
