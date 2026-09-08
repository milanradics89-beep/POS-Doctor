import { afterEach, describe, expect, it, vi } from 'vitest';
import { UseitApiProvider } from './apiClient';

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
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('not-json', {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }));

    await expect(new UseitApiProvider('https://api.example.test').analyzeImage(image)).rejects.toThrow('USEIT API returned malformed JSON.');
  });

  it('rejects an invalid analysis payload with validation details', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ sceneType: 'room' }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }));

    await expect(new UseitApiProvider('https://api.example.test').analyzeImage(image)).rejects.toThrow('USEIT API returned an invalid analysis:');
  });

  it('normalizes a valid analysis response at the API boundary', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify(validAnalysis), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }));

    const result = await new UseitApiProvider('https://api.example.test').analyzeImage(image);
    expect(result.responseFormat).toBe('scene_analysis_v1');
    expect(result.sceneType).toBe('room');
  });

  it('rejects a non-JSON redesign response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('<html>error</html>', {
      status: 200,
      headers: { 'content-type': 'text/html' },
    }));

    await expect(new UseitApiProvider('https://api.example.test').renderRedesign(image, 'test', [])).rejects.toThrow('USEIT redesign API returned an unexpected response.');
  });

  it('rejects an invalid redesign payload', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ disclosure: 'x' }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }));

    await expect(new UseitApiProvider('https://api.example.test').renderRedesign(image, 'test', [])).rejects.toThrow('USEIT redesign API returned an invalid result.');
  });
});
