/**
 * Growth Copilot Types & Intent Interfaces
 * Eminarc Growth OS Core
 */

export type CopilotIntentType =
  | "research"
  | "strategy"
  | "planning"
  | "campaign"
  | "tasks"
  | "dashboard_insights"
  | "kpi_explanation"
  | "report"
  | "navigation"
  | "general"
  | "crm"
  | "content"
  | "visibility"
  | "distribution";

export interface IntentParseResult {
  intent: CopilotIntentType;
  agentId: string;
  confidence: number;
  extractedEntities: {
    companyName?: string;
    domain?: string;
    topic?: string;
    channel?: string;
    navigationTarget?: string;
  };
  suggestedAction: string;
}

export interface CopilotMessage {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
  intent?: CopilotIntentType | string;
  agentId?: string;
  structuredData?: any;
  navigationTarget?: string;
  codeBlocks?: Array<{ language: string; code: string }>;
  chartPayload?: { type: "bar" | "line" | "donut" | "kpi"; title: string; data: any };
  isStreaming?: boolean;
  isError?: boolean;
  timestamp: string;
  audioUrl?: string; // Future voice synthesis URL
}

export interface CopilotSession {
  id: string;
  workspaceId: string;
  title?: string;
  messages: CopilotMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface VoiceAudioInput {
  audioBlob?: Blob;
  mimeType?: string;
  transcript?: string;
}

export interface VoiceAudioOutput {
  audioUrl: string;
  durationSeconds: number;
}
