export type AnalysisTelemetry = {
  sessionId: string;
  startedAt: string;
  completedAt?: string;
  outcome?: 'ready' | 'retake' | 'clarify' | 'error';
  latencyMs?: number;
};

export function startTelemetry(sessionId: string): AnalysisTelemetry {
  return { sessionId, startedAt: new Date().toISOString() };
}

export function finishTelemetry(t: AnalysisTelemetry, outcome: NonNullable<AnalysisTelemetry['outcome']>): AnalysisTelemetry {
  const completedAt = new Date().toISOString();
  return { ...t, completedAt, outcome, latencyMs: Math.max(0, Date.parse(completedAt) - Date.parse(t.startedAt)) };
}
