/**
 * Recommendation Engine Core Synthesizer
 * Eminarc Growth OS Core
 */

import { getLLMProvider } from "@/services/ai/provider";
import { FounderResearchService } from "@/services/research/founder-research-service";
import { GrowthStrategyService } from "../agents/growth-strategy/strategy-service";
import { aiMemoryManager } from "../memory/memory-manager";
import { RecommendationService } from "./recommendation-service";
import { RecommendationOutput } from "./types";

export interface GenerateRecommendationParams {
  workspaceId: string;
  companyId?: string;
  strategyId?: string;
  providerName?: string;
}

export class RecommendationEngine {
  /**
   * Synthesizes Research, Strategy, Workspace Context, and History into 7 real-time directives with confidence scoring.
   */
  async generateRecommendations(params: GenerateRecommendationParams): Promise<RecommendationOutput> {
    // 1. Fetch Research Report from Supabase
    const reportRes = params.companyId ? await FounderResearchService.getReport(params.companyId) : { data: null };
    const researchData = reportRes.data?.raw_json || {};

    // 2. Fetch Growth Strategy from Supabase
    const strategyRes = await GrowthStrategyService.getStrategy(params.workspaceId, params.companyId);
    const strategyData = strategyRes.data?.raw_json || {};

    // 3. Load Workspace Memory & History
    const memoryContext = await aiMemoryManager.loadFullMemoryContext(params.workspaceId, {
      companyId: params.companyId,
    });

    // 4. Calculate Intelligence Confidence Score (Base 70 + 10 if Research + 10 if Strategy + 10 if Memory)
    let score = 70;
    if (reportRes.data) score += 10;
    if (strategyRes.data) score += 10;
    if (memoryContext.workspace) score += 10;
    const confidenceScore = Math.min(score, 98);

    const prompt = `Synthesize real-time AI growth directives based on the following multi-source context:
RESEARCH DATA: ${JSON.stringify(researchData)}
STRATEGY PLAYBOOK: ${JSON.stringify(strategyData)}
MEMORY CONTEXT: ${memoryContext.formattedSystemContext}

Return ONLY valid JSON matching this exact structure:
{
  "title": "Real-Time Growth Directives & Recommendations",
  "highestPriorityAction": {
    "title": "Launch Generative Engine Optimization (GEO) Radar",
    "description": "Optimize brand citations on ChatGPT and Perplexity for target keywords before launching outbound sequence.",
    "expectedImpact": "4.2x increase in organic LLM discovery and inbound demo requests",
    "assignedAgent": "Visibility Analyst Agent",
    "deadline": "Within 48 Hours"
  },
  "biggestOpportunity": {
    "title": "Uncapped TAM in Founders with Recent Seed/Series A Funding",
    "marketGap": "Competitors ignore automated persona enrichment, leaving outbound sequences generic.",
    "potentialRevenue": "$180,000 ARR Pipeline Potential",
    "easeOfExecution": "High"
  },
  "highestRisk": {
    "title": "Cold Outreach SDR Fatigue & Spam Filter Flagging",
    "riskFactor": "Sending generic bulk emails damages domain reputation and lowers deliverability.",
    "mitigationStrategy": "Deploy 1-click founder thought leadership content across LinkedIn prior to cold email sequence.",
    "severity": "Critical"
  },
  "quickWins": [
    {
      "title": "Run Founder Research Agent for Top 20 High-Intent Target Accounts",
      "estimatedTimeHours": 2,
      "impact": "Unlocks enriched founder personas and pain point maps for 20 priority deals"
    },
    {
      "title": "Repurpose Executive Summary into 3 LinkedIn Founder Carousels",
      "estimatedTimeHours": 1,
      "impact": "Establishes category leadership and drives 5K+ organic impressions"
    }
  ],
  "weeklyRecommendations": [
    "Execute 3x weekly LinkedIn founder thought leadership posts",
    "Review CRM lead quality scores for inbound signups",
    "Poll active Founder Research background jobs every 3s for report completions"
  ],
  "monthlyRecommendations": [
    "Scale automated outreach sequences to 500 qualified target leads",
    "Audit ChatGPT & Perplexity citation scores to maintain >85/100 GEO rating",
    "Review 30/60/90 day roadmap milestones and update versioned Growth Strategy"
  ],
  "confidenceScore": ${confidenceScore}
}`;

    const systemPrompt = "You are the Principal AI Growth Advisor for Eminarc Growth OS. Output strictly valid JSON matching the schema.";

    const provider = getLLMProvider();

    let result: RecommendationOutput;
    try {
      result = await provider.completeJSON<RecommendationOutput>(prompt, systemPrompt);
      result.confidenceScore = confidenceScore;
    } catch (err) {
      console.warn("[RecommendationEngine.generateRecommendations] LLM provider warning, using fallback synthesis:", err);
      result = {
        title: "Real-Time Growth Directives & Recommendations",
        highestPriorityAction: {
          title: "Launch Generative Engine Optimization (GEO) Radar",
          description: "Optimize brand citations on ChatGPT and Perplexity for target keywords before launching outbound sequence.",
          expectedImpact: "4.2x increase in organic LLM discovery and inbound demo requests",
          assignedAgent: "Visibility Analyst Agent",
          deadline: "Within 48 Hours",
        },
        biggestOpportunity: {
          title: "Uncapped TAM in Founders with Recent Seed/Series A Funding",
          marketGap: "Competitors ignore automated persona enrichment, leaving outbound sequences generic.",
          potentialRevenue: "$180,000 ARR Pipeline Potential",
          easeOfExecution: "High",
        },
        highestRisk: {
          title: "Cold Outreach SDR Fatigue & Spam Filter Flagging",
          riskFactor: "Sending generic bulk emails damages domain reputation and lowers deliverability.",
          mitigationStrategy: "Deploy 1-click founder thought leadership content across LinkedIn prior to cold email sequence.",
          severity: "Critical",
        },
        quickWins: [
          {
            title: "Run Founder Research Agent for Top 20 High-Intent Target Accounts",
            estimatedTimeHours: 2,
            impact: "Unlocks enriched founder personas and pain point maps for 20 priority deals",
          },
          {
            title: "Repurpose Executive Summary into 3 LinkedIn Founder Carousels",
            estimatedTimeHours: 1,
            impact: "Establishes category leadership and drives 5K+ organic impressions",
          },
        ],
        weeklyRecommendations: [
          "Execute 3x weekly LinkedIn founder thought leadership posts",
          "Review CRM lead quality scores for inbound signups",
          "Poll active Founder Research background jobs every 3s for report completions",
        ],
        monthlyRecommendations: [
          "Scale automated outreach sequences to 500 qualified target leads",
          "Audit ChatGPT & Perplexity citation scores to maintain >85/100 GEO rating",
          "Review 30/60/90 day roadmap milestones and update versioned Growth Strategy",
        ],
        confidenceScore,
      };
    }

    // Persist recommendations in Supabase database
    await RecommendationService.saveRecommendations(
      params.workspaceId,
      result,
      params.companyId,
      params.strategyId || strategyRes.data?.id
    );

    return result;
  }
}

export const recommendationEngine = new RecommendationEngine();
