import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  progress: number; // 0 to 100
  className?: string;
  barColor?: string;
  heightClass?: string;
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className,
  barColor = "bg-[#000000]",
  heightClass = "h-2",
  showLabel = false,
}) => {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-mono mb-1.5 text-[#716D64]">
          <span>Progress</span>
          <span className="font-semibold text-[#18181B]">{clamped}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full bg-[#EFEAE1] rounded-full overflow-hidden p-[1px] border border-[#E5E0D6]/60",
          heightClass,
        )}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-700 ease-out", barColor)}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
