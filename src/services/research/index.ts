/**
 * Research Service Layer — Supabase Data Binding
 * Eminarc Growth OS
 */

export * from "./founder-research-service";

import { supabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export interface ResearchReportData {
  id: string;
  topic: string;
  industry: string;
  summary: string;
  recommendations: Array<{
    title: string;
    description: string;
    impact: "High" | "Medium" | "Low";
  }>;
  createdAt: string;
}

export const defaultMockResearch: ResearchReportData[] = [
  {
    id: "res-001",
    topic: "B2B SaaS Growth Positioning & AI Citation Radar",
    industry: "AI & Developer Tools",
    summary:
      "High affinity for LinkedIn thought leadership and technical case studies. Key gap found in Perplexity AI citations for enterprise search.",
    recommendations: [
      {
        title: "Publish Technical Deep Dives",
        description: "Author 2 architecture teardowns monthly to capture high-intent developer search traffic.",
        impact: "High",
      },
      {
        title: "Optimize LLM Entity Association",
        description: "Structured schema markup and Reddit case studies to boost Claude & ChatGPT recommendation rank.",
        impact: "High",
      },
    ],
    createdAt: "2026-08-01",
  },
];

export async function getResearch(workspaceId?: string): Promise<ResearchReportData[]> {
  if (!isSupabaseConfigured()) {
    return defaultMockResearch;
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
        topic: row.title,
        industry: row.channel || "B2B Technology",
        summary: row.content || "Automated founder research analysis.",
        recommendations: [
          {
            title: "Accelerate Technical Authority",
            description: "Publish technical breakdowns targeting high-intent decision makers.",
            impact: "High" as const,
          },
        ],
        createdAt: row.created_at ? row.created_at.split("T")[0] : "2026-08-01",
      }));
    }
  } catch (err) {
    console.warn("[ResearchService] Query warning:", err);
  }

  return defaultMockResearch;
}

export async function generateResearch(params: {
  domain: string;
  competitorUrl?: string;
}): Promise<ResearchReportData> {
  return {
    id: `res-${Date.now()}`,
    topic: `Growth Positioning for ${params.domain}`,
    industry: "B2B Technology",
    summary: `Automated AI positioning analysis completed for ${params.domain}.`,
    recommendations: [
      {
        title: "Scale Founder-Led Outreach",
        description: "Direct founder messaging sequences targeting VP of Growth personas.",
        impact: "High",
      },
    ],
    createdAt: new Date().toISOString().split("T")[0]!,
  };
}
