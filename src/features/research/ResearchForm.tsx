"use client";

import React from "react";
import {
  Globe,
  Linkedin,
  Building2,
  Users,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface ResearchFormData {
  website: string;
  linkedin: string;
  industry: string;
  targetMarket: string;
}

export interface ResearchFormProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
  data: ResearchFormData;
  setData: React.Dispatch<React.SetStateAction<ResearchFormData>>;
}

export const stepsList = [
  { step: 1, title: "Company Website", icon: Globe, key: "website" },
  { step: 2, title: "Founder LinkedIn", icon: Linkedin, key: "linkedin" },
  { step: 3, title: "Industry", icon: Building2, key: "industry" },
  { step: 4, title: "Target Market", icon: Users, key: "targetMarket" },
  { step: 5, title: "Research Summary", icon: Sparkles, key: "summary" },
];

export const ResearchForm: React.FC<ResearchFormProps> = ({
  activeStep,
  setActiveStep,
  data,
  setData,
}) => {
  const handleNext = () => {
    if (activeStep < 5) setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  const updateField = (field: keyof ResearchFormData, val: string) => {
    setData((prev) => ({ ...prev, [field]: val }));
  };

  const progressPct = (activeStep / 5) * 100;

  return (
    <div className="flex flex-col h-full rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] select-none">
      {/* Step Progress Tracker */}
      <div className="mb-6 pb-5 border-b border-[rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
            WORKFLOW STEP 0{activeStep} / 05
          </span>
          <span className="font-mono text-[10px] font-bold text-[#2D6A4F]">
            {progressPct}% COMPLETE
          </span>
        </div>

        {/* Progress Bar Track */}
        <div className="h-1.5 w-full bg-[#E5E0D6] rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-[#18181B] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Step Nodes Grid */}
        <div className="grid grid-cols-5 gap-1.5">
          {stepsList.map((st) => {
            const Icon = st.icon;
            const isCurrent = activeStep === st.step;
            const isDone = activeStep > st.step;

            return (
              <button
                key={st.step}
                type="button"
                onClick={() => setActiveStep(st.step)}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-150 border text-center cursor-pointer",
                  isCurrent
                    ? "bg-[#000000] text-[#FFFFFF] border-black shadow-sm"
                    : isDone
                      ? "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]"
                      : "bg-[#FFFFFF] text-[#716D64] border-[#E5E0D6] hover:bg-[#F7F4EE]",
                )}
              >
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4 text-[#2D6A4F]" />
                ) : (
                  <Icon
                    className={cn("h-4 w-4", isCurrent ? "text-[#FFFFFF]" : "text-[#716D64]")}
                  />
                )}
                <span
                  className={cn(
                    "font-mono text-[9px] uppercase tracking-wider font-bold mt-1.5 truncate max-w-full hidden sm:block",
                    isCurrent ? "text-[#FFFFFF]" : isDone ? "text-[#1E4620]" : "text-[#716D64]",
                  )}
                >
                  {st.title.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Step Input Content */}
      <div className="flex-1 flex flex-col justify-between">
        {activeStep === 1 && (
          <div className="space-y-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#716D64] block mb-1">
                STEP 01 OF 05
              </span>
              <h3 className="font-sans font-bold text-xl text-[#111111] tracking-tight">
                Company Website Domain
              </h3>
              <p className="font-sans text-xs text-[#52525B] mt-1">
                Enter the primary URL of the company to extract positioning and value propositions.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <Label className="font-mono text-xs text-[#18181B]">Company Website URL *</Label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#716D64]" />
                <Input
                  value={data.website}
                  onChange={(e) => updateField("website", e.target.value)}
                  placeholder="https://company.com"
                  className="pl-10 h-10 font-mono text-xs bg-[#FFFFFF] border-[#E5E0D6]"
                />
              </div>
            </div>

            <div className="rounded-xl bg-[#FBF9F5] border border-[#E5E0D6] p-4 text-xs font-sans text-[#716D64] space-y-1.5">
              <span className="font-mono text-[10px] uppercase font-bold text-[#18181B] block">
                ANALYSIS FOCUS
              </span>
              <p>• Hero messaging & headline clarity</p>
              <p>• Product architecture & feature categorization</p>
              <p>• Pricing tier structures and target customer segments</p>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#716D64] block mb-1">
                STEP 02 OF 05
              </span>
              <h3 className="font-sans font-bold text-xl text-[#111111] tracking-tight">
                Founder LinkedIn Profile
              </h3>
              <p className="font-sans text-xs text-[#52525B] mt-1">
                Enter the founder or CEO LinkedIn URL to map personal branding and authority hooks.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <Label className="font-mono text-xs text-[#18181B]">Founder LinkedIn URL *</Label>
              <div className="relative">
                <Linkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#716D64]" />
                <Input
                  value={data.linkedin}
                  onChange={(e) => updateField("linkedin", e.target.value)}
                  placeholder="linkedin.com/in/username"
                  className="pl-10 h-10 font-mono text-xs bg-[#FFFFFF] border-[#E5E0D6]"
                />
              </div>
            </div>

            <div className="rounded-xl bg-[#FBF9F5] border border-[#E5E0D6] p-4 text-xs font-sans text-[#716D64] space-y-1.5">
              <span className="font-mono text-[10px] uppercase font-bold text-[#18181B] block">
                FOUNDER AUTHORITY AUDIT
              </span>
              <p>• Founder experience narrative and domain authority</p>
              <p>• Recent post topics, engagement velocity, and voice</p>
              <p>• Strategic content opportunities for thought leadership</p>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="space-y-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#716D64] block mb-1">
                STEP 03 OF 05
              </span>
              <h3 className="font-sans font-bold text-xl text-[#111111] tracking-tight">
                Industry & Category Definition
              </h3>
              <p className="font-sans text-xs text-[#52525B] mt-1">
                Specify the primary market category and competitive vertical.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <Label className="font-mono text-xs text-[#18181B]">Industry / Sector *</Label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#716D64]" />
                <Input
                  value={data.industry}
                  onChange={(e) => updateField("industry", e.target.value)}
                  placeholder="e.g. B2B Growth SaaS, AI Developer Tools"
                  className="pl-10 h-10 font-mono text-xs bg-[#FFFFFF] border-[#E5E0D6]"
                />
              </div>
            </div>

            <div className="rounded-xl bg-[#FBF9F5] border border-[#E5E0D6] p-4 text-xs font-sans text-[#716D64] space-y-1.5">
              <span className="font-mono text-[10px] uppercase font-bold text-[#18181B] block">
                CATEGORY MAPPING
              </span>
              <p>• Top 3 incumbent competitors & alternative solutions</p>
              <p>• Market maturity, pricing standards, and positioning gaps</p>
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className="space-y-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#716D64] block mb-1">
                STEP 04 OF 05
              </span>
              <h3 className="font-sans font-bold text-xl text-[#111111] tracking-tight">
                Target Market & ICP Persona
              </h3>
              <p className="font-sans text-xs text-[#52525B] mt-1">
                Define the high-intent buyer personas and customer segments.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <Label className="font-mono text-xs text-[#18181B]">Target Customer Segment *</Label>
              <div className="relative">
                <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#716D64]" />
                <Input
                  value={data.targetMarket}
                  onChange={(e) => updateField("targetMarket", e.target.value)}
                  placeholder="e.g. Mid-Market B2B Founders, VP Marketing"
                  className="pl-10 h-10 font-mono text-xs bg-[#FFFFFF] border-[#E5E0D6]"
                />
              </div>
            </div>

            <div className="rounded-xl bg-[#FBF9F5] border border-[#E5E0D6] p-4 text-xs font-sans text-[#716D64] space-y-1.5">
              <span className="font-mono text-[10px] uppercase font-bold text-[#18181B] block">
                BUYER INSIGHT AUDIT
              </span>
              <p>• Core friction points, operational pain, and trigger events</p>
              <p>• Value proposition alignment & high-converting messaging hooks</p>
            </div>
          </div>
        )}

        {activeStep === 5 && (
          <div className="space-y-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#2D6A4F] bg-[#EDF6F0] px-2.5 py-0.5 rounded border border-[#C8E4D0] font-bold">
                WORKFLOW COMPLETE
              </span>
              <h3 className="font-sans font-bold text-xl text-[#111111] tracking-tight mt-2">
                Executive Research Report Ready
              </h3>
              <p className="font-sans text-xs text-[#52525B] mt-1">
                All 11 McKinsey/BCG consulting report sections generated for {data.website}.
              </p>
            </div>

            <div className="space-y-2.5 font-mono text-xs rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-4">
              <div className="flex justify-between border-b border-[rgba(0,0,0,0.06)] pb-2">
                <span className="text-[#716D64]">Company:</span>
                <span className="font-bold text-[#111111]">{data.website}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(0,0,0,0.06)] pb-2">
                <span className="text-[#716D64]">Founder:</span>
                <span className="font-bold text-[#111111]">{data.linkedin}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(0,0,0,0.06)] pb-2">
                <span className="text-[#716D64]">Industry:</span>
                <span className="font-bold text-[#111111]">{data.industry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#716D64]">Target Market:</span>
                <span className="font-bold text-[#111111]">{data.targetMarket}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#EDF6F0] border border-[#C8E4D0] text-xs font-sans text-[#1E4620]">
              <span className="font-bold block mb-1">Intelligence Layer Activated</span>
              Review the complete 11-section executive report on the right panel.
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="pt-6 mt-6 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={activeStep === 1}
            className="flex items-center space-x-1 font-mono text-xs"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span>Previous</span>
          </Button>

          {activeStep < 5 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="flex items-center space-x-1 bg-[#000000] text-[#FFFFFF] hover:bg-[#222222] font-mono text-xs"
            >
              <span>Next Step</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => setActiveStep(1)}
              className="flex items-center space-x-1.5 bg-[#2D6A4F] text-[#FFFFFF] hover:bg-[#1E4620] font-mono text-xs"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Restart Workflow</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
