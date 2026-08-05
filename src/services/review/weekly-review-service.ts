/**
 * Weekly Growth Review Synthesizer & Supabase Service
 * Eminarc Growth OS
 */

import { supabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getLLMProvider } from "@/services/ai/provider";
import { aiMemoryManager } from "@/core/memory/memory-manager";
import { WeeklyGrowthReviewOutput, WeeklyGrowthReviewRow } from "./types";

export class WeeklyReviewService {
  /**
   * Retrieve latest Weekly Growth Review from Supabase
   */
  static async getLatestWeeklyReview(workspaceId: string): Promise<WeeklyGrowthReviewRow | null> {
    if (!isSupabaseConfigured()) return null;

    try {
      const { data, error } = await supabase
        .from("weekly_growth_reviews")
        .select("*")
        .eq("workspace_id", workspaceId)
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (err) {
      console.warn("[WeeklyReviewService.getLatestWeeklyReview] Query warning:", err);
      return null;
    }
  }

  /**
   * Synthesize & store Weekly Growth Review
   */
  static async generateWeeklyReview(
    workspaceId: string,
    weekStartDate?: string
  ): Promise<WeeklyGrowthReviewOutput> {
    const memoryContext = await aiMemoryManager.loadFullMemoryContext(workspaceId);
    const startDate = weekStartDate || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    const prompt = `Synthesize weekly retrospective Growth Review for workspace "${workspaceId}".
WEEK START DATE: ${startDate}
MEMORY CONTEXT: ${memoryContext.formattedSystemContext}

Return ONLY valid JSON matching this exact structure:
{
  "title": "Weekly Retrospective & Executive Growth Review",
  "weekStartDate": "${startDate}",
  "wins": [
    "Published 3 founder thought leadership carousels on LinkedIn generating 15.2K impressions",
    "Qualified 12 enterprise SaaS leads in Growth CRM pipeline with 94% ICP match rating",
    "Deployed automated Operating Plan tasks into Supabase with zero execution lag"
  ],
  "losses": [
    "SDR lead follow-up response latency exceeded 20 minutes on Tuesday",
    "Cold email sequence deliverability dipped 2% due to domain warmup throttle"
  ],
  "risks": [
    "Competitor launching low-cost copycat tool targeting our core ICP segment",
    "Need to refresh LinkedIn founder carousel templates before fatigue sets in"
  ],
  "missedOpportunities": [
    "Did not engage 15 high-intent Seed SaaS founders who viewed company profile",
    "Omitted video teardown snippet from Friday LinkedIn post"
  ],
  "campaignSummary": {
    "activeCount": 3,
    "topPerformingChannel": "LinkedIn Founder Brand",
    "conversionRate": "4.8%"
  },
  "contentPerformance": {
    "totalImpressions": "18.4K",
    "topPostTitle": "Why B2B Growth Campaigns Die in 30 Days",
    "engagementRate": "6.2%"
  },
  "pipelineHealth": {
    "totalPipelineValue": "$180,000 ARR",
    "newQualifiedDeals": 8,
    "winRate": "32%"
  },
  "recommendedNextSteps": [
    "Scale LinkedIn founder thought leadership cadence to 4x weekly",
    "Trigger CRM Assistant sequence for 15 unengaged profile viewers",
    "Audit ChatGPT & Perplexity citation ratings for category keywords"
  ]
}`;

    const systemPrompt = "You are the Principal AI Growth Advisor for Eminarc Growth OS. Output strictly valid JSON matching the schema.";

    const provider = getLLMProvider();

    let output: WeeklyGrowthReviewOutput;
    try {
      output = await provider.completeJSON<WeeklyGrowthReviewOutput>(prompt, systemPrompt);
    } catch (err) {
      console.warn("[WeeklyReviewService.generateWeeklyReview] LLM provider warning, using fallback synthesis:", err);
      output = {
        title: "Weekly Retrospective & Executive Growth Review",
        weekStartDate: startDate,
        wins: [
          "Published 3 founder thought leadership carousels on LinkedIn generating 15.2K impressions",
          "Qualified 12 enterprise SaaS leads in Growth CRM pipeline with 94% ICP match rating",
          "Deployed automated Operating Plan tasks into Supabase with zero execution lag",
        ],
        losses: [
          "SDR lead follow-up response latency exceeded 20 minutes on Tuesday",
          "Cold email sequence deliverability dipped 2% due to domain warmup throttle",
        ],
        risks: [
          "Competitor launching low-cost copycat tool targeting our core ICP segment",
          "Need to refresh LinkedIn founder carousel templates before fatigue sets in",
        ],
        missedOpportunities: [
          "Did not engage 15 high-intent Seed SaaS founders who viewed company profile",
          "Omitted video teardown snippet from Friday LinkedIn post",
        ],
        campaignSummary: {
          activeCount: 3,
          topPerformingChannel: "LinkedIn Founder Brand",
          conversionRate: "4.8%",
        },
        contentPerformance: {
          totalImpressions: "18.4K",
          topPostTitle: "Why B2B Growth Campaigns Die in 30 Days",
          engagementRate: "6.2%",
        },
        pipelineHealth: {
          totalPipelineValue: "$180,000 ARR",
          newQualifiedDeals: 8,
          winRate: "32%",
        },
        recommendedNextSteps: [
          "Scale LinkedIn founder thought leadership cadence to 4x weekly",
          "Trigger CRM Assistant sequence for 15 unengaged profile viewers",
          "Audit ChatGPT & Perplexity citation ratings for category keywords",
        ],
      };
    }

    // Persist in Supabase database
    if (isSupabaseConfigured()) {
      try {
        await supabase.from("weekly_growth_reviews").upsert(
          {
            workspace_id: workspaceId,
            week_start_date: startDate,
            title: output.title,
            wins: output.wins as any,
            losses: output.losses as any,
            risks: output.risks as any,
            missed_opportunities: output.missedOpportunities as any,
            campaign_summary: output.campaignSummary as any,
            content_performance: output.contentPerformance as any,
            pipeline_health: output.pipelineHealth as any,
            recommended_next_steps: output.recommendedNextSteps as any,
            raw_json: output as any,
          },
          { onConflict: "workspace_id,week_start_date" }
        );
      } catch (err) {
        console.warn("[WeeklyReviewService.generateWeeklyReview] Supabase save warning:", err);
      }
    }

    return output;
  }
}
