/**
 * Campaign Engine Core Synthesizer
 * Eminarc Growth OS Core
 */

import { aiOrchestrator } from "../ai/orchestrator";
import { PromptBuilder } from "../ai/prompts/prompt-builder";
import { aiMemoryManager } from "../memory/memory-manager";
import { globalAgentRegistry } from "../agents/agent-registry";
import { CampaignService } from "./campaign-service";
import {
  CampaignAsset,
  CampaignKPIItem,
  CampaignSpec,
  CampaignTaskItem,
  CampaignType,
} from "./types";

export interface GenerateCampaignParams {
  workspaceId: string;
  type: CampaignType;
  goalPrompt?: string;
  operatingPlanId?: string;
  providerName?: string;
}

export class CampaignEngine {
  /**
   * Generates a multi-channel campaign with Goal, Audience, Messaging, Assets, Tasks, Timeline, KPIs, and Status.
   */
  async generateCampaign(params: GenerateCampaignParams): Promise<CampaignSpec> {
    const memoryContext = await aiMemoryManager.loadFullMemoryContext(params.workspaceId);

    const iso30 = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const iso14 = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    const agents = globalAgentRegistry.list().map((a) => a.name);

    const systemPrompt = PromptBuilder.buildSystemPrompt(
      `You are the Principal Multi-Channel Campaign Architect for Eminarc Growth OS. ` +
        `Synthesize high-converting ${params.type} Growth Campaigns with Goal, Audience, Messaging, Assets, Tasks, Timeline, KPIs, and Status.`,
    );

    const userPrompt = PromptBuilder.render(
      `Synthesize a high-converting ${params.type} Growth Campaign for workspace "{{workspaceName}}".
CHANNEL TYPE: ${params.type}
USER GOAL: "{{goalPrompt}}"

WORKSPACE MEMORY CONTEXT:
{{memoryContext}}

AVAILABLE AGENTS:
{{agentsList}}

Output strictly valid JSON matching this exact structure:
{
  "id": "cmp-${params.type.toLowerCase()}-${Date.now()}",
  "title": "${params.type} High-Leverage Growth Campaign",
  "type": "${params.type}",
  "goal": "Acquire 50 qualified target accounts in 30 days via ${params.type}",
  "audience": "Seed-to-Series B SaaS Founders, Chief Revenue Officers, and VP Sales",
  "messaging": "Stop burning 20 hours weekly on manual outreach. Deploy autonomous AI growth agents to scale pipeline.",
  "assets": [
    {
      "id": "ast-101",
      "title": "${params.type} Strategic Positioning Asset",
      "type": "Carousel",
      "content": "Core narrative structure for campaign launch.",
      "status": "Draft"
    }
  ],
  "tasks": [
    {
      "id": "tsk-c1",
      "title": "Publish ${params.type} campaign launch asset",
      "description": "Deploy content asset to target channel audience.",
      "owner": "Distribution Planner",
      "dueDate": "${iso14}",
      "status": "Pending"
    }
  ],
  "timeline": "30 Days (Completion: ${iso30})",
  "kpis": [
    {
      "metric": "Outbound Conversion Rate",
      "targetBenchmark": "4.8% CTR",
      "currentValue": "0%"
    },
    {
      "metric": "Pipeline Generated",
      "targetBenchmark": "$150,000 ARR",
      "currentValue": "$0"
    }
  ],
  "status": "draft"
}`,
      {
        workspaceName: memoryContext.workspace?.name || "Target Workspace",
        goalPrompt: params.goalPrompt || `Scale ${params.type} acquisition pipeline`,
        memoryContext: memoryContext.formattedSystemContext,
        agentsList: agents.join(", "),
      },
    );

    let result: CampaignSpec;

    try {
      const response = await aiOrchestrator.execute<CampaignSpec>({
        prompt: `${systemPrompt}\n\n${userPrompt}`,
        ...(params.providerName ? { providerName: params.providerName } : {}),
        temperature: 0.3,
        maxTokens: 2000,
      });

      let contentStr = response.content;
      if (typeof contentStr === "string") {
        contentStr = contentStr
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
        const jsonMatch = contentStr.match(/\{[\s\S]*\}/);
        if (jsonMatch) contentStr = jsonMatch[0];
      }

      const parsed =
        typeof response.content === "object" ? response.content : JSON.parse(contentStr);

      result = {
        id: parsed.id || `cmp-${params.type.toLowerCase()}-${Date.now()}`,
        title: parsed.title || `${params.type} High-Leverage Growth Campaign`,
        type: params.type,
        goal: parsed.goal || `Acquire 50 target accounts in 30 days via ${params.type}`,
        audience: parsed.audience || "B2B SaaS Founders & Enterprise Decision Makers",
        messaging: parsed.messaging || "Autonomous AI Growth OS driving qualified pipeline.",
        assets: parsed.assets || [],
        tasks: parsed.tasks || [],
        timeline: parsed.timeline || `30 Days (Completion: ${iso30})`,
        kpis: parsed.kpis || [],
        status: parsed.status || "draft",
      };
    } catch (err) {
      console.warn(
        `[CampaignEngine.generateCampaign] Orchestrator warning for channel "${params.type}", generating contextual campaign:`,
        err,
      );
      result = this.synthesizeContextualFallback(params, memoryContext, iso14, iso30);
    }

    // Persist campaign to Supabase database & sync tasks
    await CampaignService.saveCampaign(params.workspaceId, result, params.operatingPlanId);

    return result;
  }

  /**
   * Channel-specific fallback synthesis tailored to each of the 8 channel types
   */
  private synthesizeContextualFallback(
    params: GenerateCampaignParams,
    memoryContext: any,
    iso14: string,
    iso30: string,
  ): CampaignSpec {
    const wsName = memoryContext.workspace?.name || "B2B SaaS";
    const type = params.type;

    let assetType: CampaignAsset["type"] = "Carousel";
    let assetContent = "";
    let channelMessaging = "";
    let defaultKpis: CampaignKPIItem[] = [];

    switch (type) {
      case "LinkedIn":
        assetType = "Carousel";
        assetContent =
          "Slide 1: Why traditional B2B outbound is dead.\nSlide 2: 5 AI automation frameworks for SaaS founders.\nSlide 3: Real case study breakdown & CTA.";
        channelMessaging = `Positioning ${wsName} leadership as top 1% authority in AI growth engineering on LinkedIn.`;
        defaultKpis = [
          { metric: "Weekly Impressions", targetBenchmark: "15,000+", currentValue: "0" },
          {
            metric: "Inbound DMs / Demo Requests",
            targetBenchmark: "20 DMs / Month",
            currentValue: "0",
          },
        ];
        break;
      case "Email":
        assetType = "Email Template";
        assetContent =
          "Subject: [Teardown] {{companyName}} founder growth bottleneck\n\nHi {{firstName}},\nWe audited your domain and identified 3 high-impact positioning gaps...";
        channelMessaging =
          "Ultra-personalized multi-touch cold email sequence targeting verified CROs.";
        defaultKpis = [
          { metric: "Email Open Rate", targetBenchmark: ">55%", currentValue: "0%" },
          { metric: "Positive Reply Rate", targetBenchmark: "4.8%", currentValue: "0%" },
        ];
        break;
      case "Content Calendar":
        assetType = "Calendar Schedule";
        assetContent =
          "Mon: LinkedIn Breakdown Post\nTue: Founder Newsletter Teardown\nWed: GEO Optimization Case Study\nThu: Video Masterclass Teardown\nFri: Weekly Retrospective";
        channelMessaging = "4x weekly multi-channel content engine establishing domain authority.";
        defaultKpis = [
          {
            metric: "Content Output Volume",
            targetBenchmark: "16 Assets / Month",
            currentValue: "0",
          },
          { metric: "Content Engagement Lift", targetBenchmark: "+45% WoW", currentValue: "0%" },
        ];
        break;
      case "Launch Plan":
        assetType = "Landing Page";
        assetContent =
          "Phase 1 (Pre-Launch): Teaser campaign & waitlist.\nPhase 2 (Launch Day): Product Hunt, LinkedIn Blitz & Founder Keynote.\nPhase 3 (Post-Launch): Retargeting & Customer Case Studies.";
        channelMessaging = "3-phase launch playbook for maximum conversion and press velocity.";
        defaultKpis = [
          { metric: "Launch Day Registrations", targetBenchmark: "500+", currentValue: "0" },
          {
            metric: "Product Hunt Rank Target",
            targetBenchmark: "Top 3 Product of the Day",
            currentValue: "N/A",
          },
        ];
        break;
      case "Webinar":
        assetType = "Webinar Deck";
        assetContent =
          "Slide Deck: Autonomous Growth OS — How B2B Founders Scale Revenue without SDR Bloat.";
        channelMessaging =
          "High-ticket live teardown webinar targeting C-suite tech decision makers.";
        defaultKpis = [
          { metric: "Webinar Registrations", targetBenchmark: "250+", currentValue: "0" },
          { metric: "Live Attendees to Demo Rate", targetBenchmark: "18.5%", currentValue: "0%" },
        ];
        break;
      case "SEO":
        assetType = "Article";
        assetContent =
          "Comprehensive GEO teardown guide: Optimizing brand meta tags and FAQ schemas for Perplexity and ChatGPT citations.";
        channelMessaging =
          "Dominating AI Search engines (Perplexity, ChatGPT Search, Gemini) with structured JSON-LD schemas.";
        defaultKpis = [
          { metric: "GEO Citation Score", targetBenchmark: ">85/100 Index", currentValue: "0" },
          {
            metric: "Organic AI Search Visits",
            targetBenchmark: "2,500 / Month",
            currentValue: "0",
          },
        ];
        break;
      case "Paid":
        assetType = "Ad Copy";
        assetContent =
          "Headline: Stop Wasting 20 Hours Weekly on Outreach.\nPrimary Text: Eminarc OS turns strategy into execution plans in 60 seconds.\nVisual: Sleek dark mode dashboard screenshot.";
        channelMessaging =
          "Precision targeted LinkedIn Paid Sponsored Content targeting verified B2B SaaS Founders.";
        defaultKpis = [
          { metric: "Cost Per Qualified Demo (CPD)", targetBenchmark: "<$120", currentValue: "$0" },
          { metric: "Ad Click-Through Rate (CTR)", targetBenchmark: "1.8%", currentValue: "0%" },
        ];
        break;
      case "Partnership":
        assetType = "Deck";
        assetContent =
          "Co-marketing teardown deck for integration partners detailing mutual GTM distribution and revenue share.";
        channelMessaging =
          "Strategic co-marketing and integration alliance blitz with complementary B2B SaaS platforms.";
        defaultKpis = [
          { metric: "Partner Referrals", targetBenchmark: "15 / Month", currentValue: "0" },
          { metric: "Co-Marketing Webinar Attendees", targetBenchmark: "300+", currentValue: "0" },
        ];
        break;
      case "Community":
        assetType = "Article";
        assetContent =
          "Value-first community post for Slack/Discord groups detailing open-source AI growth frameworks and prompts.";
        channelMessaging =
          "Direct founder-to-founder engagement in high-signal Slack & Discord founder communities.";
        defaultKpis = [
          { metric: "Community Lead Signups", targetBenchmark: "40 / Month", currentValue: "0" },
          {
            metric: "Community Thread Engagement",
            targetBenchmark: "50+ Replies / Post",
            currentValue: "0",
          },
        ];
        break;
      case "Referral":
        assetType = "Landing Page";
        assetContent =
          "Referral Program Headline: Invite a Founder, Earn 20% Recurring Credit.\nMechanics: Unique share link + instant $250 credit on 1st upgrade.";
        channelMessaging =
          "Viral customer and partner referral loop incentivizing founder-to-founder advocacy.";
        defaultKpis = [
          {
            metric: "Referral Share Rate",
            targetBenchmark: "25% of Active Accounts",
            currentValue: "0%",
          },
          { metric: "Referral Conversion Rate", targetBenchmark: "12%", currentValue: "0%" },
        ];
        break;
    }

    const assets: CampaignAsset[] = [
      {
        id: `ast-${Date.now()}-1`,
        title: `${type} — ${wsName} Core Campaign Asset`,
        type: assetType,
        content: assetContent,
        status: "Draft",
      },
    ];

    const tasks: CampaignTaskItem[] = [
      {
        id: `tsk-cmp-${Date.now()}-1`,
        title: `Publish & distribute ${type} campaign launch asset`,
        description: `Deploy ${assetType} to target ${type} channel audience.`,
        owner: "Distribution Planner",
        dueDate: iso14,
        status: "Pending",
      },
      {
        id: `tsk-cmp-${Date.now()}-2`,
        title: `Track ${type} performance metrics and optimize messaging`,
        description: `Audit KPIs weekly and adjust audience parameters.`,
        owner: "Growth Lead",
        dueDate: iso30,
        status: "Pending",
      },
    ];

    return {
      id: `cmp-${type.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      title: `${wsName} — ${type} High-Leverage Growth Campaign`,
      type,
      goal: params.goalPrompt || `Acquire 50 qualified target accounts in 30 days via ${type}`,
      audience: "Seed-to-Series B SaaS Founders, Chief Revenue Officers, and VP Sales",
      messaging: channelMessaging,
      assets,
      tasks,
      timeline: `30 Days (Completion: ${iso30})`,
      dependencies: [`cmp-strategy-${Date.now()}`],
      kpis: defaultKpis,
      status: "draft",
    };
  }

  /**
   * Synthesize all 10 specialized multi-channel campaigns at once
   */
  async generateAllCampaigns(
    workspaceId: string,
    operatingPlanId?: string,
  ): Promise<CampaignSpec[]> {
    const types: CampaignType[] = [
      "LinkedIn",
      "Email",
      "Content Calendar",
      "Launch Plan",
      "Webinar",
      "SEO",
      "Paid",
      "Partnership",
      "Community",
      "Referral",
    ];

    const results: CampaignSpec[] = [];
    for (const type of types) {
      const cmp = await this.generateCampaign({
        workspaceId,
        type,
        ...(operatingPlanId ? { operatingPlanId } : {}),
      });
      results.push(cmp);
    }

    return results;
  }
}

export const campaignEngine = new CampaignEngine();
