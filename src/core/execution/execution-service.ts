/**
 * Execution Planner Supabase Persistence Service
 * Eminarc Growth OS Core
 */

import { supabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { ServiceResult } from "@/lib/supabase/types";
import { OperatingPlanRow, StructuredOperatingPlan } from "./types";
import { createTask } from "@/services/tasks";

export class ExecutionService {
  /**
   * Save compiled Operating Plan in Supabase `operating_plans` table
   */
  static async saveOperatingPlan(
    workspaceId: string,
    plan: StructuredOperatingPlan,
    strategyId?: string,
    reportId?: string
  ): Promise<ServiceResult<OperatingPlanRow>> {
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
        research_report_id: reportId || null,
        title: plan.title,
        status: "active",
        campaigns: plan.campaigns as any,
        projects: plan.projects as any,
        milestones: plan.milestones as any,
        tasks: plan.tasks as any,
        kpis: plan.kpis as any,
        operating_plan_spec: plan as any,
      };

      const { data, error } = await supabase
        .from("operating_plans")
        .insert(insertPayload)
        .select()
        .single();

      if (error) throw error;

      // Sync tasks into Supabase `tasks` table
      await this.syncTasksToSupabase(workspaceId, plan.tasks);

      return { data, error: null };
    } catch (err) {
      console.error("[ExecutionService.saveOperatingPlan] Error:", err);
      return {
        data: null,
        error: err instanceof Error ? err : new Error("Failed to save operating plan in Supabase."),
      };
    }
  }

  /**
   * Retrieve active Operating Plan for workspace
   */
  static async getOperatingPlan(
    workspaceId: string,
    strategyId?: string
  ): Promise<ServiceResult<OperatingPlanRow>> {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error("Supabase is unconfigured.") };
    }

    try {
      let query = supabase
        .from("operating_plans")
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
      console.error("[ExecutionService.getOperatingPlan] Error:", err);
      return {
        data: null,
        error: err instanceof Error ? err : new Error("Failed to retrieve operating plan."),
      };
    }
  }

  /**
   * Sync operating tasks into Supabase `tasks` table
   */
  static async syncTasksToSupabase(
    workspaceId: string,
    tasks: StructuredOperatingPlan["tasks"]
  ): Promise<void> {
    try {
      for (const t of tasks) {
        await createTask(
          {
            title: t.title,
            description: `${t.description}\nExpected Impact: ${t.expectedImpact}\nAssigned Owner: ${t.owner}\nDependencies: ${t.dependencies.length > 0 ? t.dependencies.join(", ") : "None"}`,
            category: (t.priority === "Critical" || t.priority === "High" ? "Outreach" : "Content") as any,
            priority: t.priority === "Critical" ? "High" : t.priority,
            dueDate: new Date().toISOString().split("T")[0],
          },
          workspaceId
        );
      }
    } catch (err) {
      console.warn("[ExecutionService.syncTasksToSupabase] Warning syncing tasks:", err);
    }
  }
}
