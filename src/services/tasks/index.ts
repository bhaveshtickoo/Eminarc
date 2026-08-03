/**
 * Tasks Service Layer — Supabase Data Binding
 * Eminarc Growth OS
 */

import { supabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export interface TaskItemData {
  id: string;
  title: string;
  description?: string;
  status: "Pending" | "In Progress" | "Completed";
  priority: "High" | "Medium" | "Low";
  dueDate?: string;
  assignedTo?: string;
}

export const defaultMockTasks: TaskItemData[] = [
  {
    id: "tsk-1",
    title: "Publish Founder Positioning Teardown on LinkedIn",
    description: "Convert long-form research into a 7-slide carousel for founder brand building.",
    status: "In Progress",
    priority: "High",
    dueDate: "2026-08-05",
    assignedTo: "Bhavesh Tickoo",
  },
  {
    id: "tsk-2",
    title: "Audit Perplexity & ChatGPT Citation Schema",
    description: "Verify structured JSON-LD schema deployment for AI search engine radar.",
    status: "Pending",
    priority: "High",
    dueDate: "2026-08-07",
    assignedTo: "Pratyush",
  },
  {
    id: "tsk-3",
    title: "Send Q3 Growth OS Proposal to Enterprise Leads",
    description: "Follow up with seed-to-series B SaaS founders in CRM pipeline.",
    status: "Completed",
    priority: "Medium",
    dueDate: "2026-08-02",
    assignedTo: "Aditya",
  },
];

export async function getTasks(workspaceId?: string): Promise<TaskItemData[]> {
  if (!isSupabaseConfigured()) {
    return defaultMockTasks;
  }

  try {
    let query = supabase
      .from("tasks")
      .select("*")
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (workspaceId) {
      query = query.eq("workspace_id", workspaceId);
    }

    const { data, error } = await query;
    if (error) throw error;

    if (!data || data.length === 0) {
      return defaultMockTasks;
    }

    return data.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description || undefined,
      status: (row.status as any) || "Pending",
      priority: (row.priority as any) || "Medium",
      dueDate: row.due_date ? row.due_date.split("T")[0] : undefined,
      assignedTo: row.assigned_to || "Team Member",
    }));
  } catch (err) {
    console.warn("[TasksService] Falling back to default data due to query error:", err);
    return defaultMockTasks;
  }
}
