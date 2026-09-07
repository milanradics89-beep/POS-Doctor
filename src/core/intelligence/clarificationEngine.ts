import type { IntentClassification } from './intentClassifier';
import type { IntentDomain, NeedKind } from './intentNeed';

export type ClarificationQuestion = {
  id: string;
  text: string;
  options: string[];
  reason: 'low_confidence' | 'missing_constraint' | 'missing_preference';
};

export type ClarificationContext = {
  intent: IntentClassification;
  domain: IntentDomain;
  needKind: NeedKind;
  budgetHuf?: number;
  sceneSignals: string[];
};

export function buildClarificationQuestions(context: ClarificationContext): ClarificationQuestion[] {
  const questions: ClarificationQuestion[] = [];
  if (context.intent.confidence < 0.6) {
    questions.push({ id: 'intent', text: 'Mit szeretnél elérni ezzel a képpel?', options: ['Áttervezni / átrendezni', 'Vásárlási ötleteket keresni', 'Elemezni / megérteni', 'Javítani / megoldani'], reason: 'low_confidence' });
  }
  if ((context.needKind === 'redesign' || context.domain === 'room') && context.sceneSignals.length > 0) {
    questions.push({ id: 'preserve-items', text: 'A meglévő dolgokat szeretnéd megtartani, vagy újakat is keressek?', options: ['Tartsuk meg, ami van', 'Újakat is keress', 'Vegyesen'], reason: 'missing_preference' });
  }
  if ((context.needKind === 'redesign' || context.needKind === 'style' || context.needKind === 'buy') && context.budgetHuf === undefined) {
    questions.push({ id: 'budget', text: 'Van keret, amihez tartsam magam?', options: ['Igen, megadom', 'Legyen ár-érték alapján', 'A legjobb opciókat keresd'], reason: 'missing_constraint' });
  }
  return questions.slice(0, 3);
}
