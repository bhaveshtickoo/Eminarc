/**
 * Growth OS Task Management Tool
 * Eminarc Growth OS AI Core
 */

import { AITool, AIToolDefinition, AIToolResult } from "../base";
import { getTasks, Task } from "@/services/tasks";

export interface TaskToolParams {
  workspaceId: string;
  status?: string;
  category?: string;
}

export class TaskTool implements AITool<TaskToolParams, Task[]> {
  definition: AIToolDefinition = {
    name: "task_tool",
    description: "Queries and updates autonomous Growth OS execution tasks in Supabase.",
    parameters: {
      type: "object",
      properties: {
        workspaceId: {
          type: "string",
          description: "Workspace UUID context",
          required: true,
        },
        status: {
          type: "string",
          description: "Task status filter (Pending, In Progress, Completed)",
        },
        category: {
          type: "string",
          description: "Category filter (Outreach, Content, Technical)",
        },
      },
      required: ["workspaceId"],
    },
  };

  async execute(params: TaskToolParams): Promise<AIToolResult<Task[]>> {
    try {
      const tasks = await getTasks({
        workspaceId: params.workspaceId,
        status: params.status,
        category: params.category,
      });

      return { success: true, data: tasks };
    } catch (err) {
      return {
        success: false,
        data: null,
        error: err instanceof Error ? err.message : "Task tool execution failed.",
      };
    }
  }
}
