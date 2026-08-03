"use client";

import React, { useState } from "react";
import { Plus, DollarSign, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { DealCard, DealCardData } from "./DealCard";
import { cn } from "@/lib/utils";

export interface PipelineBoardProps {
  onSelectDeal?: (deal: DealCardData) => void;
}

export const initialDeals: DealCardData[] = [
  {
    id: "deal-1",
    company: "TrueLift.ai",
    contact: "Alex Vance",
    role: "CEO & Co-Founder",
    dealValue: 24000,
    aiScore: 96,
    priority: "High",
    stage: "Negotiation",
    owner: "Bhavesh Tickoo",
    nextAction: "Send MSA & Contract Draft",
  },
  {
    id: "deal-2",
    company: "Revix Systems",
    contact: "Sarah Jenkins",
    role: "VP of Marketing",
    dealValue: 18000,
    aiScore: 92,
    priority: "High",
    stage: "Proposal",
    owner: "Pratyush",
    nextAction: "Present Q3 Proposal",
  },
  {
    id: "deal-3",
    company: "Senpai AI",
    contact: "Kenji Sato",
    role: "Head of Growth",
    dealValue: 32000,
    aiScore: 98,
    priority: "High",
    stage: "Won",
    owner: "Bhavesh Tickoo",
    nextAction: "Onboard into Eminarc OS",
  },
  {
    id: "deal-4",
    company: "HyperScale SaaS",
    contact: "Marcus Brody",
    role: "Founder",
    dealValue: 15000,
    aiScore: 84,
    priority: "Medium",
    stage: "Discovery",
    owner: "Aditya",
    nextAction: "Discovery Demo Call",
  },
  {
    id: "deal-5",
    company: "OmniFlow Cloud",
    contact: "Elena Rostova",
    role: "CMO",
    dealValue: 22000,
    aiScore: 90,
    priority: "High",
    stage: "Qualified",
    owner: "Bhavesh Tickoo",
    nextAction: "Schedule Founder Audit",
  },
  {
    id: "deal-6",
    company: "Apex Dynamics",
    contact: "David Miller",
    role: "VP Sales",
    dealValue: 12000,
    aiScore: 78,
    priority: "Low",
    stage: "Lead",
    owner: "Pratyush",
    nextAction: "Outreach Follow-up",
  },
  {
    id: "deal-7",
    company: "Legacy Enterprise",
    contact: "Robert Thorne",
    role: "Director IT",
    dealValue: 40000,
    aiScore: 45,
    priority: "Low",
    stage: "Lost",
    owner: "Aditya",
    nextAction: "Archive Lead Record",
  },
];

export const pipelineStages = [
  "Lead",
  "Qualified",
  "Discovery",
  "Proposal",
  "Negotiation",
  "Won",
  "Lost",
] as const;

export const PipelineBoard: React.FC<PipelineBoardProps> = ({ onSelectDeal }) => {
  const [deals, setDeals] = useState<DealCardData[]>(initialDeals);
  const [draggedDealId, setDraggedDealId] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedDealId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnStage = (stage: (typeof pipelineStages)[number]) => {
    if (!draggedDealId) return;
    setDeals((prev) =>
      prev.map((d) => (d.id === draggedDealId ? { ...d, stage } : d)),
    );
    toast.success(`Moved deal to "${stage}" stage`);
    setDraggedDealId(null);
  };

  return (
    <div className="space-y-4 select-none">
      <div className="flex items-center justify-between font-mono text-xs text-[#716D64] px-1">
        <span className="font-bold text-[#111111]">7-STAGE KANBAN PIPELINE BOARD</span>
        <span>
          TOTAL ACTIVE VALUE:{" "}
          <strong className="text-[#2D6A4F]">
            $
            {deals
              .filter((d) => d.stage !== "Lost")
              .reduce((acc, d) => acc + d.dealValue, 0)
              .toLocaleString()}
          </strong>
        </span>
      </div>

      {/* 7 Column Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-start overflow-x-auto pb-4">
        {pipelineStages.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage);
          const stageTotal = stageDeals.reduce((acc, d) => acc + d.dealValue, 0);

          return (
            <div
              key={stage}
              onDragOver={handleDragOver}
              onDrop={() => handleDropOnStage(stage)}
              className="min-w-[210px] rounded-xl bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-3 space-y-3 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)]"
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] pb-2 font-mono text-xs">
                <div>
                  <h3 className="font-bold text-[#111111]">{stage}</h3>
                  <span className="text-[10px] text-[#716D64]">
                    ${(stageTotal / 1000).toFixed(0)}k total
                  </span>
                </div>
                <span className="h-5 w-5 rounded-full bg-[#EFEAE1] text-[#18181B] flex items-center justify-center font-bold text-[10px]">
                  {stageDeals.length}
                </span>
              </div>

              {/* Cards in Column */}
              <div className="space-y-2 min-h-[260px]">
                {stageDeals.map((deal) => (
                  <div
                    key={deal.id}
                    draggable
                    onDragStart={() => handleDragStart(deal.id)}
                  >
                    <DealCard deal={deal} onSelect={onSelectDeal} />
                  </div>
                ))}

                {stageDeals.length === 0 && (
                  <div className="h-32 border border-dashed border-[#E5E0D6] rounded-xl flex items-center justify-center font-mono text-[10px] text-[#A19B8E]">
                    Drop deals here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
