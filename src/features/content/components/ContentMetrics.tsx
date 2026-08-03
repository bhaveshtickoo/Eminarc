"use client";

import React from "react";
import { Clock, Hash, ShieldCheck, Sparkles } from "lucide-react";

export interface ContentMetricsProps {
  content: string;
}

export const ContentMetrics: React.FC<ContentMetricsProps> = ({ content }) => {
  const charCount = content.length;
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readingTimeMin = Math.max(1, Math.ceil(wordCount / 200));

  const seoScore = Math.min(98, Math.max(70, 85 + (wordCount > 50 ? 8 : 0)));
  const brandAlignment = Math.min(99, Math.max(88, 92 + (content.includes("Eminarc") ? 4 : 0)));

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#EFEAE1]/60 border border-[#E5E0D6] font-mono text-xs text-[#716D64] select-none">
      <div className="flex items-center space-x-4">
        {/* Character Count */}
        <div className="flex items-center space-x-1.5">
          <Hash className="h-3.5 w-3.5 text-[#18181B]" />
          <span>Characters:</span>
          <strong className="text-[#18181B]">{charCount}</strong>
        </div>

        {/* Word Count & Reading Time */}
        <div className="flex items-center space-x-1.5">
          <Clock className="h-3.5 w-3.5 text-[#18181B]" />
          <span>Reading Time:</span>
          <strong className="text-[#18181B]">{readingTimeMin} min ({wordCount} words)</strong>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Mock SEO Score */}
        <div className="flex items-center space-x-1 bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#E5E0D6]">
          <Sparkles className="h-3 w-3 text-[#0369A1]" />
          <span>SEO Score:</span>
          <strong className="text-[#0369A1]">{seoScore}%</strong>
        </div>

        {/* Mock Brand Alignment Score */}
        <div className="flex items-center space-x-1 bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0] text-[#1E4620]">
          <ShieldCheck className="h-3 w-3 text-[#2D6A4F]" />
          <span>Brand Alignment:</span>
          <strong className="text-[#2D6A4F]">{brandAlignment}%</strong>
        </div>
      </div>
    </div>
  );
};
