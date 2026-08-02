"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SparklineProps {
  data: number[];
  color?: string;
  width?: number | string;
  height?: number;
  strokeWidth?: number;
  showEndDot?: boolean;
  className?: string;
  ariaLabel?: string;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  color = "#2D6A4F",
  width = 120,
  height = 36,
  strokeWidth = 2,
  showEndDot = true,
  className,
  ariaLabel = "Sparkline trend chart",
}) => {
  if (!data || data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const svgWidth = 100;
  const paddingY = 4;

  const points = data
    .map((val, idx) => {
      const x = (idx * svgWidth) / (data.length - 1);
      const y = height - paddingY - ((val - min) / range) * (height - 2 * paddingY);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const lastVal = data[data.length - 1];
  const lastX = svgWidth;
  const lastY = height - paddingY - ((lastVal - min) / range) * (height - 2 * paddingY);

  return (
    <div
      className={cn("inline-flex items-center select-none", className)}
      style={{ width }}
      role="img"
      aria-label={ariaLabel}
    >
      <svg
        viewBox={`0 0 ${svgWidth} ${height}`}
        className="w-full overflow-visible"
        style={{ height }}
      >
        {/* Glow Area Gradient */}
        <defs>
          <linearGradient id={`sparkGrad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Fill Area */}
        <polygon
          points={`0,${height} ${points} ${svgWidth},${height}`}
          fill={`url(#sparkGrad-${color.replace("#", "")})`}
        />

        {/* Trend Polyline */}
        <polyline
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />

        {/* End Glow Dot */}
        {showEndDot && (
          <circle
            cx={lastX}
            cy={lastY}
            r="3"
            fill={color}
            stroke="#FFFFFF"
            strokeWidth="1.5"
            className="animate-pulse"
          />
        )}
      </svg>
    </div>
  );
};
