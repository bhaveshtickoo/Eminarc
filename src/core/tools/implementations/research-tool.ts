/**
 * Founder Research Tool
 * Eminarc Growth OS AI Core
 */

import { AITool, AIToolDefinition, AIToolResult } from "../base";
import { FounderResearchService } from "@/services/research/founder-research-service";

export interface ResearchToolParams {
  action: "start_job" | "get_report" | "get_job";
  workspaceId: string;
  companyId?: string;
  jobId?: string;
  companyName?: string;
  website?: string;
}

export class ResearchTool implements AITool<ResearchToolParams, any> {
  definition: AIToolDefinition = {
    name: "research_tool",
    description: "Triggers and polls asynchronous Founder Research Agent jobs and reports in Supabase.",
    parameters: {
      type: "object",
      properties: {
        action: {
          type: "string",
          description: "Action to execute: 'start_job', 'get_report', or 'get_job'",
          enum: ["start_job", "get_report", "get_job"],
          required: true,
        },
        workspaceId: {
          type: "string",
          description: "Target workspace UUID",
          required: true,
        },
        companyId: {
          type: "string",
          description: "Target company UUID",
        },
        jobId: {
          type: "string",
          description: "Research job UUID",
        },
      },
      required: ["action", "workspaceId"],
    },
  };

  async execute(params: ResearchToolParams): Promise<AIToolResult<any>> {
    try {
      if (params.action === "start_job") {
        if (!params.companyName || !params.website) {
          return { success: false, data: null, error: "companyName and website are required." };
        }
        const compRes = await FounderResearchService.saveCompany({
          workspace_id: params.workspaceId,
          name: params.companyName,
          website: params.website,
        });

        if (!compRes.data) throw compRes.error || new Error("Failed to create company.");

        const jobRes = await FounderResearchService.startResearch(params.workspaceId, compRes.data.id);
        if (!jobRes.data) throw jobRes.error || new Error("Failed to start research job.");

        // Launch background worker
        FounderResearchService.processResearchJobAsync(
          jobRes.data.id,
          params.workspaceId,
          compRes.data.id,
          params.companyName,
          params.website
        );

        return { success: true, data: { jobId: jobRes.data.id, companyId: compRes.data.id } };
      }

      if (params.action === "get_job" && params.jobId) {
        const jobRes = await FounderResearchService.getJob(params.jobId);
        return { success: true, data: jobRes.data };
      }

      if (params.action === "get_report" && params.companyId) {
        const repRes = await FounderResearchService.getReport(params.companyId);
        return { success: true, data: repRes.data };
      }

      return { success: false, data: null, error: "Invalid action parameters." };
    } catch (err) {
      return {
        success: false,
        data: null,
        error: err instanceof Error ? err.message : "Research tool execution failed.",
      };
    }
  }
}
