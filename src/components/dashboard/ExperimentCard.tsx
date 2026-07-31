import React from "react";
import { FlaskConical, TrendingUp, Sparkles } from "lucide-react";
import { cn } from "@/design-system/utils/cn";

export interface ExperimentItem {
  id: string;
  name: string;
  channel: string;
  hypothesis: string;
  status: "Active" | "Testing" | "Optimizing" | "Scaling";
  impact: string;
}

export const experimentList: ExperimentItem[] = [
  {
    id: "exp-1",
    name: "Founder Content Strategy",
    channel: "LinkedIn / Personal Brand",
    hypothesis: "Direct story-based posts increase inbound lead DMs by 40%",
    status: "Scaling",
    impact: "+42% DMs",
  },
  {
    id: "exp-2",
    name: "Reddit SEO",
    channel: "r/startups / r/SaaS",
    hypothesis: "Answering high-intent queries ranks in ChatGPT search results",
    status: "Testing",
    impact: "+18% Traffic",
  },
  {
    id: "exp-3",
    name: "AI Search Optimization",
    channel: "Perplexity / SearchGPT",
    hypothesis: "Optimized schema markdown improves citations across LLMs",
    status: "Active",
    impact: "+25% Citations",
  },
  {
    id: "exp-4",
    name: "Newsletter CTA",
    channel: "Email / Growth Digest",
    hypothesis: "Inline audit tool widget increases audit request conversion",
    status: "Optimizing",
    impact: "+12% Opt-ins",
  },
];

export const ExperimentCard: React.FC = () => {
  const statusBadges = {
    Scaling: "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]",
    Active: "bg-[#F1F5F9] text-[#1E293B] border-[#CBD5E1]",
    Testing: "bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]",
    Optimizing: "bg-[#EEF2FF] text-[#312E81] border-[#C7D2FE]",
  };

  return (
    <div className="flex flex-col justify-between h-full rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] transition-all duration-200 hover:border-[rgba(0,0,0,0.14)] hover:shadow-[0_6px_16px_-4px_rgba(26,26,26,0.04)]">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#716D64]">
              GROWTH / LABS
            </span>
            <span className="font-mono text-[10px] text-[#1E4620] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0]">
              4 EXPERIMENTS
            </span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#000000] text-[#FFFFFF] shrink-0">
            <FlaskConical className="h-4 w-4" />
          </div>
        </div>

        <h3 className="font-sans text-lg font-semibold tracking-tight text-[#111111] mb-4">
          Running Experiments
        </h3>

        {/* Experiment Items List */}
        <div className="space-y-3">
          {experimentList.map((exp) => (
            <div
              key={exp.id}
              className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-3.5 transition-all hover:bg-[#FBF9F5] hover:border-[#D8D2C5]"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2 min-w-0">
                  <span className="font-sans text-xs font-semibold text-[#18181B] truncate">
                    {exp.name}
                  </span>
                  <span className="font-mono text-[9px] text-[#716D64] hidden sm:inline">
                    • {exp.channel}
                  </span>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span className="font-mono text-[10px] font-bold text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0]">
                    {exp.impact}
                  </span>
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider",
                      statusBadges[exp.status],
                    )}
                  >
                    {exp.status}
                  </span>
                </div>
              </div>

              <p className="font-sans text-[11px] text-[#716D64] mt-1.5 line-clamp-1 leading-relaxed">
                {exp.hypothesis}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between text-xs font-mono text-[#716D64]">
        <div className="flex items-center space-x-1">
          <Sparkles className="h-3.5 w-3.5 text-[#B45309]" />
          <span>AVERAGE WIN RATE: 75%</span>
        </div>
        <div className="flex items-center space-x-1 text-[#18181B] font-semibold">
          <TrendingUp className="h-3.5 w-3.5 text-[#2D6A4F]" />
          <span>+24.2% TOTAL LIFT</span>
        </div>
      </div>
    </div>
  );
};
