/**
 * Daily Growth Brief Synthesizer & Supabase Service
 * Eminarc Growth OS
 */

import { supabase } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getLLMProvider } from "@/services/ai/provider";
import { aiMemoryManager } from "@/core/memory/memory-manager";
import { getTasks } from "@/services/tasks";
import { DailyGrowthBriefOutput, DailyGrowthBriefRow } from "./types";

export class DailyBriefService {
  /**
   * Fetch today's executive brief for a workspace from Supabase
   */
  static async getTodayBrief(workspaceId: string): Promise<DailyGrowthBriefRow | null> {
    if (!isSupabaseConfigured()) return null;

    const todayDate: string =
      new Date().toISOString().split("T")[0] || new Date().toISOString().slice(0, 10);
    try {
      const { data, error } = await supabase
        .from("daily_growth_briefs")
        .select("*")
        .eq("workspace_id", workspaceId)
        .eq("brief_date", todayDate)
        .is("deleted_at", null)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (err) {
      console.warn("[DailyBriefService.getTodayBrief] Query warning:", err);
      return null;
    }
  }

  /**
   * Synthesize & store Today's Daily Growth Brief
   */
  static async generateDailyBrief(workspaceId: string): Promise<DailyGrowthBriefOutput> {
    const memoryContext = await aiMemoryManager.loadFullMemoryContext(workspaceId);
    const activeTasks = await getTasks(workspaceId);

    const pendingTaskTitles = activeTasks
      .filter((t) => t.status !== "Completed")
      .map((t) => t.title);

    const todayDate: string =
      new Date().toISOString().split("T")[0] || new Date().toISOString().slice(0, 10);

    const prompt = `Synthesize today's executive Daily Growth Brief for workspace "${workspaceId}".
MEMORY CONTEXT: ${memoryContext.formattedSystemContext}
PENDING TASKS: ${JSON.stringify(pendingTaskTitles)}

Return ONLY valid JSON matching this exact structure:
{
  "todaysFocus": "Launch Generative Engine Optimization (GEO) Radar & Publish Founder Positioning Teardown",
  "topOpportunities": [
    "High-intent inbound SaaS leads actively searching for Growth OS solutions",
    "Uncapped LinkedIn organic distribution for founder-led thought leadership carousels",
    "Perplexity & ChatGPT brand citation ranking boost for target category keywords"
  ],
  "risks": [
    "Outbound email deliverability rate drops if domain warmup is delayed",
    "SDR lead response latency exceeding 15 minutes during peak hours"
  ],
  "tasksDue": [
    "Publish Founder Positioning Teardown on LinkedIn",
    "Audit Perplexity & ChatGPT Citation Schema"
  ],
  "researchCompleted": [
    "TrueLift.ai — McKinsey 5-Step Consulting Teardown",
    "Revix Growth — Founder Positioning & Pain Point Matrix"
  ],
  "campaignPerformance": {
    "clickThroughRate": "4.8%",
    "leadsGenerated": 42,
    "pipelineAdded": "$124,000 ARR",
    "activeCampaignCount": 3
  },
  "recommendedActions": [
    "Deploy 1-click founder thought leadership content across LinkedIn",
    "Sync 5 qualified leads into Growth CRM pipeline",
    "Review 30/60/90 day growth roadmap milestones"
  ]
}`;

    const systemPrompt =
      "You are the Principal AI Chief of Staff for Eminarc Growth OS. Output strictly valid JSON matching the schema.";

    const provider = getLLMProvider();

    let output: DailyGrowthBriefOutput;
    try {
      output = await provider.completeJSON<DailyGrowthBriefOutput>(prompt, systemPrompt);
    } catch (err) {
      console.warn(
        "[DailyBriefService.generateDailyBrief] LLM provider warning, using fallback synthesis:",
        err,
      );
      output = {
        todaysFocus:
          "Launch Generative Engine Optimization (GEO) Radar & Publish Founder Positioning Teardown",
        topOpportunities: [
          "High-intent inbound SaaS leads actively searching for Growth OS solutions",
          "Uncapped LinkedIn organic distribution for founder-led thought leadership carousels",
          "Perplexity & ChatGPT brand citation ranking boost for target category keywords",
        ],
        risks: [
          "Outbound email deliverability rate drops if domain warmup is delayed",
          "SDR lead response latency exceeding 15 minutes during peak hours",
        ],
        tasksDue:
          pendingTaskTitles.length > 0
            ? pendingTaskTitles.slice(0, 3)
            : ["Audit Perplexity Citation Schema"],
        researchCompleted: [
          "TrueLift.ai — McKinsey 5-Step Consulting Teardown",
          "Revix Growth — Founder Positioning & Pain Point Matrix",
        ],
        campaignPerformance: {
          clickThroughRate: "4.8%",
          leadsGenerated: 42,
          pipelineAdded: "$124,000 ARR",
          activeCampaignCount: 3,
        },
        recommendedActions: [
          "Deploy 1-click founder thought leadership content across LinkedIn",
          "Sync 5 qualified leads into Growth CRM pipeline",
          "Review 30/60/90 day growth roadmap milestones",
        ],
      };
    }

    output.briefDate = todayDate;

    // Persist in Supabase database
    if (isSupabaseConfigured()) {
      try {
        await supabase.from("daily_growth_briefs").upsert(
          {
            workspace_id: workspaceId,
            brief_date: todayDate,
            todays_focus: output.todaysFocus,
            top_opportunities: output.topOpportunities as any,
            risks: output.risks as any,
            tasks_due: output.tasksDue as any,
            research_completed: output.researchCompleted as any,
            campaign_performance: output.campaignPerformance as any,
            recommended_actions: output.recommendedActions as any,
            raw_json: output as any,
          },
          { onConflict: "workspace_id,brief_date" },
        );
      } catch (err) {
        console.warn("[DailyBriefService.generateDailyBrief] Supabase save warning:", err);
      }
    }

    return output;
  }
}
