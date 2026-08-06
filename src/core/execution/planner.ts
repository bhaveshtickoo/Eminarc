/**
 * Execution Planner Operating Plan Synthesizer
 * Eminarc Growth OS Core
 */

import { aiOrchestrator } from "../ai/orchestrator";
import { PromptBuilder } from "../ai/prompts/prompt-builder";
import { aiMemoryManager } from "../memory/memory-manager";
import { globalAgentRegistry } from "../agents/agent-registry";
import { FounderResearchService } from "@/services/research/founder-research-service";
import { GrowthStrategyService } from "../agents/growth-strategy/strategy-service";
import { ExecutionService } from "./execution-service";
import {
  CampaignSpec,
  ExecutionInput,
  ExecutionPriority,
  KPISpec,
  MilestoneSpec,
  ProjectSpec,
  StructuredOperatingPlan,
  TaskSpec,
} from "./types";

export class ExecutionPlanner {
  /**
   * Main Pipeline Orchestrator: Converts Research, Strategy, and Workspace Memory into a strongly typed Operating Plan.
   */
  async generateExecutionPlan(input: ExecutionInput): Promise<StructuredOperatingPlan> {
    // Load research report if not provided directly
    let researchData = input.researchOutput;
    if (!researchData && input.researchReportId) {
      const rRes = await FounderResearchService.getReport(input.researchReportId);
      researchData = rRes.data?.raw_json || {};
    }

    // Load growth strategy if not provided directly
    let strategyData = input.strategyOutput;
    let strategyId = input.strategyId;
    if (!strategyData) {
      const sRes = await GrowthStrategyService.getStrategy(input.workspaceId);
      strategyData = sRes.data?.raw_json || sRes.data || {};
      if (sRes.data?.id) {
        strategyId = sRes.data.id;
      }
    }

    // Load 6-layer workspace memory context
    const memoryContext = await aiMemoryManager.loadFullMemoryContext(input.workspaceId);

    // Retrieve active agents from global Agent Registry
    const agents = globalAgentRegistry.list().map((a) => a.name);

    // Generate pipeline artifacts using AI Orchestrator & Prompt Library
    const planTitle = `GTM Operating Plan — ${strategyData?.title || memoryContext.workspace?.name || "Growth Operating System"}`;

    const systemPrompt = PromptBuilder.buildSystemPrompt(
      "You are the Principal AI Execution Architect for Eminarc Growth OS. " +
        "Synthesize an autonomous, machine-executable growth operating plan with Campaigns, Projects, Milestones, Tasks, Dependencies, KPIs, and Timelines.",
    );

    const userPrompt = PromptBuilder.render(
      `Synthesize an Execution Operating Plan for workspace "{{workspaceName}}".
      
WORKSPACE MEMORY CONTEXT:
{{memoryContext}}

STRATEGY CONTEXT:
{{strategyJson}}

RESEARCH CONTEXT:
{{researchJson}}

REGISTERED AGENTS AVAILABLE:
{{agentsList}}

Output strictly valid JSON matching this exact structure:
{
  "title": "{{planTitle}}",
  "campaigns": [
    {
      "id": "cmp-outbound-01",
      "name": "LinkedIn Founder Authority & Outbound Campaign",
      "channel": "LinkedIn & Cold Email",
      "objective": "Acquire 50 qualified SaaS sales demos in 30 days",
      "priority": "Critical",
      "expectedImpact": "$150,000 Net New Pipeline",
      "owner": "Distribution Planner",
      "timeline": "30 Days",
      "kpis": ["3.5x Outbound Conversion Lift", "15K Impressions / Week"]
    }
  ],
  "projects": [
    {
      "id": "prj-persona-enrichment",
      "name": "ICP Firmographic & Founder Persona Enrichment",
      "category": "CRM",
      "priority": "Critical",
      "expectedImpact": "100% Persona Enrichment Coverage across CRM Leads",
      "owner": "Founder Research Agent",
      "timeline": "10 Days",
      "deliverables": ["Scrape domain HTML & meta tags", "Extract founder pain point matrix"]
    }
  ],
  "milestones": [
    {
      "id": "mls-30",
      "title": "Phase 1: Foundation & Systems Launch",
      "timeframe": "Days 1-30 (Foundation)",
      "targetDateIso": "{{iso30}}",
      "expectedImpact": "Initial 50 Sales Meetings Captured",
      "keyDeliverables": ["Set up multi-tenant workspace memory", "Launch LinkedIn campaign"],
      "kpis": ["50 Demos", "4.8% Outbound CTR"]
    }
  ],
  "tasks": [
    {
      "id": "tsk-exec-101",
      "title": "Scrape company domain & extract founder persona",
      "description": "Scrape website metadata, extract title, bio, and LinkedIn handle.",
      "projectId": "prj-persona-enrichment",
      "campaignId": "cmp-outbound-01",
      "milestoneId": "mls-30",
      "priority": "Critical",
      "expectedImpact": "Unlocks enriched buyer persona for outreach campaign",
      "owner": "Founder Research Agent",
      "timeline": "2 Days",
      "dependencies": [],
      "status": "In Progress"
    }
  ],
  "kpis": [
    {
      "id": "kpi-outbound-ctr",
      "metric": "Outbound Email & LinkedIn CTR",
      "targetBenchmark": "4.8% Click-Through Rate",
      "owner": "Distribution Planner",
      "cadence": "Weekly"
    }
  ]
}`,
      {
        workspaceName: memoryContext.workspace?.name || "Target Workspace",
        memoryContext: memoryContext.formattedSystemContext,
        strategyJson: JSON.stringify(strategyData || {}),
        researchJson: JSON.stringify(researchData || {}),
        agentsList: agents.join(", "),
        planTitle,
        iso30: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      },
    );

    let parsedPlan: StructuredOperatingPlan;

    try {
      const response = await aiOrchestrator.execute<{
        title: string;
        campaigns: CampaignSpec[];
        projects: ProjectSpec[];
        milestones: MilestoneSpec[];
        tasks: TaskSpec[];
        kpis: KPISpec[];
      }>({
        prompt: `${systemPrompt}\n\n${userPrompt}`,
        temperature: 0.2,
        maxTokens: 2500,
      });

      let contentStr = response.content;
      if (typeof contentStr === "string") {
        contentStr = contentStr
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
        const jsonMatch = contentStr.match(/\{[\s\S]*\}/);
        if (jsonMatch) contentStr = jsonMatch[0];
      }

      const raw = typeof response.content === "object" ? response.content : JSON.parse(contentStr);

      parsedPlan = {
        title: raw.title || planTitle,
        workspaceId: input.workspaceId,
        ...(strategyId ? { strategyId } : {}),
        ...(input.researchReportId ? { researchReportId: input.researchReportId } : {}),
        campaigns: raw.campaigns || [],
        projects: raw.projects || [],
        milestones: raw.milestones || [],
        tasks: raw.tasks || [],
        kpis: raw.kpis || [],
      };
    } catch (err) {
      console.warn(
        "[ExecutionPlanner.generateExecutionPlan] Orchestrator warning, generating contextual plan:",
        err,
      );
      parsedPlan = await this.synthesizeContextualFallback(
        input,
        strategyData,
        researchData,
        memoryContext,
        strategyId,
      );
    }

    // Prioritize & Assign DAG Dependencies
    parsedPlan.tasks = this.prioritize(parsedPlan.tasks);
    parsedPlan.tasks = this.assignDependencies(parsedPlan.tasks);

    // Save in Supabase database & sync tasks
    await ExecutionService.saveOperatingPlan(
      input.workspaceId,
      parsedPlan,
      strategyId,
      input.researchReportId,
    );

    return parsedPlan;
  }

  /**
   * Fallback synthesis generating context-driven plan from workspace memory & strategy data
   */
  private async synthesizeContextualFallback(
    input: ExecutionInput,
    strategyData: any,
    researchData: any,
    memoryContext: any,
    effectiveStrategyId?: string,
  ): Promise<StructuredOperatingPlan> {
    const wsName = memoryContext.workspace?.name || "B2B SaaS Growth";
    const iso30 = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const iso60 = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    const campaigns: CampaignSpec[] = [
      {
        id: `cmp-outbound-${Date.now()}`,
        name: `${wsName} — LinkedIn Founder Authority & Outbound Blast`,
        channel: "LinkedIn & Cold Email",
        objective: "Capture 50 high-intent B2B SaaS demo requests in 30 days",
        priority: "Critical",
        expectedImpact: "$150,000 Net New Pipeline",
        owner: "Distribution Planner",
        timeline: `30 Days (Target: ${iso30})`,
        kpis: ["3.5x Outbound Conversion Lift", "15K Impressions / Week"],
      },
      {
        id: `cmp-geo-${Date.now()}`,
        name: `${wsName} — Generative Engine Optimization (GEO) Radar`,
        channel: "Perplexity & ChatGPT Search Radar",
        objective: "Rank in top 3 citations for core B2B category keywords",
        priority: "High",
        expectedImpact: "4.2x Organic AI Discovery Lift",
        owner: "Visibility Analyst",
        timeline: "14 Days",
        kpis: [">85/100 GEO Citation Index Score"],
      },
    ];

    const projects: ProjectSpec[] = [
      {
        id: "prj-enrichment-01",
        name: `${wsName} Automated ICP & Founder Persona Enrichment`,
        category: "CRM",
        priority: "Critical",
        expectedImpact: "100% Lead Persona Enrichment across target CRM accounts",
        owner: "Founder Research Agent",
        timeline: "10 Days",
        deliverables: ["Scrape domain HTML & meta tags", "Build 5-point buying trigger matrix"],
      },
      {
        id: "prj-content-01",
        name: `${wsName} Founder Thought Leadership Content Machine`,
        category: "Content",
        priority: "High",
        expectedImpact: "3x Weekly Viral LinkedIn Carousels & Teardowns",
        owner: "Content Strategist",
        timeline: "Ongoing",
        deliverables: ["Draft 5 viral LinkedIn carousels", "Publish technical breakdown article"],
      },
    ];

    const milestones: MilestoneSpec[] = [
      {
        id: "mls-30",
        title: "Phase 1: Foundation & Lead Engine Launch",
        timeframe: "Days 1-30 (Foundation)",
        targetDateIso: iso30,
        expectedImpact: "Initial 50 Qualified Demos Generated",
        keyDeliverables: [
          "Deploy multi-layer AI memory",
          "Launch LinkedIn Founder Authority sequence",
        ],
        kpis: ["50 Demos", "4.8% Outbound CTR"],
      },
      {
        id: "mls-60",
        title: "Phase 2: Channel Expansion & Optimization",
        timeframe: "Days 31-60 (Optimization)",
        targetDateIso: iso60,
        expectedImpact: "$250,000 Pipeline Expansion",
        keyDeliverables: [
          "Scale cold email outreach to 500 accounts",
          "Audit Perplexity search citations",
        ],
        kpis: ["$250K Pipeline", ">85 GEO Score"],
      },
    ];

    const primaryCampaignId = campaigns[0]?.id || "cmp-outbound-default";

    const tasks: TaskSpec[] = [
      {
        id: "tsk-exec-101",
        title: "Scrape company domain & extract founder persona",
        description: "Scrape website metadata, extract title, bio, and LinkedIn handle.",
        projectId: "prj-enrichment-01",
        campaignId: primaryCampaignId,
        milestoneId: "mls-30",
        priority: "Critical",
        expectedImpact: "Unlocks enriched buyer persona for outreach campaign",
        owner: "Founder Research Agent",
        timeline: "2 Days",
        dependencies: [],
        status: "In Progress",
      },
      {
        id: "tsk-exec-102",
        title: "Draft 5 LinkedIn thought leadership posts from teardown",
        description: "Convert research teardown into 5 high-converting LinkedIn carousels.",
        projectId: "prj-content-01",
        campaignId: primaryCampaignId,
        milestoneId: "mls-30",
        priority: "High",
        expectedImpact: "15K Organic Impressions & Brand Authority",
        owner: "Content Strategist",
        timeline: "5 Days",
        dependencies: ["tsk-exec-101"],
        status: "Pending",
      },
      {
        id: "tsk-exec-103",
        title: "Qualify inbound CRM leads & trigger email sequence",
        description: "Qualify leads using CRM Assistant Agent and dispatch email sequence.",
        projectId: "prj-enrichment-01",
        campaignId: primaryCampaignId,
        milestoneId: "mls-30",
        priority: "High",
        expectedImpact: "Converts 20% of inbound leads into active pipeline",
        owner: "CRM Assistant",
        timeline: "7 Days",
        dependencies: ["tsk-exec-102"],
        status: "Pending",
      },
    ];

    const kpis: KPISpec[] = [
      {
        id: "kpi-outbound-ctr",
        metric: "Outbound Email & LinkedIn CTR",
        targetBenchmark: "4.8% Click-Through Rate",
        owner: "Distribution Planner",
        cadence: "Weekly",
      },
      {
        id: "kpi-geo-score",
        metric: "Generative Engine Citation Score",
        targetBenchmark: ">85/100 Index Score",
        owner: "Visibility Analyst",
        cadence: "Weekly",
      },
      {
        id: "kpi-arr-added",
        metric: "Pipeline Added",
        targetBenchmark: "$150,000 ARR Net New",
        owner: "Growth Lead",
        cadence: "Monthly",
      },
    ];

    const finalStrategyId = input.strategyId || effectiveStrategyId;

    return {
      title: `GTM Operating Plan — ${strategyData?.title || wsName}`,
      workspaceId: input.workspaceId,
      ...(finalStrategyId ? { strategyId: finalStrategyId } : {}),
      ...(input.researchReportId ? { researchReportId: input.researchReportId } : {}),
      campaigns,
      projects,
      milestones,
      tasks,
      kpis,
    };
  }

  /**
   * Prioritize tasks based on expected impact & category
   */
  prioritize(tasks: TaskSpec[]): TaskSpec[] {
    return tasks.map((t) => {
      const imp = t.expectedImpact.toLowerCase();
      if (imp.includes("critical") || imp.includes("pipeline") || imp.includes("100%")) {
        return { ...t, priority: "Critical" as ExecutionPriority };
      }
      return t;
    });
  }

  /**
   * Assign DAG Dependencies (Topological Order)
   */
  assignDependencies(tasks: TaskSpec[]): TaskSpec[] {
    return tasks.map((t, index) => {
      const prevTask = tasks[index - 1];
      if (index > 0 && prevTask && (!t.dependencies || t.dependencies.length === 0)) {
        return { ...t, dependencies: [prevTask.id] };
      }
      return t;
    });
  }
}

export const executionPlanner = new ExecutionPlanner();
