"use client";

import React from "react";
import {
  Building2,
  User,
  Target,
  AlertTriangle,
  Compass,
  Users,
  MessageSquare,
  Zap,
  FileText,
  CheckSquare,
  Mic,
} from "lucide-react";
import { ResearchSection } from "./ResearchSection";
import { useWorkspace } from "@/hooks/useWorkspace";

export interface ResearchReportProps {
  formData?: {
    website?: string;
    linkedin?: string;
    industry?: string;
    targetMarket?: string;
  };
}

export const ResearchReport: React.FC<ResearchReportProps> = ({ formData }) => {
  const { currentWorkspace } = useWorkspace();
  const kb = currentWorkspace.knowledgeBase;

  const companyName = kb.companyProfile.name;
  const domain = formData?.website || kb.companyProfile.domain;
  const founderHandle = formData?.linkedin || kb.founderProfile.linkedin;
  const industry = formData?.industry || kb.companyProfile.industry;

  return (
    <div className="space-y-6">
      {/* Report Header Bar */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-[#EFEAE1]/60 border border-[#E5E0D6] font-mono text-xs text-[#716D64]">
        <span>WORKSPACE KNOWLEDGE BASE REPORT • 10 STRUCTURED ENTITIES</span>
        <span className="font-bold text-[#111111]">MCKINSEY & COMPANY FRAMEWORK</span>
      </div>

      {/* 01. Company Profile */}
      <ResearchSection
        sectionNumber="01"
        title="Company Profile"
        subtitle="Core product architecture, mission, and operating model"
        icon={<Building2 className="h-4 w-4" />}
        badgeText="PRIMARY ENTITY"
      >
        <p className="text-[#18181B] font-medium leading-relaxed">
          <strong>{companyName}</strong> ({domain}) — {kb.companyProfile.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#716D64] block mb-1">
              CATEGORY DEFINITION
            </span>
            <span className="font-sans text-sm font-semibold text-[#111111]">
              {kb.companyProfile.category}
            </span>
          </div>
          <div className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#716D64] block mb-1">
              CORE PHILOSOPHY
            </span>
            <span className="font-sans font-medium text-sm text-[#111111]">
              &quot;{kb.companyProfile.corePhilosophy}&quot;
            </span>
          </div>
        </div>
      </ResearchSection>

      {/* 02. Founder Profile */}
      <ResearchSection
        sectionNumber="02"
        title="Founder Profile"
        subtitle="Leadership background, strategic focus, and personal brand leverage"
        icon={<User className="h-4 w-4" />}
      >
        <div className="space-y-3">
          <p>
            Founder profile linked to <strong>{kb.founderProfile.name}</strong> (
            {kb.founderProfile.title}, {founderHandle}). {kb.founderProfile.bio}
          </p>
          <ul className="space-y-2 border-l-2 border-[#18181B] pl-4 py-1 text-xs md:text-sm text-[#18181B]">
            <li>
              <strong>Primary Focus:</strong> {kb.founderProfile.primaryFocus}
            </li>
            <li>
              <strong>Content Persona:</strong> {kb.founderProfile.contentPersona}
            </li>
            <li>
              <strong>Distribution Channels:</strong>{" "}
              {kb.founderProfile.distributionChannels.join(", ")}
            </li>
          </ul>
        </div>
      </ResearchSection>

      {/* 03. Target Market */}
      <ResearchSection
        sectionNumber="03"
        title="Target Market & ICP"
        subtitle="High-intent target segments and buyer personas"
        icon={<Target className="h-4 w-4" />}
        badgeText="ICP MATCH: 96%"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-4 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0]">
              PRIMARY ICP
            </span>
            <h4 className="font-sans font-bold text-sm text-[#111111]">
              {kb.targetMarket.primaryICP}
            </h4>
            <p className="text-xs text-[#716D64] leading-relaxed">
              Target Decision Makers: {kb.targetMarket.decisionMakers.join(", ")} (
              {kb.targetMarket.companySize}).
            </p>
          </div>

          <div className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-4 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#78350F] bg-[#FEF3C7] px-2 py-0.5 rounded border border-[#FDE68A]">
              SECONDARY ICP & GEOS
            </span>
            <h4 className="font-sans font-bold text-sm text-[#111111]">
              {kb.targetMarket.secondaryICP}
            </h4>
            <p className="text-xs text-[#716D64] leading-relaxed">
              Geographic Focus: {kb.targetMarket.regions.join(", ")}.
            </p>
          </div>
        </div>
      </ResearchSection>

      {/* 04. Brand Voice */}
      <ResearchSection
        sectionNumber="04"
        title="Brand Voice & Communication Guidelines"
        subtitle="Stylistic constraints, vocabulary, and communication principles"
        icon={<Mic className="h-4 w-4" />}
      >
        <div className="flex flex-wrap gap-2 mb-3">
          {kb.brandVoice.toneTags.map((voice, i) => (
            <span
              key={i}
              className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-[#18181B] text-[#FFFFFF]"
            >
              {voice}
            </span>
          ))}
        </div>
        <div className="space-y-2 text-xs text-[#18181B] border-l-2 border-[#2D6A4F] pl-4 py-1">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#716D64] block font-bold">
            COMMUNICATION RULES
          </span>
          {kb.brandVoice.rules.map((rule, idx) => (
            <p key={idx}>• {rule}</p>
          ))}
        </div>
      </ResearchSection>

      {/* 05. Core Messaging */}
      <ResearchSection
        sectionNumber="05"
        title="Core Messaging & Value Pillars"
        subtitle="High-converting value props and strategic hooks"
        icon={<MessageSquare className="h-4 w-4" />}
      >
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-1">
            <span className="font-mono text-[10px] font-bold text-[#716D64] block">
              ELEVATOR PITCH
            </span>
            <p className="text-xs font-semibold text-[#111111] leading-relaxed">
              &quot;{kb.messaging.elevatorPitch}&quot;
            </p>
          </div>
          {kb.messaging.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-1"
            >
              <span className="font-mono text-[10px] font-bold text-[#2D6A4F]">
                PILLAR 0{idx + 1} • {pillar.title.toUpperCase()}
              </span>
              <p className="text-xs font-medium text-[#111111]">&quot;{pillar.hook}&quot;</p>
            </div>
          ))}
        </div>
      </ResearchSection>

      {/* 06. Competitors */}
      <ResearchSection
        sectionNumber="06"
        title="Competitive Intelligence"
        subtitle="Direct & indirect alternatives, category benchmarks"
        icon={<Users className="h-4 w-4" />}
      >
        <div className="overflow-x-auto rounded-xl border border-[#E5E0D6] bg-[#FFFFFF]">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-[#E5E0D6] bg-[#FBF9F5] font-mono text-[10px] uppercase text-[#716D64]">
                <th className="py-2.5 px-3">Competitor</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Gaps & Weaknesses</th>
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

      {/* 07. Products */}
      <ResearchSection
        sectionNumber="07"
        title="Products & Features"
        subtitle="Core software offerings and functional capabilities"
        icon={<Zap className="h-4 w-4" />}
      >
        <div className="space-y-3">
          {kb.products.map((prod, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-sans font-bold text-sm text-[#111111]">{prod.name}</h4>
                <span className="font-mono text-[10px] font-bold text-[#0369A1] bg-[#E0F2FE] px-2 py-0.5 rounded border border-[#BAE6FD]">
                  TIER: {prod.tier}
                </span>
              </div>
              <p className="text-xs text-[#716D64]">{prod.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {prod.keyFeatures.map((feat, fIdx) => (
                  <span
                    key={fIdx}
                    className="font-mono text-[10px] bg-[#EFEAE1] px-2 py-0.5 rounded text-[#18181B]"
                  >
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ResearchSection>

      {/* 08. Services */}
      <ResearchSection
        sectionNumber="08"
        title="Services & Advisory Programs"
        subtitle="High-touch growth advisory and hands-on execution"
        icon={<FileText className="h-4 w-4" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {kb.services.map((serv, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2"
            >
              <h5 className="font-sans font-bold text-xs text-[#111111]">{serv.name}</h5>
              <p className="text-[11px] text-[#716D64]">{serv.scope}</p>
              <div className="space-y-1 pt-1 font-mono text-[10px] text-[#2D6A4F]">
                {serv.deliverables.map((del, dIdx) => (
                  <p key={dIdx}>• {del}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ResearchSection>

      {/* 09. Goals */}
      <ResearchSection
        sectionNumber="09"
        title="Strategic Growth Goals"
        subtitle="Key performance targets and milestone pacing"
        icon={<CheckSquare className="h-4 w-4" />}
        badgeText="MILESTONES"
      >
        <div className="space-y-2.5">
          {kb.goals.map((g, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6]"
            >
              <div className="flex items-center space-x-3">
                <span className="font-mono text-xs font-bold text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0]">
                  {g.priority}
                </span>
                <span className="font-bold text-[#111111] text-xs">{g.title}</span>
              </div>
              <div className="flex items-center space-x-3 font-mono text-xs">
                <span className="font-bold text-[#111111]">{g.target}</span>
                <span className="text-[#716D64]">({g.timeframe})</span>
              </div>
            </div>
          ))}
        </div>
      </ResearchSection>

      {/* 10. Challenges */}
      <ResearchSection
        sectionNumber="10"
        title="Friction & Operational Challenges"
        subtitle="Current blockers and active mitigation strategies"
        icon={<AlertTriangle className="h-4 w-4" />}
        badgeVariant="warning"
        badgeText="ACTIVE MITIGATION"
      >
        <div className="space-y-3">
          {kb.challenges.map((ch, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <h5 className="font-sans font-bold text-xs text-[#111111]">{ch.title}</h5>
                <span className="font-mono text-[9px] uppercase font-bold text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded border border-[#FDE68A]">
                  STATUS: {ch.status}
                </span>
              </div>
              <p className="text-[11px] text-[#716D64]">Impact: {ch.impact}</p>
              <p className="text-xs font-semibold text-[#2D6A4F] pt-1">Strategy: {ch.mitigation}</p>
            </div>
          ))}
        </div>
      </ResearchSection>
    </div>
  );
};
