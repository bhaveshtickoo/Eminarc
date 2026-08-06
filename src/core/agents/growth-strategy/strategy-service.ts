/**
 * Growth Strategy Supabase Database Persistence Service
 * Eminarc Growth OS Core
 */

import { supabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { ServiceResult } from "@/lib/supabase/types";
import { GrowthStrategyOutput, GrowthStrategyRow } from "./types";
import { aiMemoryManager } from "../../memory/memory-manager";

export class GrowthStrategyService {
  /**
   * Save a newly generated Growth Strategy in Supabase
   */
  static async saveStrategy(
    workspaceId: string,
    output: GrowthStrategyOutput,
    companyId?: string,
    researchReportId?: string,
  ): Promise<ServiceResult<GrowthStrategyRow>> {
    if (!isSupabaseConfigured()) {
      return {
        data: null,
        error: new Error("Supabase environment variables are not configured."),
      };
    }

    try {
      const insertPayload = {
        workspace_id: workspaceId,
        company_id: companyId || null,
        research_report_id: researchReportId || null,
        title: output.title,
        status: "completed",
        executive_summary: output.executiveSummary,
        icp: output.icp as any,
        buyer_personas: output.buyerPersonas as any,
        positioning: output.positioning as any,
        messaging_pillars: output.messagingPillars as any,
        value_proposition: output.valueProposition as any,
        market_opportunities: output.marketOpportunities as any,
        competitor_positioning: output.competitorPositioning as any,
        channel_strategy: output.channelStrategy as any,
        growth_roadmap: output.growthRoadmap as any,
        plan_30_60_90: output.plan306090 as any,
        success_metrics: output.successMetrics as any,
        raw_json: output as any,
        version: 1,
      };

      const { data, error } = await supabase
        .from("growth_strategies")
        .insert(insertPayload)
        .select()
        .single();

      if (error) throw error;

      // Ingest Strategy context into Workspace Memory
      await aiMemoryManager.saveMemoryItem({
        workspaceId,
        memoryType: "strategy",
        key: `growth-strategy-${data.id}`,
        content: `Growth Strategy Playbook (${output.title}): Positioning=${output.positioning.tagline}, Focus=${output.positioning.categoryName}, Outcome=${output.valueProposition.primaryOutcome}.`,
        tags: ["growth-strategy", "playbook", "okrs", "positioning"],
      });

      return { data, error: null };
    } catch (err) {
      console.error("[GrowthStrategyService.saveStrategy] Error:", err);
      return {
        data: null,
        error:
          err instanceof Error ? err : new Error("Failed to save Growth Strategy in Supabase."),
      };
    }
  }

  /**
   * Retrieve active Growth Strategy for a company or workspace
   */
  static async getStrategy(
    workspaceId: string,
    companyId?: string,
  ): Promise<ServiceResult<GrowthStrategyRow>> {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error("Supabase is unconfigured.") };
    }

    try {
      let query = supabase
        .from("growth_strategies")
        .select("*")
        .eq("workspace_id", workspaceId)
        .is("deleted_at", null)
        .order("version", { ascending: false })
        .limit(1);

      if (companyId) {
        query = query.eq("company_id", companyId);
      }

      const { data, error } = await query.maybeSingle();
      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      console.error("[GrowthStrategyService.getStrategy] Error:", err);
      return {
        data: null,
        error: err instanceof Error ? err : new Error("Failed to retrieve Growth Strategy."),
      };
    }
  }

  /**
   * Regenerate and increment version for an existing Growth Strategy in Supabase
   */
  static async updateStrategyVersion(
    strategyId: string,
    newOutput: GrowthStrategyOutput,
    currentVersion: number,
  ): Promise<ServiceResult<GrowthStrategyRow>> {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error("Supabase is unconfigured.") };
    }

    try {
      const updatePayload = {
        title: newOutput.title,
        executive_summary: newOutput.executiveSummary,
        icp: newOutput.icp as any,
        buyer_personas: newOutput.buyerPersonas as any,
        positioning: newOutput.positioning as any,
        messaging_pillars: newOutput.messagingPillars as any,
        value_proposition: newOutput.valueProposition as any,
        market_opportunities: newOutput.marketOpportunities as any,
        competitor_positioning: newOutput.competitorPositioning as any,
        channel_strategy: newOutput.channelStrategy as any,
        growth_roadmap: newOutput.growthRoadmap as any,
        plan_30_60_90: newOutput.plan306090 as any,
        success_metrics: newOutput.successMetrics as any,
        raw_json: newOutput as any,
        version: currentVersion + 1,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("growth_strategies")
        .update(updatePayload)
        .eq("id", strategyId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      console.error("[GrowthStrategyService.updateStrategyVersion] Error:", err);
      return {
        data: null,
        error: err instanceof Error ? err : new Error("Failed to update Growth Strategy version."),
      };
    }
  }
}
