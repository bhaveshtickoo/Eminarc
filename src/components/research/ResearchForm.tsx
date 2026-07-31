"use client";

import React, { useState } from "react";
import { Sparkles, RefreshCw, Building2, ChevronRight } from "lucide-react";
import { cn } from "@/design-system/utils/cn";
import { Label, Input } from "@/design-system/components/Input";
import { Button } from "@/design-system/components/Button";

export interface RecentResearchItem {
  id: string;
  name: string;
  industry: string;
  date: string;
  active?: boolean;
}

export const initialRecentResearch: RecentResearchItem[] = [
  {
    id: "r-1",
    name: "Eminarc",
    industry: "B2B Growth / AI SaaS",
    date: "Today",
    active: true,
  },
  {
    id: "r-2",
    name: "Acme Health",
    industry: "Digital HealthTech",
    date: "Yesterday",
  },
  {
    id: "r-3",
    name: "Alpha AI",
    industry: "LLM Security Platform",
    date: "3 days ago",
  },
];

export const ResearchForm: React.FC = () => {
  const [website, setWebsite] = useState("https://eminarc.com");
  const [linkedin, setLinkedin] = useState("linkedin.com/in/bhaveshtickoo");
  const [industry, setIndustry] = useState("B2B Growth / AI SaaS");
  const [targetMarket, setTargetMarket] = useState("Mid-Market B2B Founders & Agencies");
  const [recentList, setRecentList] = useState(initialRecentResearch);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectRecent = (id: string) => {
    setRecentList((prev) => prev.map((item) => ({ ...item, active: item.id === id })));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleReset = () => {
    setWebsite("");
    setLinkedin("");
    setIndustry("");
    setTargetMarket("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col h-full rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)]"
    >
      <div className="mb-5">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
          FOUNDER RESEARCH
        </span>
        <h3 className="font-sans font-bold text-xl text-[#111111] mt-2 tracking-tight">
          Research Input Panel
        </h3>
        <p className="font-sans font-medium text-xs text-[#52525B] mt-1">
          Analyze a company and generate a strategic growth report.
        </p>
      </div>

      {/* Input Fields */}
      <div className="space-y-4 flex-1">
        <div>
          <Label>Company Website *</Label>
          <Input
            value={website}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWebsite(e.target.value)}
            placeholder="https://company.com"
          />
        </div>

        <div>
          <Label>Founder LinkedIn *</Label>
          <Input
            value={linkedin}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLinkedin(e.target.value)}
            placeholder="linkedin.com/in/username"
          />
        </div>

        <div>
          <Label>Industry</Label>
          <Input
            value={industry}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIndustry(e.target.value)}
            placeholder="e.g. HealthTech, B2B SaaS"
          />
        </div>

        <div>
          <Label>Target Market</Label>
          <Input
            value={targetMarket}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTargetMarket(e.target.value)}
            placeholder="e.g. Founders, Agencies, VP Sales"
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2.5">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full justify-center bg-[#000000] text-[#FFFFFF] hover:bg-[#222222]"
          >
            {isLoading ? "Analyzing..." : "Generate Research"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="w-full justify-center"
          >
            Reset Form
          </Button>
        </div>

        {/* Recent Research Section */}
        <div className="pt-6 mt-6 border-t border-[rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#716D64]">
              Recent Research
            </span>
            <span className="font-mono text-[9px] text-[#716D64]">{recentList.length} REPORTS</span>
          </div>

          <div className="space-y-2">
            {recentList.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectRecent(item.id)}
                className={cn(
                  "group flex items-center justify-between rounded-xl border p-3 text-xs transition-all duration-150 cursor-pointer select-none",
                  item.active
                    ? "bg-[#FFFFFF] border-[#18181B] shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] font-semibold"
                    : "bg-[#FFFFFF]/60 border-[#E5E0D6] hover:bg-[#FFFFFF] hover:border-[#D8D2C5]",
                )}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-lg border shrink-0",
                      item.active
                        ? "bg-[#000000] text-[#FFFFFF] border-transparent"
                        : "bg-[#EFEAE1] text-[#716D64] border-[#E5E0D6]",
                    )}
                  >
                    <Building2 className="h-3.5 w-3.5" />
                  </div>

                  <div className="min-w-0">
                    <p className="font-sans font-medium text-[#18181B] truncate">{item.name}</p>
                    <span className="font-mono text-[9px] text-[#716D64] truncate block">
                      {item.industry}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 shrink-0 ml-2">
                  <span className="font-mono text-[9px] text-[#716D64]">{item.date}</span>
                  <ChevronRight
                    className={cn(
                      "h-3.5 w-3.5 text-[#716D64] transition-transform",
                      item.active && "text-[#18181B] translate-x-0.5",
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
