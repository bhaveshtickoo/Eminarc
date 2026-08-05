/**
 * GrowthAgent Interface & Execution Contracts
 * Eminarc Growth OS Core
 */

import { MemoryType } from "../memory/types";
import { LLMResponse } from "../providers/base";

export interface AgentExecuteParams {
  workspaceId: string;
  prompt: string;
  companyId?: string;
  sessionId?: string;
  campaignId?: string;
  providerName?: string;
  params?: Record<string, any>;
}

export interface GrowthAgent<TOutput = any> {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  requiredTools: string[];
  requiredMemory: MemoryType[];
  execute(params: AgentExecuteParams): Promise<LLMResponse<TOutput>>;
}
