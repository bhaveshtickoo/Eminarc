"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps {
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-[#EFEAE1]/70 border border-[#E5E0D6]/50 select-none",
        className,
      )}
    />
  );
};

export const CardSkeleton: React.FC = () => {
  return (
    <div className="p-5 rounded-[18px] bg-[#FCFAF7] border border-[#E5E0D6] space-y-3">
      <SkeletonLoader className="h-4 w-1/3" />
      <SkeletonLoader className="h-8 w-2/3" />
      <SkeletonLoader className="h-16 w-full" />
    </div>
  );
};

export const ChartSkeleton: React.FC = () => {
  return (
    <div className="p-5 rounded-[18px] bg-[#FCFAF7] border border-[#E5E0D6] space-y-4">
      <div className="flex justify-between items-center">
        <SkeletonLoader className="h-4 w-1/4" />
        <SkeletonLoader className="h-4 w-1/6" />
      </div>
      <SkeletonLoader className="h-40 w-full" />
    </div>
  );
};
