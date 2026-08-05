/**
 * Growth Copilot Types & Intent Interfaces
 * Eminarc Growth OS Core
 */

export type CopilotIntentType =
  | "research"
  | "strategy"
  | "content"
  | "sequence"
  | "icp"
  | "recommendations"
  | "task_today"
  | "general";

export interface IntentParseResult {
  intent: CopilotIntentType;
  agentId: string;
  confidence: number;
  extractedEntities: {
    companyName?: string;
    domain?: string;
    topic?: string;
    channel?: string;
  };
  suggestedAction: string;
}

export interface CopilotMessage {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
  intent?: CopilotIntentType;
  agentId?: string;
  structuredData?: any;
  timestamp: string;
  audioUrl?: string; // Future voice synthesis URL
}

export interface CopilotSession {
  id: string;
  workspaceId: string;
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
