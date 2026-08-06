/**
 * Autonomous AI Agents Service Layer — Supabase Data Binding
 * Eminarc Growth OS
 */

import { supabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export interface AIAgentStatusData {
  id: string;
  name: string;
  role: string;
  status: "Scanning" | "Active" | "Idle";
  lastRun: string;
  tasksCompleted: number;
}

export interface CopilotInsightData {
  alert: string;
  subtext: string;
  confidenceScore: number;
  suggestedActions: string[];
}

export const defaultMockAgents: AIAgentStatusData[] = [
  {
    id: "agent-1",
    name: "Search Visibility Radar",
    role: "LLM Citation Tracker",
    status: "Scanning",
    lastRun: "2m ago",
    tasksCompleted: 142,
  },
  {
    id: "agent-2",
    name: "Content Generation Engine",
    role: "Multi-Format Asset Creator",
    status: "Active",
    lastRun: "15m ago",
    tasksCompleted: 88,
  },
  {
    id: "agent-3",
    name: "Lead Enrichment Agent",
    role: "ICP Account Scanner",
    status: "Active",
    lastRun: "1h ago",
    tasksCompleted: 215,
  },
  {
    id: "agent-4",
    name: "Competitor Radar Agent",
    role: "Messaging Gap Monitor",
    status: "Idle",
    lastRun: "3h ago",
    tasksCompleted: 64,
  },
];

export async function getAgentsList(workspaceId?: string): Promise<AIAgentStatusData[]> {
  if (!isSupabaseConfigured()) {
    return defaultMockAgents;
  }

  try {
    let query = supabase
      .from("content_items")
      .select("*")
      .order("created_at", { ascending: false });
    if (workspaceId) {
      query = query.eq("workspace_id", workspaceId);
    }
    const { data } = await query;

    if (data && data.length > 0) {
      return data.map((row) => ({
        id: row.id,
        name: row.title || "Autonomous Agent",
        role: row.type || "Growth Worker",
        status: (row.status as any) === "Published" ? "Active" : "Scanning",
        lastRun: "Recently",
        tasksCompleted: 42,
      }));
    }
  } catch (err) {
    console.warn("[AgentsService] Query warning:", err);
  }

  return defaultMockAgents;
}

export async function getCopilotInsights(): Promise<CopilotInsightData> {
  return {
    alert: "Your LinkedIn impressions dropped 18%.",
    subtext: "Competitor Apex SaaS published 3 technical teardowns on LLM citation optimization.",
    confidenceScore: 94,
    suggestedActions: [
      "Generate 7-slide LinkedIn carousel from Founder Research",
      "Deploy JSON-LD GEO schema to capture Perplexity rank",
    ],
  };
}
