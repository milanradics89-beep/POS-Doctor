import type { OpportunityKind, SceneType } from './types';
export type ExperienceMode = { scene: SceneType; intent: OpportunityKind; headline: string; primaryAction: string; secondaryAction: string };
export const EXPERIENCE_MODES: Record<SceneType, ExperienceMode> = {
  room: { scene: 'room', intent: 'improve', headline: 'See your space differently.', primaryAction: 'SHOW ME A BETTER LAYOUT', secondaryAction: 'GIVE ME MORE IDEAS' },
  table: { scene: 'table', intent: 'create', headline: 'You have more here than you think.', primaryAction: 'SHOW ME WHAT I CAN MAKE', secondaryAction: 'FIND MORE PROJECTS' },
  fridge: { scene: 'fridge', intent: 'cook', headline: 'Turn what you have into dinner.', primaryAction: 'SHOW ME WHAT TO COOK', secondaryAction: 'FIND MORE RECIPES' },
  wardrobe: { scene: 'wardrobe', intent: 'improve', headline: 'Make more outfits from what you own.', primaryAction: 'BUILD AN OUTFIT', secondaryAction: 'SHOW MORE' },
  garage: { scene: 'garage', intent: 'reuse', headline: 'Find a better use for what you have.', primaryAction: 'SHOW ME WHAT I CAN DO', secondaryAction: 'MORE IDEAS' },
  garden: { scene: 'garden', intent: 'improve', headline: 'Make more of this space.', primaryAction: 'SHOW ME A BETTER VERSION', secondaryAction: 'MORE IDEAS' },
  objects: { scene: 'objects', intent: 'reuse', headline: 'There may be a better use for this.', primaryAction: 'SHOW ME', secondaryAction: 'MORE IDEAS' },
  food: { scene: 'food', intent: 'cook', headline: 'Make something good from this.', primaryAction: 'SHOW ME HOW', secondaryAction: 'MORE RECIPES' },
  mixed: { scene: 'mixed', intent: 'surprise', headline: 'Here is what I would do with this.', primaryAction: 'SHOW ME', secondaryAction: 'SURPRISE ME AGAIN' },
  unknown: { scene: 'unknown', intent: 'surprise', headline: 'Let’s see what is possible.', primaryAction: 'SHOW ME', secondaryAction: 'TRY ANOTHER ANGLE' },
};
