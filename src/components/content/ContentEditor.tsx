"use client";

import React, { useState } from "react";
import { Clock, Hash, AlignLeft, Sparkles } from "lucide-react";
import { ContentToolbar } from "./ContentToolbar";

export interface ContentEditorProps {
  initialTitle?: string;
  initialBody?: string;
  initialType?: string;
}

export const defaultTitle = "Why Growth OS Architecture Replaces Fragmented Marketing Tech Stacks";

export const defaultBody = `Most founders waste 15+ hours every single week managing 5+ disconnected marketing SaaS tools.

You write content in Notion.
You schedule posts in Buffer.
You enrich leads in Clay.
You track deals in HubSpot.
You monitor AI visibility... manually on ChatGPT.

The result? Context loss, fragmented data, and constant operational friction.

Here is the strategic shift for 2026:
Growth as a System, Not a Campaign.

By unifying research, content generation, LLM visibility auditing, and CRM into one shared Warm Paper Workspace, founders achieve 3x distribution velocity without increasing headcount.

Key Takeaways for B2B SaaS Founders:
1. Single source of brand voice truth eliminates repetitive prompting.
2. Direct 1-click repurposing converts 1 longform piece into 7 channel assets.
3. Autonomous AI agents run continuous background visibility scans.

Stop managing tools. Start operating your growth system.`;

export const ContentEditor: React.FC<ContentEditorProps> = ({
  initialTitle = defaultTitle,
  initialBody = defaultBody,
  initialType = "LinkedIn Post",
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [contentType, setContentType] = useState(initialType);

  // Live Metrics Calculation
  const charCount = body.length;
  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
  const readingTimeMin = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="flex flex-col h-full rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 md:p-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)]">
      {/* Editor Header Toolbar */}
      <ContentToolbar contentType={contentType} onTypeChange={setContentType} status="Draft" />

      {/* Writing Canvas Body */}
      <div className="flex-1 flex flex-col space-y-4">
        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled post..."
          className="w-full bg-transparent font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-[#111111] placeholder-[#9E988D] focus:outline-none tracking-tight leading-tight"
        />

        {/* Divider */}
        <div className="h-[1px] w-full bg-[rgba(0,0,0,0.06)] my-2" />

        {/* Main Body Canvas Area */}
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Start writing or use AI Copilot on the right panel to generate ideas..."
          className="w-full flex-1 min-h-[360px] bg-transparent font-sans text-base text-[#18181B] leading-relaxed placeholder-[#9E988D] focus:outline-none resize-none"
        />
      </div>

      {/* Footer Live Metrics Bar */}
      <div className="pt-4 mt-6 border-t border-[rgba(0,0,0,0.06)] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#716D64] select-none">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <Hash className="h-3.5 w-3.5 text-[#18181B]" />
            <span>{charCount} characters</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1.5">
            <AlignLeft className="h-3.5 w-3.5 text-[#18181B]" />
            <span>{wordCount} words</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1.5">
            <Clock className="h-3.5 w-3.5 text-[#18181B]" />
            <span>{readingTimeMin} min read</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-[#FFFFFF] border border-[#E5E0D6] px-3 py-1 rounded-full">
          <Sparkles className="h-3 w-3 text-[#2D6A4F]" />
          <span className="font-bold text-[#111111]">{contentType} Format</span>
        </div>
      </div>
    </div>
  );
};
