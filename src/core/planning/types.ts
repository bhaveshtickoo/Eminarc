/**
 * Machine-Readable Planning Engine Types & Schemas
 * Eminarc Growth OS Core
 */

import { Database } from "@/lib/supabase/types";

export type ExecutionPlanRow = Database["public"]["Tables"]["execution_plans"]["Row"];
export type ExecutionPlanInsert = Database["public"]["Tables"]["execution_plans"]["Insert"];
export type ExecutionPlanUpdate = Database["public"]["Tables"]["execution_plans"]["Update"];

export interface CampaignPlan {
  id: string;
  name: string;
  channel: string;
  objective: string;
  owner: string;
  deadlineIso: string;
  targetMetrics: string;
}

export interface ProjectPlan {
  id: string;
  name: string;
  category: "Outreach" | "Content" | "Technical" | "SEO" | "CRM";
  owner: string;
  deadlineIso: string;
  deliverables: string[];
}

export interface TaskPlan {
  id: string;
  title: string;
  description: string;
  projectId?: string;
  campaignId?: string;
  owner: string; // e.g. "Founder Research Agent", "Content Strategist", "Growth Lead"
  deadlineIso: string; // Machine-readable ISO timestamp
  dependencies: string[]; // DAG array of prerequisite task IDs
  status: "Pending" | "In Progress" | "Completed";
  priority: "High" | "Medium" | "Low";
}

export interface KPIPlan {
  id: string;
  metric: string;
  targetBenchmark: string;
  owner: string;
  measurementFrequency: "Daily" | "Weekly" | "Monthly";
}

export interface MachineReadableExecutionSpec {
  specVersion: string;
  title: string;
  workspaceId: string;
  strategyId?: string;
  campaigns: CampaignPlan[];
  projects: ProjectPlan[];
  tasks: TaskPlan[];
  kpis: KPIPlan[];
}
