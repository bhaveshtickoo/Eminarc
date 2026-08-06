/**
 * Model Context Protocol (MCP) Tool Registry Engine
 * Eminarc Growth OS AI Core
 */

import { AITool, AIToolDefinition, AIToolResult } from "./base";
import { WebsiteScraperTool } from "./implementations/website-scraper-tool";
import { CompanyLookupTool } from "./implementations/company-lookup-tool";
import { LinkedInLookupTool } from "./implementations/linkedin-lookup-tool";
import { CRMTool } from "./implementations/crm-tool";
import { ResearchTool } from "./implementations/research-tool";
import { ContentTool } from "./implementations/content-tool";
import { VisibilityTool } from "./implementations/visibility-tool";
import { DistributionTool } from "./implementations/distribution-tool";
import { TaskTool } from "./implementations/task-tool";

export class ToolRegistry {
  private tools = new Map<string, AITool>();

  constructor() {
    // Register built-in tools out of the box
    this.register(new WebsiteScraperTool());
    this.register(new CompanyLookupTool());
    this.register(new LinkedInLookupTool());
    this.register(new CRMTool());
    this.register(new ResearchTool());
    this.register(new ContentTool());
    this.register(new VisibilityTool());
    this.register(new DistributionTool());
    this.register(new TaskTool());
  }

  /**
   * Register a new MCP-compatible AI tool
   */
  register(tool: AITool): void {
    if (this.tools.has(tool.definition.name)) {
      console.warn(`[ToolRegistry] Overwriting existing tool "${tool.definition.name}"`);
    }
    this.tools.set(tool.definition.name, tool);
  }

  /**
   * Retrieve a tool by name
   */
  get(name: string): AITool | undefined {
    return this.tools.get(name);
  }

  /**
   * List all registered tool definitions in standard MCP format
   */
  listDefinitions(): AIToolDefinition[] {
    return Array.from(this.tools.values()).map((t) => t.definition);
  }

  /**
   * Dynamically execute a tool by name with structured parameters
   */
  async execute<TParams = any, TResult = any>(
    name: string,
    params: TParams,
    context?: any,
  ): Promise<AIToolResult<TResult>> {
    const tool = this.get(name);
    if (!tool) {
      return {
        success: false,
        data: null,
        error: `Tool "${name}" is not registered in ToolRegistry.`,
      };
    }

    try {
      return await tool.execute(params, context);
    } catch (err) {
      return {
        success: false,
        data: null,
        error: err instanceof Error ? err.message : `Execution error in tool "${name}".`,
      };
    }
  }

  /**
   * Generate complete Model Context Protocol (MCP) server manifest payload
   */
  getMCPManifest() {
    return {
      schemaVersion: "1.0.0",
      serverName: "Eminarc Growth OS AI Tool Server",
      tools: this.listDefinitions(),
    };
  }
}

export const globalToolRegistry = new ToolRegistry();
