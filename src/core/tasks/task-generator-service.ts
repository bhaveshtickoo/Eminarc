/**
 * AI Task Generator Supabase Service (Manual Edits & Queries)
 * Eminarc Growth OS Core
 */

import { supabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { ServiceResult } from "@/lib/supabase/types";
import {
  GeneratedProjectSpec,
  GeneratedTaskSpec,
  WorkspaceProjectRow,
  WorkspaceTaskRow,
} from "./types";

export class TaskGeneratorService {
  /**
   * Save compiled projects in Supabase `workspace_projects` table
   */
  static async saveProjects(
    workspaceId: string,
    projects: GeneratedProjectSpec[],
  ): Promise<ServiceResult<WorkspaceProjectRow[]>> {
    if (!isSupabaseConfigured()) {
      return { data: [], error: null };
    }

    try {
      const insertPayloads = projects.map((p) => ({
        workspace_id: workspaceId,
        campaign_id: p.campaignId || null,
        title: p.title,
        description: p.description,
        category: p.category,
        status: p.status || "active",
      }));

      const { data, error } = await supabase
        .from("workspace_projects")
        .insert(insertPayloads)
        .select();

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (err) {
      console.error("[TaskGeneratorService.saveProjects] Error:", err);
      return {
        data: null,
        error: err instanceof Error ? err : new Error("Failed to save projects in Supabase."),
      };
    }
  }

  /**
   * Save compiled tasks in Supabase `workspace_tasks` table
   */
  static async saveTasks(
    workspaceId: string,
    tasks: GeneratedTaskSpec[],
  ): Promise<ServiceResult<WorkspaceTaskRow[]>> {
    if (!isSupabaseConfigured()) {
      return { data: [], error: null };
    }

    try {
      const insertPayloads = tasks.map((t) => ({
        workspace_id: workspaceId,
        campaign_id: t.campaignId || null,
        project_id: t.projectId || null,
        title: t.title,
        description: t.description,
        subtasks: t.subtasks as any,
        dependencies: t.dependencies as any,
        due_date: t.dueDate,
        priority: t.priority,
        estimated_effort_hours: t.estimatedEffortHours,
        assigned_owner: t.assignedOwner,
        status: t.status,
        raw_json: t as any,
      }));

      const { data, error } = await supabase
        .from("workspace_tasks")
        .insert(insertPayloads)
        .select();

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (err) {
      console.error("[TaskGeneratorService.saveTasks] Error:", err);
      return {
        data: null,
        error: err instanceof Error ? err : new Error("Failed to save tasks in Supabase."),
      };
    }
  }

  /**
   * Retrieve projects for a workspace
   */
  static async getWorkspaceProjects(
    workspaceId: string,
  ): Promise<ServiceResult<WorkspaceProjectRow[]>> {
    if (!isSupabaseConfigured()) {
      return { data: [], error: null };
    }

    try {
      const { data, error } = await supabase
        .from("workspace_projects")
        .select("*")
        .eq("workspace_id", workspaceId)
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (err) {
      console.error("[TaskGeneratorService.getWorkspaceProjects] Error:", err);
      return {
        data: [],
        error: err instanceof Error ? err : new Error("Failed to retrieve workspace projects."),
      };
    }
  }

  /**
   * Retrieve generated tasks for a workspace
   */
  static async getWorkspaceTasks(
    workspaceId: string,
    campaignId?: string,
    projectId?: string,
  ): Promise<ServiceResult<WorkspaceTaskRow[]>> {
    if (!isSupabaseConfigured()) {
      return { data: [], error: null };
    }

    try {
      let query = supabase
        .from("workspace_tasks")
        .select("*")
        .eq("workspace_id", workspaceId)
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

      if (campaignId) {
        query = query.eq("campaign_id", campaignId);
      }

      if (projectId) {
        query = query.eq("project_id", projectId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return { data: data || [], error: null };
    } catch (err) {
      console.error("[TaskGeneratorService.getWorkspaceTasks] Error:", err);
      return {
        data: [],
        error: err instanceof Error ? err : new Error("Failed to retrieve workspace tasks."),
      };
    }
  }

  /**
   * Support Manual Edits: Update Task properties in Supabase
   */
  static async updateTask(
    taskId: string,
    updates: Partial<GeneratedTaskSpec>,
  ): Promise<ServiceResult<WorkspaceTaskRow>> {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error("Supabase is unconfigured.") };
    }

    try {
      const payload: any = {};
      if (updates.title !== undefined) payload.title = updates.title;
      if (updates.description !== undefined) payload.description = updates.description;
      if (updates.subtasks !== undefined) payload.subtasks = updates.subtasks;
      if (updates.dependencies !== undefined) payload.dependencies = updates.dependencies;
      if (updates.dueDate !== undefined) payload.due_date = updates.dueDate;
      if (updates.priority !== undefined) payload.priority = updates.priority;
      if (updates.estimatedEffortHours !== undefined)
        payload.estimated_effort_hours = updates.estimatedEffortHours;
      if (updates.assignedOwner !== undefined) payload.assigned_owner = updates.assignedOwner;
      if (updates.status !== undefined) payload.status = updates.status;

      const { data, error } = await supabase
        .from("workspace_tasks")
        .update(payload)
        .eq("id", taskId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      console.error("[TaskGeneratorService.updateTask] Error:", err);
      return {
        data: null,
        error: err instanceof Error ? err : new Error("Failed to update task."),
      };
    }
  }

  /**
   * Support Task Graph Regeneration: Soft delete existing tasks for workspace
   */
  static async clearWorkspaceTasks(workspaceId: string): Promise<void> {
    if (!isSupabaseConfigured()) return;
    try {
      await supabase
        .from("workspace_tasks")
        .update({ deleted_at: new Date().toISOString() })
        .eq("workspace_id", workspaceId);
    } catch (err) {
      console.warn("[TaskGeneratorService.clearWorkspaceTasks] Warning:", err);
    }
  }
}
