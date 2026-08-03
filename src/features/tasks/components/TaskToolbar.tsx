"use client";

import React from "react";
import { Search, Filter, ArrowUpDown, CheckSquare, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TaskToolbarProps {
  search: string;
  onSearchChange: (search: string) => void;
  priorityFilter: string;
  onPriorityFilterChange: (priority: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  selectedCount: number;
  onBulkComplete?: () => void;
  onBulkDelete?: () => void;
}

export const TaskToolbar: React.FC<TaskToolbarProps> = ({
  search,
  onSearchChange,
  priorityFilter,
  onPriorityFilterChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortByChange,
  selectedCount,
  onBulkComplete,
  onBulkDelete,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] select-none">
      <div className="flex items-center space-x-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#716D64]" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] pl-9 pr-3 py-1 text-xs font-sans text-[#18181B] focus:outline-none focus:ring-1 focus:ring-[#18181B]"
          />
        </div>

        {/* Priority Filter */}
        <select
          value={priorityFilter}
          onChange={(e) => onPriorityFilterChange(e.target.value)}
          className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] px-3 py-1 font-mono text-xs font-bold text-[#18181B] focus:outline-none cursor-pointer"
        >
          <option value="All">All Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] px-3 py-1 font-mono text-xs font-bold text-[#18181B] focus:outline-none cursor-pointer"
        >
          <option value="All">All Statuses</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
          <option value="AI Suggested">AI Suggested</option>
        </select>
      </div>

      <div className="flex items-center space-x-3">
        {/* Sort */}
        <div className="flex items-center space-x-1 font-mono text-xs text-[#716D64]">
          <ArrowUpDown className="h-3.5 w-3.5" />
          <span>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] px-2.5 py-1 font-bold text-[#18181B] focus:outline-none cursor-pointer"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedCount > 0 && (
          <div className="flex items-center space-x-2 font-mono text-xs">
            <span className="text-[#2D6A4F] font-bold">{selectedCount} Selected</span>

            <button
              type="button"
              onClick={onBulkComplete}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-[#000000] text-[#FFFFFF] font-bold hover:bg-[#222222] transition-colors cursor-pointer"
            >
              <CheckSquare className="h-3.5 w-3.5" />
              <span>Complete All</span>
            </button>

            <button
              type="button"
              onClick={onBulkDelete}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-[#FFFFFF] border border-[#FEE2E2] text-[#7F1D1D] font-bold hover:bg-[#FEE2E2]/50 transition-colors cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
