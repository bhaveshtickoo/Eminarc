import { WorkspaceData } from "../types/workspace";

export async function fetchWorkspaceData(workspaceId: string): Promise<WorkspaceData> {
  // Static service abstraction for growth workspace metadata
  return {
    id: workspaceId,
    name: "Eminarc",
    domain: "eminarc.com",
    industry: "B2B Growth Consultancy",
    targetMarket: ["USA", "MENA"],
    brandVoice: ["Strategic", "Founder-first", "Minimal"],
    metrics: {
      growthScore: 78,
      aiVisibility: 63,
      pipelineValue: "$12,400",
      mrr: "$2,07,000",
      activeClientsCount: 3,
      leadsInPipelineCount: 112,
      contentPublishedCount: 48,
      contentTargetCount: 50,
      meetingsBookedCount: 17,
      researchStatus: "Complete",
    },
    weeklyGoal: {
      title: "Generate 12 Qualified Leads",
      currentCount: 8,
      targetCount: 12,
      percentage: 68,
    },
    teamMembers: ["Pratyush", "Aditya"],
    knowledgeBase: {
      companyProfile: {
        name: "Eminarc",
        domain: "eminarc.com",
        industry: "B2B Growth Consultancy",
        tagline: "Autonomous B2B Growth OS",
        category: "Enterprise Software",
        description: "AI-powered growth engine for high-growth B2B firms.",
        corePhilosophy: "Data-driven, founder-led organic growth.",
      },
      founderProfile: {
        name: "Pratyush",
        title: "Founder & CEO",
        linkedin: "https://linkedin.com/in/eminarc",
        bio: "B2B Growth Architect & Strategist",
        background: "Ex-tier-1 consulting leader",
        contentPersona: "Visionary & Practical",
        primaryFocus: "Founder Research & AI Visibility",
        distributionChannels: ["LinkedIn", "Email", "SEO"],
      },
      industry: "B2B SaaS & Growth Consultancy",
      targetMarkets: ["USA", "MENA", "EU"],
      targetMarket: ["USA", "MENA", "EU"],
      idealCustomerProfile: {
        primaryICP: "Seed to Series B B2B Founders",
        secondaryICP: "Growth Marketing Leaders",
        regions: ["North America", "EMEA"],
        companySize: "10-250 employees",
        decisionMakers: ["CEO", "CMO", "VP Growth"],
      },
      productsAndServices: {
        products: [
          {
            name: "Growth OS Platform",
            description: "End-to-end B2B growth automation suite",
            tier: "Enterprise",
            keyFeatures: ["AI Visibility Scanner", "Content OS", "Agents Hub"],
          },
        ],
        services: [
          {
            name: "Founder Advisory",
            scope: "Quarterly Growth Sprint",
            deliverables: ["ICP Architecture", "Content Engine", "AI Radar"],
          },
        ],
      },
      products: [
        {
          name: "Growth OS Platform",
          description: "End-to-end B2B growth automation suite",
          tier: "Enterprise",
          keyFeatures: ["AI Visibility Scanner", "Content OS", "Agents Hub"],
        },
      ],
      services: [
        {
          name: "Founder Advisory",
          scope: "Quarterly Growth Sprint",
          deliverables: ["ICP Architecture", "Content Engine", "AI Radar"],
        },
      ],
      painPoints: [
        {
          title: "Low AI Search Visibility",
          impact: "Missing out on conversational AI lead flow",
        },
      ],
      messaging: {
        tagline: "Autonomous Growth for B2B Pioneers",
        valueProp: "Convert AI queries and founder authority into pipeline.",
        pillars: [
          {
            title: "AI Search Dominance",
            hook: "Own citations on Perplexity, Claude, and ChatGPT.",
          },
        ],
        elevatorPitch: "Eminarc turns founder research and content into predictable pipeline.",
      },
      brandVoice: {
        toneTags: ["Strategic", "Authoritative", "Minimal"],
        rules: ["No fluff", "Data-backed assertions only"],
        prohibitedPhrases: ["Synergy", "Game-changer"],
        sampleStyle: "Direct, analytical, and founder-focused.",
      },
      competitors: [
        {
          name: "Traditional Agencies",
          category: "Services",
          strengths: "High touch",
          weaknesses: "Slow, manual",
          ourAdvantage: "AI speed & continuous execution",
        },
      ],
      growthOpportunities: [
        {
          title: "Perplexity & ChatGPT Optimization",
          description: "Rank #1 in generative search responses",
        },
      ],
      goals: [
        {
          title: "$500k ARR Expansion",
          target: "$500,000",
          timeframe: "Q4 2026",
          priority: "High",
        },
      ],
      challenges: [
        {
          title: "Algorithm shift to LLM answers",
          impact: "Decreased traditional organic web clicks",
          mitigation: "Optimize for LLM citation nodes",
          status: "Active",
        },
      ],
    },
  };
}
