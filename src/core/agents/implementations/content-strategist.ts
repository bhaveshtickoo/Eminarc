/**
 * Content Strategist Agent
 * Eminarc Growth OS Core
 */

import { GrowthAgent, AgentExecuteParams } from "../base";
import { MemoryType } from "../../memory/types";
import { LLMResponse } from "../../providers/base";
import { aiMemoryManager } from "../../memory/memory-manager";
import { getLLMProvider } from "@/services/ai/provider";

export class ContentStrategistAgent implements GrowthAgent {
  id = "content-strategist";
  name = "Content Strategist Agent";
  description = "Generates brand-aligned content across LinkedIn, Medium, Newsletter, and X.";
  capabilities = [
    "1-Click Content Repurposing",
    "Founder Thought Leadership Drafts",
    "Generative Engine Optimization (GEO) Articles",
    "Multi-Channel Hook Generation",
  ];
  requiredTools = ["content_tool", "website_scraper"];
  requiredMemory: MemoryType[] = ["workspace", "company", "founder", "conversation"];

  async execute(params: AgentExecuteParams): Promise<LLMResponse<any>> {
    const memoryContext = await aiMemoryManager.loadFullMemoryContext(params.workspaceId, {
      sessionId: params.sessionId,
    });

    const systemPrompt = `${memoryContext.formattedSystemContext}\n\nYou are the Content Strategist Agent for Eminarc Growth OS. Tools available: ${this.requiredTools.join(", ")}.`;

    const provider = getLLMProvider();
    const res = await provider.completeJSON(params.prompt, systemPrompt);

    return {
      content: JSON.stringify(res),
      data: res,
      usage: { promptTokens: 140, completionTokens: 280, totalTokens: 420 },
      model: "openrouter/gpt-4o-mini",
      providerName: provider.name,
      latencyMs: 510,
    };
  }
}
