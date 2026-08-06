"use client";

import React from "react";
import {
  Building2,
  Search,
  DollarSign,
  Calendar,
  FileText,
  Eye,
  CheckCircle2,
  Clock,
  User,
  ShieldCheck,
} from "lucide-react";
import { useWorkspace } from "@/hooks/useWorkspace";

export interface CompanyProfileProps {
  companyName?: string;
}

export const CompanyProfile: React.FC<CompanyProfileProps> = ({ companyName = "TrueLift.ai" }) => {
  const { currentWorkspace } = useWorkspace();
  const kb = currentWorkspace.knowledgeBase;

  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-6 select-none">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(0,0,0,0.06)] pb-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#000000] text-[#FFFFFF] font-serif text-2xl font-bold">
            {companyName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-sans font-bold text-2xl text-[#111111]">{companyName}</h2>
              <span className="font-mono text-[9px] uppercase font-bold text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0]">
                ACTIVE DEAL ($24k)
              </span>
            </div>
            <p className="font-mono text-xs text-[#716D64]">
              Primary ICP: {kb.idealCustomerProfile.primaryICP} • B2B SaaS
            </p>
          </div>
        </div>

        {/* AI Visibility Score Widget */}
        <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] flex items-center space-x-3">
          <Eye className="h-5 w-5 text-[#2D6A4F]" />
          <div>
            <span className="font-mono text-[9px] text-[#716D64] block">AI VISIBILITY SCORE</span>
            <span className="font-sans font-bold text-lg text-[#111111]">
              {currentWorkspace.metrics.aiVisibility}% Indexed
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Profile Inspection Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 1. Overview */}
        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
          <h4 className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
            <Building2 className="h-3.5 w-3.5 mr-1.5 text-[#18181B]" />
            01. Company Overview
          </h4>
          <p className="font-sans text-xs text-[#18181B] leading-relaxed font-medium">
            {kb.companyProfile.description}
          </p>
          <p className="font-mono text-[10px] text-[#716D64]">
            HQ: San Francisco, CA • Employees: 25-50 • Founded: 2023
          </p>
        </div>

        {/* 2. Research Summary */}
        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
          <h4 className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
            <Search className="h-3.5 w-3.5 mr-1.5 text-[#18181B]" />
            02. Founder Research Summary
          </h4>
          <p className="font-sans text-xs text-[#18181B] leading-relaxed">
            Founder: <strong>{kb.founderProfile.name}</strong> (
            {kb.founderProfile.background || kb.founderProfile.bio})
          </p>
          <p className="font-sans text-xs text-[#716D64]">
            Friction: {kb.painPoints[0]?.title} — {kb.painPoints[0]?.impact}
          </p>
        </div>

        {/* 3. Open Opportunities */}
        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
          <h4 className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
            <DollarSign className="h-3.5 w-3.5 mr-1.5 text-[#2D6A4F]" />
            03. Open Opportunities
          </h4>
          <div className="p-2.5 rounded-lg bg-[#FCFAF7] border border-[#E5E0D6] space-y-1">
            <div className="flex justify-between font-mono text-xs font-bold text-[#111111]">
              <span>Growth OS Annual Contract</span>
              <span className="text-[#2D6A4F]">$24,000</span>
            </div>
            <p className="font-mono text-[10px] text-[#716D64]">
              Stage: Negotiation (96% AI Qualification)
            </p>
          </div>
        </div>

        {/* 4. Meeting History */}
        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
          <h4 className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1.5 text-[#18181B]" />
            04. Meeting History
          </h4>
          <div className="space-y-1 font-mono text-[10px] text-[#716D64]">
            <p>• Aug 01: Q3 Proposal Review (Completed)</p>
            <p>• Jul 25: Discovery Audit Call (Completed)</p>
            <p>• Jul 18: Initial Founder Demo (Completed)</p>
          </div>
        </div>

        {/* 5. Engagement Timeline */}
        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
          <h4 className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1.5 text-[#18181B]" />
            05. Activity Timeline
          </h4>
          <div className="space-y-1 font-mono text-[10px] text-[#716D64]">
            <p>• 2h ago: Opened MSA contract email link</p>
            <p>• Yesterday: Shared Content OS teardown</p>
            <p>• 3d ago: Visited AI Search Visibility radar</p>
          </div>
        </div>

        {/* 6. Content Generated */}
        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
          <h4 className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
            <FileText className="h-3.5 w-3.5 mr-1.5 text-[#18181B]" />
            06. Content Generated
          </h4>
          <div className="space-y-1 font-mono text-[10px] text-[#716D64]">
            <p>• LinkedIn: System Over Campaign Breakdown</p>
            <p>• Medium: GEO AI Citation Playbook</p>
            <p>• X Thread: 10 Founder Bottlenecks</p>
          </div>
        </div>
      </div>
    </div>
  );
};
