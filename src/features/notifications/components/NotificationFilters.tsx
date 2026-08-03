"use client";

import React from "react";
import { Filter, CheckCircle2, Archive } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NotificationFiltersProps {
  activeDateFilter: string;
  onDateFilterChange: (filter: string) => void;
  activeGroupFilter: string;
  onGroupFilterChange: (group: string) => void;
  unreadOnly: boolean;
  onUnreadOnlyToggle: () => void;
  onMarkAllRead: () => void;
  onArchiveAll: () => void;
}

export const dateFilters = ["All Dates", "Today", "Yesterday", "This Week"] as const;
export const groupFilters = ["All Groups", "System", "AI", "CRM"] as const;

export const NotificationFilters: React.FC<NotificationFiltersProps> = ({
  activeDateFilter,
  onDateFilterChange,
  activeGroupFilter,
  onGroupFilterChange,
  unreadOnly,
  onUnreadOnlyToggle,
  onMarkAllRead,
  onArchiveAll,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] select-none font-mono text-xs">
      {/* Left Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center space-x-1 bg-[#FFFFFF] border border-[#E5E0D6] p-1 rounded-xl">
          {dateFilters.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onDateFilterChange(d)}
              className={cn(
                "px-2.5 py-1 rounded-lg transition-all cursor-pointer font-medium",
                activeDateFilter === d
                  ? "bg-[#000000] text-[#FFFFFF] font-bold shadow-sm"
                  : "text-[#716D64] hover:bg-[#F7F4EE]",
              )}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-1 bg-[#FFFFFF] border border-[#E5E0D6] p-1 rounded-xl">
          {groupFilters.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => onGroupFilterChange(g)}
              className={cn(
                "px-2.5 py-1 rounded-lg transition-all cursor-pointer font-medium",
                activeGroupFilter === g
                  ? "bg-[#000000] text-[#FFFFFF] font-bold shadow-sm"
                  : "text-[#716D64] hover:bg-[#F7F4EE]",
              )}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Unread Only Toggle */}
        <button
          type="button"
          onClick={onUnreadOnlyToggle}
          className={cn(
            "px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-bold",
            unreadOnly
              ? "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]"
              : "bg-[#FFFFFF] text-[#716D64] border-[#E5E0D6] hover:bg-[#F7F4EE]",
          )}
        >
          Unread Only
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={onMarkAllRead}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-[#18181B] font-bold hover:bg-[#F7F4EE] transition-colors cursor-pointer"
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-[#2D6A4F]" />
          <span>Mark All Read</span>
        </button>

        <button
          type="button"
          onClick={onArchiveAll}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-[#716D64] font-medium hover:bg-[#F7F4EE] hover:text-[#18181B] transition-colors cursor-pointer"
        >
          <Archive className="h-3.5 w-3.5" />
          <span>Archive All</span>
        </button>
      </div>
    </div>
  );
};
