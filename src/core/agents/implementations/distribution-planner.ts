/**
 * Distribution Planner Agent
 * Eminarc Growth OS Core
 */

import { GrowthAgent, AgentExecuteParams } from "../base";
import { MemoryType } from "../../memory/types";
import { LLMResponse } from "../../providers/base";
import { aiMemoryManager } from "../../memory/memory-manager";
import { getLLMProvider } from "@/services/ai/provider";

export class DistributionPlannerAgent implements GrowthAgent {
  id = "distribution-planner";
  name = "Distribution Planner Agent";
  description = "Plans outreach sequences, campaign dispatching, and multi-channel post distribution.";
  capabilities = [
    "Outreach Sequence Scheduling",
    "Omnichannel Post Dispatch",
    "Audience Timing Optimization",
    "Community Content Seeding",
  ];
  requiredTools = ["distribution_tool", "content_tool"];
  requiredMemory: MemoryType[] = ["workspace", "campaign"];

  async execute(params: AgentExecuteParams): Promise<LLMResponse<any>> {
    const memoryContext = await aiMemoryManager.loadFullMemoryContext(params.workspaceId, {
      campaignId: params.campaignId,
    });

    const systemPrompt = `${memoryContext.formattedSystemContext}\n\nYou are the Distribution Planner Agent for Eminarc Growth OS. Tools available: ${this.requiredTools.join(", ")}.`;

    const provider = getLLMProvider();
    const res = await provider.completeJSON(params.prompt, systemPrompt);

    return {
      content: JSON.stringify(res),
      data: res,
      usage: { promptTokens: 100, completionTokens: 190, totalTokens: 290 },
      model: "openrouter/gpt-4o-mini",
      providerName: provider.name,
      latencyMs: 370,
    };
  }
}
