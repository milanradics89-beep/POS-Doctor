import { afterEach, describe, expect, it, vi } from 'vitest';
import { UseitApiProvider, analyzeForConsumer } from './apiClient';

const image = 'data:image/jpeg;base64,aGVsbG8=';

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

  it('rejects a missing API base URL before network access', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    await expect(new UseitApiProvider('   ').analyzeImage(image)).rejects.toThrow('USEIT API base URL is required.');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects an invalid image before network access', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');
    await expect(new UseitApiProvider('https://api.example.test').analyzeImage('data:image/svg+xml;base64,abc')).rejects.toThrow('Unsupported image type');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('reports malformed analysis JSON as a controlled API error', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('not-json', { status: 200, headers: { 'content-type': 'application/json' } }));
    await expect(new UseitApiProvider('https://api.example.test').analyzeImage(image)).rejects.toThrow('USEIT API returned malformed JSON.');
  });

  it('rejects an invalid analysis payload with validation details', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ sceneType: 'room' }), { status: 200, headers: { 'content-type': 'application/json' } }));
    await expect(new UseitApiProvider('https://api.example.test').analyzeImage(image)).rejects.toThrow('USEIT API returned an invalid analysis:');
  });

  it('normalizes a valid analysis response at the API boundary', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify(validAnalysis), { status: 200, headers: { 'content-type': 'application/json' } }));
    const result = await new UseitApiProvider('https://api.example.test').analyzeImage(image);
    expect(result.responseFormat).toBe('scene_analysis_v1');
    expect(result.sceneType).toBe('room');
  });

  it('rejects a non-JSON redesign response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('<html>error</html>', { status: 200, headers: { 'content-type': 'text/html' } }));
    await expect(new UseitApiProvider('https://api.example.test').renderRedesign(image, 'test', [])).rejects.toThrow('USEIT redesign API returned an unexpected response.');
  });

  it('rejects an invalid redesign payload', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ disclosure: 'x' }), { status: 200, headers: { 'content-type': 'application/json' } }));
    await expect(new UseitApiProvider('https://api.example.test').renderRedesign(image, 'test', [])).rejects.toThrow('USEIT redesign API returned an invalid result.');
  });

  it('uses the unified consumer boundary without calling legacy vision or client shopping', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify(validUnified), { status: 200, headers: { 'content-type': 'application/json' } }));
    const provider = new UseitApiProvider('https://api.example.test');
    const result = await analyzeForConsumer(provider, image, 'improve');
    expect(result.unified?.contractVersion).toBe('useit_analyze_v1');
    expect(result.analysis.sceneType).toBe('room');
    expect(result.intelligence.intentConfidence).toBe(0.82);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(String(fetchMock.mock.calls[0][0])).toContain('/v1/useit/analyze');
  });
});
