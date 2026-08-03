"use client";

import React from "react";
import { Calendar, Clock, User, Building2, Video, CheckCircle2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface MeetingData {
  id: string;
  title: string;
  company: string;
  attendees: string[];
  date: string;
  time: string;
  status: "Upcoming" | "Completed" | "Rescheduled";
  agenda: string;
  aiNotes?: string;
}

export const mockMeetings: MeetingData[] = [
  {
    id: "mtg-1",
    title: "MSA Contract & Growth OS Onboarding Review",
    company: "TrueLift.ai",
    attendees: ["Bhavesh Tickoo", "Alex Vance (CEO)"],
    date: "Aug 04, 2026",
    time: "10:00 AM EST",
    status: "Upcoming",
    agenda: "Review final MSA terms, confirm 1-click repurposing setup, and schedule kickoff.",
    aiNotes: "High buying intent. Key requirement: LLM citation radar dashboard for ChatGPT.",
  },
  {
    id: "mtg-2",
    title: "Q3 Campaign Strategy & Content Audit",
    company: "Revix Systems",
    attendees: ["Pratyush", "Sarah Jenkins (VP Marketing)"],
    date: "Aug 01, 2026",
    time: "02:30 PM EST",
    status: "Completed",
    agenda: "Audit existing LinkedIn performance and align Q3 messaging pillars.",
    aiNotes: "Client approved 3-pillar content framework. Target proposal delivery: Aug 05.",
  },
];

export const MeetingCard: React.FC = () => {
  const handleJoin = (title: string) => {
    toast.success(`Joining meeting: "${title}"`, {
      description: "Opening video conferencing room...",
    });
  };

  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4 select-none">
      <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] pb-3">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
            MEETINGS ENGINE
          </span>
          <h3 className="font-sans font-bold text-xl text-[#111111] mt-1 tracking-tight">
            Founder & Client Meeting Schedule
          </h3>
        </div>

        <span className="font-mono text-[9px] uppercase font-bold text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0]">
          2 SCHEDULED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockMeetings.map((mtg) => (
          <div
            key={mtg.id}
            className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-4 space-y-3 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0]">
                {mtg.company}
              </span>
              <span
                className={cn(
                  "font-mono text-[9px] uppercase px-2 py-0.5 rounded font-bold border",
                  mtg.status === "Upcoming"
                    ? "bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]"
                    : "bg-[#18181B] text-[#FFFFFF] border-black",
                )}
              >
                {mtg.status}
              </span>
            </div>

            <h4 className="font-sans font-bold text-sm text-[#111111] leading-tight">
              {mtg.title}
            </h4>

            <div className="flex items-center space-x-3 font-mono text-xs text-[#716D64]">
              <span className="flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1 text-[#18181B]" />
                {mtg.date}
              </span>
              <span className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1 text-[#18181B]" />
                {mtg.time}
              </span>
            </div>

            <p className="font-sans text-xs text-[#52525B] leading-normal bg-[#FCFAF7] p-2.5 rounded-lg border border-[#E5E0D6]">
              <strong>Agenda:</strong> {mtg.agenda}
            </p>

            {mtg.aiNotes && (
              <div className="p-2.5 rounded-lg bg-[#E0F2FE]/50 border border-[#BAE6FD] font-sans text-xs text-[#0369A1] space-y-0.5">
                <span className="font-mono text-[9px] font-bold uppercase flex items-center">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Meeting Notes
                </span>
                <p className="text-[11px] leading-snug">{mtg.aiNotes}</p>
              </div>
            )}

            <button
              type="button"
              onClick={() => handleJoin(mtg.title)}
              className="w-full flex items-center justify-center space-x-1.5 py-2 rounded-xl bg-[#000000] text-[#FFFFFF] font-mono text-xs font-bold hover:bg-[#222222] transition-colors cursor-pointer"
            >
              <Video className="h-3.5 w-3.5" />
              <span>{mtg.status === "Upcoming" ? "Join Meeting Room" : "View Recording"}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
