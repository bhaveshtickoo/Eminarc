/**
 * AI Visibility Analyst Agent
 * Eminarc Growth OS Core
 */

import { GrowthAgent, AgentExecuteParams } from "../base";
import { MemoryType } from "../../memory/types";
import { LLMResponse } from "../../providers/base";
import { aiMemoryManager } from "../../memory/memory-manager";
import { getLLMProvider } from "@/services/ai/provider";

export class VisibilityAnalystAgent implements GrowthAgent {
  id = "visibility-analyst";
  name = "Visibility Analyst Agent";
  description = "Audits Generative Engine Optimization (GEO) citations across ChatGPT, Perplexity, Claude, & Gemini.";
  capabilities = [
    "Generative Engine Citation Audit",
    "Share of Model (SoM) Analytics",
    "Prompt Penetration Testing",
    "Citation Opportunity Teardowns",
  ];
  requiredTools = ["visibility_tool", "website_scraper"];
  requiredMemory: MemoryType[] = ["workspace", "company", "research"];

  async execute(params: AgentExecuteParams): Promise<LLMResponse<any>> {
    const memoryContext = await aiMemoryManager.loadFullMemoryContext(params.workspaceId, {
      companyId: params.companyId,
    });

    const systemPrompt = `${memoryContext.formattedSystemContext}\n\nYou are the Visibility Analyst Agent for Eminarc Growth OS. Tools available: ${this.requiredTools.join(", ")}.`;

    const provider = getLLMProvider();
    const res = await provider.completeJSON(params.prompt, systemPrompt);

    return {
      content: JSON.stringify(res),
      data: res,
      usage: { promptTokens: 130, completionTokens: 220, totalTokens: 350 },
      model: "openrouter/gpt-4o-mini",
      providerName: provider.name,
      latencyMs: 440,
    };
  }
}
