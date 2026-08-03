"use client";

import React from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CRMFiltersProps {
  search: string;
  onSearchChange: (search: string) => void;
  selectedOwner: string;
  onOwnerChange: (owner: string) => void;
  selectedPriority: string;
  onPriorityChange: (priority: string) => void;
}

export const CRMFilters: React.FC<CRMFiltersProps> = ({
  search,
  onSearchChange,
  selectedOwner,
  onOwnerChange,
  selectedPriority,
  onPriorityChange,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] select-none">
      <div className="flex items-center space-x-2">
        <SlidersHorizontal className="h-4 w-4 text-[#716D64]" />
        <span className="font-mono text-xs font-bold text-[#18181B]">FILTERS:</span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#716D64]" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search deals or accounts..."
            className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] pl-9 pr-3 py-1 text-xs font-sans text-[#18181B] focus:outline-none focus:ring-1 focus:ring-[#18181B]"
          />
        </div>

        {/* Priority */}
        <select
          value={selectedPriority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] px-3 py-1 font-mono text-xs font-bold text-[#18181B] focus:outline-none focus:ring-1 focus:ring-[#18181B] cursor-pointer"
        >
          <option value="All">All Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        {/* Owner */}
        <select
          value={selectedOwner}
          onChange={(e) => onOwnerChange(e.target.value)}
          className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] px-3 py-1 font-mono text-xs font-bold text-[#18181B] focus:outline-none focus:ring-1 focus:ring-[#18181B] cursor-pointer"
        >
          <option value="All">All Owners</option>
          <option value="Bhavesh">Bhavesh Tickoo</option>
          <option value="Pratyush">Pratyush</option>
          <option value="Aditya">Aditya</option>
        </select>
      </div>
    </div>
  );
};
