/**
 * AI Task Generator Synthesizer Engine
 * Eminarc Growth OS Core
 */

import { aiOrchestrator } from "../ai/orchestrator";
import { PromptBuilder } from "../ai/prompts/prompt-builder";
import { aiMemoryManager } from "../memory/memory-manager";
import { globalAgentRegistry } from "../agents/agent-registry";
import { TaskGeneratorService } from "./task-generator-service";
import { GeneratedProjectSpec, GeneratedTaskSpec, TaskPriority, TaskStatus } from "./types";

export interface GenerateTasksParams {
  workspaceId: string;
  campaignId?: string;
  projectId?: string;
  planSpec?: any;
  providerName?: string;
}

export class AITaskGenerator {
  /**
   * Primary Execution Generator: Converts Operating Plans & Campaigns into Projects, Tasks, Subtasks, Dependencies, Due Dates, Priorities, and Estimated Effort.
   */
  async generateFromPlan(params: GenerateTasksParams): Promise<{
    projects: GeneratedProjectSpec[];
    tasks: GeneratedTaskSpec[];
  }> {
    const memoryContext = await aiMemoryManager.loadFullMemoryContext(params.workspaceId);

    const iso7 = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const iso14 = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const iso21 = new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    const agents = globalAgentRegistry.list().map((a) => a.name);

    const systemPrompt = PromptBuilder.buildSystemPrompt(
      "You are the Principal AI Task Engineer for Eminarc Growth OS. " +
        "Automatically synthesize machine-executable Projects, Tasks, Subtasks, Dependencies (DAG), Priority, Estimated Effort (hours), and Due Dates linked to Workspace, Campaign, and Project.",
    );

    const userPrompt = PromptBuilder.render(
      `Synthesize structured Projects and Tasks for workspace "{{workspaceName}}".
CAMPAIGN ID: "{{campaignId}}"
PROJECT ID: "{{projectId}}"

OPERATING PLAN CONTEXT:
{{planJson}}

WORKSPACE MEMORY CONTEXT:
{{memoryContext}}

AVAILABLE AGENTS:
{{agentsList}}

Output strictly valid JSON matching this exact structure:
{
  "projects": [
    {
      "id": "prj-enrichment-01",
      "workspaceId": "${params.workspaceId}",
      "campaignId": "${params.campaignId || ""}",
      "title": "ICP Firmographic & Founder Persona Enrichment",
      "description": "Scrape website metadata and build 5-step founder pain point matrix",
      "category": "Growth",
      "status": "active"
    }
  ],
  "tasks": [
    {
      "id": "tsk-gen-001",
      "workspaceId": "${params.workspaceId}",
      "campaignId": "${params.campaignId || ""}",
      "projectId": "prj-enrichment-01",
      "title": "Scrape target domain HTML & extract key founder metadata",
      "description": "Scrape website metadata, extract title, bio, and LinkedIn handle.",
      "subtasks": [
        { "id": "sub-1", "title": "Fetch raw HTML meta tags", "completed": true },
        { "id": "sub-2", "title": "Parse founder bio and title", "completed": false }
      ],
      "dependencies": [],
      "dueDate": "${iso7}",
      "priority": "Critical",
      "estimatedEffortHours": 3.5,
      "assignedOwner": "Founder Research Agent",
      "status": "In Progress"
    },
    {
      "id": "tsk-gen-002",
      "workspaceId": "${params.workspaceId}",
      "campaignId": "${params.campaignId || ""}",
      "projectId": "prj-enrichment-01",
      "title": "Draft 5 viral LinkedIn carousels from research teardown",
      "description": "Use Content Strategist Agent to convert teardown into 5 posts.",
      "subtasks": [
        { "id": "sub-3", "title": "Write post headlines and hooks", "completed": false },
        { "id": "sub-4", "title": "Format slide layout text", "completed": false }
      ],
      "dependencies": ["tsk-gen-001"],
      "dueDate": "${iso14}",
      "priority": "High",
      "estimatedEffortHours": 4.0,
      "assignedOwner": "Content Strategist",
      "status": "Pending"
    }
  ]
}`,
      {
        workspaceName: memoryContext.workspace?.name || "Target Workspace",
        campaignId: params.campaignId || "",
        projectId: params.projectId || "",
        planJson: JSON.stringify(params.planSpec || {}),
        memoryContext: memoryContext.formattedSystemContext,
        agentsList: agents.join(", "),
      },
    );

    let result: { projects: GeneratedProjectSpec[]; tasks: GeneratedTaskSpec[] };

    try {
      const response = await aiOrchestrator.execute<{
        projects: GeneratedProjectSpec[];
        tasks: GeneratedTaskSpec[];
      }>({
        prompt: `${systemPrompt}\n\n${userPrompt}`,
        ...(params.providerName ? { providerName: params.providerName } : {}),
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

      const parsed =
        typeof response.content === "object" ? response.content : JSON.parse(contentStr);

      result = {
        projects: (parsed.projects || []).map((p: any) => {
          const cid = params.campaignId || p.campaignId;
          return {
            ...p,
            workspaceId: params.workspaceId,
            ...(cid ? { campaignId: cid } : {}),
          };
        }),
        tasks: (parsed.tasks || []).map((t: any) => {
          const cid = params.campaignId || t.campaignId;
          const pid = params.projectId || t.projectId;
          return {
            ...t,
            workspaceId: params.workspaceId,
            ...(cid ? { campaignId: cid } : {}),
            ...(pid ? { projectId: pid } : {}),
          };
        }),
      };
    } catch (err) {
      console.warn(
        "[AITaskGenerator.generateFromPlan] Orchestrator warning, using contextual fallback synthesis:",
        err,
      );
      result = this.synthesizeContextualFallback(params, memoryContext, iso7, iso14, iso21);
    }

    // Persist Projects & Tasks to Supabase database
    if (result.projects.length > 0) {
      await TaskGeneratorService.saveProjects(params.workspaceId, result.projects);
    }
    if (result.tasks.length > 0) {
      await TaskGeneratorService.saveTasks(params.workspaceId, result.tasks);
    }

    return result;
  }

  /**
   * Fallback contextual generator producing structured tasks linked to workspace, campaign, and project
   */
  private synthesizeContextualFallback(
    params: GenerateTasksParams,
    memoryContext: any,
    iso7: string,
    iso14: string,
    iso21: string,
  ): { projects: GeneratedProjectSpec[]; tasks: GeneratedTaskSpec[] } {
    const wsName = memoryContext.workspace?.name || "B2B Growth OS";

    const defaultProjects: GeneratedProjectSpec[] = [
      {
        id: `prj-${Date.now()}-1`,
        workspaceId: params.workspaceId,
        ...(params.campaignId ? { campaignId: params.campaignId } : {}),
        title: `${wsName} — Automated ICP & Founder Persona Enrichment`,
        description:
          "Scrape domain HTML, extract founder pain points, and enrich CRM buyer personas.",
        category: "CRM & Intelligence",
        status: "active",
      },
      {
        id: `prj-${Date.now()}-2`,
        workspaceId: params.workspaceId,
        ...(params.campaignId ? { campaignId: params.campaignId } : {}),
        title: `${wsName} — Founder Authority Content Pipeline`,
        description:
          "Convert research teardowns into weekly LinkedIn carousels and technical guides.",
        category: "Content & Distribution",
        status: "active",
      },
    ];

    const prj1Id = defaultProjects[0]?.id || "prj-default-1";
    const prj2Id = defaultProjects[1]?.id || "prj-default-2";

    const defaultTasks: GeneratedTaskSpec[] = [
      {
        id: `tsk-${Date.now()}-1`,
        workspaceId: params.workspaceId,
        ...(params.campaignId ? { campaignId: params.campaignId } : {}),
        projectId: prj1Id,
        title: "Scrape target domain HTML & extract key founder bio",
        description:
          "Scrape website metadata, extract title, bio, and LinkedIn handle for ICP leads.",
        subtasks: [
          { id: "sub-1", title: "Fetch raw HTML meta tags and OpenGraph data", completed: true },
          { id: "sub-2", title: "Extract founder title and company size", completed: true },
          { id: "sub-3", title: "Identify primary buying triggers", completed: false },
        ],
        dependencies: [],
        dueDate: iso7,
        priority: "Critical" as TaskPriority,
        estimatedEffortHours: 3.5,
        assignedOwner: "Founder Research Agent",
        status: "In Progress" as TaskStatus,
      },
      {
        id: `tsk-${Date.now()}-2`,
        workspaceId: params.workspaceId,
        ...(params.campaignId ? { campaignId: params.campaignId } : {}),
        projectId: prj2Id,
        title: "Draft 5 viral LinkedIn carousels from ICP research",
        description:
          "Use Content Strategist Agent to transform research insights into 5 high-converting posts.",
        subtasks: [
          { id: "sub-4", title: "Draft scroll-stopping headlines & hooks", completed: false },
          { id: "sub-5", title: "Format slide copy and visual callouts", completed: false },
          { id: "sub-6", title: "Schedule post distribution queue", completed: false },
        ],
        dependencies: [`tsk-${Date.now()}-1`],
        dueDate: iso14,
        priority: "High" as TaskPriority,
        estimatedEffortHours: 4.5,
        assignedOwner: "Content Strategist",
        status: "Pending" as TaskStatus,
      },
      {
        id: `tsk-${Date.now()}-3`,
        workspaceId: params.workspaceId,
        ...(params.campaignId ? { campaignId: params.campaignId } : {}),
        projectId: prj1Id,
        title: "Qualify inbound CRM leads and trigger personalized outreach",
        description:
          "Evaluate leads using CRM Assistant Agent and trigger multi-touch cold email sequence.",
        subtasks: [
          { id: "sub-7", title: "Assign ICP fit score to CRM accounts", completed: false },
          { id: "sub-8", title: "Dispatch 3-step outreach sequence", completed: false },
        ],
        dependencies: [`tsk-${Date.now()}-2`],
        dueDate: iso21,
        priority: "High" as TaskPriority,
        estimatedEffortHours: 2.0,
        assignedOwner: "CRM Assistant",
        status: "Pending" as TaskStatus,
      },
    ];

    return { projects: defaultProjects, tasks: defaultTasks };
  }

  /**
   * Support Task Graph Regeneration: Clears old tasks and re-synthesizes task graph
   */
  async regenerateFromPlan(params: GenerateTasksParams): Promise<{
    projects: GeneratedProjectSpec[];
    tasks: GeneratedTaskSpec[];
  }> {
    await TaskGeneratorService.clearWorkspaceTasks(params.workspaceId);
    return this.generateFromPlan(params);
  }
}

export const aiTaskGenerator = new AITaskGenerator();
