export type IntentDomain = 'room' | 'kitchen' | 'food' | 'wardrobe' | 'object' | 'general' | 'unknown';
export type NeedKind = 'redesign' | 'complete' | 'replace' | 'cook' | 'style' | 'repair' | 'buy' | 'learn';
export type CandidateKind = 'product' | 'ingredient' | 'accessory' | 'replacement_part' | 'service' | 'activity';

export type Need = {
  kind: NeedKind;
  domain: IntentDomain;
  description: string;
  requiredCandidateKinds: CandidateKind[];
  confidence: number;
};

export type IntentNeedContext = { domain: IntentDomain; userText?: string; sceneSignals: string[] };

const RULES: Array<{ test: RegExp; need: Need }> = [
  { test: /rendez|átalakít|modernebb|új.*bútor/i, need: { kind: 'redesign', domain: 'room', description: 'Redesign the visible space.', requiredCandidateKinds: ['product', 'accessory'], confidence: 0.9 } },
  { test: /főzz|recept|vacsora|ebéd/i, need: { kind: 'cook', domain: 'food', description: 'Find a recipe and missing ingredients.', requiredCandidateKinds: ['ingredient'], confidence: 0.9 } },
  { test: /szett|outfit|felvegy|öltözz/i, need: { kind: 'style', domain: 'wardrobe', description: 'Complete or style an outfit.', requiredCandidateKinds: ['accessory', 'product'], confidence: 0.9 } },
  { test: /javít|alkatrész|csavar/i, need: { kind: 'repair', domain: 'object', description: 'Identify what is needed to repair the object.', requiredCandidateKinds: ['replacement_part', 'service'], confidence: 0.85 } },
];

export function inferNeed(context: IntentNeedContext): Need {
  const matched = RULES.find(rule => rule.test.test(context.userText ?? ''));
  if (matched) return { ...matched.need, domain: context.domain === 'general' || context.domain === 'unknown' ? matched.need.domain : context.domain };
  return { kind: 'learn', domain: context.domain, description: 'Analyze the visible context before proposing an action.', requiredCandidateKinds: ['activity'], confidence: 0.55 };
}
