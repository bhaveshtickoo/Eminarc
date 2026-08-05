/**
 * AI Task Generator Types & Interfaces
 * Eminarc Growth OS Core
 */

import { Database } from "@/lib/supabase/types";

export type WorkspaceProjectRow = Database["public"]["Tables"]["workspace_projects"]["Row"];
export type WorkspaceTaskRow = Database["public"]["Tables"]["workspace_tasks"]["Row"];

export type TaskPriority = "Critical" | "High" | "Medium" | "Low";
export type TaskStatus = "Pending" | "In Progress" | "Completed" | "Blocked";

export interface SubtaskItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface GeneratedProjectSpec {
  id: string;
  workspaceId: string;
  campaignId?: string;
  title: string;
  description: string;
  category: string;
  status: "active" | "completed" | "archived";
}

export interface GeneratedTaskSpec {
  id: string;
  workspaceId: string;
  campaignId?: string;
  projectId?: string;
  title: string;
  description: string;
  subtasks: SubtaskItem[];
  dependencies: string[]; // DAG task ID prerequisites
  dueDate: string; // YYYY-MM-DD
  priority: TaskPriority;
  estimatedEffortHours: number; // Numeric effort in hours
  assignedOwner: string;
  status: TaskStatus;
}
