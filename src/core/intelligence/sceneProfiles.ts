import type { OpportunityKind, SceneType } from './types';

export type SceneProfile = {
  label: string;
  defaultIntent: OpportunityKind;
  priorityKinds: OpportunityKind[];
  guidance: string;
};

export const SCENE_PROFILES: Record<SceneType, SceneProfile> = {
  room: { label: 'Space', defaultIntent: 'improve', priorityKinds: ['improve', 'organize', 'surprise'], guidance: 'Assess layout, focal points, circulation, proportions, storage and style. Suggest changes that can be visualized.' },
  table: { label: 'Materials', defaultIntent: 'create', priorityKinds: ['create', 'reuse', 'play', 'organize'], guidance: 'Group visible materials and propose practical builds, crafts, games or useful organizers using what is present.' },
  fridge: { label: 'Ingredients', defaultIntent: 'cook', priorityKinds: ['cook', 'organize'], guidance: 'Identify visible ingredients conservatively. Prefer recipes that maximize what is already available and clearly mark uncertain items.' },
  wardrobe: { label: 'Wardrobe', defaultIntent: 'improve', priorityKinds: ['improve', 'organize', 'surprise'], guidance: 'Identify garments and build coherent outfits or organization ideas from visible items.' },
  garage: { label: 'Workshop', defaultIntent: 'reuse', priorityKinds: ['fix', 'reuse', 'create', 'organize'], guidance: 'Look for tools, materials and objects that can solve practical problems or become useful projects.' },
  garden: { label: 'Outdoor space', defaultIntent: 'improve', priorityKinds: ['improve', 'organize', 'create'], guidance: 'Assess the space, plants, furniture and materials. Prefer realistic improvements for the visible conditions.' },
  objects: { label: 'Objects', defaultIntent: 'reuse', priorityKinds: ['fix', 'reuse', 'create', 'surprise'], guidance: 'Understand relationships between objects and find useful ways to repair, combine or repurpose them.' },
  food: { label: 'Food', defaultIntent: 'cook', priorityKinds: ['cook', 'reuse'], guidance: 'Identify food conservatively and propose practical preparations with explicit uncertainty.' },
  mixed: { label: 'Everyday scene', defaultIntent: 'surprise', priorityKinds: ['surprise', 'create', 'reuse', 'organize'], guidance: 'Understand the scene holistically and surface the most useful unexpected opportunities.' },
  unknown: { label: 'Scene', defaultIntent: 'surprise', priorityKinds: ['surprise', 'create', 'fix', 'reuse'], guidance: 'Start from high-confidence observations and avoid unsupported assumptions.' },
};
