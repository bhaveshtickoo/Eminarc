"use client";

import React, { useState } from "react";
import {
  Globe,
  Linkedin,
  Building2,
  Users,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResearchProgress } from "./ResearchProgress";
import { useWorkspace } from "@/hooks/useWorkspace";

export interface ResearchWizardData {
  website: string;
  linkedin: string;
  industry: string;
  targetMarkets: string[];
}

export interface ResearchWizardProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
  data: ResearchWizardData;
  setData: React.Dispatch<React.SetStateAction<ResearchWizardData>>;
  onGenerate?: () => void;
}

export const industryOptions = [
  "B2B Growth / AI SaaS",
  "Digital HealthTech & Bio",
  "LLM Security & DevTools",
  "Fintech & Crypto Infrastructure",
  "B2B Agency & Consultancy",
  "Developer Productivity Platform",
];

export const targetMarketOptions = ["USA", "MENA", "Europe", "Global"];

export const ResearchWizard: React.FC<ResearchWizardProps> = ({
  activeStep,
  setActiveStep,
  data,
  setData,
  onGenerate,
}) => {
  const { populateKnowledgeBaseFromResearch } = useWorkspace();
  const [websiteError, setWebsiteError] = useState("");
  const [linkedinError, setLinkedinError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const validateUrl = (url: string, type: "website" | "linkedin"): boolean => {
    if (!url.trim()) {
      if (type === "website") setWebsiteError("Website URL is required.");
      if (type === "linkedin") setLinkedinError("LinkedIn URL is required.");
      return false;
    }

    if (type === "website") {
      const isValid = url.includes(".") && (url.startsWith("http://") || url.startsWith("https://") || url.length > 4);
      if (!isValid) {
        setWebsiteError("Please enter a valid website domain (e.g. https://company.com)");
        return false;
      }
      setWebsiteError("");
    }

    if (type === "linkedin") {
      const isValid = url.toLowerCase().includes("linkedin.com/");
      if (!isValid) {
        setLinkedinError("Please enter a valid LinkedIn URL (e.g. linkedin.com/in/username)");
        return false;
      }
      setLinkedinError("");
    }

    return true;
  };

  const handleNext = () => {
    if (activeStep === 1) {
      if (!validateUrl(data.website, "website")) return;
    }
    if (activeStep === 2) {
      if (!validateUrl(data.linkedin, "linkedin")) return;
    }
    if (activeStep < 5) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  const toggleTargetMarket = (region: string) => {
    setData((prev) => {
      const exists = prev.targetMarkets.includes(region);
      return {
        ...prev,
        targetMarkets: exists
          ? prev.targetMarkets.filter((r) => r !== region)
          : [...prev.targetMarkets, region],
      };
    });
  };

  const handleTriggerGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      populateKnowledgeBaseFromResearch(data);
      toast.success("Workspace Knowledge Base Populated", {
        description: "Research data synchronized across Content, CRM, and AI Visibility modules.",
      });
      onGenerate?.();
    }, 1200);
  };

  return (
    <div className="flex flex-col justify-between rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] h-full select-none">
      <div>
        {/* Header & Progress Indicator */}
        <div className="mb-6">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
            LEFT PANEL / WORKFLOW WIZARD
          </span>
          <h3 className="font-sans font-bold text-xl text-[#111111] mt-2 tracking-tight">
            Research Workflow
          </h3>
          <p className="font-sans text-xs text-[#52525B] mt-0.5">
            Step-by-step company research wizard.
          </p>
        </div>

        {/* Vertical Progress Component */}
        <ResearchProgress
          activeStep={activeStep}
          onStepClick={(s) => setActiveStep(s)}
          className="mb-6 pb-6 border-b border-[rgba(0,0,0,0.06)]"
        />

        {/* Step Forms */}
        <div className="space-y-4">
          {/* Step 1: Company Website */}
          {activeStep === 1 && (
            <div className="space-y-3">
              <div>
                <Label className="font-mono text-xs font-bold text-[#18181B] block mb-1">
                  Step 1: Company Website *
                </Label>
                <p className="font-sans text-xs text-[#716D64]">
                  Enter target company domain to extract market positioning.
                </p>
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#716D64]" />
                  <Input
                    value={data.website}
                    onChange={(e) => {
                      setData((prev) => ({ ...prev, website: e.target.value }));
                      if (websiteError) setWebsiteError("");
                    }}
                    placeholder="https://company.com"
                    className={cn(
                      "pl-10 h-10 font-mono text-xs bg-[#FFFFFF] border-[#E5E0D6]",
                      websiteError && "border-[#EF4444] ring-1 ring-[#EF4444]",
                    )}
                  />
                </div>
                {websiteError && (
                  <div className="flex items-center space-x-1 font-mono text-[10px] text-[#EF4444] pt-1">
                    <AlertCircle className="h-3 w-3" />
                    <span>{websiteError}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Founder LinkedIn */}
          {activeStep === 2 && (
            <div className="space-y-3">
              <div>
                <Label className="font-mono text-xs font-bold text-[#18181B] block mb-1">
                  Step 2: Founder LinkedIn *
                </Label>
                <p className="font-sans text-xs text-[#716D64]">
                  Enter founder LinkedIn profile to audit personal brand leverage.
                </p>
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <Linkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#716D64]" />
                  <Input
                    value={data.linkedin}
                    onChange={(e) => {
                      setData((prev) => ({ ...prev, linkedin: e.target.value }));
                      if (linkedinError) setLinkedinError("");
                    }}
                    placeholder="linkedin.com/in/username"
                    className={cn(
                      "pl-10 h-10 font-mono text-xs bg-[#FFFFFF] border-[#E5E0D6]",
                      linkedinError && "border-[#EF4444] ring-1 ring-[#EF4444]",
                    )}
                  />
                </div>
                {linkedinError && (
                  <div className="flex items-center space-x-1 font-mono text-[10px] text-[#EF4444] pt-1">
                    <AlertCircle className="h-3 w-3" />
                    <span>{linkedinError}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Industry */}
          {activeStep === 3 && (
            <div className="space-y-3">
              <div>
                <Label className="font-mono text-xs font-bold text-[#18181B] block mb-1">
                  Step 3: Industry Dropdown
                </Label>
                <p className="font-sans text-xs text-[#716D64]">
                  Select the primary category and competitive vertical.
                </p>
              </div>

              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#716D64] pointer-events-none" />
                <select
                  value={data.industry}
                  onChange={(e) => setData((prev) => ({ ...prev, industry: e.target.value }))}
                  className="w-full h-10 pl-10 pr-4 bg-[#FFFFFF] border border-[#E5E0D6] rounded-xl font-mono text-xs text-[#18181B] focus:outline-none focus:ring-1 focus:ring-[#18181B] cursor-pointer"
                >
                  {industryOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Target Market Multi-select */}
          {activeStep === 4 && (
            <div className="space-y-3">
              <div>
                <Label className="font-mono text-xs font-bold text-[#18181B] block mb-1">
                  Step 4: Target Market Multi-Select
                </Label>
                <p className="font-sans text-xs text-[#716D64]">
                  Select target geographic markets and sales regions.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                {targetMarketOptions.map((region) => {
                  const isSelected = data.targetMarkets.includes(region);

                  return (
                    <button
                      key={region}
                      type="button"
                      onClick={() => toggleTargetMarket(region)}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-xl border text-xs font-mono font-medium transition-all duration-150 cursor-pointer",
                        isSelected
                          ? "bg-[#000000] text-[#FFFFFF] border-black shadow-sm"
                          : "bg-[#FFFFFF] text-[#18181B] border-[#E5E0D6] hover:bg-[#F7F4EE]",
                      )}
                    >
                      <span>{region}</span>
                      {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-[#FFFFFF]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5: Generate Research */}
          {activeStep === 5 && (
            <div className="space-y-4">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0]">
                  READY TO GENERATE
                </span>
                <h4 className="font-sans font-bold text-lg text-[#111111] mt-2">
                  Step 5: Generate Research Report
                </h4>
                <p className="font-sans text-xs text-[#716D64] mt-0.5">
                  Compile executive McKinsey-grade research for {data.website}.
                </p>
              </div>

              {/* Large Primary Action Button */}
              <Button
                type="button"
                onClick={handleTriggerGenerate}
                disabled={isGenerating}
                className="w-full h-12 justify-center bg-[#000000] text-[#FFFFFF] hover:bg-[#222222] font-mono text-xs font-bold shadow-md rounded-xl active:scale-[0.98]"
              >
                {isGenerating ? (
                  <span className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 animate-spin" />
                    <span>Processing Research Audit...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Generate Research Report</span>
                  </span>
                )}
              </Button>

              {/* Static Progress Indicator */}
              <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
                <div className="flex justify-between font-mono text-[10px] text-[#716D64]">
                  <span>STATIC AUDIT PROGRESS</span>
                  <span className="font-bold text-[#2D6A4F]">100% READY</span>
                </div>
                <div className="h-1.5 w-full bg-[#E5E0D6] rounded-full overflow-hidden">
                  <div className="h-full w-full bg-[#2D6A4F] rounded-full" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="pt-6 mt-6 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={activeStep === 1}
          className="flex items-center space-x-1 font-mono text-xs"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          <span>Back</span>
        </Button>

        {activeStep < 5 ? (
          <Button
            type="button"
            onClick={handleNext}
            className="flex items-center space-x-1 bg-[#000000] text-[#FFFFFF] hover:bg-[#222222] font-mono text-xs font-bold"
          >
            <span>Next</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => setActiveStep(1)}
            className="flex items-center space-x-1 text-[#716D64] hover:text-[#18181B] font-mono text-xs"
          >
            <span>Reset Wizard</span>
          </Button>
        )}
      </div>
    </div>
  );
};
