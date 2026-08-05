/**
 * Execution Planner Operating Plan Types
 * Eminarc Growth OS Core
 */

import { Database } from "@/lib/supabase/types";

export type OperatingPlanRow = Database["public"]["Tables"]["operating_plans"]["Row"];
export type OperatingPlanInsert = Database["public"]["Tables"]["operating_plans"]["Insert"];
export type OperatingPlanUpdate = Database["public"]["Tables"]["operating_plans"]["Update"];

export type ExecutionPriority = "Critical" | "High" | "Medium" | "Low";

export type ExecutionOwner =
  | "Founder Research Agent"
  | "Content Strategist"
  | "CRM Assistant"
  | "Visibility Analyst"
  | "Distribution Planner"
  | "Task Planner"
  | "Growth Lead"
  | "Unassigned Placeholder";

export interface CampaignSpec {
  id: string;
  name: string;
  channel: string;
  objective: string;
  priority: ExecutionPriority;
  expectedImpact: string;
  owner: ExecutionOwner;
  timeline: string;
  kpis: string[];
}

export interface ProjectSpec {
  id: string;
  name: string;
  category: "Outreach" | "Content" | "Technical" | "SEO" | "CRM";
  priority: ExecutionPriority;
  expectedImpact: string;
  owner: ExecutionOwner;
  timeline: string;
  deliverables: string[];
}

export interface MilestoneSpec {
  id: string;
  title: string;
  timeframe: "Days 1-30 (Foundation)" | "Days 31-60 (Optimization)" | "Days 61-90 (Scale)";
  targetDateIso: string;
  expectedImpact: string;
  keyDeliverables: string[];
  kpis: string[];
}

export interface TaskSpec {
  id: string;
  title: string;
  description: string;
  projectId?: string;
  campaignId?: string;
  milestoneId?: string;
  priority: ExecutionPriority;
  expectedImpact: string;
  owner: ExecutionOwner;
  timeline: string;
  dependencies: string[]; // DAG task ID prerequisites
  status: "Pending" | "In Progress" | "Completed";
}

export interface KPISpec {
  id: string;
  metric: string;
  targetBenchmark: string;
  owner: ExecutionOwner;
  cadence: "Daily" | "Weekly" | "Monthly";
}

export interface StructuredOperatingPlan {
  title: string;
  workspaceId: string;
  strategyId?: string;
  researchReportId?: string;
  campaigns: CampaignSpec[];
  projects: ProjectSpec[];
  milestones: MilestoneSpec[];
  tasks: TaskSpec[];
  kpis: KPISpec[];
}

export interface ExecutionInput {
  workspaceId: string;
  strategyId?: string;
  researchReportId?: string;
  strategyOutput?: any;
  researchOutput?: any;
  workspaceContext?: any;
}
