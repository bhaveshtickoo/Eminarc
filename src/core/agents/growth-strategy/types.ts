/**
 * Growth Strategy 12-Section Output Interfaces & Types
 * Eminarc Growth OS Core
 */

import { Database } from "@/lib/supabase/types";

export type GrowthStrategyRow = Database["public"]["Tables"]["growth_strategies"]["Row"];
export type GrowthStrategyInsert = Database["public"]["Tables"]["growth_strategies"]["Insert"];
export type GrowthStrategyUpdate = Database["public"]["Tables"]["growth_strategies"]["Update"];

export interface ICPDefinition {
  primaryTarget: string;
  companySizeTier: string;
  revenueTier: string;
  decisionMakerTitles: string[];
  targetGeographies: string[];
}

export interface BuyerPersona {
  roleTitle: string;
  keyMotivations: string[];
  buyingTriggers: string[];
  objections: string[];
}

export interface PositioningStrategy {
  categoryName: string;
  tagline: string;
  coreDifferentiation: string;
}

export interface MessagingPillar {
  pillarName: string;
  coreMessage: string;
  proofPoints: string[];
}

export interface ValuePropositionDefinition {
  headline: string;
  primaryOutcome: string;
  roiEstimate: string;
}

export interface MarketOpportunity {
  opportunityTitle: string;
  marketGap: string;
  impactScore: number;
}

export interface CompetitorAnalysis {
  competitorName: string;
  theirPositioning: string;
  ourAdvantage: string;
}

export interface ChannelStrategyItem {
  channelName: string;
  priority: "High" | "Medium" | "Low";
  targetMetrics: string;
}

export interface GrowthMilestone {
  quarter: string;
  milestoneTitle: string;
  keyDeliverables: string[];
}

export interface Plan306090 {
  days30: string[];
  days60: string[];
  days90: string[];
}

export interface MetricKPI {
  metricName: string;
  targetBenchmark: string;
  measurementFrequency: string;
}

export interface GrowthStrategyOutput {
  title: string;
  executiveSummary: string;
  icp: ICPDefinition;
  buyerPersonas: BuyerPersona[];
  positioning: PositioningStrategy;
  messagingPillars: MessagingPillar[];
  valueProposition: ValuePropositionDefinition;
  marketOpportunities: MarketOpportunity[];
  competitorPositioning: CompetitorAnalysis[];
  channelStrategy: ChannelStrategyItem[];
  growthRoadmap: GrowthMilestone[];
  plan306090: Plan306090;
  successMetrics: MetricKPI[];
}
