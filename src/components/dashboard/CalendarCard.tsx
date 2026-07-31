import React from "react";
import { Calendar, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/design-system/utils/cn";

export interface CalendarDayItem {
  day: string;
  date: string;
  topic: string;
  platform: "LinkedIn" | "Medium" | "Reddit";
  type: string;
  status: "Published" | "Scheduled" | "Draft";
}

export const scheduleList: CalendarDayItem[] = [
  {
    day: "Monday",
    date: "AUG 03",
    topic: "LinkedIn Post",
    platform: "LinkedIn",
    type: "Thought Leadership",
    status: "Published",
  },
  {
    day: "Tuesday",
    date: "AUG 04",
    topic: "Medium Article",
    platform: "Medium",
    type: "Long-Form Strategy",
    status: "Published",
  },
  {
    day: "Wednesday",
    date: "AUG 05",
    topic: "Reddit Post",
    platform: "Reddit",
    type: "Community Case Study",
    status: "Scheduled",
  },
  {
    day: "Thursday",
    date: "AUG 06",
    topic: "LinkedIn Carousel",
    platform: "LinkedIn",
    type: "Framework Breakdown",
    status: "Scheduled",
  },
  {
    day: "Friday",
    date: "AUG 07",
    topic: "Founder Story",
    platform: "LinkedIn",
    type: "Personal Brand Narrative",
    status: "Draft",
  },
];

export const CalendarCard: React.FC = () => {
  const platformColors = {
    LinkedIn: "bg-[#0077B5]/10 text-[#0077B5] border-[#0077B5]/20",
    Medium: "bg-[#000000]/10 text-[#111111] border-[#000000]/20",
    Reddit: "bg-[#FF4500]/10 text-[#FF4500] border-[#FF4500]/20",
  };

  const statusBadges = {
    Published: "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]",
    Scheduled: "bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]",
    Draft: "bg-[#F4F4F5] text-[#52525B] border-[#E4E4E7]",
  };

  return (
    <div className="flex flex-col justify-between h-full rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] transition-all duration-200 hover:border-[rgba(0,0,0,0.14)] hover:shadow-[0_6px_16px_-4px_rgba(26,26,26,0.04)]">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#716D64]">
              CONTENT / WEEKLY
            </span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#000000] text-[#FFFFFF] shrink-0">
            <Calendar className="h-4 w-4" />
          </div>
        </div>

        <h3 className="font-sans text-lg font-semibold tracking-tight text-[#111111] mb-4">
          Content Calendar
        </h3>

        {/* Days List */}
        <div className="space-y-2.5">
          {scheduleList.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-3 transition-all hover:bg-[#FBF9F5] hover:border-[#D8D2C5]"
            >
              <div className="flex items-center space-x-3.5 min-w-0">
                {/* Day Badge */}
                <div className="w-16 flex flex-col items-center justify-center rounded-lg bg-[#EFEAE1]/60 py-1 border border-[#E5E0D6] shrink-0">
                  <span className="font-mono text-[10px] font-bold text-[#18181B]">
                    {item.day.substring(0, 3).toUpperCase()}
                  </span>
                  <span className="font-mono text-[8px] text-[#716D64]">{item.date}</span>
                </div>

                <div className="min-w-0">
                  <p className="font-sans text-xs font-semibold text-[#18181B] truncate">
                    {item.topic}
                  </p>
                  <p className="font-mono text-[10px] text-[#716D64] truncate">{item.type}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0 ml-2">
                <span
                  className={cn(
                    "hidden sm:inline-flex rounded-full border px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider",
                    platformColors[item.platform],
                  )}
                >
                  {item.platform}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center space-x-1 rounded-full border px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider",
                    statusBadges[item.status],
                  )}
                >
                  {item.status === "Published" ? (
                    <CheckCircle className="h-2.5 w-2.5 mr-0.5" />
                  ) : (
                    <Clock className="h-2.5 w-2.5 mr-0.5" />
                  )}
                  <span>{item.status}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between text-xs font-mono text-[#716D64]">
        <span>5 / 5 PUBLISHING SLOTS ASSIGNED</span>
        <span className="font-semibold text-[#18181B]">100% COVERAGE</span>
      </div>
    </div>
  );
};
