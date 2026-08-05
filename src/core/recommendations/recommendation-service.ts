/**
 * Recommendation Engine Supabase Database Service
 * Eminarc Growth OS Core
 */

import { supabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { ServiceResult } from "@/lib/supabase/types";
import { RecommendationOutput, RecommendationRow } from "./types";

export class RecommendationService {
  /**
   * Save compiled AI recommendation directives in Supabase
   */
  static async saveRecommendations(
    workspaceId: string,
    output: RecommendationOutput,
    companyId?: string,
    strategyId?: string
  ): Promise<ServiceResult<RecommendationRow>> {
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
        strategy_id: strategyId || null,
        title: output.title,
        highest_priority_action: output.highestPriorityAction as any,
        biggest_opportunity: output.biggestOpportunity as any,
        highest_risk: output.highestRisk as any,
        quick_wins: output.quickWins as any,
        weekly_recommendations: output.weeklyRecommendations as any,
        monthly_recommendations: output.monthlyRecommendations as any,
        confidence_score: output.confidenceScore,
        raw_json: output as any,
      };

      const { data, error } = await supabase
        .from("recommendations")
        .insert(insertPayload)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      console.error("[RecommendationService.saveRecommendations] Error:", err);
      return {
        data: null,
        error: err instanceof Error ? err : new Error("Failed to save recommendations in Supabase."),
      };
    }
  }

  /**
   * Retrieve latest AI recommendations for a workspace
   */
  static async getLatestRecommendations(
    workspaceId: string,
    companyId?: string
  ): Promise<ServiceResult<RecommendationRow>> {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error("Supabase is unconfigured.") };
    }

    try {
      let query = supabase
        .from("recommendations")
        .select("*")
        .eq("workspace_id", workspaceId)
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(1);

      if (companyId) {
        query = query.eq("company_id", companyId);
      }

      const { data, error } = await query.maybeSingle();
      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      console.error("[RecommendationService.getLatestRecommendations] Error:", err);
      return {
        data: null,
        error: err instanceof Error ? err : new Error("Failed to retrieve recommendations."),
      };
    }
  }
}
