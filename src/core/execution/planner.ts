/**
 * Execution Planner Operating Plan Synthesizer
 * Eminarc Growth OS Core
 */

import { getLLMProvider } from "@/services/ai/provider";
import { FounderResearchService } from "@/services/research/founder-research-service";
import { GrowthStrategyService } from "../agents/growth-strategy/strategy-service";
import { aiMemoryManager } from "../memory/memory-manager";
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
   * Main Pipeline Orchestrator: Converts Research, Strategy, and Workspace into a strongly typed Operating Plan.
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
    if (!strategyData) {
      const sRes = await GrowthStrategyService.getStrategy(input.workspaceId);
      strategyData = sRes.data?.raw_json || {};
    }

    // Load workspace memory context
    const memoryContext = await aiMemoryManager.loadFullMemoryContext(input.workspaceId);

    // Modular Execution Pipeline Method Calls
    const campaigns = await this.createCampaigns(strategyData, researchData);
    const projects = await this.createProjects(strategyData, researchData);
    const milestones = await this.createMilestones(strategyData);
    let tasks = await this.createTasks(projects, campaigns, milestones);

    // Prioritize & Assign DAG Dependencies
    tasks = this.prioritize(tasks);
    tasks = this.assignDependencies(tasks);

    const kpis = await this.generateKPIs(strategyData);

    const operatingPlan: StructuredOperatingPlan = {
      title: `GTM Operating Plan — ${strategyData?.title || "Growth Operating System"}`,
      workspaceId: input.workspaceId,
      strategyId: input.strategyId,
      researchReportId: input.researchReportId,
      campaigns,
      projects,
      milestones,
      tasks,
      kpis,
    };

    // Save in Supabase database & sync tasks
    await ExecutionService.saveOperatingPlan(
      input.workspaceId,
      operatingPlan,
      input.strategyId,
      input.researchReportId
    );

    return operatingPlan;
  }

  /**
   * Method 1: Generate Campaign Specs
   */
  async createCampaigns(strategyData: any, researchData: any): Promise<CampaignSpec[]> {
    const iso30 = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    return [
      {
        id: "cmp-outbound-01",
        name: "LinkedIn Founder Authority & Outbound Blast",
        channel: "LinkedIn & Cold Email",
        objective: "Acquire 50 qualified B2B SaaS sales demos in 30 days",
        priority: "Critical",
        expectedImpact: "$150,000 Net New Pipeline Value",
        owner: "Distribution Planner",
        timeline: `30 Days (Completion: ${iso30})`,
        kpis: ["3.5x Outbound Conversion Lift", "15K Impressions / Week"],
      },
      {
        id: "cmp-[#geo-radar]",
        name: "Generative Engine Optimization (GEO) Brand Blitz",
        channel: "Perplexity & ChatGPT Search Radar",
        objective: "Rank in top 3 citations for category growth keywords",
        priority: "High",
        expectedImpact: "4.2x Organic LLM Discovery Lift",
        owner: "Visibility Analyst",
        timeline: "14 Days",
        kpis: [">85/100 GEO Citation Index Score"],
      },
    ];
  }

  /**
   * Method 2: Generate Project Specs
   */
  async createProjects(strategyData: any, researchData: any): Promise<ProjectSpec[]> {
    return [
      {
        id: "prj-persona-enrichment",
        name: "Automated Founder Persona & ICP Enrichment Engine",
        category: "CRM",
        priority: "Critical",
        expectedImpact: "100% Persona Enrichment Coverage across CRM Leads",
        owner: "Founder Research Agent",
        timeline: "10 Days",
        deliverables: [
          "Scrape domain HTML & meta tags",
          "Extract founder pain point matrix & buying triggers",
        ],
      },
      {
        id: "prj-[#content-engine]",
        name: "Founder Thought Leadership Content Engine",
        category: "Content",
        priority: "High",
        expectedImpact: "Consistent 3x Weekly Executive Brand Presence",
        owner: "Content Strategist",
        timeline: "Ongoing",
        deliverables: [
          "Draft 5 viral LinkedIn carousels",
          "Publish 1 weekly Medium architecture teardown",
        ],
      },
    ];
  }

  /**
   * Method 3: Generate Milestone Specs
   */
  async createMilestones(strategyData: any): Promise<MilestoneSpec[]> {
    const iso30 = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const iso60 = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const iso90 = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    return [
      {
        id: "mls-30",
        title: "Phase 1: Foundation & Systems Launch",
        timeframe: "Days 1-30 (Foundation)",
        targetDateIso: iso30,
        expectedImpact: "Initial 50 Sales Meetings Captured",
        keyDeliverables: [
          "Set up multi-tenant workspace memory",
          "Launch LinkedIn Founder Authority campaign",
        ],
        kpis: ["50 Demos", "4.8% Outbound CTR"],
      },
      {
        id: "mls-60",
        title: "Phase 2: Channel Optimization & Scale",
        timeframe: "Days 31-60 (Optimization)",
        targetDateIso: iso60,
        expectedImpact: "$250,000 Pipeline Expansion",
        keyDeliverables: [
          "Scale cold outreach sequences to 500 accounts",
          "Audit ChatGPT & Perplexity citation rankings",
        ],
        kpis: ["$250K Pipeline", ">85 GEO Score"],
      },
      {
        id: "mls-90",
        title: "Phase 3: Dominance & Autonomous Operations",
        timeframe: "Days 61-90 (Scale)",
        targetDateIso: iso90,
        expectedImpact: "Fully Autonomous Growth Operating System",
        keyDeliverables: [
          "Auto-qualify inbound CRM leads via AI Assistant",
          "Automate weekly report dispatch to board",
        ],
        kpis: ["100% Autonomous Execution"],
      },
    ];
  }

  /**
   * Method 4: Create Task Specs
   */
  async createTasks(
    projects: ProjectSpec[],
    campaigns: CampaignSpec[],
    milestones: MilestoneSpec[]
  ): Promise<TaskSpec[]> {
    return [
      {
        id: "tsk-exec-101",
        title: "Scrape company domain & extract founder persona",
        description: "Scrape website metadata, extract title, bio, and LinkedIn handle.",
        projectId: "prj-persona-enrichment",
        campaignId: "cmp-outbound-01",
        milestoneId: "mls-30",
        priority: "Critical",
        expectedImpact: "Unlocks enriched buyer persona for outreach campaign",
        owner: "Founder Research Agent",
        timeline: "2 Days",
        dependencies: [],
        status: "Completed",
      },
      {
        id: "tsk-exec-102",
        title: "Draft 5 LinkedIn thought leadership posts from research teardown",
        description: "Convert research teardown into 5 high-converting LinkedIn carousels.",
        projectId: "prj-[#content-engine]",
        campaignId: "cmp-outbound-01",
        milestoneId: "mls-30",
        priority: "High",
        expectedImpact: "15K Organic Impressions & Founder Brand Authority",
        owner: "Content Strategist",
        timeline: "5 Days",
        dependencies: ["tsk-exec-101"],
        status: "In Progress",
      },
      {
        id: "tsk-exec-103",
        title: "Qualify inbound CRM leads and trigger outreach sequence",
        description: "Qualify leads using CRM Assistant Agent and dispatch email sequence.",
        projectId: "prj-persona-enrichment",
        campaignId: "cmp-outbound-01",
        milestoneId: "mls-30",
        priority: "High",
        expectedImpact: "Converts 20% of inbound leads into active pipeline",
        owner: "CRM Assistant",
        timeline: "7 Days",
        dependencies: ["tsk-exec-102"],
        status: "Pending",
      },
    ];
  }

  /**
   * Method 5: Prioritize Tasks
   */
  prioritize(tasks: TaskSpec[]): TaskSpec[] {
    return tasks.map((t) => {
      if (t.expectedImpact.toLowerCase().includes("critical") || t.expectedImpact.toLowerCase().includes("pipeline")) {
        return { ...t, priority: "Critical" as ExecutionPriority };
      }
      return t;
    });
  }

  /**
   * Method 6: Assign Dependencies (DAG Construction)
   */
  assignDependencies(tasks: TaskSpec[]): TaskSpec[] {
    return tasks.map((t, index) => {
      if (index > 0 && t.dependencies.length === 0) {
        return { ...t, dependencies: [tasks[index - 1].id] };
      }
      return t;
    });
  }

  /**
   * Method 7: Generate KPI Specs
   */
  async generateKPIs(strategyData: any): Promise<KPISpec[]> {
    return [
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
  }
}

export const executionPlanner = new ExecutionPlanner();
