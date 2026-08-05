/**
 * Base Agent Interface & Execution Context
 * Eminarc Growth OS AI Core
 */

import { LLMResponse } from "../providers/base";

export interface AgentContext {
  workspaceId: string;
  userId?: string;
  sessionId?: string;
  metadata?: Record<string, any>;
}

export interface AgentTask<T = any> {
  id: string;
  agentId: string;
  prompt: string;
  context: AgentContext;
  params?: Record<string, any>;
}

export interface BaseAgent<TOutput = any> {
  id: string;
  name: string;
  role: string;
  description: string;
  run(task: AgentTask): Promise<LLMResponse<TOutput>>;
}
