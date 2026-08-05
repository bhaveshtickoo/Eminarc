/**
 * Executive Reports Service Layer — Supabase Data Binding
 * Eminarc Growth OS
 */

import { supabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export interface ConsultingReportData {
  id: string;
  title: string;
  type: string;
  generatedAt: string;
  summary: string;
  downloadUrl?: string;
}

export const defaultMockReports: ConsultingReportData[] = [
  {
    id: "rep-1",
    title: "Weekly Founder Growth Performance Audit",
    type: "Growth Telemetry",
    generatedAt: "AUG 02, 2026",
    summary: "Comprehensive weekly growth score telemetry, pipeline velocity, and LLM visibility delta.",
  },
  {
    id: "rep-2",
    title: "Monthly AI Search Visibility & GEO Citation Teardown",
    type: "AI Visibility",
    generatedAt: "JUL 31, 2026",
    summary: "Audit of ChatGPT, Claude, and Perplexity citation share across 4 target SaaS categories.",
  },
  {
    id: "rep-3",
    title: "B2B CRM Pipeline & High-Intent Opportunity Report",
    type: "CRM Pipeline",
    generatedAt: "JUL 28, 2026",
    summary: "Pipeline conversion telemetry, lead distribution by channel, and forecasted ARR delta.",
  },
];

export async function getReports(workspaceId?: string): Promise<ConsultingReportData[]> {
  if (!isSupabaseConfigured()) {
    return defaultMockReports;
  }

  try {
    let query = supabase.from("content_items").select("*").order("created_at", { ascending: false });
    if (workspaceId) {
      query = query.eq("workspace_id", workspaceId);
    }
    const { data } = await query;

    if (data && data.length > 0) {
      return data.map((row) => ({
        id: row.id,
        title: row.title,
        type: row.type || "Growth Telemetry",
        generatedAt: row.created_at
          ? new Date(row.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase()
          : "AUG 01, 2026",
        summary: row.content || "Executive consulting performance teardown.",
      }));
    }
  } catch (err) {
    console.warn("[ReportsService] Query warning:", err);
  }

  return defaultMockReports;
}
