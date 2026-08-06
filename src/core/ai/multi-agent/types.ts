/**
 * Multi-Agent Orchestration Layer Contracts & Types
 * Eminarc Growth OS Core AI
 */

export type AgentStepStatus =
  "queued" | "running" | "handoff" | "completed" | "failed" | "cancelled";

export type AgentEventType =
  "progress" | "streaming" | "handoff" | "error" | "completion" | "telemetry";

export interface AgentStepSpec {
  stepId: string;
  stepName: string;
  agentId: string;
  description: string;
  requiredTools?: string[];
  dependsOnStepId?: string;
  timeoutMs?: number;
  maxRetries?: number;
}

export interface AgentHandoffSpec {
  fromAgentId: string;
  toAgentId: string;
  handoffPayload: any;
  reasoning: string;
  timestamp: string;
}

export interface AgentEvent {
  type: AgentEventType;
  stepId: string;
  agentId: string;
  progressPercent?: number;
  message?: string;
  chunk?: string;
  handoff?: AgentHandoffSpec;
  data?: any;
  error?: string;
  timestamp: string;
}

export interface AgentTelemetryRecord {
  stepId: string;
  agentId: string;
  providerName: string;
  model: string;
  latencyMs: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCostUsd: number;
  success: boolean;
  errorReason?: string;
  timestamp: string;
}

export interface GrowthPipelineResult {
  runId: string;
  workspaceId: string;
  status: AgentStepStatus;
  totalLatencyMs: number;
  totalTokens: number;
  totalCostUsd: number;
  stepResults: Record<string, { agentId: string; data: any; telemetry: AgentTelemetryRecord }>;
  handoffHistory: AgentHandoffSpec[];
  telemetrySummary: {
    totalSteps: number;
    completedSteps: number;
    failedSteps: number;
    successRate: number;
  };
  completedAt: string;
}
