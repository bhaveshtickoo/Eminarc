/**
 * Daily Growth Brief Types & Interfaces
 * Eminarc Growth OS
 */

import { Database } from "@/lib/supabase/types";

export type DailyGrowthBriefRow = Database["public"]["Tables"]["daily_growth_briefs"]["Row"];

export interface CampaignPerformanceTelemetry {
  clickThroughRate: string;
  leadsGenerated: number;
  pipelineAdded: string;
  activeCampaignCount: number;
}

export interface DailyGrowthBriefOutput {
  todaysFocus: string;
  topOpportunities: string[];
  risks: string[];
  tasksDue: string[];
  researchCompleted: string[];
  campaignPerformance: CampaignPerformanceTelemetry;
  recommendedActions: string[];
  briefDate?: string;
}
