import { describe, expect, it } from 'vitest';
import { toGenerationPayload } from './visualizationAdapter';

const request = {
  sceneType: 'room',
  sourceImageUri: 'https://example.com/room.jpg',
  preserveItems: ['sofa'],
  items: [{ productId: 'chair-1', productName: 'Oak Chair', placement: 'living area', sourceUrl: 'https://example.com/chair', imageUrl: 'https://example.com/chair.jpg' }],
  constraints: ['keep doorway clear'],
  stylePreferences: ['warm modern'],
  fidelityRules: ['Use only the supplied product identities.'],
} as any;

describe('toGenerationPayload', () => {
  it('keeps the source image and selected product identity', () => {
    const payload = toGenerationPayload(request);
    expect(payload.sourceImageUri).toBe(request.sourceImageUri);
    expect(payload.preserveSource).toBe(true);
    expect(payload.prompt).toContain('Oak Chair [productId=chair-1]');
    expect(payload.prompt).toContain('Keep these existing items: sofa.');
    expect(payload.prompt).toContain('keep doorway clear');
  });
});
