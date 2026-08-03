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
      .from("agent_runs")
      .select("*")
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (workspaceId) {
      query = query.eq("workspace_id", workspaceId);
    }

    const { data, error } = await query;
    if (error) throw error;

    if (!data || data.length === 0) {
      return defaultMockAgents;
    }

    return data.map((row) => ({
      id: row.id,
      name: row.agent_name || "Autonomous Agent",
      role: row.agent_type || "Growth Worker",
      status: (row.status as any) || "Active",
      lastRun: row.created_at ? `${Math.round((Date.now() - new Date(row.created_at).getTime()) / 60000)}m ago` : "Recently",
      tasksCompleted: row.duration_ms ? Math.round(row.duration_ms / 100) : 42,
    }));
  } catch (err) {
    console.warn("[AgentsService] Falling back to default data due to query error:", err);
    return defaultMockAgents;
  }
}

export async function getCopilotInsights(): Promise<CopilotInsightData> {
  // Mock insights response generator (Do not connect live AI)
  return {
    alert: "Your LinkedIn impressions dropped 18%.",
    subtext: "Based on algorithmic engagement patterns over the last 7 days.",
    confidenceScore: 92,
    suggestedActions: [
      "Publish founder story",
      "Reply to comments",
      "Improve your headline",
      "Target Healthcare ICP",
    ],
  };
}
