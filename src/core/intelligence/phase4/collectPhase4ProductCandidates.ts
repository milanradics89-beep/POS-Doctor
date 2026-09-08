import type { SceneModel } from '../sceneModel';
import type { PlannedTask } from '../taskPlanner';
import { buildShoppingDecision } from '../shoppingDecisionEngine';
import { collectProductCandidates, type CandidateCollection } from '../productCandidateCollector';
import type { ProductCatalogRuntimeOptions, ProductCatalogRuntime } from './productCatalogRuntime';
import { createPhase4ProductProvider } from './createPhase4ProductProvider';
import type { ProductCatalogRuntimeConfig } from './productCatalogConfig';

/**
 * Runs the existing shopping-decision flow against the Phase 4 catalog runtime.
 * The existing decision builder and candidate collector remain untouched.
 */
export async function collectPhase4ProductCandidates(
  scene: SceneModel,
  task: PlannedTask,
  config: ProductCatalogRuntimeConfig,
  options: ProductCatalogRuntimeOptions = {},
): Promise<CandidateCollection> {
  if (!task.shoppingRequired) {
    return { candidates: [], providersUsed: [], errors: [] };
  }

  const decision = buildShoppingDecision(scene, task);
  const provider = createPhase4ProductProvider(config, options);
  return collectProductCandidates(decision, [provider]);
}
