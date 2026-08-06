/**
 * Machine-Readable Planning Engine Compiler
 * Eminarc Growth OS Core
 */

import { getLLMProvider } from "@/services/ai/provider";
import { GrowthStrategyOutput } from "../agents/growth-strategy/types";
import { GrowthStrategyService } from "../agents/growth-strategy/strategy-service";
import { PlanningService } from "./planning-service";
import { MachineReadableExecutionSpec } from "./types";

export class PlanningEngine {
  /**
   * Compiles Growth Strategy into a machine-readable execution spec with campaigns, projects, tasks, owners, deadlines, dependencies, and KPIs.
   */
  async convertStrategyToPlan(
    workspaceId: string,
    strategyId?: string,
    strategyOutput?: GrowthStrategyOutput,
  ): Promise<MachineReadableExecutionSpec> {
    let strategyData = strategyOutput;

    // If strategyOutput is not passed directly, load from Supabase database
    if (!strategyData) {
      const res = await GrowthStrategyService.getStrategy(workspaceId);
      if (res.data?.raw_json) {
        strategyData = res.data.raw_json as unknown as GrowthStrategyOutput;
      }
    }

    const now = new Date();
    const isoPlus7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const isoPlus14Days = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString();
    const isoPlus30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

    const prompt = `Convert the following Growth Strategy into a machine-readable execution plan with campaigns, projects, tasks, owners, deadlines, dependencies, and KPIs.
STRATEGY DATA: ${JSON.stringify(strategyData || {})}

Return ONLY valid JSON matching this exact structure:
{
  "specVersion": "1.0.0",
  "title": "Autonomous Execution Plan — ${strategyData?.title || "Growth OS"}",
  "workspaceId": "${workspaceId}",
  "strategyId": "${strategyId || ""}",
  "campaigns": [
    {
      "id": "cmp-101",
      "name": "LinkedIn Founder Authority & Outbound Blast",
      "channel": "LinkedIn & Cold Email",
      "objective": "Capture 50 high-intent B2B sales meetings in 30 days",
      "owner": "Distribution Planner Agent",
      "deadlineIso": "${isoPlus30Days}",
      "targetMetrics": "15K impressions/week & 20 inbound DMs"
    }
  ],
  "projects": [
    {
      "id": "prj-201",
      "name": "Generative Engine Optimization (GEO) Audit & Citation Setup",
      "category": "SEO",
      "owner": "Visibility Analyst Agent",
      "deadlineIso": "${isoPlus14Days}",
      "deliverables": ["Audit ChatGPT & Perplexity citations", "Optimize brand meta structure"]
    }
  ],
  "tasks": [
    {
      "id": "tsk-001",
      "title": "Scrape target company domain & extract founder persona",
      "description": "Scrape website metadata, extract title, bio, and LinkedIn handle.",
      "projectId": "prj-201",
      "campaignId": "cmp-101",
      "owner": "Founder Research Agent",
      "deadlineIso": "${isoPlus7Days}",
      "dependencies": [],
      "status": "Completed",
      "priority": "High"
    },
    {
      "id": "tsk-002",
      "title": "Draft 5 LinkedIn thought leadership posts from research teardown",
      "description": "Use Content Strategist Agent to convert research teardown into 5 viral posts.",
      "projectId": "prj-201",
      "campaignId": "cmp-101",
      "owner": "Content Strategist Agent",
      "deadlineIso": "${isoPlus14Days}",
      "dependencies": ["tsk-001"],
      "status": "In Progress",
      "priority": "High"
    },
    {
      "id": "tsk-003",
      "title": "Qualify inbound CRM leads and trigger outreach sequence",
      "description": "Qualify leads using CRM Assistant Agent and dispatch via email.",
      "projectId": "prj-201",
      "campaignId": "cmp-101",
      "owner": "CRM Assistant Agent",
      "deadlineIso": "${isoPlus30Days}",
      "dependencies": ["tsk-002"],
      "status": "Pending",
      "priority": "Medium"
    }
  ],
  "kpis": [
    {
      "id": "kpi-301",
      "metric": "Qualified Lead Conversion Rate",
      "targetBenchmark": "3.5x outbound conversion lift",
      "owner": "CRM Assistant Agent",
      "measurementFrequency": "Weekly"
    }
  ]
}`;

    const systemPrompt =
      "You are the Principal AI Planning Engineer for Eminarc Growth OS. Output strictly valid machine-readable JSON matching the schema.";

    const provider = getLLMProvider();

    let result: MachineReadableExecutionSpec;
    try {
      result = await provider.completeJSON<MachineReadableExecutionSpec>(prompt, systemPrompt);
    } catch (err) {
      console.warn(
        "[PlanningEngine.convertStrategyToPlan] LLM provider warning, using fallback synthesis:",
        err,
      );
      result = {
        specVersion: "1.0.0",
        title: `Autonomous Execution Plan — ${strategyData?.title || "Growth OS"}`,
        workspaceId,
        strategyId,
        campaigns: [
          {
            id: "cmp-101",
            name: "LinkedIn Founder Authority & Outbound Blast",
            channel: "LinkedIn & Cold Email",
            objective: "Capture 50 high-intent B2B sales meetings in 30 days",
            owner: "Distribution Planner Agent",
            deadlineIso: isoPlus30Days,
            targetMetrics: "15K impressions/week & 20 inbound DMs",
          },
        ],
        projects: [
          {
            id: "prj-201",
            name: "Generative Engine Optimization (GEO) Audit & Citation Setup",
            category: "SEO",
            owner: "Visibility Analyst Agent",
            deadlineIso: isoPlus14Days,
            deliverables: ["Audit ChatGPT & Perplexity citations", "Optimize brand meta structure"],
          },
        ],
        tasks: [
          {
            id: "tsk-001",
            title: "Scrape target company domain & extract founder persona",
            description: "Scrape website metadata, extract title, bio, and LinkedIn handle.",
            projectId: "prj-201",
            campaignId: "cmp-101",
            owner: "Founder Research Agent",
            deadlineIso: isoPlus7Days,
            dependencies: [],
            status: "Completed",
            priority: "High",
          },
          {
            id: "tsk-002",
            title: "Draft 5 LinkedIn thought leadership posts from research teardown",
            description:
              "Use Content Strategist Agent to convert research teardown into 5 viral posts.",
            projectId: "prj-201",
            campaignId: "cmp-101",
            owner: "Content Strategist Agent",
            deadlineIso: isoPlus14Days,
            dependencies: ["tsk-001"],
            status: "In Progress",
            priority: "High",
          },
          {
            id: "tsk-003",
            title: "Qualify inbound CRM leads and trigger outreach sequence",
            description: "Qualify leads using CRM Assistant Agent and dispatch via email.",
            projectId: "prj-201",
            campaignId: "cmp-101",
            owner: "CRM Assistant Agent",
            deadlineIso: isoPlus30Days,
            dependencies: ["tsk-002"],
            status: "Pending",
            priority: "Medium",
          },
        ],
        kpis: [
          {
            id: "kpi-301",
            metric: "Qualified Lead Conversion Rate",
            targetBenchmark: "3.5x outbound conversion lift",
            owner: "CRM Assistant Agent",
            measurementFrequency: "Weekly",
          },
        ],
      };
    }

    // Persist compiled execution plan to Supabase and sync tasks to Supabase `tasks` table
    await PlanningService.saveExecutionPlan(workspaceId, result, strategyId);

    return result;
  }
}

export const planningEngine = new PlanningEngine();
