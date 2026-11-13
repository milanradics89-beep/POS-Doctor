import { afterEach, describe, expect, it, vi } from 'vitest';
import { UseitApiProvider, analyzeForConsumer } from './apiClient';

const image = 'data:image/jpeg;base64,aGVsbG8=';
const provider = () => new UseitApiProvider('https://api.example.test', { apiKey: 'test-api-key' });

const validAnalysis = {
  responseFormat: 'scene_analysis_v1',
  sceneType: 'room',
  summary: 'A simple room scene suitable for analysis.',
  items: [],
  constraints: [],
  opportunities: [],
  safetyNotes: [],
};

const validUnified = {
  contractVersion: 'useit_analyze_v1',
  scene: validAnalysis,
  intent: { name: 'improve', confidence: 0.82 },
  specialist: { profile: 'home-design' },
  suggestions: [],
  shopping: null,
  pipeline: ['see', 'understand', 'reason', 'intent', 'specialist', 'suggest', 'plan'],
};

describe('UseitApiProvider boundary handling', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([
    { name: 'scene analysis', run: (api: UseitApiProvider) => api.analyzeImage(image) },
    { name: 'unified analysis', run: (api: UseitApiProvider) => api.analyzeUseit(image) },
    { name: 'redesign', run: (api: UseitApiProvider) => api.renderRedesign(image, 'test', []) },
  ])('keeps the $name client deadline beyond the backend 45-second request limit', async ({ run }) => {
    vi.useFakeTimers();
    try {
      const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation((_input, init) => {
        const signal = init?.signal as AbortSignal;
        return new Promise<Response>((_resolve, reject) => {
          const abort = () => reject(new DOMException('The operation was aborted.', 'AbortError'));
          if (signal.aborted) abort();
          else signal.addEventListener('abort', abort, { once: true });
        });
      });

      const pending = run(provider());
      const rejection = expect(pending).rejects.toMatchObject({ name: 'AbortError' });
      for (let i = 0; i < 20 && fetchMock.mock.calls.length === 0; i += 1) {
        await Promise.resolve();
      }

      expect(fetchMock).toHaveBeenCalledTimes(1);
      const signal = fetchMock.mock.calls[0][1]?.signal as AbortSignal;
      await vi.advanceTimersByTimeAsync(45_000);
      expect(signal.aborted).toBe(false);
      await vi.advanceTimersByTimeAsync(4_999);
      expect(signal.aborted).toBe(false);
      await vi.advanceTimersByTimeAsync(1);

      await rejection;
      expect(signal.aborted).toBe(true);
      expect(fetchMock).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });

  it('rejects a missing API base URL before network access', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    await expect(new UseitApiProvider('').analyzeImage(image)).rejects.toThrow('USEIT API base URL is required.');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects an invalid image before network access', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    await expect(provider().analyzeImage('data:image/svg+xml;base64,abc')).rejects.toThrow('Unsupported image type');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('reports malformed analysis JSON as a controlled API error', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('not-json', { status: 200, headers: { 'content-type': 'application/json' } }));
    await expect(provider().analyzeImage(image)).rejects.toThrow('USEIT API returned malformed JSON.');
  });

  it('rejects an invalid analysis payload with validation details', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ sceneType: 'room' }), { status: 200, headers: { 'content-type': 'application/json' } }));
    await expect(provider().analyzeImage(image)).rejects.toThrow('USEIT API returned an invalid analysis:');
  });

  it('normalizes a valid analysis response at the API boundary', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify(validAnalysis), { status: 200, headers: { 'content-type': 'application/json' } }));
    const result = await provider().analyzeImage(image);
    expect(result.responseFormat).toBe('scene_analysis_v1');
    expect(result.sceneType).toBe('room');
  });

  it('rejects a non-JSON redesign response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('<html>error</html>', { status: 200, headers: { 'content-type': 'text/html' } }));
    await expect(provider().renderRedesign(image, 'test', [])).rejects.toThrow('USEIT redesign API returned an unexpected response.');
  });

  it('rejects an invalid redesign payload', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ disclosure: 'x' }), { status: 200, headers: { 'content-type': 'application/json' } }));
    await expect(provider().renderRedesign(image, 'test', [])).rejects.toThrow('USEIT redesign API returned an invalid result.');
  });

  it('uses the unified consumer boundary without calling legacy vision or client shopping', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify(validUnified), { status: 200, headers: { 'content-type': 'application/json' } }));
    const result = await analyzeForConsumer(provider(), image, 'improve');
    expect(result.unified?.contractVersion).toBe('useit_analyze_v1');
    expect(result.analysis.sceneType).toBe('room');
    expect(result.intelligence.intentConfidence).toBe(0.82);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(String(fetchMock.mock.calls[0][0])).toContain('/v1/useit/analyze');
  });
  it('builds a visual redesign plan from unified visualizable suggestions and shopping candidates', async () => {
    const payload = {
      ...validUnified,
      scene: {
        ...validAnalysis,
        summary: 'A living room with a grey sofa.',
        items: [{ name: 'Grey sofa', category: 'furniture', confidence: 0.96, attributes: [] }],
      },
      suggestions: [{
        id: 'suggestion-lighting',
        title: 'Add warm layered lighting',
        description: 'Use a floor lamp and warm ambient light beside the sofa.',
        kind: 'lighting',
        effort: 'low',
        visualizable: true,
        score: 0.91,
        rank: 1,
        reasons: ['Improves the room atmosphere.'],
      }],
      shopping: {
        query: 'warm floor lamp',
        candidates: [{
          id: 'lamp-1',
          name: 'Warm floor lamp',
          url: 'https://shop.example.test/lamp',
          category: 'lighting',
          price: 59000,
          currency: 'HUF',
          retailer: 'Example Shop',
        }, {
          id: 'unsafe-product',
          name: 'Untrusted product',
          url: 'javascript:alert(1)',
          category: 'lighting',
        }],
      },
    };
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify(payload), { status: 200, headers: { 'content-type': 'application/json' } }));

    const result = await analyzeForConsumer(provider(), image, 'improve');

    expect(result.redesign).toBeDefined();
    expect(result.redesign?.prompt).toContain('Add warm layered lighting');
    expect(result.redesign?.prompt).toContain('Warm floor lamp');
    expect(result.redesign?.products).toEqual([{
      category: 'lighting',
      productId: 'lamp-1',
      title: 'Warm floor lamp',
      priceHuf: 59000,
      url: 'https://shop.example.test/lamp',
    }]);
    expect(result.redesign?.products).toHaveLength(1);
    expect(result.redesign?.prompt).toContain('Apply these visualizable recommendations:\n- Add warm layered lighting');
    expect(result.redesign?.prompt).toContain('\n\nSelected retailer products:');
    expect(result.redesign?.prompt).not.toContain('\\n- Add warm layered lighting');
    expect(result.redesign?.actions).toContainEqual(expect.objectContaining({ type: 'keep', target: 'Grey sofa' }));
    expect(result.redesign?.actions).toContainEqual(expect.objectContaining({ type: 'add', target: 'Add warm layered lighting' }));
  });
  it('does not create an empty redesign plan when the unified response has no visualizable suggestions', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify(validUnified), { status: 200, headers: { 'content-type': 'application/json' } }));

    const result = await analyzeForConsumer(provider(), image, 'improve');

    expect(result.unified?.contractVersion).toBe('useit_analyze_v1');
    expect(result.redesign).toBeUndefined();
  });


  it('filters unsafe external links from unified consumer and redesign results', async () => {
    const payload = {
      ...validUnified,
      suggestions: [{
        id: 'lighting',
        title: 'Add a floor lamp',
        description: 'Add warm lighting beside the sofa.',
        kind: 'lighting',
        effort: 'low',
        visualizable: true,
        score: 0.9,
        rank: 1,
        reasons: ['Improves the room.'],
      }],
      shopping: {
        query: 'floor lamp',
        candidates: [
          { id: 'safe', name: 'Safe lamp', url: 'https://shop.example.test/lamp', category: 'lighting', retailer: 'Example Shop', price: 59000 },
          { id: 'credentials', name: 'Credentials', url: 'https://user:secret@shop.example.test/item', category: 'lighting' },
          { id: 'port', name: 'Non-default port', url: 'https://shop.example.test:8443/item', category: 'lighting' },
          { id: 'private-ip', name: 'Private IP', url: 'http://192.168.1.10/item', category: 'lighting' },
          { id: 'ipv6', name: 'IPv6 literal', url: 'http://[::1]/item', category: 'lighting' },
          { id: 'local-host', name: 'Local host', url: 'http://printer.local/item', category: 'lighting' },
          { id: 'scheme', name: 'Unsafe scheme', url: 'javascript:alert(1)', category: 'lighting' },
        ],
      },
    };
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify(payload), { status: 200, headers: { 'content-type': 'application/json' } }));

    const result = await analyzeForConsumer(provider(), image, 'improve');

    expect(result.unified?.shopping?.candidates.map(candidate => candidate.id)).toEqual(['safe']);
    expect(result.intelligence.rankedCandidates.map(candidate => candidate.id)).toEqual(['safe']);
    expect(result.redesign?.products.map(product => product.productId)).toEqual(['safe']);
  });

  it('filters local and unsafe product hosts from legacy consumer results', async () => {
    const legacyProvider = {
      analyzeImage: vi.fn().mockResolvedValue({
        ...validAnalysis,
        items: [{ name: 'Sofa', category: 'furniture', confidence: 0.96, attributes: [] }],
      }),
    };
    const productProvider = {
      id: 'test-products',
      search: vi.fn().mockResolvedValue([
        { id: 'safe', title: 'Safe lamp', url: 'https://shop.example.test/lamp', category: 'lighting', attributes: {}, source: 'test-products', priceHuf: 59000 },
        { id: 'private-ip', title: 'Private IP', url: 'http://192.168.1.10/item', category: 'lighting', attributes: {}, source: 'test-products' },
        { id: 'local-host', title: 'Local host', url: 'http://printer.local/item', category: 'lighting', attributes: {}, source: 'test-products' },
      ]),
    };

    const result = await analyzeForConsumer(legacyProvider, image, 'improve', {
      phase3Providers: [productProvider],
      budgetHuf: 100000,
      preferredStyles: ['modern'],
    });

    expect(result.phase3?.candidates?.candidates.map(candidate => candidate.id)).toEqual(['safe']);
    expect(result.intelligence.rankedCandidates.map(candidate => candidate.id)).toEqual(['safe']);
  });

});
