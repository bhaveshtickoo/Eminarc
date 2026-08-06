"use client";

import React from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProgressStepItem {
  step: number;
  title: string;
  subtitle: string;
}

export const progressSteps: ProgressStepItem[] = [
  { step: 1, title: "Company Website", subtitle: "URL Extraction" },
  { step: 2, title: "Founder LinkedIn", subtitle: "Authority Audit" },
  { step: 3, title: "Industry", subtitle: "Category Mapping" },
  { step: 4, title: "Target Market", subtitle: "ICP Region Selection" },
  { step: 5, title: "Generate Research", subtitle: "Executive Audit" },
];

export interface ResearchProgressProps {
  activeStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
}

export const ResearchProgress: React.FC<ResearchProgressProps> = ({
  activeStep,
  onStepClick,
  className,
}) => {
  return (
    <div className={cn("space-y-4 select-none", className)}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
          WORKFLOW PROGRESS
        </span>
        <span className="font-mono text-[10px] font-bold text-[#2D6A4F]">
          STEP 0{activeStep} / 05
        </span>
      </div>

      {/* Vertical Steps List */}
      <div className="relative pl-3 space-y-5 border-l-2 border-[#E5E0D6] ml-2.5">
        {progressSteps.map((s) => {
          const isDone = activeStep > s.step;
          const isCurrent = activeStep === s.step;

          return (
            <div
              key={s.step}
              onClick={() => onStepClick?.(s.step)}
              className={cn(
                "relative group flex items-start space-x-3 cursor-pointer transition-all duration-150",
                isCurrent && "font-bold text-[#111111]",
              )}
            >
              {/* Node Indicator Dot */}
              <div
                className={cn(
                  "absolute -left-[19px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full transition-all",
                  isDone
                    ? "bg-[#2D6A4F] text-[#FFFFFF]"
                    : isCurrent
                      ? "bg-[#18181B] text-[#FFFFFF] ring-4 ring-[#EFEAE1]"
                      : "bg-[#FFFFFF] border-2 border-[#D8D2C5]",
                )}
              >
                {isDone ? (
                  <CheckCircle2 className="h-3 w-3" />
                ) : (
                  <span className="font-mono text-[8px] font-bold">{s.step}</span>
                )}
              </div>

              <div>
                <span
                  className={cn(
                    "font-sans text-xs font-semibold leading-tight block",
                    isCurrent
                      ? "text-[#111111]"
                      : isDone
                        ? "text-[#2D6A4F]"
                        : "text-[#716D64] group-hover:text-[#18181B]",
                  )}
                >
                  {s.title}
                </span>
                <span className="font-mono text-[9px] text-[#716D64] block">{s.subtitle}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
