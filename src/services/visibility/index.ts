/**
 * AI Visibility Radar Service Layer — Supabase Data Binding
 * Eminarc Growth OS
 */

import { supabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export interface VisibilityPlatformScore {
  platform: string;
  citationsMonth: number;
  status: "Found" | "Missing";
}

export interface VisibilityAuditResult {
  score: number;
  platforms: VisibilityPlatformScore[];
  lastScanned: string;
}

export const defaultMockVisibility: VisibilityAuditResult = {
  score: 63,
  platforms: [
    { platform: "ChatGPT", citationsMonth: 12, status: "Found" },
    { platform: "Claude", citationsMonth: 8, status: "Found" },
    { platform: "Gemini", citationsMonth: 0, status: "Missing" },
    { platform: "Perplexity", citationsMonth: 15, status: "Found" },
  ],
  lastScanned: "2 minutes ago",
};

export async function getVisibilityAudit(
  workspaceId?: string
): Promise<VisibilityAuditResult> {
  if (!isSupabaseConfigured()) {
    return defaultMockVisibility;
  }

  try {
    let query = supabase
      .from("visibility_reports")
      .select("*")
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (workspaceId) {
      query = query.eq("workspace_id", workspaceId);
    }

    const { data, error } = await query;
    if (error) throw error;

    if (!data || data.length === 0) {
      return defaultMockVisibility;
    }

    const latest = data[0];
    const platforms: VisibilityPlatformScore[] = Array.isArray(latest.llm_citations)
      ? (latest.llm_citations as any)
      : defaultMockVisibility.platforms;

    return {
      score: Number(latest.overall_score) || 63,
      platforms,
      lastScanned: latest.scanned_at
        ? new Date(latest.scanned_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "Just now",
    };
  } catch (err) {
    console.warn("[VisibilityService] Falling back to default data due to query error:", err);
    return defaultMockVisibility;
  }
}

export async function runVisibilityScan(
  domain: string
): Promise<VisibilityAuditResult> {
  // Mock scanner trigger (Do not connect live AI)
  return {
    score: 68,
    platforms: [
      { platform: "ChatGPT", citationsMonth: 14, status: "Found" },
      { platform: "Claude", citationsMonth: 9, status: "Found" },
      { platform: "Gemini", citationsMonth: 2, status: "Found" },
      { platform: "Perplexity", citationsMonth: 16, status: "Found" },
    ],
    lastScanned: "Just now",
  };
}
