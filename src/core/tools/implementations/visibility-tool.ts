/**
 * AI Visibility Radar Tool
 * Eminarc Growth OS AI Core
 */

import { AITool, AIToolDefinition, AIToolResult } from "../base";
import { getVisibilityAudit } from "@/services/visibility";

export interface VisibilityToolParams {
  workspaceId: string;
}

export class VisibilityTool implements AITool<VisibilityToolParams, any> {
  definition: AIToolDefinition = {
    name: "visibility_tool",
    description: "Audits AI search engine citation scores across ChatGPT, Perplexity, Claude & Gemini.",
    parameters: {
      type: "object",
      properties: {
        workspaceId: {
          type: "string",
          description: "Workspace UUID context",
          required: true,
        },
      },
      required: ["workspaceId"],
    },
  };

  async execute(params: VisibilityToolParams): Promise<AIToolResult<any>> {
    try {
      const audit = await getVisibilityAudit(params.workspaceId);
      return { success: true, data: audit };
    } catch (err) {
      return {
        success: false,
        data: null,
        error: err instanceof Error ? err.message : "Visibility tool execution failed.",
      };
    }
  }
}
