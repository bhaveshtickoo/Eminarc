/**
 * Campaign Engine Supabase Database Service
 * Eminarc Growth OS Core
 */

import { supabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { ServiceResult } from "@/lib/supabase/types";
import { CampaignSpec, CampaignStatus, CampaignType, GrowthCampaignRow } from "./types";
import { createTask } from "@/services/tasks";
import { aiMemoryManager } from "../memory/memory-manager";

export class CampaignService {
  /**
   * Save compiled growth campaign in Supabase `growth_campaigns` table
   */
  static async saveCampaign(
    workspaceId: string,
    spec: CampaignSpec,
    operatingPlanId?: string,
  ): Promise<ServiceResult<GrowthCampaignRow>> {
    if (!isSupabaseConfigured()) {
      return {
        data: null,
        error: new Error("Supabase environment variables are not configured."),
      };
    }

    try {
      const insertPayload = {
        workspace_id: workspaceId,
        operating_plan_id: operatingPlanId || null,
        title: spec.title,
        type: spec.type,
        goal: spec.goal,
        audience: spec.audience,
        messaging: spec.messaging,
        assets: spec.assets as any,
        tasks: spec.tasks as any,
        timeline: spec.timeline,
        kpis: spec.kpis as any,
        status: spec.status || "draft",
        raw_json: spec as any,
      };

      const { data, error } = await supabase
        .from("growth_campaigns")
        .insert(insertPayload)
        .select()
        .single();

      if (error) throw error;

      // Sync tasks into Supabase `tasks` table
      if (spec.tasks && spec.tasks.length > 0) {
        for (const t of spec.tasks) {
          await createTask(
            {
              title: `[${spec.type} Campaign] ${t.title}`,
              description: `${t.description}\nCampaign Goal: ${spec.goal}`,
              category: "Outreach",
              priority: "High",
              dueDate: t.dueDate,
            },
            workspaceId,
          );
        }
      }

      // Ingest Campaign context into Workspace Memory
      await aiMemoryManager.saveMemoryItem({
        workspaceId,
        memoryType: "campaign",
        key: `campaign-${data.id}`,
        content: `Growth Campaign (${spec.type} — ${spec.title}): Goal=${spec.goal}, Audience=${spec.audience}, Messaging=${spec.messaging}.`,
        tags: ["growth-campaign", spec.type.toLowerCase(), "outreach"],
      });

      return { data, error: null };
    } catch (err) {
      console.error("[CampaignService.saveCampaign] Error:", err);
      return {
        data: null,
        error: err instanceof Error ? err : new Error("Failed to save campaign in Supabase."),
      };
    }
  }

  /**
   * Retrieve workspace growth campaigns
   */
  static async getWorkspaceCampaigns(
    workspaceId: string,
    typeFilter?: CampaignType,
  ): Promise<ServiceResult<GrowthCampaignRow[]>> {
    if (!isSupabaseConfigured()) {
      return { data: [], error: null };
    }

    try {
      let query = supabase
        .from("growth_campaigns")
        .select("*")
        .eq("workspace_id", workspaceId)
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

      if (typeFilter) {
        query = query.eq("type", typeFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return { data: data || [], error: null };
    } catch (err) {
      console.error("[CampaignService.getWorkspaceCampaigns] Error:", err);
      return {
        data: null,
        error: err instanceof Error ? err : new Error("Failed to retrieve campaigns."),
      };
    }
  }

  /**
   * Update campaign status
   */
  static async updateCampaignStatus(
    campaignId: string,
    status: CampaignStatus,
  ): Promise<ServiceResult<GrowthCampaignRow>> {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error("Supabase is unconfigured.") };
    }

    try {
      const { data, error } = await supabase
        .from("growth_campaigns")
        .update({ status })
        .eq("id", campaignId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err : new Error("Failed to update status."),
      };
    }
  }
}
