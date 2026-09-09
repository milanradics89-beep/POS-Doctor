import type { ActionExecutionSnapshot } from './actionExecutionLifecycle';
import type { ActionExecutionMetrics } from './actionExecutionMetrics';
import { createExecutionObservability, type ActionExecutionObservability } from './executionObservability';

export class ExecutionObservabilityCollector {
  private readonly records: ActionExecutionObservability[] = [];

  record(
    snapshot: ActionExecutionSnapshot,
    metrics: ActionExecutionMetrics,
    recordedAt?: string,
  ): ActionExecutionObservability {
    const record = createExecutionObservability({
      executionId: snapshot.idempotencyKey,
      actionType: snapshot.actionType,
      metrics,
      recordedAt,
    });
    this.records.push(record);
    return record;
  }

  getAll(): ActionExecutionObservability[] {
    return this.records.map((record) => ({ ...record }));
  }

  getByExecutionId(executionId: string): ActionExecutionObservability | undefined {
    const id = executionId.trim();
    const record = this.records.find((item) => item.executionId === id);
    return record ? { ...record } : undefined;
  }
}
