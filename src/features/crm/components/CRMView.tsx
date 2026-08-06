"use client";

import React, { useState } from "react";
import { ChartCard } from "@/components/charts/ChartCard";
import { BarChart } from "@/components/charts/BarChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { LineChart } from "@/components/charts/LineChart";
import { CRMHeader } from "./CRMHeader";
import { CRMFilters } from "./CRMFilters";
import { PipelineBoard } from "./PipelineBoard";
import { ContactTable } from "./ContactTable";
import { CompanyProfile } from "./CompanyProfile";
import { Timeline } from "./Timeline";
import { MeetingCard } from "./MeetingCard";
import { EmailPanel } from "./EmailPanel";
import { DealCardData } from "./DealCard";

// 1. Pipeline Funnel (Bar)
export const funnelData = [
  { stage: "Lead", volume: 45 },
  { stage: "Qualified", volume: 32 },
  { stage: "Discovery", volume: 24 },
  { stage: "Proposal", volume: 18 },
  { stage: "Negotiation", volume: 14 },
  { stage: "Won", volume: 10 },
];

// 2. Lead Sources (Donut)
export const leadSourcesData = [
  { name: "Inbound Content OS", value: 45, color: "#18181B", share: 38 },
  { name: "GEO AI Search Radar", value: 32, color: "#2D6A4F", share: 27 },
  { name: "Cold Founder Email", value: 24, color: "#0369A1", share: 20 },
  { name: "Reddit & Community", value: 18, color: "#B45309", share: 15 },
];

// 3. Monthly Conversion (Line)
export const monthlyConversionData = [
  { month: "Jan", winRate: 48, arr: 42 },
  { month: "Feb", winRate: 52, arr: 58 },
  { month: "Mar", winRate: 56, arr: 74 },
  { month: "Apr", winRate: 61, arr: 89 },
  { month: "May", winRate: 64, arr: 110 },
  { month: "Jun", winRate: 68, arr: 142 },
];

// 4. Stage Distribution (Bar)
export const stageDistributionData = [
  { stage: "Lead", value: 12 },
  { stage: "Qual", value: 22 },
  { stage: "Disc", value: 15 },
  { stage: "Prop", value: 18 },
  { stage: "Nego", value: 24 },
  { stage: "Won", value: 32 },
];

export const CRMView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("Pipeline");
  const [search, setSearch] = useState("");
  const [selectedOwner, setSelectedOwner] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [inspectedDeal, setInspectedDeal] = useState<DealCardData | null>(null);

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Top Header & 9 Section Tabs */}
      <CRMHeader activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Filter Bar */}
      <CRMFilters
        search={search}
        onSearchChange={setSearch}
        selectedOwner={selectedOwner}
        onOwnerChange={setSelectedOwner}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
      />

      {/* 4 Shared Recharts Charts (Shown on Pipeline & Analytics overview) */}
      {activeSection === "Pipeline" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ChartCard
            indexCode="CHART 01"
            title="Pipeline Funnel"
            subtitle="Stage conversion rates."
          >
            <BarChart
              data={funnelData}
              xAxisKey="stage"
              series={[{ key: "volume", name: "Leads", color: "#18181B" }]}
              height={180}
            />
          </ChartCard>

          <ChartCard indexCode="CHART 02" title="Lead Sources" subtitle="Channel acquisition.">
            <DonutChart
              data={leadSourcesData}
              centerLabel="TOTAL LEADS"
              centerValue="119"
              size={135}
              innerRadius={42}
              outerRadius={62}
            />
          </ChartCard>

          <ChartCard
            indexCode="CHART 03"
            title="Monthly Conversion"
            subtitle="Win rate & ARR trajectory."
          >
            <LineChart
              data={monthlyConversionData}
              xAxisKey="month"
              series={[
                { key: "winRate", name: "Win Rate (%)", color: "#2D6A4F" },
                { key: "arr", name: "ARR ($k)", color: "#18181B" },
              ]}
              height={180}
            />
          </ChartCard>

          <ChartCard
            indexCode="CHART 04"
            title="Stage Value ($k)"
            subtitle="Distribution of pipeline ARR."
          >
            <BarChart
              data={stageDistributionData}
              xAxisKey="stage"
              series={[{ key: "value", name: "ARR ($k)", color: "#0369A1" }]}
              height={180}
            />
          </ChartCard>
        </div>
      )}

      {/* MAIN SECTION CONTENT */}
      {activeSection === "Pipeline" && (
        <PipelineBoard onSelectDeal={(deal) => setInspectedDeal(deal)} />
      )}

      {activeSection === "Companies" && (
        <CompanyProfile companyName={inspectedDeal ? inspectedDeal.company : "TrueLift.ai"} />
      )}

      {activeSection === "Contacts" && <ContactTable />}

      {activeSection === "Opportunities" && (
        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
          <h3 className="font-sans font-bold text-xl text-[#111111]">Open Revenue Opportunities</h3>
          <p className="font-sans text-xs text-[#716D64]">
            14 deals worth $142,000 in active negotiations.
          </p>
          <PipelineBoard onSelectDeal={(deal) => setInspectedDeal(deal)} />
        </div>
      )}

      {activeSection === "Tasks" && (
        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-3 font-mono text-xs">
          <h3 className="font-sans font-bold text-xl text-[#111111]">Actionable Growth Tasks</h3>
          <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6]">
            • High Priority: Deliver MSA Contract to TrueLift.ai (Due Today)
          </div>
          <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6]">
            • Medium Priority: Schedule Q3 Content Audit with Revix Systems (Due Tomorrow)
          </div>
          <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6]">
            • Low Priority: Send follow-up email to Apex Dynamics (Due Aug 05)
          </div>
        </div>
      )}

      {activeSection === "Meetings" && <MeetingCard />}

      {activeSection === "Timeline" && <Timeline />}

      {activeSection === "Notes" && (
        <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-3 font-sans text-xs">
          <h3 className="font-bold text-xl text-[#111111]">Account Notes Scratchpad</h3>
          <textarea
            placeholder="Write persistent notes for active deals..."
            rows={8}
            className="w-full rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-4 text-xs text-[#18181B] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#18181B]"
            defaultValue="TrueLift.ai founder prefers concise 1-page proposals focusing on ChatGPT GEO citation metrics. Key contract renewal date: August 2027."
          />
        </div>
      )}

      {activeSection === "Emails" && <EmailPanel />}
    </div>
  );
};
