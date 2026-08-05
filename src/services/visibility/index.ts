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
  score: 74,
  platforms: [
    { platform: "ChatGPT", citationsMonth: 14, status: "Found" },
    { platform: "Claude", citationsMonth: 9, status: "Found" },
    { platform: "Gemini", citationsMonth: 2, status: "Found" },
    { platform: "Perplexity", citationsMonth: 16, status: "Found" },
  ],
  lastScanned: "Just now",
};

export async function getVisibilityAudit(
  workspaceId?: string
): Promise<VisibilityAuditResult> {
  if (!isSupabaseConfigured()) {
    return defaultMockVisibility;
  }

  try {
    let query = supabase.from("workspaces").select("*");
    if (workspaceId) {
      query = query.eq("id", workspaceId);
    }

    const { data } = await query;
    const currentWs = data?.[0];

    if (currentWs?.metrics && typeof currentWs.metrics === "object") {
      const visScore = (currentWs.metrics as any).aiVisibility || 74;
      return {
        score: Number(visScore),
        platforms: defaultMockVisibility.platforms,
        lastScanned: "Just now",
      };
    }
  } catch (err) {
    console.warn("[VisibilityService] Query warning:", err);
  }

  return defaultMockVisibility;
}

export async function runVisibilityScan(
  domain: string
): Promise<VisibilityAuditResult> {
  return {
    score: 78,
    platforms: [
      { platform: "ChatGPT", citationsMonth: 16, status: "Found" },
      { platform: "Claude", citationsMonth: 11, status: "Found" },
      { platform: "Gemini", citationsMonth: 4, status: "Found" },
      { platform: "Perplexity", citationsMonth: 18, status: "Found" },
    ],
    lastScanned: "Just now",
  };
}
