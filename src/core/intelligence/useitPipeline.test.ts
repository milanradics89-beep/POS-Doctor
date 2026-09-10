import { describe, expect, it, vi } from 'vitest';
import { runUseitPipeline } from './useitPipeline';
import type { IntelligenceProvider } from './types';

const scene = {
  responseFormat: 'scene_analysis_v1' as const,
  sceneType: 'room' as const,
  summary: 'A valid room scene returned by the unified intelligence boundary.',
  items: [],
  constraints: [],
  opportunities: [],
  safetyNotes: [],
};

const unifiedResponse = {
  contractVersion: 'useit_analyze_v1' as const,
  scene,
  intent: { name: 'improve', confidence: 0.9 },
  specialist: { profile: 'home-design' },
  suggestions: [],
  shopping: null,
  pipeline: ['see', 'understand', 'reason', 'intent', 'specialist', 'suggest', 'plan'],
};

describe('runUseitPipeline unified boundary', () => {
  it('uses the unified endpoint once when the provider supports it', async () => {
    const analyzeUseit = vi.fn().mockResolvedValue(unifiedResponse);
    const analyzeImage = vi.fn().mockRejectedValue(new Error('legacy path must not run'));
    const provider = { analyzeUseit, analyzeImage } as unknown as IntelligenceProvider;

    const result = await runUseitPipeline(provider, 'data:image/jpeg;base64,abc', 'improve');

    expect(result.sceneType).toBe('room');
    expect(analyzeUseit).toHaveBeenCalledTimes(1);
    expect(analyzeUseit).toHaveBeenCalledWith('data:image/jpeg;base64,abc', 'improve');
    expect(analyzeImage).not.toHaveBeenCalled();
  });

  it('keeps legacy providers compatible during migration', async () => {
    const analyzeImage = vi.fn()
      .mockResolvedValueOnce(scene)
      .mockResolvedValueOnce(scene);
    const provider = { analyzeImage } as IntelligenceProvider;

    const result = await runUseitPipeline(provider, 'image', 'improve');

    expect(result.sceneType).toBe('room');
    expect(analyzeImage).toHaveBeenCalledTimes(2);
  });

  it('fails closed when the unified response is invalid', async () => {
    const analyzeUseit = vi.fn().mockResolvedValue({
      ...unifiedResponse,
      contractVersion: 'unknown_contract',
    });
    const provider = { analyzeUseit } as unknown as IntelligenceProvider;

    await expect(runUseitPipeline(provider, 'image')).rejects.toThrow('Unified intelligence response validation failed:');
  });
});
