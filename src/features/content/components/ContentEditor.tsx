"use client";

import React, { useState } from "react";
import { PlatformSelector } from "./PlatformSelector";
import { ContentMetrics } from "./ContentMetrics";
import { ContentToolbar } from "./ContentToolbar";
import { useWorkspace } from "@/hooks/useWorkspace";

export interface ContentEditorProps {
  initialTitle?: string;
  initialContent?: string;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
  initialTitle = "Growth as a System, Not a Campaign: The B2B Growth Operating Model",
  initialContent = `Most B2B SaaS founders treat marketing as a series of disconnected campaigns.

They launch a one-off LinkedIn push, run a 2-week cold email sequence, or publish a blog post once a month—and wonder why inbound pipeline feels unpredictable.

Here is the strategic shift: Growth is not a campaign. It is an operating system.

When you build a growth operating system, four elements lock together:
1. Structured Founder Research (understanding ICP friction)
2. Generative Engine Optimization (getting cited by ChatGPT, Claude & Perplexity)
3. 1-Click Multi-Channel Repurposing (scaling 1 core breakdown into 7 assets)
4. Lead Intelligence CRM (capturing high-intent buyer telemetry)

By systematizing your brand narrative, your CAC drops while your AI search visibility compound over time.`,
}) => {
  const { currentWorkspace } = useWorkspace();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [selectedPlatform, setSelectedPlatform] = useState("linkedin-post");
  const [status, setStatus] = useState<"Draft" | "Review" | "Approved" | "Scheduled" | "Published">("Draft");

  const handleFormatText = (format: string) => {
    if (format === "bold") setContent((prev) => prev + " **bold text**");
    if (format === "italic") setContent((prev) => prev + " *italic text*");
    if (format === "list") setContent((prev) => prev + "\n- Item 1\n- Item 2");
    if (format === "code") setContent((prev) => prev + "\n```\n// code snippet\n```");
  };

  return (
    <div className="flex flex-col rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-5 h-full">
      {/* Header & Platform Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
            CENTER PANEL / EDITORIAL WORKSPACE
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-[#1E4620] bg-[#EDF6F0] px-2.5 py-0.5 rounded-full border border-[#C8E4D0]">
            KNOWLEDGE BASE LINKED
          </span>
        </div>

        <PlatformSelector
          selectedPlatform={selectedPlatform}
          onSelectPlatform={setSelectedPlatform}
        />
      </div>

      {/* Content Title Input */}
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled Article or Campaign Post..."
          className="w-full bg-transparent font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#111111] placeholder-[#A19B8E] focus:outline-none border-b border-[rgba(0,0,0,0.06)] pb-3"
        />
      </div>

      {/* Toolbar & Status Bar */}
      <ContentToolbar
        status={status}
        onStatusChange={setStatus}
        onFormat={handleFormatText}
      />

      {/* Main Writing Canvas */}
      <div className="flex-1 min-h-[320px] flex flex-col">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write or refine your content breakdown here..."
          className="w-full flex-1 bg-[#FFFFFF] border border-[#E5E0D6] rounded-xl p-5 font-sans text-sm text-[#18181B] leading-relaxed placeholder-[#9E988D] focus:outline-none focus:ring-1 focus:ring-[#18181B] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] resize-none"
        />
      </div>

      {/* Content Metrics Footer Bar */}
      <ContentMetrics content={content} />
    </div>
  );
};
