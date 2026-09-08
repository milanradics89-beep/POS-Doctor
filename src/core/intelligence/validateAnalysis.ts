import { z } from 'zod';
import type { SceneAnalysis } from './types';

export type AnalysisIssue = { path: string; message: string };

const VisionSceneAnalysisSchema = z.object({
  responseFormat: z.literal('scene_analysis_v1').optional(),
  sceneType: z.enum(['room','table','fridge','wardrobe','garage','garden','objects','food','mixed','unknown']),
  summary: z.string().min(10),
  items: z.array(z.object({
    name: z.string(),
    category: z.string().optional(),
    confidence: z.number().min(0).max(1),
    attributes: z.array(z.string()).optional(),
  })),
  constraints: z.array(z.string()),
  opportunities: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    kind: z.enum(['create','improve','fix','cook','reuse','play','organize','surprise']),
    effort: z.enum(['easy','medium','advanced']),
    durationMinutes: z.number().optional(),
    requiredItems: z.array(z.string()),
    missingItems: z.array(z.string()).optional(),
    visualizable: z.boolean(),
  })),
  safetyNotes: z.array(z.string()),
});

export function validateAnalysis(value: unknown): { ok: true; data: SceneAnalysis } | { ok: false; issues: AnalysisIssue[] } {
  const result = VisionSceneAnalysisSchema.safeParse(value);
  if (result.success) return { ok: true, data: result.data as SceneAnalysis };
  return {
    ok: false,
    issues: result.error.issues.map(issue => ({ path: issue.path.join('.'), message: issue.message })),
  };
}
