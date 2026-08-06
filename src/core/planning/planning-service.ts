/**
 * Planning Engine Supabase Persistence & Task Sync Service
 * Eminarc Growth OS Core
 */

import { supabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { ServiceResult } from "@/lib/supabase/types";
import { ExecutionPlanRow, MachineReadableExecutionSpec } from "./types";
import { createTask } from "@/services/tasks";

export class PlanningService {
  /**
   * Save compiled machine-readable execution plan in Supabase `execution_plans` table
   */
  static async saveExecutionPlan(
    workspaceId: string,
    spec: MachineReadableExecutionSpec,
    strategyId?: string,
  ): Promise<ServiceResult<ExecutionPlanRow>> {
    if (!isSupabaseConfigured()) {
      return {
        data: null,
        error: new Error("Supabase environment variables are not configured."),
      };
    }

    try {
      const insertPayload = {
        workspace_id: workspaceId,
        strategy_id: strategyId || null,
        title: spec.title,
        status: "active",
        campaigns: spec.campaigns as any,
        projects: spec.projects as any,
        tasks: spec.tasks as any,
        kpis: spec.kpis as any,
        machine_readable_spec: spec as any,
      };

      const { data, error } = await supabase
        .from("execution_plans")
        .insert(insertPayload)
        .select()
        .single();

      if (error) throw error;

      // Automatically sync tasks into Supabase `tasks` table
      await this.syncTasksToSupabase(workspaceId, spec.tasks);

      return { data, error: null };
    } catch (err) {
      console.error("[PlanningService.saveExecutionPlan] Error:", err);
      return {
        data: null,
        error: err instanceof Error ? err : new Error("Failed to save execution plan in Supabase."),
      };
    }
  }

  /**
   * Retrieve active Execution Plan for a workspace
   */
  static async getExecutionPlan(
    workspaceId: string,
    strategyId?: string,
  ): Promise<ServiceResult<ExecutionPlanRow>> {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error("Supabase is unconfigured.") };
    }

    try {
      let query = supabase
        .from("execution_plans")
        .select("*")
        .eq("workspace_id", workspaceId)
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(1);

      if (strategyId) {
        query = query.eq("strategy_id", strategyId);
      }

      const { data, error } = await query.maybeSingle();
      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      console.error("[PlanningService.getExecutionPlan] Error:", err);
      return {
        data: null,
        error: err instanceof Error ? err : new Error("Failed to retrieve execution plan."),
      };
    }
  }

  /**
   * Sync machine-readable tasks into Supabase `tasks` table
   */
  static async syncTasksToSupabase(
    workspaceId: string,
    tasks: MachineReadableExecutionSpec["tasks"],
  ): Promise<void> {
    try {
      for (const t of tasks) {
        await createTask(
          {
            title: t.title,
            description: `${t.description}\nAssigned Owner: ${t.owner}\nDependencies: ${t.dependencies.length > 0 ? t.dependencies.join(", ") : "None"}`,
            category: (t.priority === "High" ? "Outreach" : "Content") as any,
            priority: t.priority,
            dueDate: t.deadlineIso.split("T")[0],
          },
          workspaceId,
        );
      }
    } catch (err) {
      console.warn("[PlanningService.syncTasksToSupabase] Warning syncing tasks:", err);
    }
  }
}
