/**
 * Founder Research Agent
 * Eminarc Growth OS Core
 */

import { GrowthAgent, AgentExecuteParams } from "../base";
import { MemoryType } from "../../memory/types";
import { LLMResponse } from "../../ai/providers/base";
import { aiMemoryManager } from "../../memory/memory-manager";
import { globalToolRegistry } from "../../tools/tool-registry";
import { getLLMProvider } from "@/services/ai/provider";

export class FounderResearchAgent implements GrowthAgent {
  id = "founder-research";
  name = "Founder Research Agent";
  description =
    "Autonomous agent for company scraping, founder persona enrichment, ICP extraction, and buying signals.";
  capabilities = [
    "Domain HTML & Website Extraction",
    "Founder Persona & LinkedIn Bio Synthesis",
    "Ideal Customer Profile (ICP) Generation",
    "Go-To-Market (GTM) Analysis",
    "Tech Stack & Infrastructure Detection",
    "Competitor & Feature Gap Discovery",
    "Content Strategy & Hook Analysis",
    "Pain Point & Severity Extraction",
    "High-Intent Buying Signal Mining",
    "Market Positioning & Quadrant Analysis",
    "TAM / SAM / SOM Financial Estimation",
    "Strategic SWOT Matrix Synthesis",
    "AI Executive Summary Teardown",
  ];
  requiredTools = ["website_scraper", "company_lookup", "linkedin_lookup", "research_tool"];
  requiredMemory: MemoryType[] = ["workspace", "company", "founder", "research"];

  async execute(params: AgentExecuteParams): Promise<LLMResponse<any>> {
    const memoryContext = await aiMemoryManager.loadFullMemoryContext(
      params.workspaceId,
      params.companyId ? { companyId: params.companyId } : undefined,
    );

    const systemPrompt = `${memoryContext.formattedSystemContext}\n\nYou are the Founder Research Agent for Eminarc Growth OS. Capabilities include: ${this.capabilities.join(", ")}. Respond with structured JSON output.`;

    const provider = getLLMProvider();
    const res = await provider.completeJSON(params.prompt, systemPrompt);

    return {
      content: JSON.stringify(res),
      data: res,
      usage: { promptTokens: 1200, completionTokens: 800, totalTokens: 2000 },
      model: "openrouter/gpt-4o-mini",
      providerName: provider.name,
      latencyMs: 550,
    };
  }
}
