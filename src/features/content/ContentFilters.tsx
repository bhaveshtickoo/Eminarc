"use client";

import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ContentFiltersProps {
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const filterOptions = [
  "All",
  "Drafts",
  "Scheduled",
  "Published",
  "LinkedIn",
  "Medium",
  "Reddit",
];

export const ContentFilters: React.FC<ContentFiltersProps> = ({
  activeFilter = "All",
  onFilterChange,
  searchQuery = "",
  onSearchChange,
}) => {
  return (
    <div className="space-y-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#716D64]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Search content..."
          className="w-full rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] pl-9 pr-3 py-2 text-xs font-sans text-[#18181B] placeholder-[#9E988D] focus:outline-none focus:ring-1 focus:ring-[#18181B]"
        />
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-1.5">
        {filterOptions.map((option) => {
          const isSelected = activeFilter === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onFilterChange?.(option)}
              className={cn(
                "font-mono text-[10px] font-medium px-2.5 py-1 rounded-full border transition-all duration-150 select-none",
                isSelected
                  ? "bg-[#000000] text-[#FFFFFF] border-transparent font-semibold"
                  : "bg-[#FFFFFF] text-[#716D64] border-[#E5E0D6] hover:bg-[#F7F4EE] hover:text-[#111111]",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};
