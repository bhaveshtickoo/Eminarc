/**
 * Central AI Orchestrator Engine
 * Eminarc Growth OS AI Core
 * Provider-agnostic, multi-agent orchestration, retry handling, rate limiting & usage telemetry.
 */

import { LLMProvider, LLMRequestOptions, LLMResponse } from "./providers/base";
import { OpenAIProvider } from "./providers/openai";
import { OpenRouterProvider } from "./providers/openrouter";
import { AnthropicProvider } from "./providers/anthropic";
import { GeminiProvider } from "./providers/gemini";
import { LocalLLMProvider } from "./providers/local";
import { AgentRegistry, globalAgentRegistry } from "../agents/agent-registry";
import { AgentExecuteParams, GrowthAgent } from "../agents/base";
import { RetryHandler, globalRetryHandler } from "./utils/retry-handler";
import { UsageTracker, globalUsageTracker } from "./utils/usage-tracker";

import {
  globalWorkflowOrchestrator,
  WorkflowOrchestrator,
} from "./multi-agent/workflow-orchestrator";
import {
  globalGrowthPipeline,
  AutonomousGrowthPipeline,
  PipelineParams,
} from "./multi-agent/growth-pipeline";
import { EventListener } from "./multi-agent/workflow-orchestrator";
import { GrowthPipelineResult } from "./multi-agent/types";

export interface ExecutionParams extends LLMRequestOptions {
  prompt: string;
  providerName?: string;
  executionId?: string;
  agentId?: string;
}

export class AIOrchestrator {
  private providers = new Map<string, LLMProvider>();
  private defaultProviderName = "OpenRouter";
  private agentRegistry: AgentRegistry;
  private retryHandler: RetryHandler;
  private usageTracker: UsageTracker;
  private workflowOrchestrator: WorkflowOrchestrator;
  private growthPipeline: AutonomousGrowthPipeline;

  constructor(
    agentRegistry = globalAgentRegistry,
    retryHandler = globalRetryHandler,
    usageTracker = globalUsageTracker,
    workflowOrchestrator = globalWorkflowOrchestrator,
    growthPipeline = globalGrowthPipeline,
  ) {
    this.agentRegistry = agentRegistry;
    this.retryHandler = retryHandler;
    this.usageTracker = usageTracker;
    this.workflowOrchestrator = workflowOrchestrator;
    this.growthPipeline = growthPipeline;

    // Register built-in providers out of the box
    this.registerProvider(new OpenRouterProvider());
    this.registerProvider(new OpenAIProvider());
    this.registerProvider(new AnthropicProvider());
    this.registerProvider(new GeminiProvider());
    this.registerProvider(new LocalLLMProvider());
  }

  /**
   * 1. Register a new LLM provider adapter
   */
  registerProvider(provider: LLMProvider): void {
    this.providers.set(provider.name, provider);
  }

  /**
   * 2. Dynamically switch active default LLM provider
   */
  switchProvider(providerName: string): void {
    if (!this.providers.has(providerName)) {
      throw new Error(`Provider "${providerName}" is not registered.`);
    }
    this.defaultProviderName = providerName;
  }

  /**
   * 3. Register a specialized autonomous AI agent
   */
  registerAgent(agent: GrowthAgent): void {
    this.agentRegistry.register(agent);
  }

  /**
   * Dynamically load and execute an autonomous agent by ID from AgentRegistry
   */
  async executeAgent(agentId: string, params: AgentExecuteParams): Promise<LLMResponse<any>> {
    const agent = this.agentRegistry.get(agentId);
    if (!agent) {
      throw new Error(`Agent "${agentId}" is not registered in AgentRegistry.`);
    }

    return await agent.execute(params);
  }

  /**
   * Execute complete 8-step Autonomous Growth Collaboration Workflow Pipeline
   */
  async runGrowthPipeline(params: PipelineParams): Promise<GrowthPipelineResult> {
    return this.growthPipeline.runPipeline(params);
  }

  /**
   * Subscribe to live workflow progress & streaming events
   */
  subscribeWorkflow(listener: EventListener): () => void {
    return this.workflowOrchestrator.subscribe(listener);
  }

  /**
   * Cancel workflow step by ID
   */
  cancelWorkflow(stepId?: string): void {
    if (stepId) {
      this.workflowOrchestrator.cancelStep(stepId);
    } else {
      this.workflowOrchestrator.cancelAll();
    }
  }

  /**
   * Get recorded handoff log
   */
  getHandoffLog() {
    return this.workflowOrchestrator.getHandoffLog();
  }

  /**
   * 4. Main Execution Engine method
   */
  async execute<T = any>(params: ExecutionParams): Promise<LLMResponse<T>> {
    const executionId =
      params.executionId || `exec-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const providerName = params.providerName || this.defaultProviderName;
    const provider = this.providers.get(providerName);

    if (!provider) {
      throw new Error(`Target provider "${providerName}" is not registered in AIOrchestrator.`);
    }

    const controller = this.retryHandler.createController(executionId);

    try {
      const response = await this.retryHandler.retry<LLMResponse<T>>(
        (signal) =>
          provider.complete<T>(params.prompt, { ...params, signal: signal || controller.signal }),
        3,
        500,
        controller.signal,
      );

      this.trackUsage({
        providerName: response.providerName,
        model: response.model,
        promptTokens: response.usage.promptTokens,
        completionTokens: response.usage.completionTokens,
        totalTokens: response.usage.totalTokens,
        estimatedCostUsd: response.usage.estimatedCostUsd || 0,
        latencyMs: response.latencyMs,
      });

      return response;
    } finally {
      this.retryHandler.cleanup(executionId);
    }
  }

  /**
   * 5. Streaming Execution Engine method
   */
  async executeStreaming(
    params: ExecutionParams,
    onChunk: (chunk: string) => void,
  ): Promise<LLMResponse<string>> {
    const executionId =
      params.executionId || `stream-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const providerName = params.providerName || this.defaultProviderName;
    const provider = this.providers.get(providerName);

    if (!provider) {
      throw new Error(`Target provider "${providerName}" is not registered.`);
    }

    if (!provider.supportsStreaming || !provider.completeStream) {
      // Fall back to non-streaming execution
      const fullRes = await this.execute<string>(params);
      onChunk(fullRes.content);
      return fullRes;
    }

    const controller = this.retryHandler.createController(executionId);

    try {
      const response = await this.retryHandler.retry<LLMResponse<string>>(
        (signal) =>
          provider.completeStream!(params.prompt, onChunk, {
            ...params,
            signal: signal || controller.signal,
          }),
        3,
        500,
        controller.signal,
      );

      this.trackUsage({
        providerName: response.providerName,
        model: response.model,
        promptTokens: response.usage.promptTokens,
        completionTokens: response.usage.completionTokens,
        totalTokens: response.usage.totalTokens,
        estimatedCostUsd: response.usage.estimatedCostUsd || 0,
        latencyMs: response.latencyMs,
      });

      return response;
    } finally {
      this.retryHandler.cleanup(executionId);
    }
  }

  /**
   * 6. Retry helper with exponential backoff
   */
  async retry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
    return this.retryHandler.retry((_) => fn(), maxRetries);
  }

  /**
   * 7. Cancel active execution by execution ID
   */
  cancel(executionId: string): boolean {
    return this.retryHandler.cancel(executionId);
  }

  /**
   * 8. Track usage telemetry & token consumption
   */
  trackUsage(usage: {
    providerName: string;
    model: string;
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    estimatedCostUsd: number;
    latencyMs: number;
  }): void {
    this.usageTracker.track(usage);
  }

  /**
   * Get registered providers list
   */
  getProviders(): string[] {
    return Array.from(this.providers.keys());
  }

  /**
   * Get usage telemetry summary
   */
  getUsageSummary() {
    return this.usageTracker.getSummary();
  }
}

// Export default singleton instance
export const aiOrchestrator = new AIOrchestrator();
