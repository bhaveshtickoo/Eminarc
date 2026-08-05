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
  category?: string;
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
    let query = supabase.from("content_items").select("*").order("created_at", { ascending: false });
    if (workspaceId) {
      query = query.eq("workspace_id", workspaceId);
    }
    const { data } = await query;

    if (data && data.length > 0) {
      return data.map((row) => ({
        id: row.id,
        title: row.title,
        description: row.content || "Growth OS Execution Task",
        status: (row.status as any) === "Published" ? "Completed" : "In Progress",
        priority: "High" as const,
        dueDate: row.scheduled_at ? row.scheduled_at.split("T")[0] : undefined,
        assignedTo: "Growth OS Agent",
      }));
    }
  } catch (err) {
    console.warn("[TasksService] Query warning:", err);
  }

  return defaultMockTasks;
}

export async function createTask(
  payload: Partial<TaskItemData>,
  workspaceId: string
): Promise<TaskItemData> {
  const newTask: TaskItemData = {
    id: `tsk-${Date.now()}`,
    title: payload.title || "New Execution Task",
    description: payload.description || "Growth OS Task",
    status: payload.status || "Pending",
    priority: payload.priority || "High",
    dueDate: payload.dueDate || new Date().toISOString().split("T")[0],
    assignedTo: payload.assignedTo || "Growth OS Agent",
  };

  if (isSupabaseConfigured()) {
    try {
      await supabase.from("content_items").insert({
        workspace_id: workspaceId,
        title: newTask.title,
        content: newTask.description,
        status: "Draft",
        scheduled_at: newTask.dueDate ? new Date(newTask.dueDate).toISOString() : null,
      });
    } catch (err) {
      console.warn("[TasksService.createTask] Supabase warning:", err);
    }
  }

  return newTask;
}
