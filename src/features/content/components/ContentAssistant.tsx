"use client";

import React from "react";
import {
  Sparkles,
  Zap,
  Target,
  ArrowRight,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";
import { useWorkspace } from "@/hooks/useWorkspace";
import { cn } from "@/lib/utils";

export interface SuggestionCardItem {
  id: string;
  category: string;
  title: string;
  preview: string;
  actionText: string;
  badge?: string;
}

export const ContentAssistant: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const kb = currentWorkspace.knowledgeBase;

  const suggestions: SuggestionCardItem[] = [
    {
      id: "sug-1",
      category: "SUGGESTED HOOK",
      title: "The System-Over-Campaign Angle",
      preview: `"Most founders treat growth as a 2-week campaign sprint. Here's why systemic operating models outperform one-off campaigns."`,
      actionText: "Apply Hook to Editor",
      badge: "HIGH ENGAGEMENT",
    },
    {
      id: "sug-2",
      category: "CONTENT IDEA",
      title: "LLM Citation Teardown",
      preview: `Breakdown of how ${currentWorkspace.name} achieved 63% AI search visibility across ChatGPT, Perplexity, and Claude.`,
      actionText: "Use Idea Draft",
      badge: "GEO TREND",
    },
    {
      id: "sug-3",
      category: "CTA SUGGESTION",
      title: "High-Intent Audit Callout",
      preview: `"Ready to replace tool sprawl with a unified growth OS? Audit your workspace research layer today."`,
      actionText: "Insert CTA",
      badge: "CONVERSION",
    },
    {
      id: "sug-4",
      category: "IMPROVE TONE",
      title: "Align with Brand Voice",
      preview: `Ensure tone remains ${kb.brandVoice.toneTags.slice(0, 3).join(", ")} without hyperbole or fluff words.`,
      actionText: "Refine Tone",
    },
    {
      id: "sug-5",
      category: "READABILITY",
      title: "Shorten Paragraph Lengths",
      preview:
        "Break down 4-line blocks into 2-sentence bullet points for higher mobile reading completion.",
      actionText: "Optimize Readability",
    },
    {
      id: "sug-6",
      category: "EXPAND",
      title: "Elaborate on ICP Friction",
      preview: `Add concrete statistics on how ${kb.idealCustomerProfile.primaryICP} lose 15+ hours weekly to manual tool switching.`,
      actionText: "Expand Section",
    },
    {
      id: "sug-7",
      category: "SHORTEN",
      title: "Condensed Summary Mode",
      preview: "Condense long-form draft into a 150-character punchy LinkedIn intro.",
      actionText: "Shorten Draft",
    },
  ];

  const handleApplySuggestion = (item: SuggestionCardItem) => {
    toast.success(`Applied "${item.title}"`, {
      description: "Editor content updated with suggestion card parameters.",
    });
  };

  return (
    <div className="flex flex-col space-y-4 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] pb-3">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
            RIGHT PANEL / AI ASSISTANT
          </span>
          <h3 className="font-sans font-bold text-lg text-[#111111] mt-1 tracking-tight flex items-center">
            <Sparkles className="h-4 w-4 mr-1.5 text-[#18181B]" />
            Content Assistant
          </h3>
        </div>
        <span className="font-mono text-[9px] text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0] font-bold">
          7 SUGGESTIONS
        </span>
      </div>

      {/* Suggestion Cards Stack */}
      <div className="space-y-3">
        {suggestions.map((item) => (
          <div
            key={item.id}
            className="group rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-3.5 space-y-2 transition-all duration-150 hover:border-[rgba(0,0,0,0.14)] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] font-bold text-[#716D64]">{item.category}</span>
              {item.badge && (
                <span className="font-mono text-[8px] uppercase font-bold text-[#0369A1] bg-[#E0F2FE] px-1.5 py-0.5 rounded border border-[#BAE6FD]">
                  {item.badge}
                </span>
              )}
            </div>

            <h4 className="font-sans font-bold text-xs text-[#111111] leading-tight">
              {item.title}
            </h4>

            <p className="font-sans text-[11px] text-[#52525B] leading-normal italic">
              {item.preview}
            </p>

            <button
              type="button"
              onClick={() => handleApplySuggestion(item)}
              className="w-full flex items-center justify-between pt-2 border-t border-[rgba(0,0,0,0.05)] font-mono text-[10px] font-bold text-[#18181B] group-hover:text-[#2D6A4F] transition-colors cursor-pointer"
            >
              <span>{item.actionText}</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
