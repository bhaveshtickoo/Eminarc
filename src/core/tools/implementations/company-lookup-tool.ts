/**
 * Company Lookup Tool
 * Eminarc Growth OS AI Core
 */

import { AITool, AIToolDefinition, AIToolResult } from "../base";
import { supabase } from "@/lib/supabase/client";

export interface CompanyLookupParams {
  workspaceId: string;
  name?: string;
  website?: string;
}

export class CompanyLookupTool implements AITool<CompanyLookupParams, any> {
  definition: AIToolDefinition = {
    name: "company_lookup",
    description: "Queries company record intelligence from Supabase database by name or website domain.",
    parameters: {
      type: "object",
      properties: {
        workspaceId: {
          type: "string",
          description: "Active workspace UUID",
          required: true,
        },
        name: {
          type: "string",
          description: "Company name search query",
        },
        website: {
          type: "string",
          description: "Domain search query",
        },
      },
      required: ["workspaceId"],
    },
  };

  async execute(params: CompanyLookupParams): Promise<AIToolResult<any>> {
    try {
      let query = supabase
        .from("companies")
        .select("*")
        .eq("workspace_id", params.workspaceId)
        .is("deleted_at", null);

      if (params.name) {
        query = query.ilike("name", `%${params.name}%`);
      }
      if (params.website) {
        query = query.ilike("website", `%${params.website}%`);
      }

      const { data, error } = await query;
      if (error) throw error;

      return { success: true, data: data || [] };
    } catch (err) {
      return {
        success: false,
        data: null,
        error: err instanceof Error ? err.message : "Company lookup failed.",
      };
    }
  }
}
