/**
 * Campaign Engine Core Synthesizer
 * Eminarc Growth OS Core
 */

import { getLLMProvider } from "@/services/ai/provider";
import { aiMemoryManager } from "../memory/memory-manager";
import { CampaignService } from "./campaign-service";
import { CampaignSpec, CampaignType } from "./types";

export interface GenerateCampaignParams {
  workspaceId: string;
  type: CampaignType;
  goalPrompt?: string;
  operatingPlanId?: string;
  providerName?: string;
}

export class CampaignEngine {
  /**
   * Generates a multi-channel campaign with Goal, Audience, Messaging, Assets, Tasks, Timeline, KPIs, and Status.
   */
  async generateCampaign(params: GenerateCampaignParams): Promise<CampaignSpec> {
    const memoryContext = await aiMemoryManager.loadFullMemoryContext(params.workspaceId);

    const iso30 = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const iso14 = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    const prompt = `Synthesize a high-converting ${params.type} Growth Campaign.
TYPE: ${params.type}
USER GOAL: "${params.goalPrompt || `Scale ${params.type} acquisition pipeline`}"
WORKSPACE MEMORY: ${memoryContext.formattedSystemContext}

Return ONLY valid JSON matching this exact structure:
{
  "id": "cmp-${params.type.toLowerCase()}-${Date.now()}",
  "title": "${params.type} High-Leverage Growth Campaign",
  "type": "${params.type}",
  "goal": "Acquire 50 qualified target accounts in 30 days via ${params.type}",
  "audience": "Seed-to-Series B SaaS Founders, Chief Revenue Officers, and VP Sales",
  "messaging": "Stop burning 20 hours weekly on manual outreach. Deploy autonomous AI growth agents to scale pipeline.",
  "assets": [
    {
      "id": "ast-101",
      "title": "${params.type} Founder Positioning Teardown Asset",
      "type": "Carousel",
      "content": "Slide 1: Why B2B growth campaigns fail in 30 days.\nSlide 2: The architecture of an AI Growth OS.\nSlide 3: Case study breakdown.",
      "status": "Draft"
    }
  ],
  "tasks": [
    {
      "id": "tsk-c1",
      "title": "Publish ${params.type} campaign launch asset",
      "description": "Deploy content asset to target channel audience.",
      "owner": "Distribution Planner",
      "dueDate": "${iso14}",
      "status": "Pending"
    }
  ],
  "timeline": "30 Days (Completion: ${iso30})",
  "kpis": [
    {
      "metric": "Outbound Conversion Rate",
      "targetBenchmark": "4.8% CTR",
      "currentValue": "0%"
    },
    {
      "metric": "Pipeline Generated",
      "targetBenchmark": "$150,000 ARR",
      "currentValue": "$0"
    }
  ],
  "status": "draft"
}`;

    const systemPrompt = `You are the Principal Campaign Architect for Eminarc Growth OS. Output strictly valid JSON matching the schema for campaign type "${params.type}".`;

    const provider = getLLMProvider();

    let result: CampaignSpec;
    try {
      result = await provider.completeJSON<CampaignSpec>(prompt, systemPrompt);
    } catch (err) {
      console.warn(`[CampaignEngine.generateCampaign] LLM provider warning for type "${params.type}", using fallback synthesis:`, err);
      result = {
        id: `cmp-${params.type.toLowerCase()}-${Date.now()}`,
        title: `${params.type} High-Leverage Growth Campaign`,
        type: params.type,
        goal: `Acquire 50 qualified target accounts in 30 days via ${params.type}`,
        audience: "Seed-to-Series B SaaS Founders, Chief Revenue Officers, and VP Sales",
        messaging: "Stop burning 20 hours weekly on manual outreach. Deploy autonomous AI growth agents to scale pipeline.",
        assets: [
          {
            id: "ast-101",
            title: `${params.type} Founder Positioning Teardown Asset`,
            type: params.type === "Email" ? "Email Template" : params.type === "Website" ? "Landing Page" : "Carousel",
            content: "Slide 1: Why B2B growth campaigns fail in 30 days.\nSlide 2: The architecture of an AI Growth OS.\nSlide 3: Case study breakdown.",
            status: "Draft",
          },
        ],
        tasks: [
          {
            id: "tsk-c1",
            title: `Publish ${params.type} campaign launch asset`,
            description: "Deploy content asset to target channel audience.",
            owner: "Distribution Planner",
            dueDate: iso14,
            status: "Pending",
          },
        ],
        timeline: `30 Days (Completion: ${iso30})`,
        kpis: [
          {
            metric: "Outbound Conversion Rate",
            targetBenchmark: "4.8% CTR",
            currentValue: "0%",
          },
          {
            metric: "Pipeline Generated",
            targetBenchmark: "$150,000 ARR",
            currentValue: "$0",
          },
        ],
        status: "draft",
      };
    }

    // Persist campaign to Supabase database & sync tasks
    await CampaignService.saveCampaign(params.workspaceId, result, params.operatingPlanId);

    return result;
  }
}

export const campaignEngine = new CampaignEngine();
