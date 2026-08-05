/**
 * Weekly Growth Review Types & Interfaces
 * Eminarc Growth OS
 */

import { Database } from "@/lib/supabase/types";

export type WeeklyGrowthReviewRow = Database["public"]["Tables"]["weekly_growth_reviews"]["Row"];

export interface CampaignSummaryMetrics {
  activeCount: number;
  topPerformingChannel: string;
  conversionRate: string;
}

export interface ContentPerformanceMetrics {
  totalImpressions: string;
  topPostTitle: string;
  engagementRate: string;
}

export interface PipelineHealthMetrics {
  totalPipelineValue: string;
  newQualifiedDeals: number;
  winRate: string;
}

export interface WeeklyGrowthReviewOutput {
  title: string;
  weekStartDate: string;
  wins: string[];
  losses: string[];
  risks: string[];
  missedOpportunities: string[];
  campaignSummary: CampaignSummaryMetrics;
  contentPerformance: ContentPerformanceMetrics;
  pipelineHealth: PipelineHealthMetrics;
  recommendedNextSteps: string[];
}
