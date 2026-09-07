import type { SceneAnalysis } from './types';

export type AnalysisIssue = { path: string; message: string };

export function validateAnalysis(value: unknown): { ok: true; data: SceneAnalysis } | { ok: false; issues: AnalysisIssue[] } {
  const issues: AnalysisIssue[] = [];
  if (!value || typeof value !== 'object') return { ok: false, issues: [{ path: '', message: 'Analysis must be an object.' }] };
  const v = value as Record<string, unknown>;
  const sceneTypes = ['room','table','fridge','wardrobe','garage','garden','objects','food','mixed','unknown'];
  if (!sceneTypes.includes(String(v.sceneType))) issues.push({ path: 'sceneType', message: 'Unsupported scene type.' });
  if (typeof v.summary !== 'string' || !v.summary.trim()) issues.push({ path: 'summary', message: 'Summary is required.' });
  for (const key of ['items','constraints','opportunities','safetyNotes']) if (!Array.isArray(v[key])) issues.push({ path: key, message: 'Expected an array.' });
  if (issues.length) return { ok: false, issues };
  return { ok: true, data: value as SceneAnalysis };
}
