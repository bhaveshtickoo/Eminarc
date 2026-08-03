import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { ResearchHeader } from "@/features/research/ResearchHeader";
import { ResearchWizard, ResearchWizardData } from "@/features/research/components/ResearchWizard";
import { ResearchReport } from "@/features/research/components/ResearchReport";
import { ResearchSidebar } from "@/features/research/components/ResearchSidebar";
import { ResearchHistory } from "@/features/research/ResearchHistory";
import { Sparkles, History } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_dashboard/research")({
  head: () => ({
    meta: [
      { title: "Founder Research Workspace — Eminarc Growth OS" },
      {
        name: "description",
        content:
          "The guided intelligence engine powering your growth system — 3-column workspace for founder research, company analysis, positioning, and strategy.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const [activeTab, setActiveTab] = useState<"workspace" | "history">("workspace");
  const [activeStep, setActiveStep] = useState<number>(1);
  const [wizardData, setWizardData] = useState<ResearchWizardData>({
    website: "https://eminarc.com",
    linkedin: "linkedin.com/in/bhaveshtickoo",
    industry: "B2B Growth / AI SaaS",
    targetMarkets: ["USA", "MENA"],
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <ResearchHeader activeStep={activeStep} />

      {/* Main Tab View Switcher */}
      <div className="flex items-center space-x-2 border-b border-[#E5E0D6] pb-3 select-none">
        <button
          type="button"
          onClick={() => setActiveTab("workspace")}
          className={cn(
            "flex items-center space-x-2 font-mono text-xs px-4 py-2 rounded-xl transition-all font-semibold",
            activeTab === "workspace"
              ? "bg-[#000000] text-[#FFFFFF] shadow-sm"
              : "bg-[#FFFFFF] text-[#716D64] hover:bg-[#F7F4EE] hover:text-[#111111] border border-[#E5E0D6]",
          )}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Founder Research Workspace</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className={cn(
            "flex items-center space-x-2 font-mono text-xs px-4 py-2 rounded-xl transition-all font-semibold",
            activeTab === "history"
              ? "bg-[#000000] text-[#FFFFFF] shadow-sm"
              : "bg-[#FFFFFF] text-[#716D64] hover:bg-[#F7F4EE] hover:text-[#111111] border border-[#E5E0D6]",
          )}
        >
          <History className="h-3.5 w-3.5" />
          <span>Research History & Logs</span>
        </button>
      </div>

      {activeTab === "workspace" ? (
        /* THREE-COLUMN DESKTOP LAYOUT (Left 3 cols, Center 6 cols, Right 3 cols) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT PANEL: Research Workflow Wizard (3 cols) */}
          <div className="lg:col-span-3">
            <ResearchWizard
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              data={wizardData}
              setData={setWizardData}
            />
          </div>

          {/* CENTER PANEL: Collapsible Executive Report (6 cols) */}
          <div className="lg:col-span-6">
            <ResearchReport formData={wizardData} />
          </div>

          {/* RIGHT PANEL: Actions & Insights Telemetry (3 cols) */}
          <div className="lg:col-span-3">
            <ResearchSidebar />
          </div>
        </div>
      ) : (
        /* Research History Page View */
        <ResearchHistory />
      )}
    </div>
  );
}
