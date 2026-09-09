import type { ActionExecutionObservability } from './executionObservability';
import { ExecutionObservabilityCollector } from './executionObservabilityCollector';
import { createExecutionObservabilityDashboard, type ExecutionObservabilityDashboard } from './executionObservabilityDashboard';
import type { ActionExecutionSnapshot } from './actionExecutionLifecycle';
import type { ActionExecutionMetrics } from './actionExecutionMetrics';

export class ExecutionObservabilityService {
  constructor(private readonly collector: ExecutionObservabilityCollector) {}

  record(snapshot: ActionExecutionSnapshot, metrics: ActionExecutionMetrics, recordedAt?: string): ActionExecutionObservability {
    return this.collector.record(snapshot, metrics, recordedAt);
  }

  dashboard(recentLimit = 10): ExecutionObservabilityDashboard {
    return createExecutionObservabilityDashboard(this.collector.getAll(), recentLimit);
  }
}
