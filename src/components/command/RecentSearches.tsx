"use client";

import React from "react";
import { Clock, Building2, Search, ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export interface RecentItem {
  id: string;
  title: string;
  category: string;
  url: string;
}

export const recentSearchesList: RecentItem[] = [
  { id: "rec-1", title: "TrueLift.ai Founder Profile", category: "Company", url: "/crm" },
  {
    id: "rec-2",
    title: "Generative Engine Optimization (GEO)",
    category: "Research",
    url: "/visibility",
  },
  { id: "rec-3", title: "System Over Campaign Q3 Breakdown", category: "Content", url: "/content" },
];

export interface RecentSearchesProps {
  onExecute: () => void;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({ onExecute }) => {
  const navigate = useNavigate();

  const handleSelect = (item: RecentItem) => {
    navigate({ to: item.url as any });
    toast.success(`Opening ${item.title}`);
    onExecute();
  };

  return (
    <div className="space-y-1 py-1.5 border-b border-[rgba(0,0,0,0.06)] select-none">
      <div className="flex items-center space-x-1 font-mono text-[9px] uppercase font-bold text-[#716D64] px-3.5 py-1">
        <Clock className="h-3 w-3 text-[#716D64]" />
        <span>RECENT SEARCHES & VISITED RECORDS</span>
      </div>

      <div className="space-y-0.5">
        {recentSearchesList.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelect(item)}
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs hover:bg-[#FCFAF7] transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-2 truncate">
              <Search className="h-3.5 w-3.5 text-[#716D64] shrink-0" />
              <span className="font-bold text-[#111111] truncate">{item.title}</span>
            </div>

            <div className="flex items-center space-x-2 font-mono text-[9px] text-[#716D64] shrink-0">
              <span className="bg-[#EFEAE1] px-1.5 py-0.5 rounded">{item.category}</span>
              <ArrowRight className="h-3 w-3 text-[#A19B8E]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
