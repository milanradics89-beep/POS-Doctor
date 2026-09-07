import type { IntentClassification } from './intentClassifier';
import type { NeedKind, IntentDomain } from './intentNeed';
import { buildClarificationQuestions, type ClarificationQuestion } from './clarificationEngine';

export type ConversationConstraints = {
  budgetHuf?: number;
  preserveItems?: 'keep' | 'new' | 'mixed';
  preferredStyles?: string[];
  preferredColors?: string[];
  [key: string]: unknown;
};

export type IntelligenceState = {
  sessionId: string;
  domain: IntentDomain;
  needKind: NeedKind;
  intent: IntentClassification;
  constraints: ConversationConstraints;
  answeredQuestionIds: string[];
};

export type ClarificationResult = {
  state: IntelligenceState;
  questions: ClarificationQuestion[];
  complete: boolean;
};

export function applyClarification(state: IntelligenceState, answers: Record<string, unknown>): ClarificationResult {
  const constraints: ConversationConstraints = { ...state.constraints };
  if (typeof answers.budgetHuf === 'number') constraints.budgetHuf = answers.budgetHuf;
  if (answers['preserve-items'] === 'Tartsuk meg, ami van') constraints.preserveItems = 'keep';
  if (answers['preserve-items'] === 'Újakat is keress') constraints.preserveItems = 'new';
  if (answers['preserve-items'] === 'Vegyesen') constraints.preserveItems = 'mixed';

  const answeredQuestionIds = [...new Set([...state.answeredQuestionIds, ...Object.keys(answers)])];
  const questions = buildClarificationQuestions({ intent: state.intent, domain: state.domain, needKind: state.needKind, budgetHuf: constraints.budgetHuf, sceneSignals: [] })
    .filter(question => !answeredQuestionIds.includes(question.id));

  return { state: { ...state, constraints, answeredQuestionIds }, questions, complete: questions.length === 0 };
}
