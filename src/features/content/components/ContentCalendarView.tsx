"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  GripVertical,
  Linkedin,
  Twitter,
  Mail,
  FileText,
  MessageSquare,
  Video,
  Send,
  User,
  Clock,
  Filter,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useWorkspace } from "@/hooks/useWorkspace";

export interface ScheduledContentItem {
  id: string;
  title: string;
  platform: string;
  platformIcon: React.ComponentType<{ className?: string }>;
  status: "Draft" | "Review" | "Approved" | "Scheduled" | "Published";
  campaign: string;
  owner: string;
  scheduledDate: string; // YYYY-MM-DD
  dayNumber: number; // Day of August 2026
  time: string;
}

export const initialCalendarItems: ScheduledContentItem[] = [
  {
    id: "cal-1",
    title: "System Over Campaign Breakdown",
    platform: "LinkedIn Post",
    platformIcon: Linkedin,
    status: "Scheduled",
    campaign: "System Over Campaign Q3",
    owner: "Bhavesh Tickoo",
    scheduledDate: "2026-08-03",
    dayNumber: 3,
    time: "09:00 AM",
  },
  {
    id: "cal-2",
    title: "GEO AI Search Citation Playbook",
    platform: "Medium Teardown",
    platformIcon: FileText,
    status: "Review",
    campaign: "GEO AI Citation",
    owner: "Pratyush",
    scheduledDate: "2026-08-05",
    dayNumber: 5,
    time: "11:30 AM",
  },
  {
    id: "cal-3",
    title: "10 Founder Bottlenecks X Thread",
    platform: "X Thread",
    platformIcon: Twitter,
    status: "Scheduled",
    campaign: "System Over Campaign Q3",
    owner: "Aditya",
    scheduledDate: "2026-08-08",
    dayNumber: 8,
    time: "02:00 PM",
  },
  {
    id: "cal-4",
    title: "B2B Growth OS Architecture Newsletter",
    platform: "Newsletter",
    platformIcon: Mail,
    status: "Approved",
    campaign: "Organic Inbound",
    owner: "Bhavesh Tickoo",
    scheduledDate: "2026-08-12",
    dayNumber: 12,
    time: "08:00 AM",
  },
  {
    id: "cal-5",
    title: "Reddit r/SaaS Growth Teardown AMA",
    platform: "Reddit Post",
    platformIcon: MessageSquare,
    status: "Draft",
    campaign: "Community Growth",
    owner: "Pratyush",
    scheduledDate: "2026-08-15",
    dayNumber: 15,
    time: "04:30 PM",
  },
  {
    id: "cal-6",
    title: "60s Video Script: Why Campaigns Die",
    platform: "Video Script",
    platformIcon: Video,
    status: "Draft",
    campaign: "Video OS",
    owner: "Aditya",
    scheduledDate: "2026-08-19",
    dayNumber: 19,
    time: "01:00 PM",
  },
  {
    id: "cal-7",
    title: "Outreach Sequence to B2B Founders",
    platform: "Outreach Email",
    platformIcon: Send,
    status: "Scheduled",
    campaign: "Cold Outreach",
    owner: "Bhavesh Tickoo",
    scheduledDate: "2026-08-22",
    dayNumber: 22,
    time: "10:00 AM",
  },
  {
    id: "cal-8",
    title: "LinkedIn Carousel: 7 Frames of GEO",
    platform: "LinkedIn Carousel",
    platformIcon: Linkedin,
    status: "Scheduled",
    campaign: "GEO AI Citation",
    owner: "Pratyush",
    scheduledDate: "2026-08-26",
    dayNumber: 26,
    time: "03:00 PM",
  },
];

export const statusColors: Record<string, string> = {
  Draft: "bg-[#EFEAE1] text-[#716D64] border-[#E5E0D6]",
  Review: "bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]",
  Approved: "bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]",
  Scheduled: "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]",
  Published: "bg-[#18181B] text-[#FFFFFF] border-black",
};

export const ContentCalendarView: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const [viewMode, setViewMode] = useState<"month" | "week" | "list">("month");
  const [items, setItems] = useState<ScheduledContentItem[]>(initialCalendarItems);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  const daysInAugust = Array.from({ length: 31 }, (_, i) => i + 1);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDragStart = (id: string) => {
    setDraggedItemId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnDay = (day: number) => {
    if (!draggedItemId) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === draggedItemId
          ? {
              ...item,
              dayNumber: day,
              scheduledDate: `2026-08-${day < 10 ? `0${day}` : day}`,
            }
          : item,
      ),
    );
    toast.success(`Rescheduled to Aug ${day}, 2026`, {
      description: "Visual drag-and-drop placement updated.",
    });
    setDraggedItemId(null);
  };

  return (
    <div className="space-y-6 select-none">
      {/* Top Bar Controls */}
      <div className="p-6 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              CONTENT CALENDAR / {currentWorkspace.name.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0] font-bold">
              {items.length} ASSETS SCHEDULED
            </span>
          </div>
          <h1 className="font-sans font-bold text-2xl md:text-3xl text-[#111111] tracking-tight">
            Editorial Content Calendar
          </h1>
          <p className="font-sans font-medium text-xs text-[#52525B] mt-0.5">
            August 2026 publishing schedule and multi-channel drag-and-drop manager.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Month Navigator */}
          <div className="flex items-center space-x-2 bg-[#FFFFFF] border border-[#E5E0D6] px-3 py-1.5 rounded-xl font-mono text-xs text-[#18181B] font-bold">
            <button type="button" className="p-1 hover:bg-[#EFEAE1] rounded">
              <ChevronLeft className="h-4 w-4 text-[#716D64]" />
            </button>
            <span>August 2026</span>
            <button type="button" className="p-1 hover:bg-[#EFEAE1] rounded">
              <ChevronRight className="h-4 w-4 text-[#716D64]" />
            </button>
          </div>

          {/* View Mode Switcher (Month / Week / List) */}
          <div className="flex items-center space-x-1 bg-[#FFFFFF] border border-[#E5E0D6] p-1 rounded-xl">
            {(["month", "week", "list"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setViewMode(m)}
                className={cn(
                  "font-mono text-xs px-3 py-1.5 rounded-lg capitalize transition-all font-semibold cursor-pointer",
                  viewMode === m
                    ? "bg-[#000000] text-[#FFFFFF] shadow-sm"
                    : "text-[#716D64] hover:bg-[#F7F4EE] hover:text-[#111111]",
                )}
              >
                {m} View
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MONTH VIEW */}
      {viewMode === "month" && (
        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-2 text-center font-mono text-xs font-bold text-[#716D64] border-b border-[#E5E0D6] pb-3">
            {daysOfWeek.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* 31 Calendar Day Cells Grid */}
          <div className="grid grid-cols-7 gap-2">
            {daysInAugust.map((day) => {
              const dayItems = items.filter((item) => item.dayNumber === day);

              return (
                <div
                  key={day}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDropOnDay(day)}
                  className="min-h-[110px] p-2 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] flex flex-col justify-between transition-all hover:border-[#18181B]/30"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#18181B]">{day}</span>
                    {day === 2 && (
                      <span className="font-mono text-[8px] bg-[#000000] text-[#FFFFFF] px-1.5 py-0.5 rounded font-bold">
                        TODAY
                      </span>
                    )}
                  </div>

                  {/* Cards inside Day Cell */}
                  <div className="space-y-1.5 my-1 flex-1">
                    {dayItems.map((item) => {
                      const Icon = item.platformIcon;

                      return (
                        <div
                          key={item.id}
                          draggable
                          onDragStart={() => handleDragStart(item.id)}
                          className="group p-2 rounded-lg bg-[#FCFAF7] border border-[#E5E0D6] hover:border-[#18181B] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] cursor-grab active:cursor-grabbing transition-all space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 min-w-0">
                              <GripVertical className="h-3 w-3 text-[#A19B8E] shrink-0" />
                              <Icon className="h-3 w-3 text-[#18181B] shrink-0" />
                              <span className="font-mono text-[9px] font-bold text-[#18181B] truncate">
                                {item.platform.split(" ")[0]}
                              </span>
                            </div>
                            <span
                              className={cn(
                                "font-mono text-[8px] uppercase px-1 py-0.2 rounded font-bold border shrink-0",
                                statusColors[item.status],
                              )}
                            >
                              {item.status}
                            </span>
                          </div>

                          <p className="font-sans text-[11px] font-bold text-[#111111] leading-tight line-clamp-2">
                            {item.title}
                          </p>

                          <div className="flex items-center justify-between font-mono text-[8px] text-[#716D64] pt-0.5">
                            <span>{item.owner.split(" ")[0]}</span>
                            <span>{item.time}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* WEEK VIEW */}
      {viewMode === "week" && (
        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
          <div className="flex items-center justify-between font-mono text-xs font-bold text-[#716D64] border-b border-[#E5E0D6] pb-3">
            <span>WEEKLY SCHEDULE (AUG 03 – AUG 09, 2026)</span>
            <span>{items.filter((i) => i.dayNumber >= 3 && i.dayNumber <= 9).length} POSTS PLANNED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
            {[3, 4, 5, 6, 7, 8, 9].map((day, idx) => {
              const dayName = daysOfWeek[idx];
              const dayItems = items.filter((item) => item.dayNumber === day);

              return (
                <div
                  key={day}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDropOnDay(day)}
                  className="min-h-[220px] p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2"
                >
                  <div className="flex justify-between items-center font-mono text-xs border-b border-[rgba(0,0,0,0.06)] pb-2">
                    <span className="font-bold text-[#111111]">{dayName}</span>
                    <span className="text-[#716D64]">Aug {day}</span>
                  </div>

                  <div className="space-y-2 pt-1">
                    {dayItems.map((item) => {
                      const Icon = item.platformIcon;

                      return (
                        <div
                          key={item.id}
                          draggable
                          onDragStart={() => handleDragStart(item.id)}
                          className="p-2.5 rounded-xl bg-[#FCFAF7] border border-[#E5E0D6] space-y-1.5 cursor-grab active:cursor-grabbing hover:border-[#18181B]"
                        >
                          <div className="flex items-center justify-between">
                            <Icon className="h-3.5 w-3.5 text-[#18181B]" />
                            <span
                              className={cn(
                                "font-mono text-[8px] uppercase px-1.5 py-0.5 rounded font-bold border",
                                statusColors[item.status],
                              )}
                            >
                              {item.status}
                            </span>
                          </div>
                          <h4 className="font-sans font-bold text-xs text-[#111111]">{item.title}</h4>
                          <p className="font-mono text-[9px] text-[#716D64]">Campaign: {item.campaign}</p>
                          <p className="font-mono text-[9px] text-[#716D64]">Owner: {item.owner}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === "list" && (
        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
          <div className="flex justify-between items-center font-mono text-xs font-bold text-[#716D64] border-b border-[#E5E0D6] pb-3">
            <span>CHRONOLOGICAL CONTENT SCHEDULE</span>
            <span>{items.length} TOTAL ITEMS</span>
          </div>

          <div className="space-y-2.5">
            {items.map((item) => {
              const Icon = item.platformIcon;

              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] gap-3 hover:border-[#18181B]/40 transition-all shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#000000] text-[#FFFFFF] shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-sans font-bold text-sm text-[#111111] truncate">
                          {item.title}
                        </h4>
                        <span
                          className={cn(
                            "font-mono text-[9px] uppercase px-2 py-0.5 rounded-full font-bold border shrink-0",
                            statusColors[item.status],
                          )}
                        >
                          {item.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#716D64] mt-1">
                        <span>Platform: <strong className="text-[#18181B]">{item.platform}</strong></span>
                        <span>•</span>
                        <span>Campaign: <strong className="text-[#18181B]">{item.campaign}</strong></span>
                        <span>•</span>
                        <span>Owner: <strong className="text-[#18181B]">{item.owner}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 font-mono text-xs text-[#716D64] self-end sm:self-auto shrink-0">
                    <div className="flex items-center space-x-1 bg-[#EFEAE1] px-2.5 py-1 rounded-lg">
                      <Clock className="h-3.5 w-3.5 text-[#18181B]" />
                      <span className="font-bold text-[#18181B]">{item.scheduledDate} ({item.time})</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
