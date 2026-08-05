"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Sparkles,
  Target,
  AlertTriangle,
  CheckSquare,
  FileSearch,
  TrendingUp,
  ArrowRight,
  RefreshCw,
  Calendar,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { useWorkspace } from "@/hooks/useWorkspace";
import { DailyBriefService } from "@/services/brief/daily-brief-service";
import { DailyGrowthBriefOutput } from "@/services/brief/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const DailyGrowthBriefCard: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const [brief, setBrief] = useState<DailyGrowthBriefOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const loadBrief = async () => {
    setIsLoading(true);
    try {
      const existing = await DailyBriefService.getTodayBrief(currentWorkspace.id);
      if (existing && existing.raw_json) {
        setBrief(existing.raw_json as unknown as DailyGrowthBriefOutput);
      } else {
        // Auto generate brief for today if none exists yet
        const generated = await DailyBriefService.generateDailyBrief(currentWorkspace.id);
        setBrief(generated);
      }
    } catch (err) {
      console.error("Failed to load daily brief:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBrief();
  }, [currentWorkspace.id]);

  const handleRegenerate = async () => {
    setIsGenerating(true);
    toast.info("Synthesizing fresh Daily Growth Brief...");
    try {
      const fresh = await DailyBriefService.generateDailyBrief(currentWorkspace.id);
      setBrief(fresh);
      toast.success("Today's Growth Brief updated!");
    } catch {
      toast.error("Failed to regenerate brief.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 border-[#E5E0D6] bg-[#FCFAF7] space-y-3">
        <div className="flex items-center space-x-2 text-primary font-mono text-xs font-bold">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>Synthesizing Today&apos;s Growth Brief...</span>
        </div>
      </Card>
    );
  }

  if (!brief) return null;

  return (
    <Card className="p-6 md:p-8 rounded-[22px] border-[#E5E0D6] bg-[#FCFAF7] shadow-md space-y-6 select-none">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E0D6] pb-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              DAILY GROWTH BRIEF / {new Date().toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}
            </span>
            <span className="inline-flex items-center space-x-1 font-mono text-[10px] text-[#1E4620] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0]">
              <ShieldCheck className="h-3 w-3 text-[#2D6A4F]" />
              <span>SUPABASE SYNCED</span>
            </span>
          </div>
          <h2 className="font-sans font-bold text-xl md:text-2xl text-foreground tracking-tight">
            Today&apos;s Executive Briefing
          </h2>
        </div>

        <Button
          onClick={handleRegenerate}
          disabled={isGenerating}
          variant="outline"
          className="h-9 px-4 rounded-xl font-mono text-xs border-[#E5E0D6] gap-1.5 shrink-0"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isGenerating ? "animate-spin" : ""}`} />
          <span>Regenerate Brief</span>
        </Button>
      </div>

      {/* 1. TODAY'S FOCUS */}
      <div className="p-4 rounded-2xl bg-[#000000] text-[#FFFFFF] space-y-1.5 shadow-sm">
        <span className="font-mono text-[10px] text-amber-300 uppercase tracking-widest font-bold flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5" /> TODAY&apos;S NORTH STAR FOCUS
        </span>
        <h3 className="font-sans font-bold text-base md:text-lg leading-snug">{brief.todaysFocus}</h3>
      </div>

      {/* 2 & 3: Opportunities & Risks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Top Opportunities */}
        <div className="p-5 rounded-2xl border border-[#E5E0D6] bg-background space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D6]">
            <span className="font-mono text-xs font-bold text-emerald-700 uppercase flex items-center gap-1.5">
              <Target className="h-4 w-4 text-emerald-600" />
              TOP OPPORTUNITIES
            </span>
            <Badge variant="outline" className="font-mono text-[9px] bg-emerald-500/10 text-emerald-700 border-emerald-500/20">
              High Leverage
            </Badge>
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground">
            {brief.topOpportunities.map((op, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-mono text-[10px] text-emerald-600 font-bold shrink-0 mt-0.5">0{idx + 1}.</span>
                <span>{op}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Active Risks */}
        <div className="p-5 rounded-2xl border border-[#E5E0D6] bg-background space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D6]">
            <span className="font-mono text-xs font-bold text-amber-700 uppercase flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              RISKS & FRICTION VECTORS
            </span>
            <Badge variant="outline" className="font-mono text-[9px] bg-amber-500/10 text-amber-700 border-amber-500/20">
              Active Warning
            </Badge>
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground">
            {brief.risks.map((rk, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-mono text-[10px] text-amber-600 font-bold shrink-0 mt-0.5">!</span>
                <span>{rk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 4 & 5: Tasks Due & Research Completed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Tasks Due Today */}
        <div className="p-5 rounded-2xl border border-[#E5E0D6] bg-background space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D6]">
            <span className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-1.5">
              <CheckSquare className="h-4 w-4 text-primary" />
              TASKS DUE TODAY
            </span>
            <Badge variant="secondary" className="font-mono text-[9px]">{brief.tasksDue.length} Items</Badge>
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground">
            {brief.tasksDue.map((tsk, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <input type="checkbox" readOnly checked className="h-3.5 w-3.5 rounded border-[#E5E0D6] text-primary" />
                <span className="truncate">{tsk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Research Completed */}
        <div className="p-5 rounded-2xl border border-[#E5E0D6] bg-background space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D6]">
            <span className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-1.5">
              <FileSearch className="h-4 w-4 text-primary" />
              RESEARCH COMPLETED
            </span>
            <Badge variant="secondary" className="font-mono text-[9px]">Verified Reports</Badge>
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground">
            {brief.researchCompleted.map((rs, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span className="truncate">{rs}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 6. CAMPAIGN PERFORMANCE TELEMETRY */}
      <div className="p-5 rounded-2xl border border-[#E5E0D6] bg-secondary/50 space-y-3">
        <span className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-1.5">
          <TrendingUp className="h-4 w-4 text-primary" />
          CAMPAIGN PERFORMANCE TELEMETRY
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="p-3 rounded-xl bg-background border border-[#E5E0D6] space-y-0.5">
            <span className="font-mono text-[10px] text-muted-foreground font-bold uppercase">OUTBOUND CTR</span>
            <p className="font-display font-bold text-base text-foreground">{brief.campaignPerformance.clickThroughRate}</p>
          </div>
          <div className="p-3 rounded-xl bg-background border border-[#E5E0D6] space-y-0.5">
            <span className="font-mono text-[10px] text-muted-foreground font-bold uppercase">LEADS GENERATED</span>
            <p className="font-display font-bold text-base text-emerald-600">+{brief.campaignPerformance.leadsGenerated}</p>
          </div>
          <div className="p-3 rounded-xl bg-background border border-[#E5E0D6] space-y-0.5">
            <span className="font-mono text-[10px] text-muted-foreground font-bold uppercase">PIPELINE ADDED</span>
            <p className="font-display font-bold text-base text-foreground">{brief.campaignPerformance.pipelineAdded}</p>
          </div>
        </div>
      </div>

      {/* 7. RECOMMENDED ACTIONS */}
      <div className="p-5 rounded-2xl border border-[#E5E0D6] bg-background space-y-3">
        <span className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-primary" />
          RECOMMENDED ACTIONS TODAY
        </span>
        <div className="space-y-2">
          {brief.recommendedActions.map((act, idx) => (
            <div key={idx} className="p-3 rounded-xl border border-[#E5E0D6] bg-secondary/30 flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">{act}</span>
              <ArrowRight className="h-3.5 w-3.5 text-primary shrink-0 ml-2" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
