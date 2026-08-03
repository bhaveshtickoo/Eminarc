"use client";

import React from "react";
import { Mic, ShieldCheck, AlertCircle } from "lucide-react";
import { useWorkspace } from "@/hooks/useWorkspace";

export const BrandVoiceCard: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const voice = currentWorkspace.knowledgeBase.brandVoice;

  return (
    <div className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-4 space-y-3 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] select-none">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase font-bold text-[#716D64] flex items-center">
          <Mic className="h-3.5 w-3.5 mr-1.5 text-[#18181B]" />
          BRAND VOICE
        </span>
        <span className="font-mono text-[8px] font-bold text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0]">
          SYNCED WITH KB
        </span>
      </div>

      {/* Tone Tags */}
      <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
        {voice.toneTags.map((tag, i) => (
          <span key={i} className="bg-[#18181B] text-[#FFFFFF] px-2 py-0.5 rounded font-semibold">
            {tag}
          </span>
        ))}
      </div>

      {/* Communication Rules */}
      <div className="space-y-1 text-xs font-sans text-[#18181B] pt-1">
        <span className="font-mono text-[9px] uppercase text-[#716D64] font-bold block">RULES</span>
        {voice.rules.slice(0, 2).map((rule, idx) => (
          <p key={idx} className="text-[11px] text-[#52525B] leading-tight">
            • {rule}
          </p>
        ))}
      </div>

      {/* Prohibited Words */}
      <div className="pt-1 border-t border-[rgba(0,0,0,0.06)]">
        <span className="font-mono text-[9px] uppercase text-[#EF4444] font-bold flex items-center mb-1">
          <AlertCircle className="h-3 w-3 mr-1 text-[#EF4444]" />
          PROHIBITED WORDS
        </span>
        <div className="flex flex-wrap gap-1 font-mono text-[9px]">
          {voice.prohibitedPhrases.map((phrase, idx) => (
            <span key={idx} className="bg-[#FEE2E2] text-[#7F1D1D] px-1.5 py-0.5 rounded">
              ✕ {phrase}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
