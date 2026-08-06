"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressRingProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  showValue?: boolean;
  label?: string;
  className?: string;
  ariaLabel?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 80,
  strokeWidth = 8,
  color = "#2D6A4F",
  trackColor = "#EFEAE1",
  showValue = true,
  label,
  className,
  ariaLabel = "Progress ring metric",
}) => {
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedProgress / 100) * circumference;

  return (
    <div
      className={cn(
        "relative inline-flex flex-col items-center justify-center select-none",
        className,
      )}
      role="img"
      aria-label={ariaLabel}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Track Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={strokeWidth}
          />

          {/* Progress Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Text Overlay */}
        {showValue && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="font-sans font-bold text-sm text-[#111111] leading-none">
              {Math.round(normalizedProgress)}%
            </span>
          </div>
        )}
      </div>

      {label && (
        <span className="font-mono text-[9px] uppercase tracking-wider text-[#716D64] mt-1.5 font-medium">
          {label}
        </span>
      )}
    </div>
  );
};
