/**
 * CRM Pipeline Tool
 * Eminarc Growth OS AI Core
 */

import { AITool, AIToolDefinition, AIToolResult } from "../base";
import { getLeads, addLead, Lead } from "@/services/crm";

export interface CRMToolParams {
  action: "get_leads" | "add_lead";
  workspaceId: string;
  leadData?: Partial<Lead>;
}

export class CRMTool implements AITool<CRMToolParams, any> {
  definition: AIToolDefinition = {
    name: "crm_tool",
    description: "Reads and manages qualified lead entries and pipeline deals in Supabase CRM.",
    parameters: {
      type: "object",
      properties: {
        action: {
          type: "string",
          description: "CRM action to execute: 'get_leads' or 'add_lead'",
          enum: ["get_leads", "add_lead"],
          required: true,
        },
        workspaceId: {
          type: "string",
          description: "Workspace UUID context",
          required: true,
        },
      },
      required: ["action", "workspaceId"],
    },
  };

  async execute(params: CRMToolParams): Promise<AIToolResult<any>> {
    try {
      if (params.action === "get_leads") {
        const leads = await getLeads({ workspaceId: params.workspaceId });
        return { success: true, data: leads };
      }

      if (params.action === "add_lead") {
        if (!params.leadData) {
          return { success: false, data: null, error: "leadData is required for add_lead action." };
        }
        const created = await addLead(params.leadData, params.workspaceId);
        return { success: true, data: created };
      }

      return { success: false, data: null, error: "Invalid action." };
    } catch (err) {
      return {
        success: false,
        data: null,
        error: err instanceof Error ? err.message : "CRM tool execution failed.",
      };
    }
  }
}
