"use client";

import React from "react";
import { Calendar as CalendarIcon, Clock, CheckCircle2 } from "lucide-react";

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  platform: string;
  status: "Scheduled" | "Draft" | "Review";
}

export const mockDeadlines: CalendarEvent[] = [
  {
    id: "cal-1",
    title: "System Over Campaign Breakdown",
    date: "Today, 4:00 PM",
    platform: "LinkedIn",
    status: "Scheduled",
  },
  {
    id: "cal-2",
    title: "GEO AI Search Citation Playbook",
    date: "Tomorrow, 10:00 AM",
    platform: "Medium",
    status: "Review",
  },
  {
    id: "cal-3",
    title: "10 Founder Bottlenecks Thread",
    date: "Aug 05, 2:00 PM",
    platform: "X Thread",
    status: "Draft",
  },
];

export const ContentCalendar: React.FC = () => {
  return (
    <div className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-4 space-y-3 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] select-none">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase font-bold text-[#716D64] flex items-center">
          <CalendarIcon className="h-3.5 w-3.5 mr-1.5 text-[#18181B]" />
          MINI CONTENT CALENDAR
        </span>
        <span className="font-mono text-[9px] text-[#2D6A4F] font-bold">3 DEADLINES UPCOMING</span>
      </div>

      {/* Deadlines List */}
      <div className="space-y-2">
        {mockDeadlines.map((ev) => (
          <div
            key={ev.id}
            className="flex items-center justify-between p-2.5 rounded-lg bg-[#FBF9F5] border border-[#E5E0D6] text-xs font-sans"
          >
            <div className="min-w-0 pr-2">
              <span className="font-bold text-[#111111] truncate block">{ev.title}</span>
              <div className="flex items-center space-x-2 font-mono text-[9px] text-[#716D64] mt-0.5">
                <span className="flex items-center">
                  <Clock className="h-2.5 w-2.5 mr-0.5" />
                  {ev.date}
                </span>
                <span>•</span>
                <span className="font-semibold text-[#18181B]">{ev.platform}</span>
              </div>
            </div>

            <span className="font-mono text-[8px] uppercase px-1.5 py-0.5 rounded font-bold bg-[#EFEAE1] text-[#716D64] shrink-0">
              {ev.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
