/**
 * Multi-Agent Workflow Orchestrator Core
 * Eminarc Growth OS Core AI
 * Manages task queue, sequential & parallel execution, agent handoffs, retries, timeouts, and event streaming.
 */

import {
  AgentStepSpec,
  AgentStepStatus,
  AgentHandoffSpec,
  AgentEvent,
  AgentTelemetryRecord,
} from "./types";

export type EventListener = (event: AgentEvent) => void;

export class WorkflowOrchestrator {
  private eventListeners: Set<EventListener> = new Set();
  private activeControllers = new Map<string, AbortController>();
  private handoffLog: AgentHandoffSpec[] = [];

  /**
   * Subscribe to real-time agent workflow events (progress, streaming, handoff, error, completion)
   */
  subscribe(listener: EventListener): () => void {
    this.eventListeners.add(listener);
    return () => this.eventListeners.delete(listener);
  }

  /**
   * Emit event to all registered UI & system listeners
   */
  emit(event: AgentEvent): void {
    for (const listener of this.eventListeners) {
      try {
        listener(event);
      } catch (err) {
        console.warn("[WorkflowOrchestrator] Listener error:", err);
      }
    }
  }

  /**
   * Register agent handoff in history log and broadcast handoff event
   */
  recordHandoff(
    fromAgentId: string,
    toAgentId: string,
    handoffPayload: any,
    reasoning: string,
  ): AgentHandoffSpec {
    const handoff: AgentHandoffSpec = {
      fromAgentId,
      toAgentId,
      handoffPayload,
      reasoning,
      timestamp: new Date().toISOString(),
    };

    this.handoffLog.push(handoff);
    this.emit({
      type: "handoff",
      stepId: `handoff-${fromAgentId}-${toAgentId}`,
      agentId: toAgentId,
      message: `Handoff from ${fromAgentId} to ${toAgentId}: ${reasoning}`,
      handoff,
      timestamp: handoff.timestamp,
    });

    return handoff;
  }

  /**
   * Execute a single step with timeout, retries, and cancellation support
   */
  async executeStep<T>(
    step: AgentStepSpec,
    taskFn: (signal: AbortSignal) => Promise<T>,
  ): Promise<{ data: T; latencyMs: number }> {
    const controller = new AbortController();
    this.activeControllers.set(step.stepId, controller);
    const startTime = Date.now();

    const maxRetries = step.maxRetries ?? 3;
    const timeoutMs = step.timeoutMs ?? 60000; // 60 sec default timeout

    this.emit({
      type: "progress",
      stepId: step.stepId,
      agentId: step.agentId,
      progressPercent: 10,
      message: `Executing step "${step.stepName}" via agent "${step.agentId}"...`,
      timestamp: new Date().toISOString(),
    });

    let attempt = 0;
    let lastError: Error | null = null;

    while (attempt <= maxRetries) {
      if (controller.signal.aborted) {
        this.emit({
          type: "error",
          stepId: step.stepId,
          agentId: step.agentId,
          error: "Step execution cancelled by user.",
          timestamp: new Date().toISOString(),
        });
        throw new Error(`Step "${step.stepId}" cancelled.`);
      }

      attempt++;
      try {
        // Execute task wrapped with timeout timer
        const timeoutPromise = new Promise<never>((_, reject) => {
          const timer = setTimeout(() => {
            reject(new Error(`Step "${step.stepName}" timed out after ${timeoutMs}ms.`));
          }, timeoutMs);
          controller.signal.addEventListener("abort", () => clearTimeout(timer));
        });

        const data = await Promise.race([taskFn(controller.signal), timeoutPromise]);
        const latencyMs = Date.now() - startTime;

        this.emit({
          type: "completion",
          stepId: step.stepId,
          agentId: step.agentId,
          progressPercent: 100,
          message: `Step "${step.stepName}" completed successfully in ${latencyMs}ms.`,
          data,
          timestamp: new Date().toISOString(),
        });

        this.activeControllers.delete(step.stepId);
        return { data, latencyMs };
      } catch (err) {
        lastError = err as Error;
        console.warn(
          `[WorkflowOrchestrator] Step "${step.stepId}" attempt ${attempt} failed:`,
          err,
        );

        if (attempt <= maxRetries && !controller.signal.aborted) {
          const backoffMs = Math.pow(2, attempt) * 300;
          this.emit({
            type: "progress",
            stepId: step.stepId,
            agentId: step.agentId,
            message: `Retrying step "${step.stepName}" (Attempt ${attempt + 1}/${maxRetries + 1}) after ${backoffMs}ms...`,
            timestamp: new Date().toISOString(),
          });
          await new Promise((r) => setTimeout(r, backoffMs));
        }
      }
    }

    this.activeControllers.delete(step.stepId);
    const failureMsg =
      lastError?.message || `Step "${step.stepName}" failed after ${maxRetries} retries.`;

    this.emit({
      type: "error",
      stepId: step.stepId,
      agentId: step.agentId,
      error: failureMsg,
      timestamp: new Date().toISOString(),
    });

    throw new Error(failureMsg);
  }

  /**
   * Execute steps sequentially in order
   */
  async executeSequential<T>(
    steps: Array<{
      spec: AgentStepSpec;
      taskFn: (prevResult: any, signal: AbortSignal) => Promise<any>;
    }>,
  ): Promise<Record<string, { data: any; latencyMs: number }>> {
    const results: Record<string, { data: any; latencyMs: number }> = {};
    let prevResult: any = null;

    for (const item of steps) {
      const res = await this.executeStep(item.spec, (signal) => item.taskFn(prevResult, signal));
      results[item.spec.stepId] = res;
      prevResult = res.data;
    }

    return results;
  }

  /**
   * Execute steps in parallel
   */
  async executeParallel(
    steps: Array<{ spec: AgentStepSpec; taskFn: (signal: AbortSignal) => Promise<any> }>,
  ): Promise<Record<string, { data: any; latencyMs: number }>> {
    const promises = steps.map(async (item) => {
      const res = await this.executeStep(item.spec, (signal) => item.taskFn(signal));
      return { stepId: item.spec.stepId, res };
    });

    const settled = await Promise.all(promises);
    const results: Record<string, { data: any; latencyMs: number }> = {};
    for (const item of settled) {
      results[item.stepId] = item.res;
    }

    return results;
  }

  /**
   * Cancel specific step execution
   */
  cancelStep(stepId: string): boolean {
    const controller = this.activeControllers.get(stepId);
    if (controller) {
      controller.abort();
      this.activeControllers.delete(stepId);
      return true;
    }
    return false;
  }

  /**
   * Cancel all running steps
   */
  cancelAll(): void {
    for (const [stepId, controller] of this.activeControllers.entries()) {
      controller.abort();
    }
    this.activeControllers.clear();
  }

  /**
   * Get recorded handoff log history
   */
  getHandoffLog(): AgentHandoffSpec[] {
    return [...this.handoffLog];
  }
}

export const globalWorkflowOrchestrator = new WorkflowOrchestrator();
