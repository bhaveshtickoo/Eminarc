/**
 * Content Service Layer — Supabase Data Binding
 * Eminarc Growth OS
 */

import { supabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export interface ContentItemData {
  id: string;
  title: string;
  channel: "LinkedIn" | "Medium" | "Reddit" | "Newsletter" | "Twitter";
  status: "Draft" | "Scheduled" | "Published";
  date: string;
  excerpt: string;
}

export const defaultMockContent: ContentItemData[] = [
  {
    id: "cnt-1",
    title: "Why Traditional B2B Marketing Funnels Are Broken in 2026",
    channel: "LinkedIn",
    status: "Published",
    date: "AUG 03",
    excerpt:
      "Buyers rely on AI search citations and peer communities before visiting landing pages...",
  },
  {
    id: "cnt-2",
    title: "Building an Autonomous AI Growth OS for Early-Stage B2B Founders",
    channel: "Medium",
    status: "Published",
    date: "AUG 04",
    excerpt: "Deep-dive architecture walkthrough on integrating LLM radar with direct outreach...",
  },
  {
    id: "cnt-3",
    title: "Case Study: Scaling MRR from ₹50K to ₹2L via Organic Reddit Distribution",
    channel: "Reddit",
    status: "Scheduled",
    date: "AUG 05",
    excerpt:
      "Transparent teardown of value-first community posts without self-promotion penalty...",
  },
];

export async function getContent(filters?: {
  channel?: string;
  status?: string;
  workspaceId?: string;
}): Promise<ContentItemData[]> {
  if (!isSupabaseConfigured()) {
    return filterContent(defaultMockContent, filters);
  }

  try {
    let query = supabase
      .from("content_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (filters?.workspaceId) {
      query = query.eq("workspace_id", filters.workspaceId);
    }

    const { data, error } = await query;
    if (error) throw error;

    if (!data || data.length === 0) {
      return filterContent(defaultMockContent, filters);
    }

    const items: ContentItemData[] = data.map((row) => ({
      id: row.id,
      title: row.title,
      channel: (row.channel as any) || "LinkedIn",
      status: (row.status as any) || "Draft",
      date: row.created_at
        ? new Date(row.created_at)
            .toLocaleDateString("en-US", { month: "short", day: "2-digit" })
            .toUpperCase()
        : "TODAY",
      excerpt: row.content || "Structured content asset generated for growth channels.",
    }));

    return filterContent(items, filters);
  } catch (err) {
    console.warn("[ContentService] Falling back to default data due to query error:", err);
    return filterContent(defaultMockContent, filters);
  }
}

function filterContent(
  items: ContentItemData[],
  filters?: { channel?: string; status?: string },
): ContentItemData[] {
  let result = [...items];
  if (filters?.channel && filters.channel !== "All") {
    result = result.filter((c) => c.channel.toLowerCase() === filters.channel?.toLowerCase());
  }
  if (filters?.status && filters.status !== "All") {
    result = result.filter((c) => c.status.toLowerCase() === filters.status?.toLowerCase());
  }
  return result;
}

export async function generateContent(params: {
  topic: string;
  format: string;
  tone?: string;
}): Promise<ContentItemData> {
  // Mock generator placeholder (Do not connect live AI)
  return {
    id: `cnt-${Date.now()}`,
    title: params.topic,
    channel: (params.format as any) || "LinkedIn",
    status: "Draft",
    date: "TODAY",
    excerpt: `AI generated content draft for ${params.topic} formatted as ${params.format}.`,
  };
}

export async function repurposeContent(
  assetId: string,
  targetFormat: string,
): Promise<ContentItemData> {
  // Mock generator placeholder (Do not connect live AI)
  return {
    id: `repurpose-${Date.now()}`,
    title: `Repurposed Asset #${assetId} -> ${targetFormat}`,
    channel: (targetFormat as any) || "LinkedIn",
    status: "Draft",
    date: "TODAY",
    excerpt: `Automated ${targetFormat} adaptation of asset ${assetId}.`,
  };
}
