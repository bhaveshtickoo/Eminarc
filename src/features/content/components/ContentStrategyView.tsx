"use client";

import React from "react";
import {
  Compass,
  Target,
  MessageSquare,
  Layers,
  Clock,
  Mic,
  Sparkles,
  AlertTriangle,
  Zap,
  ShieldCheck,
  CheckSquare,
} from "lucide-react";
import { useWorkspace } from "@/hooks/useWorkspace";

export const ContentStrategyView: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const kb = currentWorkspace.knowledgeBase;

  const postingCadence = [
    { channel: "LinkedIn Founder Personal Brand", frequency: "3x / Week", format: "Thought leadership text & carousels" },
    { channel: "Technical Medium Teardowns", frequency: "1x / Week", format: "Long-form architecture teardowns" },
    { channel: "X / Twitter Threads", frequency: "2x / Week", format: "5-tweet punchy breakdowns" },
    { channel: "Substack / Email Newsletter", frequency: "1x / Week", format: "Executive strategy briefing" },
    { channel: "Reddit r/SaaS Case Studies", frequency: "Bi-Weekly", format: "Authentic community discussions" },
  ];

  const priorityTopics = [
    "Why B2B Growth Campaigns Die in 30 Days",
    "Generative Engine Optimization: Getting Cited by ChatGPT & Perplexity",
    "Scaling Founder-Led Content Without Spending 20 Hours Weekly",
    "The B2B Growth Operating System Architecture Teardown",
    "Converting AI Search Traffic Into Qualified CRM Pipeline",
  ];

  return (
    <div className="space-y-6 select-none">
      {/* Top Header Card */}
      <div className="p-6 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              CONTENT STRATEGY ENGINE / {currentWorkspace.name.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0] font-bold flex items-center">
              <ShieldCheck className="h-3 w-3 mr-1 text-[#2D6A4F]" />
              KNOWLEDGE BASE SYNCED
            </span>
          </div>
          <h1 className="font-sans font-bold text-2xl md:text-3xl text-[#111111] tracking-tight">
            Workspace Content Strategy Blueprint
          </h1>
          <p className="font-sans font-medium text-xs text-[#52525B] mt-0.5">
            Editorial positioning, posting frequency, brand voice, and topic roadmap.
          </p>
        </div>

        <div className="font-mono text-xs text-right hidden sm:block">
          <span className="text-[#716D64] block">KNOWLEDGE MODEL</span>
          <span className="font-bold text-[#111111] text-sm">13 Entities Active</span>
        </div>
      </div>

      {/* Grid of 9 Knowledge Base Strategy Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 1. Mission */}
        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(0,0,0,0.06)]">
            <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
              <Compass className="h-3.5 w-3.5 mr-1.5 text-[#18181B]" />
              01. Editorial Mission
            </span>
            <span className="font-mono text-[9px] bg-[#EFEAE1] px-2 py-0.5 rounded font-bold text-[#716D64]">
              NORTH STAR
            </span>
          </div>
          <p className="font-sans text-xs text-[#18181B] leading-relaxed font-medium">
            &quot;{kb.companyProfile.corePhilosophy}&quot;
          </p>
          <p className="font-sans text-xs text-[#716D64] leading-normal">
            {kb.companyProfile.description}
          </p>
        </div>

        {/* 2. Target Audience */}
        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(0,0,0,0.06)]">
            <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
              <Target className="h-3.5 w-3.5 mr-1.5 text-[#18181B]" />
              02. Target Audience
            </span>
            <span className="font-mono text-[9px] bg-[#EDF6F0] text-[#1E4620] px-2 py-0.5 rounded font-bold border border-[#C8E4D0]">
              96% ICP MATCH
            </span>
          </div>
          <div className="space-y-1.5 text-xs font-sans">
            <h4 className="font-bold text-[#111111]">{kb.idealCustomerProfile.primaryICP}</h4>
            <p className="text-[#716D64]">
              Decision Makers: {kb.idealCustomerProfile.decisionMakers.join(", ")}
            </p>
            <div className="flex flex-wrap gap-1 font-mono text-[9px] pt-1">
              {kb.targetMarkets.map((m, idx) => (
                <span key={idx} className="bg-[#EFEAE1] text-[#18181B] px-2 py-0.5 rounded">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Messaging Pillars */}
        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(0,0,0,0.06)]">
            <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
              <MessageSquare className="h-3.5 w-3.5 mr-1.5 text-[#18181B]" />
              03. Messaging Pillars
            </span>
          </div>
          <div className="space-y-2">
            {kb.messaging.pillars.map((pil, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-xs">
                <span className="font-mono text-[9px] font-bold text-[#2D6A4F] block">
                  PILLAR 0{idx + 1} • {pil.title.toUpperCase()}
                </span>
                <p className="text-[#111111] font-semibold mt-0.5 leading-snug">&quot;{pil.hook}&quot;</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Content Pillars */}
        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(0,0,0,0.06)]">
            <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
              <Layers className="h-3.5 w-3.5 mr-1.5 text-[#18181B]" />
              04. Content Pillars
            </span>
          </div>
          <div className="space-y-1.5 font-sans text-xs">
            <div className="p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6]">
              <strong className="text-[#111111] block">1. System-Over-Campaign Thinking</strong>
              <span className="text-[#716D64] text-[11px]">Systemic B2B growth vs one-off marketing sprints.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6]">
              <strong className="text-[#111111] block">2. Generative Engine Optimization (GEO)</strong>
              <span className="text-[#716D64] text-[11px]">Getting cited by ChatGPT, Perplexity & Claude.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6]">
              <strong className="text-[#111111] block">3. Multi-Channel Repurposing Architecture</strong>
              <span className="text-[#716D64] text-[11px]">Scaling 1 technical breakdown into 7 assets.</span>
            </div>
          </div>
        </div>

        {/* 5. Posting Frequency */}
        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(0,0,0,0.06)]">
            <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1.5 text-[#18181B]" />
              05. Posting Frequency
            </span>
            <span className="font-mono text-[9px] bg-[#EFEAE1] px-2 py-0.5 rounded font-bold text-[#716D64]">
              CADENCE
            </span>
          </div>
          <div className="space-y-2">
            {postingCadence.map((cad, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-xs">
                <div>
                  <span className="font-bold text-[#111111] block">{cad.channel}</span>
                  <span className="text-[#716D64] text-[10px]">{cad.format}</span>
                </div>
                <span className="font-mono text-[10px] font-bold text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0]">
                  {cad.frequency}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Brand Voice */}
        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(0,0,0,0.06)]">
            <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
              <Mic className="h-3.5 w-3.5 mr-1.5 text-[#18181B]" />
              06. Brand Voice & Tone
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
            {kb.brandVoice.toneTags.map((tone, idx) => (
              <span key={idx} className="bg-[#18181B] text-[#FFFFFF] px-2.5 py-0.5 rounded font-bold">
                {tone}
              </span>
            ))}
          </div>
          <div className="space-y-1 text-xs text-[#18181B]">
            <span className="font-mono text-[9px] uppercase text-[#716D64] font-bold block">GUIDELINES</span>
            {kb.brandVoice.rules.map((rule, idx) => (
              <p key={idx} className="text-[11px] text-[#716D64]">
                • {rule}
              </p>
            ))}
          </div>
        </div>

        {/* 7. Priority Topics */}
        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(0,0,0,0.06)]">
            <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
              <Sparkles className="h-3.5 w-3.5 mr-1.5 text-[#18181B]" />
              07. Priority Topics
            </span>
            <span className="font-mono text-[9px] bg-[#E0F2FE] text-[#0369A1] px-2 py-0.5 rounded font-bold border border-[#BAE6FD]">
              HIGH INTENT
            </span>
          </div>
          <div className="space-y-1.5 font-sans text-xs">
            {priorityTopics.map((topic, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] flex items-center space-x-2">
                <span className="font-mono text-[10px] font-bold text-[#2D6A4F]">0{idx + 1}</span>
                <span className="font-bold text-[#111111]">{topic}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 8. Objections */}
        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(0,0,0,0.06)]">
            <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
              <AlertTriangle className="h-3.5 w-3.5 mr-1.5 text-[#18181B]" />
              08. Buyer Objections & Frictions
            </span>
            <span className="font-mono text-[9px] bg-[#FEF3C7] text-[#78350F] px-2 py-0.5 rounded font-bold border border-[#FDE68A]">
              OBJECTIONS
            </span>
          </div>
          <div className="space-y-2">
            {kb.painPoints.map((pp, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-xs space-y-1">
                <h5 className="font-bold text-[#111111]">{pp.title}</h5>
                <p className="text-[#716D64] text-[11px]">{pp.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 9. Content Opportunities */}
        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(0,0,0,0.06)]">
            <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
              <Zap className="h-3.5 w-3.5 mr-1.5 text-[#18181B]" />
              09. Growth & Content Levers
            </span>
            <span className="font-mono text-[9px] bg-[#EDF6F0] text-[#1E4620] px-2 py-0.5 rounded font-bold border border-[#C8E4D0]">
              OPPORTUNITIES
            </span>
          </div>
          <div className="space-y-2">
            {kb.growthOpportunities.map((go, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-xs space-y-1">
                <strong className="text-[#111111] block">{go.title}</strong>
                <p className="text-[#716D64] text-[11px]">{go.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
