import type { IntelligenceRun } from './intelligenceOrchestrator';

export type UseitResponse = {
  status: IntelligenceRun['status'];
  message: string;
  clarification?: IntelligenceRun['clarification']['questions'];
  scene?: IntelligenceRun['scene'];
  recommendations?: IntelligenceRun['solutions'];
  products?: IntelligenceRun['ranked'];
  redesign?: IntelligenceRun['redesign'];
  actions: Array<{ id: string; label: string; type: 'answer'|'view_product'|'open_link'|'generate_preview'|'refine' }>;
};

export function toUseitResponse(run: IntelligenceRun): UseitResponse {
  if (run.status === 'needs_clarification') return { status: run.status, message: 'Még egy információra szükségem van a pontos javaslathoz.', clarification: run.clarification.questions, scene: run.scene, actions: [{ id: 'answer', label: 'Válaszolok', type: 'answer' }] };
  if (run.status === 'no_candidates') return { status: run.status, message: 'Nem találtam megfelelő termékjelölteket a megadott feltételekkel.', scene: run.scene, actions: [{ id: 'refine', label: 'Feltételek módosítása', type: 'refine' }] };
  const actions: UseitResponse['actions'] = [];
  if (run.redesign) actions.push({ id: 'preview', label: 'Redesign megtekintése', type: 'generate_preview' });
  if (run.ranked?.length) actions.push({ id: 'products', label: 'Termékek megtekintése', type: 'view_product' });
  return { status: run.status, message: run.redesign ? 'Elkészítettem a javasolt megoldást és a redesign tervet.' : 'Elkészítettem a javaslatot.', scene: run.scene, recommendations: run.solutions, products: run.ranked, redesign: run.redesign, actions };
}
