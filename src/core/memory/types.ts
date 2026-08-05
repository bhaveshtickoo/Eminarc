/**
 * AI Memory Domain Types & Interfaces
 * Eminarc Growth OS Core
 */

import { Database } from "@/lib/supabase/types";

export type MemoryType =
  | "workspace"
  | "company"
  | "founder"
  | "conversation"
  | "campaign"
  | "research";

export type AIMemoryRow = Database["public"]["Tables"]["ai_memories"]["Row"];
export type AIMemoryInsert = Database["public"]["Tables"]["ai_memories"]["Insert"];
export type AIMemoryUpdate = Database["public"]["Tables"]["ai_memories"]["Update"];

export interface MemorySearchOptions {
  workspaceId: string;
  type?: MemoryType;
  entityId?: string;
  limit?: number;
  query?: string; // Text search / future semantic embedding match
}

export interface WorkspaceMemoryData {
  name: string;
  domain?: string;
  industry?: string;
  tagline?: string;
  brandVoice?: string[];
  knowledgeBaseSummary?: string;
}

export interface CompanyMemoryData {
  companyId: string;
  name: string;
  website?: string;
  industry?: string;
  companySize?: string;
  description?: string;
}

export interface FounderMemoryData {
  founderId?: string;
  companyId: string;
  fullName: string;
  title?: string;
  bio?: string;
  linkedinUrl?: string;
}

export interface ConversationMemoryData {
  sessionId: string;
  messages: Array<{ role: "system" | "user" | "assistant"; content: string; timestamp: string }>;
  contextDirectives?: string[];
}

export interface CampaignMemoryData {
  campaignId: string;
  name: string;
  channel: string;
  targetLeadsCount: number;
  activeSequence: string;
  responseRate?: string;
}

export interface ResearchMemoryData {
  reportId?: string;
  companyId: string;
  icpSummary: string;
  painPoints: string[];
  buyingSignals: string[];
  techStack: string[];
  opportunityScore: number;
}

export interface FullAgentMemoryContext {
  workspace?: WorkspaceMemoryData;
  company?: CompanyMemoryData;
  founder?: FounderMemoryData;
  conversation?: ConversationMemoryData;
  campaign?: CampaignMemoryData;
  research?: ResearchMemoryData;
  formattedSystemContext: string;
}

/**
 * Interface hook for future Semantic Vector Retrieval integration (e.g. pgvector)
 */
export interface ISemanticMemoryRetriever {
  searchSimilar(query: string, workspaceId: string, limit?: number): Promise<AIMemoryRow[]>;
}
