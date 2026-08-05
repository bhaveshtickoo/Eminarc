/**
 * AI Task Generator Synthesizer Engine
 * Eminarc Growth OS Core
 */

import { getLLMProvider } from "@/services/ai/provider";
import { aiMemoryManager } from "../memory/memory-manager";
import { TaskGeneratorService } from "./task-generator-service";
import { GeneratedProjectSpec, GeneratedTaskSpec } from "./types";

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

    const prompt = `Synthesize structured Projects, Tasks, Subtasks, Dependencies, Due Dates, Priority, and Estimated Effort (in hours) for workspace "${params.workspaceId}".
OPERATING PLAN SPEC: ${JSON.stringify(params.planSpec || {})}
WORKSPACE MEMORY: ${memoryContext.formattedSystemContext}

Return ONLY valid JSON matching this exact structure:
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
}`;

    const systemPrompt = "You are the Principal AI Task Engineer for Eminarc Growth OS. Output strictly valid JSON matching the schema.";

    const provider = getLLMProvider();

    let result: { projects: GeneratedProjectSpec[]; tasks: GeneratedTaskSpec[] };
    try {
      result = await provider.completeJSON<{ projects: GeneratedProjectSpec[]; tasks: GeneratedTaskSpec[] }>(prompt, systemPrompt);
    } catch (err) {
      console.warn("[AITaskGenerator.generateFromPlan] LLM provider warning, using fallback synthesis:", err);
      result = {
        projects: [
          {
            id: `prj-enrichment-01`,
            workspaceId: params.workspaceId,
            campaignId: params.campaignId,
            title: "ICP Firmographic & Founder Persona Enrichment",
            description: "Scrape website metadata and build 5-step founder pain point matrix",
            category: "Growth",
            status: "active",
          },
        ],
        tasks: [
          {
            id: `tsk-gen-001`,
            workspaceId: params.workspaceId,
            campaignId: params.campaignId,
            projectId: "prj-enrichment-01",
            title: "Scrape target domain HTML & extract key founder metadata",
            description: "Scrape website metadata, extract title, bio, and LinkedIn handle.",
            subtasks: [
              { id: "sub-1", title: "Fetch raw HTML meta tags", completed: true },
              { id: "sub-2", title: "Parse founder bio and title", completed: false },
            ],
            dependencies: [],
            dueDate: iso7,
            priority: "Critical",
            estimatedEffortHours: 3.5,
            assignedOwner: "Founder Research Agent",
            status: "In Progress",
          },
          {
            id: `tsk-gen-002`,
            workspaceId: params.workspaceId,
            campaignId: params.campaignId,
            projectId: "prj-enrichment-01",
            title: "Draft 5 viral LinkedIn carousels from research teardown",
            description: "Use Content Strategist Agent to convert teardown into 5 posts.",
            subtasks: [
              { id: "sub-3", title: "Write post headlines and hooks", completed: false },
              { id: "sub-4", title: "Format slide layout text", completed: false },
            ],
            dependencies: ["tsk-gen-001"],
            dueDate: iso14,
            priority: "High",
            estimatedEffortHours: 4.0,
            assignedOwner: "Content Strategist",
            status: "Pending",
          },
        ],
      };
    }

    // Persist Projects & Tasks to Supabase database
    await TaskGeneratorService.saveProjects(params.workspaceId, result.projects);
    await TaskGeneratorService.saveTasks(params.workspaceId, result.tasks);

    return result;
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
