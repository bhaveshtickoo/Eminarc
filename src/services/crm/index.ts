/**
 * CRM Service Layer — Supabase Data Binding
 * Eminarc Growth OS
 */

import { supabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  title: string;
  plan: string;
  status: string;
  score: number;
  mrr: number;
  source: string;
  joined: string;
  lastActive: string;
}

export interface PipelineSummaryData {
  totalValue: string;
  qualifiedCount: number;
  meetingsCount: number;
  proposalsCount: number;
  closedCount: number;
  avgDealSize: string;
  conversionRate: string;
}

const DEFAULT_LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Alex Morgan",
    email: "alex@vertextech.io",
    company: "Vertex Technologies",
    title: "CEO & Founder",
    plan: "Enterprise",
    status: "Qualified",
    score: 94,
    mrr: 2500,
    source: "LinkedIn Inbound",
    joined: "2026-07-28",
    lastActive: "Today",
  },
  {
    id: "lead-2",
    name: "Sarah Chen",
    email: "sarah@apexsaas.com",
    company: "Apex SaaS",
    title: "VP of Growth",
    plan: "Pro",
    status: "Proposal",
    score: 88,
    mrr: 1800,
    source: "GEO Citation",
    joined: "2026-07-30",
    lastActive: "Yesterday",
  },
  {
    id: "lead-3",
    name: "David Ross",
    email: "david@starlight.co",
    company: "Starlight Media",
    title: "Co-Founder",
    plan: "Pro",
    status: "New",
    score: 82,
    mrr: 1200,
    source: "Cold Outreach",
    joined: "2026-08-01",
    lastActive: "2 days ago",
  },
];

export async function getLeads(filters?: {
  status?: string;
  query?: string;
  workspaceId?: string;
}): Promise<Lead[]> {
  if (!isSupabaseConfigured()) {
    return filterLeads(DEFAULT_LEADS, filters);
  }

  try {
    let query = supabase.from("leads").select("*").order("created_at", { ascending: false });

    if (filters?.workspaceId) {
      query = query.eq("workspace_id", filters.workspaceId);
    }

    const { data, error } = await query;
    if (error) throw error;

    if (!data || data.length === 0) {
      return filterLeads(DEFAULT_LEADS, filters);
    }

    const leadsList: Lead[] = data.map((row) => ({
      id: row.id,
      name: row.contact_name || "Lead Contact",
      email: row.email || "lead@company.com",
      company: row.company_name || "Growth Target",
      title: (row.metadata as any)?.title || "Founder / Executive",
      plan: (row.metadata as any)?.plan || "Pro",
      status: (row.stage as any) || "New",
      score: row.score || 85,
      mrr: row.value ? Math.round(row.value / 12) : 150,
      source: (row.metadata as any)?.source || "LinkedIn Inbound",
      joined: row.created_at ? new Date(row.created_at).toLocaleDateString() : "Recently",
      lastActive: "Today",
    }));

    return filterLeads(leadsList, filters);
  } catch (err) {
    console.warn("[CRMService] Query warning:", err);
    return filterLeads(DEFAULT_LEADS, filters);
  }
}

function filterLeads(leadsList: Lead[], filters?: { status?: string; query?: string }): Lead[] {
  let result = [...leadsList];
  if (filters?.status && filters.status !== "All") {
    result = result.filter((l) => l.status.toLowerCase() === filters.status?.toLowerCase());
  }
  if (filters?.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.company.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q),
    );
  }
  return result;
}

export async function getPipeline(workspaceId?: string): Promise<PipelineSummaryData> {
  if (!isSupabaseConfigured()) {
    return {
      totalValue: "$12,400",
      qualifiedCount: 14,
      meetingsCount: 6,
      proposalsCount: 3,
      closedCount: 1,
      avgDealSize: "$516",
      conversionRate: "25%",
    };
  }

  try {
    let query = supabase.from("leads").select("*");
    if (workspaceId) {
      query = query.eq("workspace_id", workspaceId);
    }
    const { data: leads } = await query;

    if (leads && leads.length > 0) {
      const total = leads.reduce((acc, l) => acc + (l.value || 0), 0);
      return {
        totalValue: `$${total.toLocaleString()}`,
        qualifiedCount: leads.filter((l) => l.stage === "Qualified" || l.stage === "Proposal")
          .length,
        meetingsCount: leads.filter((l) => l.stage === "Proposal").length,
        proposalsCount: leads.filter((l) => l.stage === "Proposal").length,
        closedCount: leads.filter((l) => l.stage === "Closed Won").length,
        avgDealSize: `$${Math.round(total / leads.length)}`,
        conversionRate: `${Math.round((leads.filter((l) => l.stage === "Closed Won").length / leads.length) * 100)}%`,
      };
    }
  } catch {
    // Fallback
  }

  return {
    totalValue: "$12,400",
    qualifiedCount: 14,
    meetingsCount: 6,
    proposalsCount: 3,
    closedCount: 1,
    avgDealSize: "$516",
    conversionRate: "25%",
  };
}

export async function addLead(newLead: Partial<Lead>, workspaceId?: string): Promise<Lead> {
  if (isSupabaseConfigured() && workspaceId) {
    try {
      await supabase.from("leads").insert({
        workspace_id: workspaceId,
        company_name: newLead.company || "New Company",
        contact_name: newLead.name || "New Lead",
        email: newLead.email || null,
        stage: newLead.status || "New",
        value: newLead.mrr ? newLead.mrr * 12 : 1200,
        score: newLead.score || 85,
        metadata: {
          title: newLead.title,
          plan: newLead.plan,
          source: newLead.source,
        },
      });
    } catch (err) {
      console.warn("[CRMService] Insert lead warning:", err);
    }
  }

  const created: Lead = {
    id: `lead-${Date.now()}`,
    name: newLead.name || "New Lead",
    email: newLead.email || "lead@example.com",
    company: newLead.company || "Stealth Startup",
    title: newLead.title || "Founder",
    plan: newLead.plan || "Pro",
    status: newLead.status || "New",
    score: newLead.score || 85,
    mrr: newLead.mrr || 79,
    source: newLead.source || "LinkedIn",
    joined: "Just now",
    lastActive: "Now",
  };
  return created;
}
