"use client";

import React, { useState } from "react";
import {
  Send,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Copy,
  Calendar,
  XCircle,
  Linkedin,
  Twitter,
  FileText,
  Mail,
  MessageSquare,
  Video,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useWorkspace } from "@/hooks/useWorkspace";

export interface QueueItem {
  id: string;
  title: string;
  excerpt: string;
  platform: "LinkedIn" | "X" | "Medium" | "Substack" | "Reddit" | "YouTube" | "Email";
  platformIcon: React.ComponentType<{ className?: string }>;
  accountHandle: string;
  status: "Scheduled" | "Pending Approval" | "Publishing Queue" | "Completed" | "Failed";
  date: string;
  time: string;
  failureReason?: string;
}

export const initialQueueItems: QueueItem[] = [
  {
    id: "dist-1",
    title: "System Over Campaign Breakdown",
    excerpt:
      "Why B2B SaaS founders must transition from one-off marketing sprints to an operating system.",
    platform: "LinkedIn",
    platformIcon: Linkedin,
    accountHandle: "Bhavesh Tickoo (Personal Profile)",
    status: "Scheduled",
    date: "2026-08-03",
    time: "09:00 AM",
  },
  {
    id: "dist-2",
    title: "GEO AI Search Citation Playbook",
    excerpt:
      "How to structure technical markdown breakdowns to rank in ChatGPT, Perplexity, and Claude search queries.",
    platform: "Medium",
    platformIcon: FileText,
    accountHandle: "Eminarc Engineering Team",
    status: "Pending Approval",
    date: "2026-08-05",
    time: "11:30 AM",
  },
  {
    id: "dist-3",
    title: "10 Founder Bottlenecks in Scaling Content",
    excerpt: "5-tweet breakdown on removing editorial friction without burning 20 hours weekly.",
    platform: "X",
    platformIcon: Twitter,
    accountHandle: "@bhaveshtickoo",
    status: "Publishing Queue",
    date: "2026-08-02",
    time: "11:45 AM",
  },
  {
    id: "dist-4",
    title: "B2B Growth OS Architecture Newsletter #42",
    excerpt: "Deep-dive newsletter on unifying market research, AI search radar, and CRM pipeline.",
    platform: "Substack",
    platformIcon: Mail,
    accountHandle: "Eminarc Growth Dispatch",
    status: "Completed",
    date: "2026-07-28",
    time: "08:00 AM",
  },
  {
    id: "dist-5",
    title: "r/SaaS Community AMA: Zero Ad-Spend Scaling",
    excerpt: "Authentic Reddit breakdown answering technical founder questions on CAC reduction.",
    platform: "Reddit",
    platformIcon: MessageSquare,
    accountHandle: "u/bhaveshtickoo",
    status: "Failed",
    date: "2026-07-26",
    time: "04:30 PM",
    failureReason: "OAuth 2.0 Token Expired — Re-authenticate channel in Settings.",
  },
  {
    id: "dist-6",
    title: "Why Campaigns Die in 30 Days (Short Script)",
    excerpt: "60-second video script explaining growth system compounding.",
    platform: "YouTube",
    platformIcon: Video,
    accountHandle: "Eminarc OS Channel",
    status: "Scheduled",
    date: "2026-08-10",
    time: "02:00 PM",
  },
];

export const statusBadges: Record<string, string> = {
  Scheduled: "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]",
  "Pending Approval": "bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]",
  "Publishing Queue": "bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]",
  Completed: "bg-[#18181B] text-[#FFFFFF] border-black",
  Failed: "bg-[#FEE2E2] text-[#7F1D1D] border-[#FCA5A5]",
};

export const DistributionQueueView: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const [queue, setQueue] = useState<QueueItem[]>(initialQueueItems);
  const [activeTab, setActiveTab] = useState<string>("All");

  const tabs = [
    "All",
    "Scheduled Content",
    "Pending Approval",
    "Publishing Queue",
    "Completed",
    "Failed",
  ];

  const handleReschedule = (id: string, title: string) => {
    toast.success(`Rescheduled "${title}"`, {
      description: "Updated distribution dispatch timestamp to next open slot.",
    });
  };

  const handleCancel = (id: string, title: string) => {
    setQueue((prev) => prev.filter((item) => item.id !== id));
    toast.error(`Cancelled dispatch for "${title}"`);
  };

  const handleDuplicate = (item: QueueItem) => {
    const newItem: QueueItem = {
      ...item,
      id: `dist-${Date.now()}`,
      title: `${item.title} (Copy)`,
      status: "Scheduled",
      date: "2026-08-14",
    };
    setQueue((prev) => [newItem, ...prev]);
    toast.success(`Duplicated "${item.title}" into queue`);
  };

  const filteredQueue = queue.filter((item) => {
    if (activeTab === "All") return true;
    if (activeTab === "Scheduled Content") return item.status === "Scheduled";
    if (activeTab === "Pending Approval") return item.status === "Pending Approval";
    if (activeTab === "Publishing Queue") return item.status === "Publishing Queue";
    if (activeTab === "Completed") return item.status === "Completed";
    if (activeTab === "Failed") return item.status === "Failed";
    return true;
  });

  return (
    <div className="space-y-6 select-none">
      {/* Top Header Card */}
      <div className="p-6 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              DISTRIBUTION DISPATCH / {currentWorkspace.name.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0] font-bold">
              {queue.length} DISPATCH QUEUES READY
            </span>
          </div>
          <h1 className="font-sans font-bold text-2xl md:text-3xl text-[#111111] tracking-tight">
            Distribution Queue & Multi-Channel Dispatch
          </h1>
          <p className="font-sans font-medium text-xs text-[#52525B] mt-0.5">
            Automated social provider dispatch queue, pending approvals, and execution logs.
          </p>
        </div>

        {/* API Integration Readiness Cards */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
          <span className="bg-[#FFFFFF] border border-[#E5E0D6] px-2.5 py-1 rounded-xl text-[#2D6A4F] font-bold flex items-center">
            <ShieldCheck className="h-3 w-3 mr-1" /> LinkedIn API v2 Ready
          </span>
          <span className="bg-[#FFFFFF] border border-[#E5E0D6] px-2.5 py-1 rounded-xl text-[#2D6A4F] font-bold flex items-center">
            <ShieldCheck className="h-3 w-3 mr-1" /> X API v2 Ready
          </span>
          <span className="bg-[#FFFFFF] border border-[#E5E0D6] px-2.5 py-1 rounded-xl text-[#2D6A4F] font-bold flex items-center">
            <ShieldCheck className="h-3 w-3 mr-1" /> Medium & Substack Ready
          </span>
        </div>
      </div>

      {/* Tabs Filter Bar */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 font-mono text-xs border-b border-[#E5E0D6]">
        {tabs.map((t) => {
          const count =
            t === "All"
              ? queue.length
              : t === "Scheduled Content"
                ? queue.filter((i) => i.status === "Scheduled").length
                : t === "Pending Approval"
                  ? queue.filter((i) => i.status === "Pending Approval").length
                  : t === "Publishing Queue"
                    ? queue.filter((i) => i.status === "Publishing Queue").length
                    : t === "Completed"
                      ? queue.filter((i) => i.status === "Completed").length
                      : queue.filter((i) => i.status === "Failed").length;

          return (
            <button
              key={t}
              type="button"
              onClick={() => setActiveTab(t)}
              className={cn(
                "px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-medium shrink-0",
                activeTab === t
                  ? "bg-[#000000] text-[#FFFFFF] border-black font-bold shadow-sm"
                  : "bg-[#FFFFFF] text-[#716D64] border-[#E5E0D6] hover:bg-[#F7F4EE]",
              )}
            >
              {t} ({count})
            </button>
          );
        })}
      </div>

      {/* Distribution Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredQueue.map((item) => {
          const Icon = item.platformIcon;

          return (
            <div
              key={item.id}
              className="group flex flex-col justify-between rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] transition-all duration-200 hover:border-[rgba(0,0,0,0.14)] hover:shadow-[0_6px_16px_-4px_rgba(26,26,26,0.04)]"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#000000] text-[#FFFFFF] shrink-0 font-mono text-xs font-bold">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-sans font-bold text-xs text-[#111111] block leading-tight">
                        {item.platform}
                      </span>
                      <span className="font-mono text-[9px] text-[#716D64] block">
                        {item.accountHandle}
                      </span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "font-mono text-[9px] uppercase px-2 py-0.5 rounded-full font-bold border shrink-0",
                      statusBadges[item.status],
                    )}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="font-sans font-bold text-sm text-[#111111] leading-snug">
                  {item.title}
                </h3>

                <p className="font-sans text-xs text-[#716D64] mt-1.5 leading-normal line-clamp-2">
                  {item.excerpt}
                </p>

                {item.failureReason && (
                  <div className="mt-3 p-2.5 rounded-lg bg-[#FEE2E2] border border-[#FCA5A5] font-mono text-[10px] text-[#7F1D1D] flex items-start space-x-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-[#EF4444] shrink-0 mt-0.5" />
                    <span>{item.failureReason}</span>
                  </div>
                )}
              </div>

              {/* Card Footer & Action Buttons */}
              <div className="pt-4 mt-4 border-t border-[rgba(0,0,0,0.06)] space-y-3">
                <div className="flex items-center justify-between font-mono text-[10px] text-[#716D64]">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1 text-[#18181B]" />
                    Date: <strong className="text-[#18181B] ml-1">{item.date}</strong>
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-[#18181B]" />
                    Time: <strong className="text-[#18181B] ml-1">{item.time}</strong>
                  </span>
                </div>

                {/* Explicit Action Buttons: Reschedule, Cancel, Duplicate */}
                <div className="grid grid-cols-3 gap-1.5">
                  {/* 1. Reschedule */}
                  <button
                    type="button"
                    onClick={() => handleReschedule(item.id, item.title)}
                    className="flex items-center justify-center space-x-1 rounded-xl bg-[#000000] text-[#FFFFFF] py-1.5 font-mono text-[10px] font-bold hover:bg-[#222222] transition-colors cursor-pointer"
                    title="Reschedule Dispatch"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>Reschedule</span>
                  </button>

                  {/* 2. Cancel */}
                  <button
                    type="button"
                    onClick={() => handleCancel(item.id, item.title)}
                    className="flex items-center justify-center space-x-1 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-[#716D64] py-1.5 font-mono text-[10px] font-medium hover:bg-[#F7F4EE] hover:text-[#18181B] transition-colors cursor-pointer"
                    title="Cancel Dispatch"
                  >
                    <XCircle className="h-3 w-3" />
                    <span>Cancel</span>
                  </button>

                  {/* 3. Duplicate */}
                  <button
                    type="button"
                    onClick={() => handleDuplicate(item)}
                    className="flex items-center justify-center space-x-1 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-[#18181B] py-1.5 font-mono text-[10px] font-medium hover:bg-[#F7F4EE] transition-colors cursor-pointer"
                    title="Duplicate Item"
                  >
                    <Copy className="h-3 w-3 text-[#716D64]" />
                    <span>Duplicate</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
