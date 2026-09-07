export type AnalysisOutcome = 'ready' | 'retake' | 'clarify' | 'error';

export type AnalysisTelemetry = {
  sessionId: string;
  startedAt: string;
  completedAt?: string;
  outcome?: AnalysisOutcome;
  latencyMs?: number;
};

export function startTelemetry(sessionId: string): AnalysisTelemetry {
  return { sessionId, startedAt: new Date().toISOString() };
}

export function finishTelemetry(t: AnalysisTelemetry, outcome: AnalysisOutcome, completedAt = new Date().toISOString()): AnalysisTelemetry {
  const started = Date.parse(t.startedAt);
  const completed = Date.parse(completedAt);
  return { ...t, completedAt, outcome, latencyMs: Number.isFinite(started) && Number.isFinite(completed) ? Math.max(0, completed - started) : undefined };
}
