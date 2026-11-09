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
    expect(result.redesign?.actions).toContainEqual(expect.objectContaining({ type: 'keep', target: 'Grey sofa' }));
    expect(result.redesign?.actions).toContainEqual(expect.objectContaining({ type: 'add', target: 'Add warm layered lighting' }));
  });

});
