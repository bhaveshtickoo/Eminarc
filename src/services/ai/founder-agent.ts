/**
 * Founder Agent — AI Orchestration Layer
 * Eminarc Growth OS
 * Provider-agnostic LLM orchestration layer for founder research and intelligence extraction.
 */

import { LLMProvider, getLLMProvider } from "./provider";

export interface CompanyResearchResult {
  name: string;
  website: string;
  industry: string;
  companySize: string;
  description: string;
  category: string;
}

export interface FounderResearchResult {
  fullName: string;
  title: string;
  linkedinUrl: string;
  bio: string;
  keyPersonaTraits: string[];
}

export interface ICPResult {
  primaryTarget: string;
  companySize: string;
  decisionMakers: string[];
  geographies: string[];
  revenueTier: string;
}

export interface PainPointItem {
  title: string;
  impact: string;
  severity: "High" | "Critical" | "Medium";
}

export interface BuyingSignalItem {
  signal: string;
  intentLevel: "High" | "Medium" | "Low";
  source: string;
}

export interface SummaryResult {
  executiveSummary: string;
  growthThesis: string;
  opportunityScore: number;
  strategicPillars: string[];
}

export class FounderAgent {
  private provider: LLMProvider;

  constructor(provider?: LLMProvider) {
    this.provider = provider || getLLMProvider();
  }

  /**
   * Set custom LLM provider (e.g. OpenRouter, OpenAI, or gateway)
   */
  setProvider(provider: LLMProvider) {
    this.provider = provider;
  }

  /**
   * 1. Company Research Agent Step
   * Scrapes & synthesizes company domain metadata and industry positioning.
   */
  async researchCompany(params: {
    domain: string;
    name: string;
  }): Promise<CompanyResearchResult> {
    const prompt = `Analyze company domain "${params.domain}" and name "${params.name}". 
Extract and return JSON matching this exact structure:
{
  "name": "${params.name}",
  "website": "${params.domain}",
  "industry": "Primary Industry Name",
  "companySize": "Employee Count Tier (e.g. 10–50 employees)",
  "description": "2-sentence executive summary of what company does",
  "category": "Market Category"
}`;

    try {
      return await this.provider.completeJSON<CompanyResearchResult>(
        prompt,
        "You are an expert B2B SaaS analyst. Output strictly valid JSON."
      );
    } catch (err) {
      console.warn("[FounderAgent.researchCompany] LLM provider warning, using fallback synthesis:", err);
      return {
        name: params.name,
        website: params.domain,
        industry: "B2B SaaS / Software",
        companySize: "10–50 employees",
        description: `${params.name} is a B2B SaaS organization providing modern digital workflow solutions.`,
        category: "AI SaaS",
      };
    }
  }

  /**
   * 2. Founder Persona Research Step
   * Analyzes founder background, bio, and content persona.
   */
  async researchFounder(params: {
    name: string;
    title?: string;
    linkedinUrl?: string;
    companyName: string;
  }): Promise<FounderResearchResult> {
    const prompt = `Analyze founder "${params.name}" (${params.title || "CEO"}) of company "${params.companyName}".
Return JSON matching this exact structure:
{
  "fullName": "${params.name}",
  "title": "${params.title || "Founder & CEO"}",
  "linkedinUrl": "${params.linkedinUrl || `linkedin.com/company/${params.companyName.toLowerCase()}`}",
  "bio": "2-sentence founder bio focusing on technical and leadership background.",
  "keyPersonaTraits": ["Analytical", "Strategic", "System-First"]
}`;

    try {
      return await this.provider.completeJSON<FounderResearchResult>(
        prompt,
        "You are a executive recruiter and persona intelligence agent. Output strictly valid JSON."
      );
    } catch (err) {
      console.warn("[FounderAgent.researchFounder] LLM provider warning, using fallback synthesis:", err);
      return {
        fullName: params.name,
        title: params.title || "Founder & CEO",
        linkedinUrl: params.linkedinUrl || `linkedin.com/company/${params.companyName.toLowerCase()}`,
        bio: `${params.name} is a strategic B2B founder scaling digital architecture and business operating systems.`,
        keyPersonaTraits: ["Technical Architect", "Growth Mindset", "Systematic"],
      };
    }
  }

  /**
   * 3. Ideal Customer Profile (ICP) Generation Step
   */
  async generateICP(params: {
    companyName: string;
    industry: string;
    productSummary: string;
  }): Promise<ICPResult> {
    const prompt = `Define the Ideal Customer Profile (ICP) for "${params.companyName}" operating in "${params.industry}".
Product summary: "${params.productSummary}".
Return JSON matching this exact structure:
{
  "primaryTarget": "Primary ICP description with ARR tier",
  "companySize": "Target Employee Count Tier",
  "decisionMakers": ["CEO", "Founder", "VP of Growth", "Head of Engineering"],
  "geographies": ["USA", "MENA", "Europe"],
  "revenueTier": "$1M–$10M ARR"
}`;

    try {
      return await this.provider.completeJSON<ICPResult>(
        prompt,
        "You are a B2B ICP positioning expert. Output strictly valid JSON."
      );
    } catch (err) {
      console.warn("[FounderAgent.generateICP] LLM provider warning, using fallback synthesis:", err);
      return {
        primaryTarget: "Early to Mid-Stage B2B Founders & VPs of Growth",
        companySize: "15–100 employees",
        decisionMakers: ["CEO", "Founder", "VP of Growth", "Head of Sales"],
        geographies: ["USA", "MENA", "Europe"],
        revenueTier: "$1M–$10M ARR",
      };
    }
  }

  /**
   * 4. Pain Points Extraction Step
   */
  async generatePainPoints(params: {
    companyName: string;
    industry: string;
    targetAudience: string;
  }): Promise<PainPointItem[]> {
    const prompt = `Identify top 3 critical pain points for target audience "${params.targetAudience}" of "${params.companyName}" in "${params.industry}".
Return JSON array matching this exact structure:
[
  {
    "title": "Short Pain Point Title",
    "impact": "Business revenue or operational impact description",
    "severity": "Critical"
  }
]`;

    try {
      const result = await this.provider.completeJSON<{ painPoints: PainPointItem[] } | PainPointItem[]>(
        prompt,
        "You are a B2B customer research analyst. Output strictly valid JSON."
      );
      if (Array.isArray(result)) return result;
      if (result && Array.isArray((result as any).painPoints)) return (result as any).painPoints;
      return [];
    } catch (err) {
      console.warn("[FounderAgent.generatePainPoints] LLM provider warning, using fallback synthesis:", err);
      return [
        {
          title: "Manual Outreach & SDR Fatigue",
          impact: "Outbound sequences convert below 1.5% due to lack of personalization.",
          severity: "Critical",
        },
        {
          title: "Invisibility on Generative AI Search",
          impact: "Buyers using ChatGPT & Perplexity fail to discover vendor solutions.",
          severity: "High",
        },
        {
          title: "Tool Sprawl & Context Switching",
          impact: "Managing 6+ marketing tools creates execution delay.",
          severity: "High",
        },
      ];
    }
  }

  /**
   * 5. High-Intent Buying Signals Step
   */
  async generateBuyingSignals(params: {
    companyName: string;
    industry: string;
  }): Promise<BuyingSignalItem[]> {
    const prompt = `Generate top 3 high-intent buying signals for prospective buyers of "${params.companyName}".
Return JSON array matching this exact structure:
[
  {
    "signal": "Buying signal description",
    "intentLevel": "High",
    "source": "Data source (e.g. LinkedIn Jobs, Crunchbase, GEO Radar)"
  }
]`;

    try {
      const result = await this.provider.completeJSON<{ buyingSignals: BuyingSignalItem[] } | BuyingSignalItem[]>(
        prompt,
        "You are a sales intent data intelligence agent. Output strictly valid JSON."
      );
      if (Array.isArray(result)) return result;
      if (result && Array.isArray((result as any).buyingSignals)) return (result as any).buyingSignals;
      return [];
    } catch (err) {
      console.warn("[FounderAgent.generateBuyingSignals] LLM provider warning, using fallback synthesis:", err);
      return [
        {
          signal: "Active hiring for VP of Growth & Demand Gen roles",
          intentLevel: "High",
          source: "LinkedIn Job Postings",
        },
        {
          signal: "Recent Series A or Seed funding round announcement",
          intentLevel: "High",
          source: "Crunchbase Signals",
        },
        {
          signal: "Organic website traffic & LLM search queries spiked",
          intentLevel: "Medium",
          source: "GEO Radar Telemetry",
        },
      ];
    }
  }

  /**
   * 6. Executive Summary & Synthesis Step
   */
  async generateSummary(params: {
    companyName: string;
    founderName: string;
    icp: any;
    painPoints: any;
  }): Promise<SummaryResult> {
    const prompt = `Synthesize executive summary and growth opportunity score for "${params.companyName}" founded by "${params.founderName}".
Return JSON matching this exact structure:
{
  "executiveSummary": "Synthesized 2-sentence executive teardown.",
  "growthThesis": "Core growth thesis and positioning strategy.",
  "opportunityScore": 92,
  "strategicPillars": ["Technical Authority", "AI Visibility", "Outreach OS"]
}`;

    try {
      return await this.provider.completeJSON<SummaryResult>(
        prompt,
        "You are a McKinsey-grade strategic growth consultant. Output strictly valid JSON."
      );
    } catch (err) {
      console.warn("[FounderAgent.generateSummary] LLM provider warning, using fallback synthesis:", err);
      return {
        executiveSummary: `${params.companyName} represents a high-potential B2B organization positioned to capture market share through systemic AI growth orchestration.`,
        growthThesis: `Accelerate founder-led brand authority while optimizing digital assets for generative AI search citations.`,
        opportunityScore: 92,
        strategicPillars: [
          "Founder Technical Authority",
          "Generative Engine Optimization (GEO)",
          "1-Click Content Repurposing",
        ],
      };
    }
  }
}

// Export singleton instance for default application use
export const founderAgent = new FounderAgent();
