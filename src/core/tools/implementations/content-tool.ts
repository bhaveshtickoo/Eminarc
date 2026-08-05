/**
 * Content Generation & Management Tool
 * Eminarc Growth OS AI Core
 */

import { AITool, AIToolDefinition, AIToolResult } from "../base";
import { getContent } from "@/services/content";

export interface ContentToolParams {
  workspaceId: string;
  channel?: string;
  status?: string;
}

export class ContentTool implements AITool<ContentToolParams, any> {
  definition: AIToolDefinition = {
    name: "content_tool",
    description: "Queries multi-channel content assets and social media drafts across growth channels.",
    parameters: {
      type: "object",
      properties: {
        workspaceId: {
          type: "string",
          description: "Workspace UUID context",
          required: true,
        },
        channel: {
          type: "string",
          description: "Filter by channel (e.g. LinkedIn, Medium, Reddit, Newsletter)",
        },
        status: {
          type: "string",
          description: "Filter by status (Draft, Scheduled, Published)",
        },
      },
      required: ["workspaceId"],
    },
  };

  async execute(params: ContentToolParams): Promise<AIToolResult<any>> {
    try {
      const items = await getContent({
        workspaceId: params.workspaceId,
        channel: params.channel,
        status: params.status,
      });

      return { success: true, data: items };
    } catch (err) {
      return {
        success: false,
        data: null,
        error: err instanceof Error ? err.message : "Content tool execution failed.",
      };
    }
  }
}
