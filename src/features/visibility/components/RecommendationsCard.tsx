"use client";

import React from "react";
import { Sparkles, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface RecommendationItem {
  id: string;
  title: string;
  category: string;
  description: string;
  impact: string;
  priority: "High" | "Medium" | "Low";
}

export const mockRecommendations: RecommendationItem[] = [
  {
    id: "rec-1",
    title: "Improve FAQ & Structured Schema",
    category: "Generative Engine Optimization (GEO)",
    description:
      "Deploy FAQPage JSON-LD schema on product pages to increase ChatGPT and Perplexity citation extraction by 28%.",
    impact: "+14% Visibility",
    priority: "High",
  },
  {
    id: "rec-2",
    title: "Add Competitor Comparison Page",
    category: "Market Positioning",
    description:
      "Publish an explicit comparison page (Eminarc vs. HubSpot & Taplio) to capture LLM buyer evaluation queries.",
    impact: "+18% Citations",
    priority: "High",
  },
  {
    id: "rec-3",
    title: "Publish Founder Story on Medium",
    category: "Founder Brand Building",
    description:
      "Write an architectural breakdown on Medium covering systemic growth vs. campaign sprints.",
    impact: "+10% Citation Rank",
    priority: "Medium",
  },
  {
    id: "rec-4",
    title: "Create Industry Guide",
    category: "Thought Leadership",
    description: "Draft a comprehensive B2B SaaS Growth OS Guide targeting technical founders.",
    impact: "+12% Organic Reach",
    priority: "Medium",
  },
  {
    id: "rec-5",
    title: "Expand Reddit Community Case Studies",
    category: "Community Authority",
    description:
      "Share authentic teardowns in r/SaaS and r/startups to build zero-CAC backlink velocity.",
    impact: "+8% Citation Share",
    priority: "Low",
  },
];

export const priorityBadges: Record<string, string> = {
  High: "bg-[#FEE2E2] text-[#7F1D1D] border-[#FCA5A5]",
  Medium: "bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]",
  Low: "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]",
};

export const RecommendationsCard: React.FC = () => {
  const handleExecute = (rec: RecommendationItem) => {
    toast.success(`Action Enqueued: "${rec.title}"`, {
      description: "Added to priority growth task list.",
    });
  };

  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4 select-none">
      <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] pb-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
            GEO ACTION ENGINE
          </span>
          <h3 className="font-sans font-bold text-xl text-[#111111] mt-1.5 tracking-tight flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-[#2D6A4F]" />
            Prioritized AI Search Recommendations
          </h3>
        </div>

        <span className="font-mono text-[9px] uppercase font-bold text-[#2D6A4F] bg-[#EDF6F0] px-2.5 py-1 rounded-full border border-[#C8E4D0]">
          5 ACTIONS ENQUEUED
        </span>
      </div>

      {/* Recommendations List */}
      <div className="space-y-3">
        {mockRecommendations.map((rec) => (
          <div
            key={rec.id}
            className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] gap-3 transition-all duration-150 hover:border-[#18181B] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]"
          >
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <span
                  className={cn(
                    "font-mono text-[9px] uppercase px-2 py-0.5 rounded font-bold border shrink-0",
                    priorityBadges[rec.priority],
                  )}
                >
                  {rec.priority} PRIORITY
                </span>
                <span className="font-mono text-[10px] text-[#716D64] truncate">
                  {rec.category}
                </span>
              </div>

              <h4 className="font-sans font-bold text-sm text-[#111111]">{rec.title}</h4>

              <p className="font-sans text-xs text-[#716D64] leading-normal">{rec.description}</p>
            </div>

            <div className="flex items-center space-x-3 shrink-0 self-end sm:self-auto font-mono text-xs">
              <span className="font-bold text-[#2D6A4F] bg-[#EDF6F0] px-2.5 py-1 rounded border border-[#C8E4D0]">
                {rec.impact}
              </span>

              <button
                type="button"
                onClick={() => handleExecute(rec)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#000000] text-[#FFFFFF] font-bold text-xs hover:bg-[#222222] transition-colors cursor-pointer"
              >
                <span>Execute</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
