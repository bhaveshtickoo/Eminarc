/**
 * Intent Router Types & Decision Contracts
 * Eminarc Growth OS Core
 */

export type CopilotIntent =
  | "Research"
  | "Strategy"
  | "Planning"
  | "Campaign"
  | "Task generation"
  | "Dashboard insights"
  | "KPI explanation"
  | "Report generation"
  | "Workspace navigation"
  | "General chat"
  | "CRM"
  | "Content"
  | "Visibility"
  | "Distribution"
  | "Unknown";

export interface ExtractedEntities {
  companyName?: string;
  domain?: string;
  channel?: string;
  topic?: string;
  timeframe?: string;
  navigationTarget?: string;
  actionPayload?: Record<string, any>;
  rawKeywords?: string[];
}

export interface RoutingDecision {
  intent: CopilotIntent;
  agentId: string;
  confidenceScore: number; // 0.00 to 1.00
  entities: ExtractedEntities;
  reasoning: string;
  isFallback: boolean;
}
