import type { IntelligenceProvider, OpportunityKind } from './types';
import { prepareCapturedImage, type CapturedImage } from './capture';
import { analyzeWithQualityRetry } from './retryAnalysis';
import { decideExperience, type ExperienceDecision } from './experience';
import { fingerprintImage } from './imageFingerprint';

export type AnalysisSession = { status: 'analyzing' | 'ready' | 'retake' | 'clarify' | 'error'; image: CapturedImage; fingerprint?: string; decision?: ExperienceDecision; error?: string };

export async function analyzeCapturedImage(provider: IntelligenceProvider, image: CapturedImage, intent?: OpportunityKind): Promise<AnalysisSession> {
  const prepared = prepareCapturedImage(image);
  try {
    const fingerprint = prepared.uri.startsWith('data:') ? await fingerprintImage(prepared.uri) : undefined;
    const analysis = await analyzeWithQualityRetry(provider, prepared.uri, intent);
    const decision = decideExperience(analysis);
    return { status: decision.mode, image: prepared, fingerprint, decision };
  } catch (error) {
    return { status: 'error', image: prepared, error: error instanceof Error ? error.message : 'Analysis failed.' };
  }
}
