"use client";

import React from "react";
import {
  FileText,
  Building2,
  User,
  Package,
  Target,
  AlertTriangle,
  Compass,
  Users,
  MessageSquare,
  Mic,
  Zap,
  CheckSquare,
} from "lucide-react";
import { ResearchSection } from "./ResearchSection";
import { useWorkspace } from "@/hooks/useWorkspace";

export interface ResearchReportProps {
  formData?: {
    website?: string;
    linkedin?: string;
    industry?: string;
    targetMarkets?: string[];
  };
}

export const ResearchReport: React.FC<ResearchReportProps> = ({ formData }) => {
  const { currentWorkspace } = useWorkspace();
  const kb = currentWorkspace.knowledgeBase;

  const companyName = kb.companyProfile.name;
  const domain = formData?.website || kb.companyProfile.domain;
  const founderHandle = formData?.linkedin || kb.founderProfile.linkedin;
  const industry = formData?.industry || kb.companyProfile.industry;
  const targetMarkets =
    formData?.targetMarkets && formData.targetMarkets.length > 0
      ? formData.targetMarkets.join(", ")
      : kb.targetMarket.regions.join(", ");

  return (
    <div className="space-y-5">
      {/* Report Header Bar */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-[#EFEAE1]/60 border border-[#E5E0D6] font-mono text-xs text-[#716D64] select-none">
        <span>CENTER PANEL / 12 COLLAPSIBLE CONSULTING REPORT CARDS</span>
        <span className="font-bold text-[#111111]">MCKINSEY & COMPANY FRAMEWORK</span>
      </div>

      {/* 01. Executive Summary */}
      <ResearchSection
        sectionNumber="01"
        title="Executive Summary"
        subtitle="High-level growth thesis and strategic synthesis"
        icon={<FileText className="h-4 w-4" />}
        badgeText="SYNTHESIS"
      >
        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
          <p className="font-medium text-[#111111] leading-relaxed">
            <strong>{companyName}</strong> ({domain}) represents a category-defining AI Growth Operating System designed for high-velocity B2B teams.
            The company addresses critical market friction: tool sprawl, manual content repurposing overhead, and missing citations in generative AI search engines.
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
            <span className="bg-[#EDF6F0] text-[#1E4620] px-2.5 py-0.5 rounded border border-[#C8E4D0] font-bold">
              GROWTH HEALTH: {currentWorkspace.metrics.growthScore}%
            </span>
            <span className="bg-[#E0F2FE] text-[#0369A1] px-2.5 py-0.5 rounded border border-[#BAE6FD] font-bold">
              AI CITATION SCORE: {currentWorkspace.metrics.aiVisibility}%
            </span>
          </div>
        </div>
      </ResearchSection>

      {/* 02. Company Overview */}
      <ResearchSection
        sectionNumber="02"
        title="Company Overview"
        subtitle="Core product architecture, mission, and operating model"
        icon={<Building2 className="h-4 w-4" />}
        badgeText="PRIMARY ENTITY"
      >
        <p className="text-[#18181B] font-medium leading-relaxed">
          {kb.companyProfile.description}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          <div className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-3.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#716D64] block mb-1">
              CATEGORY DEFINITION
            </span>
            <span className="font-sans text-xs font-bold text-[#111111]">
              {kb.companyProfile.category}
            </span>
          </div>
          <div className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-3.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#716D64] block mb-1">
              CORE PHILOSOPHY
            </span>
            <span className="font-sans font-semibold text-xs text-[#111111]">
              &quot;{kb.companyProfile.corePhilosophy}&quot;
            </span>
          </div>
        </div>
      </ResearchSection>

      {/* 03. Founder Profile */}
      <ResearchSection
        sectionNumber="03"
        title="Founder Profile"
        subtitle="Leadership background, strategic focus, and personal brand leverage"
        icon={<User className="h-4 w-4" />}
      >
        <div className="space-y-3">
          <p>
            Founder <strong>{kb.founderProfile.name}</strong> ({kb.founderProfile.title}, {founderHandle}). {kb.founderProfile.bio}
          </p>
          <ul className="space-y-1.5 border-l-2 border-[#18181B] pl-4 py-1 text-xs text-[#18181B]">
            <li><strong>Primary Focus:</strong> {kb.founderProfile.primaryFocus}</li>
            <li><strong>Content Persona:</strong> {kb.founderProfile.contentPersona}</li>
            <li><strong>Distribution Channels:</strong> {kb.founderProfile.distributionChannels.join(", ")}</li>
          </ul>
        </div>
      </ResearchSection>

      {/* 04. Products & Services */}
      <ResearchSection
        sectionNumber="04"
        title="Products & Services"
        subtitle="Core software offerings and advisory programs"
        icon={<Package className="h-4 w-4" />}
      >
        <div className="space-y-3">
          {kb.products.map((prod, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="font-sans font-bold text-xs text-[#111111]">{prod.name}</h4>
                <span className="font-mono text-[9px] font-bold text-[#0369A1] bg-[#E0F2FE] px-2 py-0.5 rounded border border-[#BAE6FD]">
                  TIER: {prod.tier}
                </span>
              </div>
              <p className="text-xs text-[#716D64]">{prod.description}</p>
              <div className="flex flex-wrap gap-1 pt-1 font-mono text-[10px]">
                {prod.keyFeatures.map((feat, fIdx) => (
                  <span key={fIdx} className="bg-[#EFEAE1] px-2 py-0.5 rounded text-[#18181B]">
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ResearchSection>

      {/* 05. Ideal Customer Profile (ICP) */}
      <ResearchSection
        sectionNumber="05"
        title="Ideal Customer Profile (ICP)"
        subtitle="High-intent target segments and buyer personas"
        icon={<Target className="h-4 w-4" />}
        badgeText="96% ICP MATCH"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-3.5 space-y-1.5">
            <span className="font-mono text-[9px] font-bold uppercase text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0]">
              PRIMARY TARGET
            </span>
            <h4 className="font-sans font-bold text-xs text-[#111111]">
              {kb.targetMarket.primaryICP}
            </h4>
            <p className="text-xs text-[#716D64]">
              Regions: {targetMarkets}. Decision Makers: {kb.targetMarket.decisionMakers.join(", ")}.
            </p>
          </div>

          <div className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-3.5 space-y-1.5">
            <span className="font-mono text-[9px] font-bold uppercase text-[#78350F] bg-[#FEF3C7] px-2 py-0.5 rounded border border-[#FDE68A]">
              SECONDARY TARGET
            </span>
            <h4 className="font-sans font-bold text-xs text-[#111111]">
              {kb.targetMarket.secondaryICP}
            </h4>
            <p className="text-xs text-[#716D64]">
              Growth agencies managing 3–10 clients needing multi-channel execution.
            </p>
          </div>
        </div>
      </ResearchSection>

      {/* 06. Pain Points */}
      <ResearchSection
        sectionNumber="06"
        title="Pain Points & Frictions"
        subtitle="Operational friction and hurdles facing target buyers"
        icon={<AlertTriangle className="h-4 w-4" />}
        badgeVariant="warning"
        badgeText="CRITICAL FRICTION"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {kb.challenges.map((ch, idx) => (
            <div key={idx} className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-3 space-y-1">
              <span className="font-mono text-[9px] font-bold text-[#B45309]">0{idx + 1}. FRICTION</span>
              <h5 className="font-sans font-bold text-xs text-[#111111]">{ch.title}</h5>
              <p className="text-[11px] text-[#716D64]">{ch.impact}</p>
            </div>
          ))}
        </div>
      </ResearchSection>

      {/* 07. Market Positioning */}
      <ResearchSection
        sectionNumber="07"
        title="Market Positioning"
        subtitle="Market differentiation and value proposition placement"
        icon={<Compass className="h-4 w-4" />}
      >
        <div className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-4 space-y-2">
          <div className="flex justify-between font-mono text-xs border-b border-[rgba(0,0,0,0.06)] pb-2">
            <span className="text-[#716D64]">INDUSTRY VERTICAL:</span>
            <span className="font-bold text-[#111111]">{industry}</span>
          </div>
          <p className="text-xs text-[#18181B] leading-relaxed">
            Positioned as the premier <strong>AI Growth OS</strong> — operating above single-point social tools and legacy enterprise CRMs.
          </p>
        </div>
      </ResearchSection>

      {/* 08. Competitor Landscape */}
      <ResearchSection
        sectionNumber="08"
        title="Competitor Landscape"
        subtitle="Alternative comparison & category benchmarks"
        icon={<Users className="h-4 w-4" />}
      >
        <div className="overflow-x-auto rounded-xl border border-[#E5E0D6] bg-[#FFFFFF]">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-[#E5E0D6] bg-[#FBF9F5] font-mono text-[10px] uppercase text-[#716D64]">
                <th className="py-2.5 px-3">Competitor</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Weaknesses</th>
                <th className="py-2.5 px-3">Our Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D6]/60 text-[11px]">
              {kb.competitors.map((comp, idx) => (
                <tr key={idx}>
                  <td className="py-2.5 px-3 font-bold text-[#111111]">{comp.name}</td>
                  <td className="py-2.5 px-3 text-[#716D64]">{comp.category}</td>
                  <td className="py-2.5 px-3 text-[#716D64]">{comp.weaknesses}</td>
                  <td className="py-2.5 px-3 font-semibold text-[#2D6A4F]">{comp.ourAdvantage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ResearchSection>

      {/* 09. Messaging Analysis */}
      <ResearchSection
        sectionNumber="09"
        title="Messaging Analysis & Value Pillars"
        subtitle="Strategic hooks and value props"
        icon={<MessageSquare className="h-4 w-4" />}
      >
        <div className="space-y-2.5">
          {kb.messaging.pillars.map((pil, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-1">
              <span className="font-mono text-[10px] font-bold text-[#2D6A4F]">HOOK 0{idx + 1} • {pil.title.toUpperCase()}</span>
              <p className="text-xs font-medium text-[#111111]">&quot;{pil.hook}&quot;</p>
            </div>
          ))}
        </div>
      </ResearchSection>

      {/* 10. Brand Voice */}
      <ResearchSection
        sectionNumber="10"
        title="Brand Voice Guidelines"
        subtitle="Stylistic constraints and tone guidelines"
        icon={<Mic className="h-4 w-4" />}
      >
        <div className="flex flex-wrap gap-2 mb-2">
          {kb.brandVoice.toneTags.map((voice, i) => (
            <span key={i} className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#18181B] text-[#FFFFFF]">
              {voice}
            </span>
          ))}
        </div>
        <p className="text-xs text-[#716D64]">
          Prohibited terms: {kb.brandVoice.prohibitedPhrases.join(", ")}.
        </p>
      </ResearchSection>

      {/* 11. Growth Opportunities */}
      <ResearchSection
        sectionNumber="11"
        title="Growth Opportunities"
        subtitle="High-leverage channel levers"
        icon={<Zap className="h-4 w-4" />}
        badgeText="HIGH LEVERAGE"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-1">
            <span className="font-mono text-[10px] font-bold text-[#0369A1]">OPPORTUNITY 01</span>
            <h5 className="font-sans font-bold text-xs text-[#111111]">Founder Content Amplification</h5>
            <p className="text-[11px] text-[#716D64]">Scale founder's LinkedIn posts to drive zero-CAC inbound traffic.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-1">
            <span className="font-mono text-[10px] font-bold text-[#0369A1]">OPPORTUNITY 02</span>
            <h5 className="font-sans font-bold text-xs text-[#111111]">Generative AI Citation Optimization</h5>
            <p className="text-[11px] text-[#716D64]">Publish structured markdown teardowns to capture ChatGPT/Perplexity search rank.</p>
          </div>
        </div>
      </ResearchSection>

      {/* 12. Recommended Actions */}
      <ResearchSection
        sectionNumber="12"
        title="Recommended Actions"
        subtitle="Prioritized execution roadmap"
        icon={<CheckSquare className="h-4 w-4" />}
        badgeText="ACTION ROADMAP"
      >
        <div className="space-y-2">
          {kb.goals.map((g, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] font-mono text-xs">
              <span className="font-bold text-[#111111]">{g.title}</span>
              <span className="text-[#2D6A4F] font-bold bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0]">
                {g.target} ({g.timeframe})
              </span>
            </div>
          ))}
        </div>
      </ResearchSection>
    </div>
  );
};
