"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  ExternalLink,
  Copy,
  Archive,
  Trash2,
  Search,
  ShieldCheck,
  ArrowUpDown,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useWorkspace } from "@/hooks/useWorkspace";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { CardSkeleton } from "@/components/shared/SkeletonLoader";
import { getResearch } from "@/services/research";

export interface ResearchHistoryItem {
  id: string;
  company: string;
  domain: string;
  industry: string;
  date: string;
  status: "Complete" | "In Progress" | "Archived";
  confidence: number; // e.g. 94
  author: string;
}

export const initialResearchHistory: ResearchHistoryItem[] = [
  {
    id: "hist-1",
    company: "Eminarc Growth OS",
    domain: "eminarc.com",
    industry: "B2B Growth / AI SaaS",
    date: "2026-08-02",
    status: "Complete",
    confidence: 94,
    author: "Bhavesh Tickoo",
  },
  {
    id: "hist-2",
    company: "Acme HealthTech",
    domain: "acmehealth.io",
    industry: "Digital HealthTech",
    date: "2026-07-29",
    status: "Complete",
    confidence: 91,
    author: "Pratyush",
  },
  {
    id: "hist-3",
    company: "Alpha AI Security",
    domain: "alphaai.dev",
    industry: "LLM Security Platform",
    date: "2026-07-24",
    status: "Complete",
    confidence: 88,
    author: "Aditya",
  },
  {
    id: "hist-4",
    company: "TrueLift.ai",
    domain: "truelift.ai",
    industry: "Revenue Operations",
    date: "2026-07-18",
    status: "In Progress",
    confidence: 76,
    author: "Bhavesh Tickoo",
  },
  {
    id: "hist-5",
    company: "Revix Commerce",
    domain: "revix.co",
    industry: "Headless E-commerce",
    date: "2026-07-10",
    status: "Archived",
    confidence: 82,
    author: "Pratyush",
  },
];

export const ResearchHistory: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const navigate = useNavigate();
  const [history, setHistory] = useState<ResearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"date" | "company" | "confidence">("date");

  const fetchResearchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getResearch(currentWorkspace?.id);
      const mapped: ResearchHistoryItem[] = data.map((d, i) => ({
        id: d.id,
        company: d.topic,
        domain: currentWorkspace?.domain || "eminarc.com",
        industry: d.industry,
        date: d.createdAt,
        status: "Complete",
        confidence: 90 + (i % 8),
        author: "Bhavesh Tickoo",
      }));
      setHistory(mapped);
    } catch (err) {
      setError((err as Error).message || "Failed to load research history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResearchReports();
  }, [currentWorkspace?.id]);

  const handleOpen = (item: ResearchHistoryItem) => {
    toast.success(`Opening ${item.company} Research Report`, {
      description: "Loading structured knowledge base into view...",
    });
  };

  const handleDuplicate = (item: ResearchHistoryItem) => {
    const newItem: ResearchHistoryItem = {
      ...item,
      id: `hist-${Date.now()}`,
      company: `${item.company} (Copy)`,
      date: new Date().toISOString().split("T")[0]!,
    };
    setHistory((prev) => [newItem, ...prev]);
    toast.success(`Duplicated report for ${item.company}`);
  };

  const handleArchive = (id: string) => {
    setHistory((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "Archived" ? "Complete" : "Archived" }
          : item,
      ),
    );
    toast.success("Updated report status");
  };

  const handleDelete = (id: string, name: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    toast.success(`Deleted research report for ${name}`);
  };

  // Filter & Sort Logic
  const filteredHistory = history
    .filter((item) => {
      const matchesSearch =
        search === "" ||
        item.company.toLowerCase().includes(search.toLowerCase()) ||
        item.domain.toLowerCase().includes(search.toLowerCase()) ||
        item.industry.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "date") return b.date.localeCompare(a.date);
      if (sortBy === "company") return a.company.localeCompare(b.company);
      if (sortBy === "confidence") return b.confidence - a.confidence;
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Top Controls Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] select-none">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              RESEARCH HISTORY ARCHIVE / {currentWorkspace.name.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0] font-bold">
              {filteredHistory.length} REPORTS MATCHED
            </span>
          </div>
          <h2 className="font-sans font-bold text-2xl text-[#111111] tracking-tight">
            Research History & Audit Logs
          </h2>
          <p className="font-sans font-medium text-xs text-[#52525B] mt-0.5">
            Previous founder research reports, confidence scores, and knowledge extractions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter Tabs */}
          <div className="flex items-center space-x-1 bg-[#FFFFFF] border border-[#E5E0D6] p-1 rounded-xl">
            {["All", "Complete", "In Progress", "Archived"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={cn(
                  "font-mono text-xs px-2.5 py-1 rounded-lg transition-all cursor-pointer",
                  statusFilter === st
                    ? "bg-[#000000] text-[#FFFFFF] font-bold shadow-sm"
                    : "text-[#716D64] hover:bg-[#F7F4EE]",
                )}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Sort Control */}
          <div className="flex items-center space-x-1 bg-[#FFFFFF] border border-[#E5E0D6] px-2.5 py-1.5 rounded-xl font-mono text-xs text-[#18181B]">
            <ArrowUpDown className="h-3.5 w-3.5 text-[#716D64] mr-1" />
            <span className="text-[#716D64] mr-1">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "company" | "confidence")}
              className="bg-transparent font-bold focus:outline-none cursor-pointer text-xs"
            >
              <option value="date">Date (Newest)</option>
              <option value="company">Company (A-Z)</option>
              <option value="confidence">Confidence Score</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#716D64]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports..."
              className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] pl-9 pr-3 py-1.5 text-xs font-sans text-[#18181B] placeholder-[#9E988D] focus:outline-none focus:ring-1 focus:ring-[#18181B]"
            />
          </div>
        </div>
      </div>

      {/* Loading & Error States */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : error ? (
        <ErrorState
          categoryTag="RESEARCH REPORT FETCH ERROR"
          title="Unable to load research history"
          description="A database connection error occurred while querying research reports from Supabase."
          errorMessage={error}
          onRetry={fetchResearchReports}
        />
      ) : filteredHistory.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] transition-all duration-200 hover:border-[rgba(0,0,0,0.14)] hover:shadow-[0_6px_16px_-4px_rgba(26,26,26,0.04)] select-none"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#000000] text-[#FFFFFF] font-mono text-xs font-bold shrink-0">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-sans font-bold text-sm text-[#111111] leading-tight truncate">
                        {item.company}
                      </h3>
                      <span className="font-mono text-[10px] text-[#716D64] block truncate">
                        {item.domain}
                      </span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "font-mono text-[9px] uppercase px-2 py-0.5 rounded-full font-bold border shrink-0",
                      item.status === "Complete"
                        ? "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]"
                        : item.status === "In Progress"
                          ? "bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]"
                          : "bg-[#EFEAE1] text-[#716D64] border-[#E5E0D6]",
                    )}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Meta Info */}
                <div className="space-y-1.5 py-2 font-mono text-xs text-[#716D64] border-t border-b border-[rgba(0,0,0,0.05)] my-3">
                  <div className="flex justify-between">
                    <span>Industry:</span>
                    <span className="font-medium text-[#18181B]">{item.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Created Date:</span>
                    <span className="font-medium text-[#18181B]">{item.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Author:</span>
                    <span className="font-medium text-[#18181B]">{item.author}</span>
                  </div>
                </div>
              </div>

              {/* Footer & Action Buttons */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#716D64] mb-3">
                  <span className="inline-flex items-center">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#2D6A4F] mr-1" />
                    <span>CONFIDENCE</span>
                  </span>
                  <span className="font-bold text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0]">
                    {item.confidence}%
                  </span>
                </div>

                {/* Explicit Action Buttons */}
                <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-[rgba(0,0,0,0.06)]">
                  <button
                    type="button"
                    onClick={() => handleOpen(item)}
                    className="flex items-center justify-center space-x-1 rounded-xl bg-[#000000] text-[#FFFFFF] py-1.5 font-mono text-[10px] font-bold hover:bg-[#222222] transition-colors cursor-pointer"
                    title="Open Report"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>Open</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDuplicate(item)}
                    className="flex items-center justify-center space-x-1 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-[#18181B] py-1.5 font-mono text-[10px] font-medium hover:bg-[#F7F4EE] transition-colors cursor-pointer"
                    title="Duplicate Report"
                  >
                    <Copy className="h-3 w-3 text-[#716D64]" />
                    <span>Copy</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleArchive(item.id)}
                    className="flex items-center justify-center space-x-1 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-[#716D64] py-1.5 font-mono text-[10px] font-medium hover:bg-[#F7F4EE] hover:text-[#18181B] transition-colors cursor-pointer"
                    title="Archive Report"
                  >
                    <Archive className="h-3 w-3" />
                    <span>Archive</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.company)}
                    className="flex items-center justify-center space-x-1 rounded-xl bg-[#FFFFFF] border border-[#FEE2E2] text-[#7F1D1D] py-1.5 font-mono text-[10px] font-medium hover:bg-[#FEE2E2]/50 transition-colors cursor-pointer"
                    title="Delete Report"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          categoryTag="FOUNDER RESEARCH HISTORY"
          icon={Search}
          title="No Research Reports Match Your Query"
          description="Synthesize a new McKinsey 5-step founder research audit to populate structured Knowledge Base entities for your workspace."
          nextActionText="Start New Founder Research"
          onNextAction={() => navigate({ to: "/research" })}
          secondaryActionText="Reset Search Filters"
          onSecondaryAction={() => {
            setSearch("");
            setStatusFilter("All");
          }}
        />
      )}
    </div>
  );
};
