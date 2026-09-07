export type UserFeedback = { opportunityId: string; action: 'opened' | 'saved' | 'dismissed' | 'completed'; timestamp: string };

export function createFeedback(opportunityId: string, action: UserFeedback['action']): UserFeedback {
  return { opportunityId, action, timestamp: new Date().toISOString() };
}

export function feedbackSignal(feedback: UserFeedback[]): Record<string, number> {
  const weights = { opened: 0.2, saved: 0.7, completed: 1, dismissed: -0.5 } as const;
  return feedback.reduce<Record<string, number>>((scores, item) => {
    scores[item.opportunityId] = (scores[item.opportunityId] ?? 0) + weights[item.action];
    return scores;
  }, {});
}
