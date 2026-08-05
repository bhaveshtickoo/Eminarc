/**
 * Intent Router Types & Decision Contracts
 * Eminarc Growth OS Core
 */

export type CopilotIntent =
  | "Research"
  | "CRM"
  | "Content"
  | "Visibility"
  | "Distribution"
  | "Reports"
  | "Tasks"
  | "Strategy"
  | "Unknown";

export interface ExtractedEntities {
  companyName?: string;
  domain?: string;
  channel?: string;
  topic?: string;
  timeframe?: string;
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
