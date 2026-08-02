import React from "react";
import { Bot, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export const suggestedActions = [
  "Publish founder story",
  "Reply to comments",
  "Improve your headline",
  "Target Healthcare ICP",
];

export const CopilotCard: React.FC = () => {
  return (
    <div className="flex flex-col justify-between h-full rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] transition-all duration-200 hover:border-[rgba(0,0,0,0.14)] hover:shadow-[0_6px_16px_-4px_rgba(26,26,26,0.04)]">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#716D64]">
              COPILOT / AI
            </span>
            <span className="inline-flex items-center space-x-1.5 font-mono text-[10px] uppercase tracking-wider text-[#1E4620] bg-[#EDF6F0] px-2.5 py-0.5 rounded-full border border-[#C8E4D0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-pulse" />
              <span>ACTIVE</span>
            </span>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#000000] text-[#FFFFFF] shrink-0">
            <Bot className="h-4 w-4" />
          </div>
        </div>

        <h3 className="font-sans text-lg font-semibold tracking-tight text-[#111111]">
          AI Growth Copilot
        </h3>

        {/* Insight Message Alert Banner */}
        <div className="mt-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] p-4 text-xs font-sans text-[#78350F] flex items-start space-x-3 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]">
          <Sparkles className="h-4 w-4 text-[#B45309] shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-[#78350F]">
              &quot;Your LinkedIn impressions dropped 18%.&quot;
            </p>
            <p className="text-[11px] text-[#B45309] mt-0.5">
              Based on algorithmic engagement patterns over the last 7 days.
            </p>
          </div>
        </div>

        {/* Suggested Actions List */}
        <div className="mt-4">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#716D64] block mb-2.5">
            Suggested Actions
          </span>
          <div className="space-y-2">
            {suggestedActions.map((action, idx) => (
              <div
                key={idx}
                className="group flex items-center justify-between rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] px-3.5 py-2.5 text-xs font-sans font-medium text-[#18181B] transition-all hover:bg-[#FBF9F5] hover:border-[#D8D2C5] cursor-pointer"
              >
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#2D6A4F] shrink-0" />
                  <span>{action}</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-[#716D64] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Confidence Score Indicator */}
      <div className="mt-5 pt-3 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between text-xs">
        <span className="font-mono text-[11px] text-[#716D64] uppercase tracking-wider">
          AI Confidence Score
        </span>
        <span className="font-mono font-bold text-xs text-[#2D6A4F] bg-[#EDF6F0] px-2.5 py-0.5 rounded-full border border-[#C8E4D0]">
          92%
        </span>
      </div>
    </div>
  );
};
