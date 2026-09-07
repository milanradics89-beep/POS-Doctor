import type { OpportunityKind, SceneAnalysis } from './types';
import { buildVisionRequest } from './visionRequest';
import { validateAnalysis } from './validateAnalysis';
import { normalizeAnalysis } from './normalizeAnalysis';
import { fetchWithPolicy } from './request';

export type VisionProviderConfig = { baseUrl:string; locale?:string };

export async function analyzeScene(config:VisionProviderConfig,imageUri:string,intent?:OpportunityKind):Promise<SceneAnalysis>{
  const base=config.baseUrl.trim().replace(/\/$/,'');
  if(!base) throw new Error('Vision backend URL is required.');
  const request=buildVisionRequest(imageUri,intent,config.locale||'hu-HU');
  const response=await fetchWithPolicy(`${base}/v1/analyze`,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(request)});
  if(!response.ok) throw new Error(`Vision backend failed (${response.status}).`);
  const payload:unknown=await response.json();
  const checked=validateAnalysis(payload);
  if(!checked.ok) throw new Error('Vision backend returned an invalid scene analysis.');
  return normalizeAnalysis(checked.data);
}
