"use client";

import React, { useState } from "react";
import {
  Sparkles,
  RefreshCw,
  Zap,
  Target,
  Share2,
  Sliders,
  ShieldCheck,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useWorkspace } from "@/hooks/useWorkspace";

export const AICopilot: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const [selectedTone, setSelectedTone] = useState(currentWorkspace.brandVoice[0] || "Strategic");
  const [selectedLength, setSelectedLength] = useState("Medium");
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const handleAction = (actionId: string) => {
    setActiveAction(actionId);
    setTimeout(() => setActiveAction(null), 1800);
  };

  const aiActions = [
    { id: "ideas", label: "Generate Ideas", icon: Sparkles, badge: "5 FRESH" },
    { id: "rewrite", label: "Rewrite Section", icon: RefreshCw, badge: "POLISH" },
    { id: "hook", label: "Improve Hook", icon: Zap, badge: "HIGH CTR" },
    { id: "cta", label: "Create CTA", icon: Target, badge: "CONVERT" },
    { id: "repurpose", label: "Auto-Repurpose", icon: Share2, badge: "7 ASSETS" },
  ];

  return (
    <div className="flex flex-col h-full rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-6 overflow-y-auto">
      {/* Copilot Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-1 rounded-full">
            AI COPILOT
          </span>
          <span className="inline-flex items-center space-x-1 font-mono text-[9px] uppercase font-bold text-[#2D6A4F] bg-[#EDF6F0] px-2.5 py-1 rounded-full border border-[#C8E4D0]">
            <ShieldCheck className="h-3 w-3 mr-0.5" />
            <span>94% ALIGNED</span>
          </span>
        </div>

        <h3 className="font-sans text-xl font-bold text-[#111111] tracking-tight">
          Content Intelligence
        </h3>
        <p className="font-sans font-medium text-xs text-[#52525B] mt-1">
          &quot;Optimize post for {currentWorkspace.name} audience.&quot;
        </p>
      </div>

      {/* AI Quick Actions */}
      <div className="space-y-2">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#716D64]">
          AI Actions
        </span>

        <div className="space-y-2">
          {aiActions.map((act) => {
            const Icon = act.icon;
            const isRunning = activeAction === act.id;

            return (
              <button
                key={act.id}
                type="button"
                onClick={() => handleAction(act.id)}
                className={cn(
                  "group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-sans font-medium transition-all duration-150 border select-none active:scale-[0.98]",
                  isRunning
                    ? "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]"
                    : "bg-[#FFFFFF] text-[#18181B] border-[#E5E0D6] hover:bg-[#F7F4EE] hover:border-[#D8D2C5] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]",
                )}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-colors",
                      isRunning
                        ? "text-[#2D6A4F] animate-spin"
                        : "text-[#716D64] group-hover:text-[#18181B]",
                    )}
                  />
                  <span>{isRunning ? "Processing..." : act.label}</span>
                </div>

                <span
                  className={cn(
                    "font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded font-bold",
                    isRunning ? "bg-[#2D6A4F] text-[#FFFFFF]" : "bg-[#EFEAE1] text-[#716D64]",
                  )}
                >
                  {isRunning ? <Check className="h-3 w-3" /> : act.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Intelligence Controls */}
      <div className="space-y-4 pt-4 border-t border-[rgba(0,0,0,0.06)]">
        <div className="flex items-center space-x-2">
          <Sliders className="h-3.5 w-3.5 text-[#18181B]" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#716D64]">
            Tone & Persona
          </span>
        </div>

        {/* Tone Selector */}
        <div>
          <label className="font-mono text-[10px] text-[#716D64] block mb-1.5">BRAND TONE</label>
          <div className="flex flex-wrap gap-1.5">
            {currentWorkspace.brandVoice.map((tone) => (
              <button
                key={tone}
                type="button"
                onClick={() => setSelectedTone(tone)}
                className={cn(
                  "font-mono text-[10px] px-2.5 py-1 rounded-full border transition-all select-none",
                  selectedTone === tone
                    ? "bg-[#000000] text-[#FFFFFF] border-transparent font-bold"
                    : "bg-[#FFFFFF] text-[#716D64] border-[#E5E0D6] hover:bg-[#F7F4EE] hover:text-[#111111]",
                )}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        {/* Length Selector */}
        <div>
          <label className="font-mono text-[10px] text-[#716D64] block mb-1.5">TARGET LENGTH</label>
          <div className="grid grid-cols-3 gap-1.5">
            {["Short", "Medium", "Long"].map((len) => (
              <button
                key={len}
                type="button"
                onClick={() => setSelectedLength(len)}
                className={cn(
                  "font-mono text-[10px] py-1 text-center rounded-lg border transition-all select-none",
                  selectedLength === len
                    ? "bg-[#000000] text-[#FFFFFF] border-transparent font-bold"
                    : "bg-[#FFFFFF] text-[#716D64] border-[#E5E0D6] hover:bg-[#F7F4EE]",
                )}
              >
                {len}
              </button>
            ))}
          </div>
        </div>

        {/* Target Audience Context */}
        <div className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-3 text-xs">
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#716D64] block mb-1">
            TARGET AUDIENCE CONTEXT
          </span>
          <span className="font-sans font-semibold text-[#111111]">
            {currentWorkspace.targetMarket.join(", ")} Founders
          </span>
        </div>
      </div>

      {/* Content Intelligence Gauges */}
      <div className="pt-4 border-t border-[rgba(0,0,0,0.06)] space-y-3">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#716D64]">
          Quality Gauges
        </span>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-3 text-center">
            <span className="font-mono text-[9px] uppercase text-[#716D64] block">SCORE</span>
            <span className="font-sans text-xl font-bold text-[#111111]">88 / 100</span>
          </div>

          <div className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-3 text-center">
            <span className="font-mono text-[9px] uppercase text-[#716D64] block">ALIGNMENT</span>
            <span className="font-sans text-xl font-bold text-[#2D6A4F]">94%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
