import type { CandidateProvider } from './candidateProvider';
import type { IntelligenceInput, IntelligenceOutput } from './intelligencePipeline';
import { analyzeAndAct } from './intelligencePipeline';
import { analyzeScene, type VisionProvider } from './sceneAnalyzer';
import { sceneSignals, type SceneModel } from './sceneModel';
import { validateImageInput, type ImageInput } from './imageInput';

export type ProcessImageInput = {
  image: ImageInput;
  visionProvider: VisionProvider;
  candidateProviders: CandidateProvider[];
  userText?: string;
  budgetHuf?: number;
  preferredStyles?: string[];
  preferredColors?: string[];
  requiredCategory?: string;
};

export type ProcessImageOutput = IntelligenceOutput & { image: ImageInput; scene: SceneModel };

export async function processImage(input: ProcessImageInput): Promise<ProcessImageOutput> {
  const image = validateImageInput(input.image);
  const scene = await analyzeScene(image.uri, input.visionProvider, image.mimeType);
  const intelligenceInput: IntelligenceInput = {
    domain: scene.domain,
    userText: input.userText ?? '',
    sceneSignals: sceneSignals(scene),
    providers: input.candidateProviders,
    budgetHuf: input.budgetHuf,
    preferredStyles: input.preferredStyles,
    preferredColors: input.preferredColors,
    requiredCategory: input.requiredCategory,
  };
  const result = await analyzeAndAct(intelligenceInput);
  return { ...result, image, scene };
}
