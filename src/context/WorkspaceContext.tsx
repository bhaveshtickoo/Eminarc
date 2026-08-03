import React, { createContext, useContext, useState } from "react";
import { WorkspaceData, WorkspaceContextType, WorkspaceKnowledgeBase } from "../types/workspace";
import { supabaseWorkspaceService } from "../lib/supabase/services/supabase-workspace-service";

export const defaultKnowledgeBase: WorkspaceKnowledgeBase = {
  companyProfile: {
    name: "Eminarc",
    domain: "eminarc.com",
    industry: "B2B Growth SaaS & Consultancy",
    tagline: "Strategic B2B Growth Operating System",
    category: "AI Growth OS",
    description:
      "Eminarc Growth OS unifies market research, content generation, AI search visibility, and customer relationship management into a single cohesive workspace.",
    corePhilosophy: "Growth as a System, Not a Campaign.",
  },
  founderProfile: {
    name: "Bhavesh Tickoo",
    title: "Founder & Lead Architect",
    linkedin: "linkedin.com/in/bhaveshtickoo",
    bio: "Deep technical background in frontend architecture, distributed systems, and B2B growth engine design.",
    contentPersona: "Minimalist product architect, systemic B2B growth thinker",
    primaryFocus: "Building autonomous AI growth workflows for technical founders and SaaS teams",
    distributionChannels: ["LinkedIn Personal Brand", "Technical Medium Breakdowns", "X Threads"],
  },
  industry: "B2B Growth / AI SaaS",
  targetMarkets: ["USA", "MENA", "Europe"],
  idealCustomerProfile: {
    primaryICP: "B2B SaaS Founders ($1M–$10M ARR)",
    secondaryICP: "B2B Growth Agencies & Consultancies",
    regions: ["USA", "MENA", "Europe"],
    companySize: "10–50 employees",
    decisionMakers: ["CEO", "Founder", "Head of Growth", "VP Marketing"],
  },
  productsAndServices: {
    products: [
      {
        name: "Eminarc Growth OS Pro",
        description: "Full AI Growth Command Center for early-stage B2B SaaS teams",
        tier: "Pro",
        keyFeatures: [
          "McKinsey-grade Founder Research Engine",
          "1-Click Multi-Channel Repurpose Panel",
          "9-Engine LLM Citation Visibility Radar",
          "Lead Intelligence CRM Board",
        ],
      },
    ],
    services: [
      {
        name: "Founder Brand Building",
        scope: "Ghostwriting & personal brand positioning for tech founders",
        deliverables: ["Weekly LinkedIn posts", "Technical Medium breakdowns", "X Thread carousels"],
      },
      {
        name: "Generative Engine Optimization (GEO)",
        scope: "Optimizing digital footprint for AI search engine citations",
        deliverables: ["ChatGPT/Claude citation audit", "Structured schema deployment", "Reddit community strategy"],
      },
    ],
  },
  painPoints: [
    {
      title: "Tool Sprawl & Context Switching",
      impact: "Managing 6+ marketing tools creates execution lag and fragmented metrics.",
    },
    {
      title: "LLM Search Invisibility",
      impact: "Missing out on buyers consulting ChatGPT, Perplexity, and Claude for software recommendations.",
    },
    {
      title: "Content Repurposing Friction",
      impact: "Manual translation of long-form articles into social carousels eats 10+ founder hours weekly.",
    },
  ],
  brandVoice: {
    toneTags: ["Strategic", "Founder-first", "Minimalist", "Analytical"],
    rules: [
      "Keep lines short and bulleted",
      "Avoid hyperbole and generic marketing buzzwords",
      "Use technical precision and system-level arguments",
    ],
    prohibitedPhrases: ["game-changer", "revolutionary", "10x your business", "skyrocket"],
    sampleStyle:
      "Growth is not a one-off campaign. It is an operating system of continuous research, AI search citations, and content repurposing.",
  },
  messaging: {
    tagline: "The AI Operating System for B2B Growth Teams",
    valueProp:
      "Unify market research, AI search radar, content repurposing, and lead intelligence into a single command center.",
    pillars: [
      {
        title: "System Over Campaign",
        hook: "Stop launching disconnected campaigns. Build a continuous growth operating system.",
      },
      {
        title: "AI Search Visibility (GEO)",
        hook: "Get cited by ChatGPT, Claude, and Perplexity when founders search for solutions.",
      },
      {
        title: "1-Click Multi-Channel Repurposing",
        hook: "Convert long-form architecture breakdowns into 7 multi-channel formats instantly.",
      },
    ],
    elevatorPitch:
      "Eminarc Growth OS gives B2B founders an AI command center to research target accounts, track LLM citations, generate targeted content, and close high-intent leads.",
  },
  competitors: [
    {
      name: "HubSpot",
      category: "Legacy CRM & Inbound Automation",
      strengths: "Market dominance, extensive ecosystem",
      weaknesses: "Bloated pricing, steep learning curve, no LLM citation radar",
      ourAdvantage: "Lightweight AI-first Growth OS designed specifically for founders",
    },
    {
      name: "Taplio / Jasper",
      category: "Single-Channel AI Copywriting Tools",
      strengths: "Quick social post creation",
      weaknesses: "No research layer, no CRM intelligence, single-channel focus",
      ourAdvantage: "End-to-end intelligence layer connecting research to CRM pipeline",
    },
  ],
  growthOpportunities: [
    {
      title: "Founder Content Amplification",
      description: "Scale founder's personal brand on LinkedIn to drive zero-CAC inbound pipeline.",
    },
    {
      title: "Generative AI Citation Optimization (GEO)",
      description: "Publish structured markdown teardowns on Medium & Reddit to capture LLM search rank.",
    },
  ],
  goals: [
    {
      title: "Reach ₹2.5L MRR",
      target: "₹2,50,000",
      timeframe: "Q3 2026",
      priority: "High",
    },
    {
      title: "Achieve 80% AI Visibility Score across 4 LLMs",
      target: "80%",
      timeframe: "Q3 2026",
      priority: "High",
    },
    {
      title: "Publish 50 High-Intent Technical Articles",
      target: "50 Articles",
      timeframe: "Q4 2026",
      priority: "Medium",
    },
  ],
  challenges: [
    {
      title: "Tool Sprawl & Context Switching",
      impact: "High execution friction managing 6+ marketing tools",
      mitigation: "Consolidate research, content studio, and CRM in Eminarc OS",
      status: "Active",
    },
    {
      title: "LLM Search Invisibility",
      impact: "Missing out on buyers using ChatGPT & Perplexity for software selection",
      mitigation: "Deploy structured GEO schema and Reddit case studies",
      status: "Active",
    },
  ],
};

const defaultWorkspace: WorkspaceData = {
  id: "ws-eminarc",
  name: "Eminarc",
  domain: "eminarc.com",
  industry: "B2B Growth Consultancy",
  status: "Active",
  tagline: "Strategic B2B Growth Operating System",
  logoLetter: "E",
  targetMarket: ["USA", "MENA", "Europe"],
  brandVoice: ["Strategic", "Founder-first", "Minimalist", "Analytical"],
  metrics: {
    growthScore: 78,
    growthScoreChange: 6,
    aiVisibility: 63,
    aiVisibilityStatus: "Needs Improvement",
    pipelineValue: "$12,400",
    opportunitiesCount: 14,
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
    timeframe: "This Week",
  },
  teamMembers: ["Pratyush", "Aditya"],
  knowledgeBase: defaultKnowledgeBase,
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentWorkspace, setCurrentWorkspace] = useState<WorkspaceData>(defaultWorkspace);
  const availableWorkspaces = [defaultWorkspace];

  const switchWorkspace = (id: string) => {
    console.log(`Switched to workspace: ${id}`);
  };

  const updateWorkspace = (updates: Partial<WorkspaceData>) => {
    setCurrentWorkspace((prev) => ({ ...prev, ...updates }));
  };

  const createAndSetWorkspace = async (newWorkspaceData: Partial<WorkspaceData>): Promise<WorkspaceData> => {
    const { data } = await supabaseWorkspaceService.createWorkspace(newWorkspaceData, "user-owner");
    const created = data || {
      ...defaultWorkspace,
      ...newWorkspaceData,
      id: `ws-${Date.now()}`,
      name: newWorkspaceData.name || "My Workspace",
    };
    setCurrentWorkspace(created as WorkspaceData);
    return created as WorkspaceData;
  };

  const updateKnowledgeBase = (updates: Partial<WorkspaceKnowledgeBase>) => {
    setCurrentWorkspace((prev) => ({
      ...prev,
      knowledgeBase: {
        ...prev.knowledgeBase,
        ...updates,
      },
    }));
  };

  const populateKnowledgeBaseFromResearch = (researchData: {
    website: string;
    linkedin: string;
    industry: string;
    targetMarkets: string[];
  }) => {
    setCurrentWorkspace((prev) => ({
      ...prev,
      domain: researchData.website || prev.domain,
      industry: researchData.industry || prev.industry,
      targetMarket: researchData.targetMarkets.length > 0 ? researchData.targetMarkets : prev.targetMarket,
      knowledgeBase: {
        ...prev.knowledgeBase,
        industry: researchData.industry || prev.knowledgeBase.industry,
        targetMarkets: researchData.targetMarkets.length > 0 ? researchData.targetMarkets : prev.knowledgeBase.targetMarkets,
        companyProfile: {
          ...prev.knowledgeBase.companyProfile,
          domain: researchData.website || prev.knowledgeBase.companyProfile.domain,
          industry: researchData.industry || prev.knowledgeBase.companyProfile.industry,
        },
        founderProfile: {
          ...prev.knowledgeBase.founderProfile,
          linkedin: researchData.linkedin || prev.knowledgeBase.founderProfile.linkedin,
        },
        idealCustomerProfile: {
          ...prev.knowledgeBase.idealCustomerProfile,
          regions: researchData.targetMarkets.length > 0 ? researchData.targetMarkets : prev.knowledgeBase.idealCustomerProfile.regions,
        },
      },
    }));
  };

  return (
    <WorkspaceContext.Provider
      value={{
        currentWorkspace,
        availableWorkspaces,
        switchWorkspace,
        updateWorkspace,
        createAndSetWorkspace,
        updateKnowledgeBase,
        populateKnowledgeBaseFromResearch,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = (): WorkspaceContextType => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
};
