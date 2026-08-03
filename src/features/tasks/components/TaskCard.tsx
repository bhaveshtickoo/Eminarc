"use client";

import React from "react";
import {
  CheckSquare,
  Square,
  Calendar,
  Building2,
  Search,
  FileText,
  User,
  Sparkles,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface TaskItemData {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  owner: string;
  dueDate: string; // e.g. "Aug 03, 2026"
  relatedCompany: string; // e.g. "TrueLift.ai"
  relatedResearch: string; // e.g. "TrueLift Founder Audit"
  relatedCampaign: string; // e.g. "System Over Campaign Q3"
  status: "To Do" | "In Progress" | "Done" | "AI Suggested";
}

export interface TaskCardProps {
  task: TaskItemData;
  isSelected?: boolean;
  onToggleSelect?: (id: string) => void;
  onToggleComplete?: (id: string) => void;
}

export const priorityBadges: Record<string, string> = {
  High: "bg-[#FEE2E2] text-[#7F1D1D] border-[#FCA5A5]",
  Medium: "bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]",
  Low: "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]",
};

export const statusBadges: Record<string, string> = {
  "To Do": "bg-[#EFEAE1] text-[#716D64] border-[#E5E0D6]",
  "In Progress": "bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]",
  Done: "bg-[#18181B] text-[#FFFFFF] border-black",
  "AI Suggested": "bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]",
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isSelected,
  onToggleSelect,
  onToggleComplete,
}) => {
  const isDone = task.status === "Done";

  return (
    <div
      className={cn(
        "group rounded-xl bg-[#FFFFFF] border p-4 space-y-3 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] transition-all duration-150 hover:border-[#18181B] select-none",
        isSelected ? "border-[#18181B] bg-[#FCFAF7]" : "border-[#E5E0D6]",
        isDone && "opacity-75 bg-[#FCFAF7]/60",
      )}
    >
      {/* Top Row: Checkbox, Title & Priority */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start space-x-2.5 min-w-0 flex-1">
          <button
            type="button"
            onClick={() => onToggleComplete?.(task.id)}
            className="mt-0.5 text-[#18181B] hover:text-[#2D6A4F] cursor-pointer"
          >
            {isDone ? (
              <CheckSquare className="h-4 w-4 text-[#2D6A4F]" />
            ) : (
              <Square className="h-4 w-4 text-[#716D64]" />
            )}
          </button>

          <h4
            className={cn(
              "font-sans font-bold text-xs text-[#111111] leading-snug",
              isDone && "line-through text-[#716D64]",
            )}
          >
            {task.title}
          </h4>
        </div>

        <div className="flex items-center space-x-1.5 shrink-0">
          <span
            className={cn(
              "font-mono text-[8px] uppercase px-1.5 py-0.5 rounded font-bold border",
              priorityBadges[task.priority],
            )}
          >
            {task.priority}
          </span>
          <span
            className={cn(
              "font-mono text-[8px] uppercase px-1.5 py-0.5 rounded font-bold border",
              statusBadges[task.status],
            )}
          >
            {task.status}
          </span>
        </div>
      </div>

      {/* Related Entity Tags Row */}
      <div className="flex flex-wrap gap-1 font-mono text-[9px]">
        <span className="bg-[#EFEAE1] text-[#18181B] px-2 py-0.5 rounded flex items-center font-semibold">
          <Building2 className="h-3 w-3 mr-1 text-[#716D64]" />
          {task.relatedCompany}
        </span>
        <span className="bg-[#EFEAE1] text-[#716D64] px-2 py-0.5 rounded flex items-center">
          <Search className="h-3 w-3 mr-1" />
          {task.relatedResearch}
        </span>
        <span className="bg-[#EFEAE1] text-[#716D64] px-2 py-0.5 rounded flex items-center">
          <FileText className="h-3 w-3 mr-1" />
          {task.relatedCampaign}
        </span>
      </div>

      {/* Footer: Due Date & Owner */}
      <div className="pt-2 border-t border-[rgba(0,0,0,0.05)] font-mono text-[10px] text-[#716D64] flex items-center justify-between">
        <span className="flex items-center">
          <Calendar className="h-3 w-3 mr-1 text-[#18181B]" />
          Due: <strong className="text-[#18181B] ml-1">{task.dueDate}</strong>
        </span>

        <span className="bg-[#EFEAE1] px-1.5 py-0.5 rounded text-[#18181B] font-bold">
          {task.owner.split(" ")[0]}
        </span>
      </div>
    </div>
  );
};
