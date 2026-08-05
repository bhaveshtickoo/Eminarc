/**
 * Report Generator Agent
 * Eminarc Growth OS Core
 */

import { GrowthAgent, AgentExecuteParams } from "../base";
import { MemoryType } from "../../memory/types";
import { LLMResponse } from "../../providers/base";
import { aiMemoryManager } from "../../memory/memory-manager";
import { getLLMProvider } from "@/services/ai/provider";

export class ReportGeneratorAgent implements GrowthAgent {
  id = "report-generator";
  name = "Report Generator Agent";
  description = "Synthesizes cross-system growth teardowns, ROI metrics, and board reports.";
  capabilities = [
    "Executive Board Report Generation",
    "Growth Funnel Performance Synthesis",
    "ROI & Conversion Teardowns",
    "Cross-Channel Intelligence Aggregation",
  ];
  requiredTools = ["research_tool", "crm_tool", "visibility_tool"];
  requiredMemory: MemoryType[] = ["workspace", "research"];

  async execute(params: AgentExecuteParams): Promise<LLMResponse<any>> {
    const memoryContext = await aiMemoryManager.loadFullMemoryContext(params.workspaceId, {
      companyId: params.companyId,
    });

    const systemPrompt = `${memoryContext.formattedSystemContext}\n\nYou are the Report Generator Agent for Eminarc Growth OS. Tools available: ${this.requiredTools.join(", ")}.`;

    const provider = getLLMProvider();
    const res = await provider.completeJSON(params.prompt, systemPrompt);

    return {
      content: JSON.stringify(res),
      data: res,
      usage: { promptTokens: 150, completionTokens: 300, totalTokens: 450 },
      model: "openrouter/gpt-4o-mini",
      providerName: provider.name,
      latencyMs: 530,
    };
  }
}
