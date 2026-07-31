"use client";

import React, { useState } from "react";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import { cn } from "@/design-system/utils/cn";

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  plan: "Pro" | "Business" | "Enterprise" | "Free";
  status: "Qualified" | "Engaged" | "New" | "Won" | "Lost";
  score: number;
  source: "LinkedIn" | "Reddit" | "AI Search" | "Website" | "Email";
  mrr: string;
  avatarLetter: string;
}

export const initialLeads: LeadItem[] = [
  {
    id: "lead-1",
    name: "Sarah Chen",
    email: "sarah@neuralflow.ai",
    company: "NeuralFlow",
    role: "VP Marketing",
    plan: "Pro",
    status: "Qualified",
    score: 92,
    source: "LinkedIn",
    mrr: "$79/mo",
    avatarLetter: "SC",
  },
  {
    id: "lead-2",
    name: "Marcus Webb",
    email: "marcus@dataray.io",
    company: "DataRay",
    role: "Founder",
    plan: "Business",
    status: "Engaged",
    score: 88,
    source: "Reddit",
    mrr: "$199/mo",
    avatarLetter: "MW",
  },
  {
    id: "lead-3",
    name: "Priya Nair",
    email: "priya@loopgpt.com",
    company: "LoopGPT",
    role: "Head of Growth",
    plan: "Pro",
    status: "New",
    score: 81,
    source: "AI Search",
    mrr: "$79/mo",
    avatarLetter: "PN",
  },
  {
    id: "lead-4",
    name: "James Okafor",
    email: "james@vaultsec.dev",
    company: "VaultSec",
    role: "CTO",
    plan: "Free",
    status: "New",
    score: 64,
    source: "Website",
    mrr: "—",
    avatarLetter: "JO",
  },
  {
    id: "lead-5",
    name: "Elena Rossi",
    email: "elena@brightml.co",
    company: "BrightML",
    role: "CEO",
    plan: "Enterprise",
    status: "Won",
    score: 96,
    source: "LinkedIn",
    mrr: "$499/mo",
    avatarLetter: "ER",
  },
  {
    id: "lead-6",
    name: "Tom Becker",
    email: "tom@fleetops.ai",
    company: "FleetOps",
    role: "VP Sales",
    plan: "Pro",
    status: "Qualified",
    score: 89,
    source: "Email",
    mrr: "$79/mo",
    avatarLetter: "TB",
  },
  {
    id: "lead-7",
    name: "Aisha Khan",
    email: "aisha@promptlab.io",
    company: "PromptLab",
    role: "Founder",
    plan: "Business",
    status: "Engaged",
    score: 85,
    source: "LinkedIn",
    mrr: "$199/mo",
    avatarLetter: "AK",
  },
];

export const LeadIntelligenceTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const filteredLeads = initialLeads.filter((l) => {
    const matchesSearch =
      search === "" ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.company.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-5">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-sans font-bold text-xl text-[#111111] tracking-tight">
            Lead Intelligence
          </h3>
          <p className="font-sans font-medium text-xs text-[#52525B] mt-0.5">
            Every lead enriched, scored, and ready for outreach.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter Tabs */}
          <div className="flex items-center space-x-1 bg-[#FFFFFF] border border-[#E5E0D6] p-1 rounded-xl select-none">
            {["All", "Qualified", "Engaged", "New", "Won"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={cn(
                  "font-mono text-xs px-2.5 py-1 rounded-lg transition-all",
                  statusFilter === st
                    ? "bg-[#000000] text-[#FFFFFF] font-bold shadow-sm"
                    : "text-[#716D64] hover:bg-[#F7F4EE]",
                )}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#716D64]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads..."
              className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] pl-9 pr-3 py-1.5 text-xs font-sans text-[#18181B] placeholder-[#9E988D] focus:outline-none focus:ring-1 focus:ring-[#18181B]"
            />
          </div>

          <button
            type="button"
            className="flex items-center space-x-1.5 rounded-xl bg-[#000000] px-3.5 py-1.5 text-xs font-sans font-bold text-[#FFFFFF] shadow-sm hover:bg-[#222222] transition-all"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[#E5E0D6] bg-[#FFFFFF]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5E0D6] bg-[#FBF9F5] font-mono text-[10px] uppercase tracking-wider text-[#716D64]">
              <th className="py-3 px-4 font-semibold">Name</th>
              <th className="py-3 px-4 font-semibold">Company</th>
              <th className="py-3 px-4 font-semibold">Plan</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4 font-semibold">Score</th>
              <th className="py-3 px-4 font-semibold">Source</th>
              <th className="py-3 px-4 font-semibold">MRR</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E0D6]/60 text-xs font-sans">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-[#F7F4EE]/60 transition-colors">
                {/* Name */}
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#000000] font-mono text-[10px] font-bold text-[#FFFFFF] shrink-0">
                      {lead.avatarLetter}
                    </div>
                    <div>
                      <span className="font-bold text-[#111111] block">{lead.name}</span>
                      <span className="font-mono text-[10px] text-[#716D64] block">
                        {lead.email}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Company */}
                <td className="py-3 px-4">
                  <span className="font-bold text-[#18181B] block">{lead.company}</span>
                  <span className="font-mono text-[10px] text-[#716D64] block">{lead.role}</span>
                </td>

                {/* Plan */}
                <td className="py-3 px-4">
                  <span className="font-mono text-[10px] font-medium bg-[#EFEAE1] px-2 py-0.5 rounded text-[#18181B]">
                    {lead.plan}
                  </span>
                </td>

                {/* Status */}
                <td className="py-3 px-4">
                  <span
                    className={cn(
                      "font-mono text-[9px] uppercase px-2 py-0.5 rounded font-bold border",
                      lead.status === "Won"
                        ? "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]"
                        : lead.status === "Qualified"
                          ? "bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]"
                          : lead.status === "Engaged"
                            ? "bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]"
                            : "bg-[#EFEAE1] text-[#716D64] border-[#E5E0D6]",
                    )}
                  >
                    {lead.status}
                  </span>
                </td>

                {/* Score */}
                <td className="py-3 px-4 font-mono font-bold text-[#2D6A4F]">{lead.score}</td>

                {/* Source */}
                <td className="py-3 px-4 font-mono text-[11px] text-[#716D64]">{lead.source}</td>

                {/* MRR */}
                <td className="py-3 px-4 font-mono font-bold text-[#111111]">{lead.mrr}</td>

                {/* Actions */}
                <td className="py-3 px-4 text-right">
                  <button
                    type="button"
                    className="p-1 rounded-lg hover:bg-[#EFEAE1] text-[#716D64] hover:text-[#111111]"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
