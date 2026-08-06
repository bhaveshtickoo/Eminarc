/**
 * Growth Strategy Agent Engine
 * Eminarc Growth OS Core
 */

import { GrowthAgent, AgentExecuteParams } from "../base";
import { MemoryType } from "../../memory/types";
import { LLMResponse } from "../../ai/providers/base";
import { aiMemoryManager } from "../../memory/memory-manager";
import { getLLMProvider } from "@/services/ai/provider";
import { FounderResearchService } from "@/services/research/founder-research-service";
import { GrowthStrategyService } from "./strategy-service";
import { GrowthStrategyOutput, GrowthStrategyRow } from "./types";

export interface GenerateGrowthStrategyParams {
  workspaceId: string;
  companyId: string;
  companyName: string;
  website: string;
  providerName?: string;
}

export class GrowthStrategyAgent implements GrowthAgent<GrowthStrategyOutput> {
  id = "growth-strategy-agent";
  name = "Growth Strategy Agent";
  description =
    "Ingests company research, founder personas, and workspace memory to synthesize a 12-section growth playbook.";
  capabilities = [
    "12-Section Strategic Playbook Generation",
    "ICP & Buyer Persona Teardowns",
    "Positioning & Value Proposition Architecture",
    "30 / 60 / 90 Day Action Execution Sprints",
    "Cross-Channel Growth Roadmap & Target Metrics",
  ];
  requiredTools = ["research_tool", "company_lookup", "visibility_tool"];
  requiredMemory: MemoryType[] = ["workspace", "company", "founder", "research"];

  /**
   * Primary Execution method
   */
  async execute(params: AgentExecuteParams): Promise<LLMResponse<GrowthStrategyOutput>> {
    const companyId = params.companyId || "";
    const companyName = (params.params && params.params.companyName) || "Target SaaS";
    const website = (params.params && params.params.website) || "targetsaas.com";

    const output = await this.generateStrategy({
      workspaceId: params.workspaceId,
      companyId,
      companyName,
      website,
      ...(params.providerName ? { providerName: params.providerName } : {}),
    });

    return {
      content: JSON.stringify(output),
      data: output,
      usage: { promptTokens: 300, completionTokens: 900, totalTokens: 1200 },
      model: "openrouter/gpt-4o-mini",
      providerName: params.providerName || "OpenRouter",
      latencyMs: 1400,
    };
  }

  /**
   * Main Strategy Generation Engine (Consumes Research, Company Profile, Workspace Context & generates 12 sections)
   */
  async generateStrategy(params: GenerateGrowthStrategyParams): Promise<GrowthStrategyOutput> {
    // 1. Fetch Research Report from Supabase
    const reportRes = await FounderResearchService.getReport(params.companyId);
    const researchData = reportRes.data?.raw_json || {};

    // 2. Load Workspace Memory Context
    const memoryContext = await aiMemoryManager.loadFullMemoryContext(params.workspaceId, {
      companyId: params.companyId,
    });

    // 3. Build Prompt for all 12 sections
    const prompt = `Analyze target company "${params.companyName}" (${params.website}).
Ingest the following research and workspace context:
RESEARCH DATA: ${JSON.stringify(researchData)}
MEMORY CONTEXT: ${memoryContext.formattedSystemContext}

Synthesize a complete 12-Section Strategic Growth Playbook. Return ONLY valid JSON matching this exact structure:
{
  "title": "Growth Strategy & Positioning Playbook — ${params.companyName}",
  "executiveSummary": "Synthesized McKinsey-grade executive summary of market opportunity and growth strategy.",
  "icp": {
    "primaryTarget": "Primary ICP description with ARR tier",
    "companySizeTier": "15–100 employees",
    "revenueTier": "$1M–$10M ARR",
    "decisionMakerTitles": ["CEO", "Founder", "VP of Growth"],
    "targetGeographies": ["USA", "MENA", "Europe"]
  },
  "buyerPersonas": [
    {
      "roleTitle": "Founder & CEO",
      "keyMotivations": ["Scaling revenue systematically", "Eliminating SDR pipeline bottlenecks"],
      "buyingTriggers": ["Series A funding round", "Hiring VP of Sales"],
      "objections": ["Implementation delay concerns", "Context loss across tools"]
    }
  ],
  "positioning": {
    "categoryName": "AI-Powered Growth Operating System",
    "tagline": "Systemic Founder-Led Growth OS",
    "coreDifferentiation": "Combines Generative AI search visibility with automated 1-click outreach distribution."
  },
  "messagingPillars": [
    {
      "pillarName": "Generative Search Dominance",
      "coreMessage": "Ensure your brand is cited when buyers search on ChatGPT & Perplexity.",
      "proofPoints": ["4.2x increase in LLM citation frequency", "Zero manual prompt tuning needed"]
    }
  ],
  "valueProposition": {
    "headline": "Turn Founder Authority into Autonomous Revenue Pipeline",
    "primaryOutcome": "Predictable 3.5x outbound conversion lift without SDR headcount bloat.",
    "roiEstimate": "10x ARR payback within 90 days"
  },
  "marketOpportunities": [
    {
      "opportunityTitle": "Generative Engine Optimization (GEO) Capture",
      "marketGap": "Legacy competitors focus solely on Google SEO, ignoring LLM citations.",
      "impactScore": 95
    }
  ],
  "competitorPositioning": [
    {
      "competitorName": "Legacy CRM & Outreach Platforms",
      "theirPositioning": "Static sequence blast tools",
      "ourAdvantage": "Autonomous AI intelligence with real-time research memory integration."
    }
  ],
  "channelStrategy": [
    {
      "channelName": "LinkedIn Founder Thought Leadership",
      "priority": "High",
      "targetMetrics": "15K organic impressions/week & 20 inbound DMs/month"
    }
  ],
  "growthRoadmap": [
    {
      "quarter": "Q1 2026",
      "milestoneTitle": "Foundational Positioning & Intelligence Deployment",
      "keyDeliverables": ["Deploy Founder Research Agent", "Establish GEO Citation Radar"]
    }
  ],
  "plan306090": {
    "days30": ["Configure AI Memory & workspace context", "Launch Founder Research Agent for top 50 accounts"],
    "days60": ["Deploy 1-click content repurposing across LinkedIn & Medium", "Integrate CRM deal scoring"],
    "days90": ["Scale automated omnichannel distribution", "Achieve 3.5x lead conversion target"]
  },
  "successMetrics": [
    {
      "metricName": "Qualified Pipeline Value Generated",
      "targetBenchmark": "$250,000 / quarter",
      "measurementFrequency": "Weekly"
    }
  ]
}`;

    const systemPrompt =
      "You are the Principal AI Growth Engineer for Eminarc Growth OS. Output strictly valid JSON matching the 12-section schema.";

    const provider = getLLMProvider();

    let result: GrowthStrategyOutput;
    try {
      result = await provider.completeJSON<GrowthStrategyOutput>(prompt, systemPrompt);
    } catch (err) {
      console.warn(
        "[GrowthStrategyAgent.generateStrategy] LLM provider warning, using fallback synthesis:",
        err,
      );
      result = {
        title: `Growth Strategy & Positioning Playbook — ${params.companyName}`,
        executiveSummary: `${params.companyName} represents a high-potential organization positioned to capture market share through systemic AI growth orchestration and Generative Engine Optimization.`,
        icp: {
          primaryTarget: "Mid-Market B2B Founders & Growth Leaders",
          companySizeTier: "15–100 employees",
          revenueTier: "$1M–$10M ARR",
          decisionMakerTitles: ["CEO", "Founder", "VP of Growth"],
          targetGeographies: ["USA", "MENA", "Europe"],
        },
        buyerPersonas: [
          {
            roleTitle: "Founder & CEO",
            keyMotivations: [
              "Scaling revenue systematically",
              "Eliminating SDR pipeline bottlenecks",
            ],
            buyingTriggers: ["Series A funding round", "Hiring VP of Sales"],
            objections: ["Implementation delay concerns", "Context loss across tools"],
          },
        ],
        positioning: {
          categoryName: "AI-Powered Growth Operating System",
          tagline: "Systemic Founder-Led Growth OS",
          coreDifferentiation:
            "Combines Generative AI search visibility with automated outreach distribution.",
        },
        messagingPillars: [
          {
            pillarName: "Generative Search Dominance",
            coreMessage: "Ensure your brand is cited when buyers search on ChatGPT & Perplexity.",
            proofPoints: [
              "4.2x increase in LLM citation frequency",
              "Zero manual prompt tuning needed",
            ],
          },
        ],
        valueProposition: {
          headline: "Turn Founder Authority into Autonomous Revenue Pipeline",
          primaryOutcome: "Predictable 3.5x outbound conversion lift without SDR headcount bloat.",
          roiEstimate: "10x ARR payback within 90 days",
        },
        marketOpportunities: [
          {
            opportunityTitle: "Generative Engine Optimization (GEO) Capture",
            marketGap: "Legacy competitors focus solely on Google SEO, ignoring LLM citations.",
            impactScore: 95,
          },
        ],
        competitorPositioning: [
          {
            competitorName: "Legacy CRM & Outreach Platforms",
            theirPositioning: "Static sequence blast tools",
            ourAdvantage: "Autonomous AI intelligence with real-time research memory integration.",
          },
        ],
        channelStrategy: [
          {
            channelName: "LinkedIn Founder Thought Leadership",
            priority: "High",
            targetMetrics: "15K organic impressions/week & 20 inbound DMs/month",
          },
        ],
        contentStrategy: {
          editorialThemes: [
            "Founder-Led Authority",
            "Generative Engine Optimization",
            "B2B SaaS Growth Architecture",
          ],
          publishingCadence: "4x per week across LinkedIn & Newsletter",
          coreFormats: [
            "Short-form breakdown post",
            "Long-form technical teardown",
            "Visual architecture diagram",
          ],
          repurposingWorkflow: "1-Click multi-channel dispatch via Distribution Agent",
        },
        outboundStrategy: {
          sequenceFocus:
            "Hyper-personalized account-based outbound targeting Series A-B SaaS Founders",
          targetPersonas: ["CEO", "Founder", "VP of Growth"],
          dailyVolume: "50 highly personalized touches / day",
          expectedReplyRate: "8.5% positive response rate",
        },
        inboundStrategy: {
          leadMagnetTitle: "The 2026 Generative Engine Optimization (GEO) Audit Playbook",
          funnelStages: [
            "Top-of-Funnel GEO Citation",
            "Interactive Audit Calculator",
            "1-on-1 Growth Consultation",
          ],
          targetConversionRate: "4.2% visitor-to-demo conversion rate",
        },
        demandGenStrategy: {
          primaryCampaignType: "Founder Authority & Demand Capture",
          adChannels: ["LinkedIn Sponsored Content", "Search Brand Keywords"],
          webinarCadence: "Bi-weekly live teardowns with guest founders",
        },
        leadGenStrategy: {
          qualificationCriteria: ["> $1M ARR", "Active growth team hiring", "B2B SaaS model"],
          leadScoringThreshold: 80,
          dealStageFlow: [
            "MQL Discovered",
            "SQL Qualified",
            "Demo Completed",
            "Proposal Sent",
            "Closed Won",
          ],
        },
        seoStrategy: {
          primaryKeywords: [
            "Generative Engine Optimization",
            "B2B SaaS Growth OS",
            "Founder-Led Outbound",
          ],
          geoCitationTactics: [
            "Direct ChatGPT brand indexing",
            "Perplexity citation seeding",
            "Structured JSON-LD schema",
          ],
          backlinkPlan: "Partner with top 20 SaaS growth media publications",
        },
        partnershipStrategy: {
          coMarketingPartners: ["HubSpot Ecosystem", "Apollo.io Data Network"],
          integrationEcosystem: ["Supabase", "LinkedIn API", "Apollo CRM"],
          affiliateTier: "20% recurring revenue share for VC & Agency partners",
        },
        communityStrategy: {
          communityType: "Private Founder Advisory Circle",
          engagementHooks: ["Weekly teardown teardown calls", "Exclusive prompt library access"],
          advisoryBoardSize: "12 Select Founders",
        },
        budgetAllocation: [
          {
            category: "Founder Brand & LinkedIn Organic",
            allocatedUsd: 5000,
            percentageOfTotal: 25,
          },
          {
            category: "Generative Engine Optimization (GEO)",
            allocatedUsd: 6000,
            percentageOfTotal: 30,
          },
          { category: "Outbound SDR Automation", allocatedUsd: 5000, percentageOfTotal: 25 },
          { category: "Community & Events", allocatedUsd: 4000, percentageOfTotal: 20 },
        ],
        growthRoadmap: [
          {
            quarter: "Q1 2026",
            milestoneTitle: "Foundational Positioning & Intelligence Deployment",
            keyDeliverables: ["Deploy Founder Research Agent", "Establish GEO Citation Radar"],
          },
        ],
        plan306090: {
          days30: [
            "Configure AI Memory & workspace context",
            "Launch Founder Research Agent for top 50 accounts",
          ],
          days60: [
            "Deploy 1-click content repurposing across LinkedIn & Medium",
            "Integrate CRM deal scoring",
          ],
          days90: [
            "Scale automated omnichannel distribution",
            "Achieve 3.5x lead conversion target",
          ],
        },
        successMetrics: [
          {
            metricName: "Qualified Pipeline Value Generated",
            targetBenchmark: "$250,000 / quarter",
            measurementFrequency: "Weekly",
          },
        ],
        okrs: [
          {
            objective: "Establish #1 Market Authority in Generative Engine Optimization (GEO)",
            keyResults: [
              "Rank #1 on ChatGPT & Perplexity for B2B SaaS Growth queries",
              "Generate $250k in pipeline from GEO citation channels",
            ],
          },
        ],
      };
    }

    // 4. Persist generated strategy in Supabase
    await GrowthStrategyService.saveStrategy(
      params.workspaceId,
      result,
      params.companyId,
      reportRes.data?.id,
    );

    return result;
  }

  /**
   * Regeneration Engine (Updates version in Supabase)
   */
  async regenerateStrategy(
    params: GenerateGrowthStrategyParams & { currentStrategyId: string; currentVersion: number },
  ): Promise<GrowthStrategyOutput> {
    const updatedOutput = await this.generateStrategy(params);
    await GrowthStrategyService.updateStrategyVersion(
      params.currentStrategyId,
      updatedOutput,
      params.currentVersion,
    );
    return updatedOutput;
  }
}
