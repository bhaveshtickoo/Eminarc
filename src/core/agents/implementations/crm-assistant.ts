/**
 * CRM Assistant Agent
 * Eminarc Growth OS Core
 */

import { GrowthAgent, AgentExecuteParams } from "../base";
import { MemoryType } from "../../memory/types";
import { LLMResponse } from "../../providers/base";
import { aiMemoryManager } from "../../memory/memory-manager";
import { getLLMProvider } from "@/services/ai/provider";

export class CRMAssistantAgent implements GrowthAgent {
  id = "crm-assistant";
  name = "CRM Assistant Agent";
  description = "Qualifies inbound leads, calculates deal potential scores, and manages CRM pipelines.";
  capabilities = [
    "Lead Quality Scoring & Enrichment",
    "Pipeline Stage Recommendations",
    "Automated Follow-up Drafts",
    "Outreach Response Classification",
  ];
  requiredTools = ["crm_tool", "company_lookup"];
  requiredMemory: MemoryType[] = ["workspace", "company", "campaign"];

  async execute(params: AgentExecuteParams): Promise<LLMResponse<any>> {
    const memoryContext = await aiMemoryManager.loadFullMemoryContext(params.workspaceId, {
      companyId: params.companyId,
      campaignId: params.campaignId,
    });

    const systemPrompt = `${memoryContext.formattedSystemContext}\n\nYou are the CRM Assistant Agent for Eminarc Growth OS. Tools available: ${this.requiredTools.join(", ")}.`;

    const provider = getLLMProvider();
    const res = await provider.completeJSON(params.prompt, systemPrompt);

    return {
      content: JSON.stringify(res),
      data: res,
      usage: { promptTokens: 110, completionTokens: 210, totalTokens: 320 },
      model: "openrouter/gpt-4o-mini",
      providerName: provider.name,
      latencyMs: 390,
    };
  }
}
