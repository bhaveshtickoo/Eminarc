"use client";

import React from "react";
import { Clock, Mail, Calendar, Eye, FileText, CheckCircle2, User } from "lucide-react";

export interface TimelineEvent {
  id: string;
  type: "email" | "meeting" | "content" | "visibility" | "deal";
  title: string;
  description: string;
  timestamp: string;
  actor: string;
}

export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: "evt-1",
    type: "deal",
    title: "Deal Stage Advanced to Negotiation",
    description: "TrueLift.ai ($24,000) moved from Proposal to Negotiation after contract review.",
    timestamp: "2 hours ago",
    actor: "Bhavesh Tickoo",
  },
  {
    id: "evt-2",
    type: "meeting",
    title: "Completed Q3 Growth Strategy Call",
    description: "Reviewed 1-click repurposing workflow with Sarah Jenkins (Revix Systems).",
    timestamp: "Yesterday, 03:00 PM",
    actor: "Pratyush",
  },
  {
    id: "evt-3",
    type: "email",
    title: "Sent Outreach Sequence #4",
    description: "Dispatched cold outreach email to 45 B2B SaaS founder prospects.",
    timestamp: "Aug 01, 2026",
    actor: "Aditya",
  },
  {
    id: "evt-4",
    type: "visibility",
    title: "AI Search Radar Citation Index",
    description: "ChatGPT indexed 42 new brand mentions from Eminarc Medium teardowns.",
    timestamp: "Jul 30, 2026",
    actor: "System Radar",
  },
];

export const Timeline: React.FC = () => {
  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4 select-none">
      <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] pb-3">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
            ACTIVITY FEED
          </span>
          <h3 className="font-sans font-bold text-xl text-[#111111] mt-1 tracking-tight">
            Chronological Buyer Activity Timeline
          </h3>
        </div>

        <span className="font-mono text-[9px] uppercase font-bold text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0]">
          LIVE TELEMETRY
        </span>
      </div>

      <div className="space-y-3 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E0D6]">
        {mockTimelineEvents.map((evt) => (
          <div key={evt.id} className="relative pl-9 space-y-1">
            <div className="absolute left-2.5 top-1.5 h-3 w-3 rounded-full bg-[#18181B] ring-4 ring-[#FCFAF7]" />

            <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-1 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="font-bold text-[#111111]">{evt.title}</span>
                <span className="text-[#716D64] flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {evt.timestamp}
                </span>
              </div>

              <p className="font-sans text-xs text-[#52525B] leading-relaxed">
                {evt.description}
              </p>

              <div className="font-mono text-[9px] text-[#716D64] pt-1 border-t border-[rgba(0,0,0,0.05)]">
                Logged by: <strong className="text-[#18181B]">{evt.actor}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
