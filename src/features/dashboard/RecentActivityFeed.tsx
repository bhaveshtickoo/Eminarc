"use client";

import React from "react";
import { Activity, ShieldCheck, FileText, UserCheck, Bot } from "lucide-react";
import { useWorkspace } from "@/hooks/useWorkspace";

export interface ActivityFeedItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: "audit" | "content" | "crm" | "research";
  icon: React.ComponentType<{ className?: string }>;
}

export const RecentActivityFeed: React.FC = () => {
  const { currentWorkspace } = useWorkspace();

  const activities: ActivityFeedItem[] = [
    {
      id: "act-1",
      title: "AI Search Visibility Audit Completed",
      desc: `LLM citation score scanned at ${currentWorkspace.metrics.aiVisibility}% across Perplexity & ChatGPT.`,
      time: "10m ago",
      type: "audit",
      icon: ShieldCheck,
    },
    {
      id: "act-2",
      title: "Content Asset Published",
      desc: 'LinkedIn Post "Why Growth OS Architecture Replaces Fragmented SaaS" active.',
      time: "1h ago",
      type: "content",
      icon: FileText,
    },
    {
      id: "act-3",
      title: "New Account Enriched in CRM",
      desc: `Acme Health VP Marketing profile enriched into ${currentWorkspace.name} Growth CRM.`,
      time: "2h ago",
      type: "crm",
      icon: UserCheck,
    },
    {
      id: "act-4",
      title: "Strategic Research Report Ready",
      desc: "McKinsey Audit Grade research report generated with 93% confidence score.",
      time: "Yesterday",
      type: "research",
      icon: Bot,
    },
  ];

  return (
    <div className="flex flex-col justify-between rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] h-full">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-[#18181B]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#716D64]">
              LIVE ACTIVITY STREAM
            </span>
          </div>
          <span className="font-mono text-[9px] text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0] font-bold">
            STREAM ACTIVE
          </span>
        </div>

        <h3 className="font-sans font-bold text-lg text-[#111111] tracking-tight">
          Recent System Activity
        </h3>
        <p className="font-sans font-medium text-xs text-[#52525B] mt-0.5">
          Real-time events and system logs across {currentWorkspace.name}.
        </p>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-3 my-4">
        {activities.map((act) => {
          const Icon = act.icon;

          return (
            <div
              key={act.id}
              className="flex items-start space-x-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-3 text-xs shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EFEAE1] text-[#18181B] shrink-0 mt-0.5">
                <Icon className="h-3.5 w-3.5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-sans font-semibold text-[#111111] truncate">{act.title}</h4>
                  <span className="font-mono text-[9px] text-[#716D64] shrink-0">{act.time}</span>
                </div>
                <p className="text-xs text-[#52525B] mt-0.5 leading-snug">{act.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-3 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between text-xs font-mono text-[#716D64]">
        <span>SYSTEM EVENT LOG</span>
        <span className="font-bold text-[#111111]">100% VERIFIED</span>
      </div>
    </div>
  );
};
