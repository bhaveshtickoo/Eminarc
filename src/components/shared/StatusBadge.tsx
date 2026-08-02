import React from "react";
import { cn } from "@/lib/utils";

export interface StatusBadgeProps {
  status?: "Completed" | "Processing" | "Draft";
  confidence?: string;
  timeAgo?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status = "Completed",
  confidence = "93%",
  timeAgo = "2 minutes ago",
  className,
}) => {
  return (
    <div className={cn("flex flex-wrap items-center gap-2.5 text-xs font-mono", className)}>
      {/* Status Pill */}
      <span className="inline-flex items-center space-x-1.5 rounded-full bg-[#EDF6F0] text-[#1E4620] border border-[#C8E4D0] px-3 py-1 font-semibold uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-pulse" />
        <span>{status}</span>
      </span>

      {/* Confidence Score Pill */}
      <span className="inline-flex items-center space-x-1 rounded-full bg-[#FFFFFF] text-[#18181B] border border-[#E5E0D6] px-3 py-1 font-medium tracking-tight">
        <span className="text-[#716D64]">Confidence:</span>
        <span className="font-bold text-[#2D6A4F]">{confidence}</span>
      </span>

      {/* Generated Time */}
      <span className="inline-flex items-center rounded-full bg-[#F5F0E6] text-[#716D64] border border-[#E5E0D6]/60 px-3 py-1 text-[11px]">
        Generated {timeAgo}
      </span>
    </div>
  );
};
