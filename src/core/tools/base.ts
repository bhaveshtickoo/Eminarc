/**
 * Model Context Protocol (MCP) Compatible Tool Interfaces
 * Eminarc Growth OS Core
 */

export interface ToolParameterSchema {
  type: "string" | "number" | "boolean" | "object" | "array";
  description?: string;
  enum?: string[];
  required?: boolean;
}

export interface AIToolDefinition {
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, ToolParameterSchema>;
    required?: string[];
  };
}

export interface AIToolResult<T = any> {
  success: boolean;
  data: T | null;
  error?: string;
  metadata?: Record<string, any>;
}

export interface AITool<TParams = any, TResult = any> {
  definition: AIToolDefinition;
  execute(params: TParams, context?: any): Promise<AIToolResult<TResult>>;
}
