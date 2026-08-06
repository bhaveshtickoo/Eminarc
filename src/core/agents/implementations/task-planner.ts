/**
 * Task Planner Agent
 * Eminarc Growth OS Core
 */

import { GrowthAgent, AgentExecuteParams } from "../base";
import { MemoryType } from "../../memory/types";
import { LLMResponse } from "../../ai/providers/base";
import { aiMemoryManager } from "../../memory/memory-manager";
import { getLLMProvider } from "@/services/ai/provider";

export class TaskPlannerAgent implements GrowthAgent {
  id = "task-planner";
  name = "Task Planner Agent";
  description =
    "Generates autonomous daily execution task lists and milestone priorities for Growth OS.";
  capabilities = [
    "Autonomous Task Breakdown",
    "Sprint Priority Scoring",
    "Growth Experiment Action Planning",
    "Resource Allocation Tracking",
  ];
  requiredTools = ["task_tool", "crm_tool"];
  requiredMemory: MemoryType[] = ["workspace", "campaign"];

  async execute(params: AgentExecuteParams): Promise<LLMResponse<any>> {
    const memoryContext = await aiMemoryManager.loadFullMemoryContext(
      params.workspaceId,
      params.campaignId ? { campaignId: params.campaignId } : undefined,
    );

    const systemPrompt = `${memoryContext.formattedSystemContext}\n\nYou are the Task Planner Agent for Eminarc Growth OS. Tools available: ${this.requiredTools.join(", ")}.`;

    const provider = getLLMProvider();
    const res = await provider.completeJSON(params.prompt, systemPrompt);

    return {
      content: JSON.stringify(res),
      data: res,
      usage: { promptTokens: 110, completionTokens: 200, totalTokens: 310 },
      model: "openrouter/gpt-4o-mini",
      providerName: provider.name,
      latencyMs: 380,
    };
  }
}
