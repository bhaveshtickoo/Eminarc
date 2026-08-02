// CRM Service Layer — Isolates future Supabase CRM database & outreach pipeline integrations.

import { leads as mockLeads, Lead } from "@/data/mock-data";

export interface PipelineSummaryData {
  totalValue: string;
  qualifiedCount: number;
  meetingsCount: number;
  proposalsCount: number;
  closedCount: number;
  avgDealSize: string;
  conversionRate: string;
}

export async function getLeads(filters?: {
  status?: string;
  query?: string;
}): Promise<Lead[]> {
  // Static mock CRM service implementation
  let result = [...mockLeads];
  if (filters?.status && filters.status !== "All") {
    result = result.filter(
      (l) => l.status.toLowerCase() === filters.status?.toLowerCase(),
    );
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

export async function getPipeline(): Promise<PipelineSummaryData> {
  // Static mock pipeline summary service implementation
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

export async function addLead(newLead: Partial<Lead>): Promise<Lead> {
  // Mock lead creation placeholder
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
