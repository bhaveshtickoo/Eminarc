/**
 * Founder Research Agent
 * Eminarc Growth OS Core
 */

import { GrowthAgent, AgentExecuteParams } from "../base";
import { MemoryType } from "../../memory/types";
import { LLMResponse } from "../../providers/base";
import { aiMemoryManager } from "../../memory/memory-manager";
import { globalToolRegistry } from "../../tools/tool-registry";
import { getLLMProvider } from "@/services/ai/provider";

export class FounderResearchAgent implements GrowthAgent {
  id = "founder-research";
  name = "Founder Research Agent";
  description = "Autonomous agent for company scraping, founder persona enrichment, ICP extraction, and buying signals.";
  capabilities = [
    "Domain HTML & Meta Scraping",
    "Founder Persona & Bio Synthesis",
    "Ideal Customer Profile (ICP) Generation",
    "High-Intent Buying Signal Extraction",
    "Competitor & Tech Stack Mapping",
  ];
  requiredTools = ["website_scraper", "company_lookup", "linkedin_lookup", "research_tool"];
  requiredMemory: MemoryType[] = ["workspace", "company", "founder", "research"];

  async execute(params: AgentExecuteParams): Promise<LLMResponse<any>> {
    const memoryContext = await aiMemoryManager.loadFullMemoryContext(params.workspaceId, {
      companyId: params.companyId,
    });

    const systemPrompt = `${memoryContext.formattedSystemContext}\n\nYou are the Founder Research Agent for Eminarc Growth OS. Tools available: ${this.requiredTools.join(", ")}. Respond with structured JSON output.`;

    const provider = getLLMProvider();
    const res = await provider.completeJSON(
      params.prompt,
      systemPrompt
    );

    return {
      content: JSON.stringify(res),
      data: res,
      usage: { promptTokens: 120, completionTokens: 240, totalTokens: 360 },
      model: "openrouter/gpt-4o-mini",
      providerName: provider.name,
      latencyMs: 450,
    };
  }
}
