import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { CampaignSidebar } from "@/features/content/components/CampaignSidebar";
import { ContentEditor } from "@/features/content/components/ContentEditor";
import { ContentAssistant } from "@/features/content/components/ContentAssistant";
import { RepurposePanel } from "@/features/content/components/RepurposePanel";
import { useWorkspace } from "@/hooks/useWorkspace";

export const Route = createFileRoute("/_dashboard/content")({
  head: () => ({
    meta: [
      { title: "Content Operating System — Eminarc Growth OS" },
      {
        name: "description",
        content:
          "The editorial workspace powered by your Research Knowledge Base — multi-channel content creation, AI assistant, and 1-click repurposing.",
      },
    ],
  }),
  component: ContentOSPage,
});

function ContentOSPage() {
  const { currentWorkspace } = useWorkspace();
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="space-y-6 pb-12">
      {/* Workspace Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] select-none">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              CONTENT OPERATING SYSTEM / {currentWorkspace.name.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0] font-bold">
              KNOWLEDGE BASE LINKED
            </span>
          </div>
          <h1 className="font-sans font-bold text-2xl md:text-3xl text-[#111111] tracking-tight">
            Editorial Workspace & Content Engine
          </h1>
          <p className="font-sans font-medium text-xs text-[#52525B] mt-0.5">
            Knowledge-driven multi-channel content studio for {currentWorkspace.name}.
          </p>
        </div>

        <div className="flex items-center space-x-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6]">
            <span className="text-[#716D64] block text-[9px] uppercase">Active Plan</span>
            <span className="font-bold text-[#111111]">Eminarc Pro (Aug 2026)</span>
          </div>
        </div>
      </div>

      {/* THREE-COLUMN LAYOUT (Left 3 cols, Center 6 cols, Right 3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL: Strategy & Campaigns (3 cols) */}
        <div className="lg:col-span-3">
          <CampaignSidebar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* CENTER PANEL: Content Workspace (6 cols) */}
        <div className="lg:col-span-6">
          <ContentEditor />
        </div>

        {/* RIGHT PANEL: AI Assistant (3 cols) */}
        <div className="lg:col-span-3">
          <ContentAssistant />
        </div>
      </div>

      {/* BOTTOM SECTION: 1-Click Multi-Channel Repurpose Engine */}
      <RepurposePanel />
    </div>
  );
}
