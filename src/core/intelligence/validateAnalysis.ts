import type { SceneAnalysis, Opportunity, DetectedItem } from './types';

export type AnalysisIssue = { path: string; message: string };
const sceneTypes = new Set(['room','table','fridge','wardrobe','garage','garden','objects','food','mixed','unknown']);
const kinds = new Set(['create','improve','fix','cook','reuse','play','organize','surprise']);
const efforts = new Set(['easy','medium','advanced']);

const isRecord = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const isStringArray = (v: unknown): v is string[] => Array.isArray(v) && v.every(x => typeof x === 'string');

function validateItem(v: unknown, path: string, issues: AnalysisIssue[]): v is DetectedItem {
  if (!isRecord(v)) { issues.push({ path, message: 'Expected an object.' }); return false; }
  if (typeof v.name !== 'string' || !v.name.trim()) issues.push({ path: `${path}.name`, message: 'Item name is required.' });
  if (typeof v.confidence !== 'number' || !Number.isFinite(v.confidence) || v.confidence < 0 || v.confidence > 1) issues.push({ path: `${path}.confidence`, message: 'Confidence must be a number from 0 to 1.' });
  if (v.category !== undefined && typeof v.category !== 'string') issues.push({ path: `${path}.category`, message: 'Category must be a string.' });
  if (v.attributes !== undefined && !isStringArray(v.attributes)) issues.push({ path: `${path}.attributes`, message: 'Attributes must be strings.' });
  return true;
}

function validateOpportunity(v: unknown, path: string, issues: AnalysisIssue[]): v is Opportunity {
  if (!isRecord(v)) { issues.push({ path, message: 'Expected an object.' }); return false; }
  for (const key of ['id','title','description'] as const) if (typeof v[key] !== 'string' || !v[key].trim()) issues.push({ path: `${path}.${key}`, message: `${key} is required.` });
  if (typeof v.kind !== 'string' || !kinds.has(v.kind)) issues.push({ path: `${path}.kind`, message: 'Unsupported opportunity kind.' });
  if (typeof v.effort !== 'string' || !efforts.has(v.effort)) issues.push({ path: `${path}.effort`, message: 'Unsupported effort level.' });
  if (!isStringArray(v.requiredItems)) issues.push({ path: `${path}.requiredItems`, message: 'Required items must be strings.' });
  if (v.missingItems !== undefined && !isStringArray(v.missingItems)) issues.push({ path: `${path}.missingItems`, message: 'Missing items must be strings.' });
  if (typeof v.visualizable !== 'boolean') issues.push({ path: `${path}.visualizable`, message: 'Visualizable must be boolean.' });
  if (v.durationMinutes !== undefined && (typeof v.durationMinutes !== 'number' || !Number.isFinite(v.durationMinutes) || v.durationMinutes <= 0)) issues.push({ path: `${path}.durationMinutes`, message: 'Duration must be positive.' });
  return true;
}

export function validateAnalysis(value: unknown): { ok: true; data: SceneAnalysis } | { ok: false; issues: AnalysisIssue[] } {
  const issues: AnalysisIssue[] = [];
  if (!isRecord(value)) return { ok: false, issues: [{ path: '', message: 'Analysis must be an object.' }] };
  if (typeof value.sceneType !== 'string' || !sceneTypes.has(value.sceneType)) issues.push({ path: 'sceneType', message: 'Unsupported scene type.' });
  if (typeof value.summary !== 'string' || !value.summary.trim()) issues.push({ path: 'summary', message: 'Summary is required.' });
  if (!Array.isArray(value.items)) issues.push({ path: 'items', message: 'Expected an array.' }); else value.items.forEach((v, i) => validateItem(v, `items[${i}]`, issues));
  for (const key of ['constraints','safetyNotes'] as const) if (!isStringArray(value[key])) issues.push({ path: key, message: 'Expected an array of strings.' });
  if (!Array.isArray(value.opportunities)) issues.push({ path: 'opportunities', message: 'Expected an array.' }); else value.opportunities.forEach((v, i) => validateOpportunity(v, `opportunities[${i}]`, issues));
  return issues.length ? { ok: false, issues } : { ok: true, data: value as SceneAnalysis };
}
