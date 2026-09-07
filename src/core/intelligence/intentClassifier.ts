import type { IntentDomain, NeedKind } from './intentNeed';

export type IntentClassification = { domain: IntentDomain; needKind: NeedKind; confidence: number; matchedSignals: string[] };
const SIGNALS: Array<{ pattern: RegExp; domain: IntentDomain; needKind: NeedKind; weight: number }> = [
  { pattern: /rendez|átalakít|modernebb|berendez|bútor/i, domain: 'room', needKind: 'redesign', weight: 0.9 },
  { pattern: /fürdő|mosdó|zuhany|kád|wc/i, domain: 'room', needKind: 'redesign', weight: 0.7 },
  { pattern: /konyha|hűtő|hűtőszekrény|hozzávaló|főzz|recept/i, domain: 'food', needKind: 'cook', weight: 0.9 },
  { pattern: /ruha|szett|outfit|öltözz|ing|nadrág|cipő|öv/i, domain: 'wardrobe', needKind: 'style', weight: 0.9 },
  { pattern: /javít|hibás|alkatrész|csavar|szerel/i, domain: 'object', needKind: 'repair', weight: 0.85 },
  { pattern: /vegy|vásárol|kell még|hiányzik|keress/i, domain: 'general', needKind: 'buy', weight: 0.65 },
];

export function classifyIntent(userText = '', sceneSignals: string[] = []): IntentClassification {
  const text = [userText, ...sceneSignals].join(' ');
  const matches = SIGNALS.filter(signal => signal.pattern.test(text));
  if (!matches.length) return { domain: 'general', needKind: 'learn', confidence: 0.45, matchedSignals: [] };
  const best = [...matches].sort((a, b) => b.weight - a.weight)[0];
  return { domain: best.domain, needKind: best.needKind, confidence: best.weight, matchedSignals: matches.map(m => m.pattern.source) };
}
