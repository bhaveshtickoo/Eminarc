/**
 * Recommendation Engine Types & Output Schemas
 * Eminarc Growth OS Core
 */

import { Database } from "@/lib/supabase/types";

export type RecommendationRow = Database["public"]["Tables"]["recommendations"]["Row"];
export type RecommendationInsert = Database["public"]["Tables"]["recommendations"]["Insert"];
export type RecommendationUpdate = Database["public"]["Tables"]["recommendations"]["Update"];

export interface PriorityAction {
  title: string;
  description: string;
  expectedImpact: string;
  assignedAgent: string; // e.g. "Founder Research Agent", "Content Strategist"
  deadline: string;
}

export interface OpportunityItem {
  title: string;
  marketGap: string;
  potentialRevenue: string;
  easeOfExecution: "High" | "Medium" | "Low";
}

export interface RiskItem {
  title: string;
  riskFactor: string;
  mitigationStrategy: string;
  severity: "High" | "Critical";
}

export interface QuickWinItem {
  title: string;
  estimatedTimeHours: number;
  impact: string;
}

export interface RecommendationOutput {
  title: string;
  highestPriorityAction: PriorityAction;
  biggestOpportunity: OpportunityItem;
  highestRisk: RiskItem;
  quickWins: QuickWinItem[];
  weeklyRecommendations: string[];
  monthlyRecommendations: string[];
  confidenceScore: number; // 0 to 100
}
