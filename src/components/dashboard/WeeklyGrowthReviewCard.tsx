"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Trophy,
  AlertTriangle,
  Flame,
  HelpCircle,
  Share2,
  FileText,
  TrendingUp,
  ArrowRight,
  RefreshCw,
  Calendar,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { useWorkspace } from "@/hooks/useWorkspace";
import { WeeklyReviewService } from "@/services/review/weekly-review-service";
import { WeeklyGrowthReviewOutput } from "@/services/review/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const WeeklyGrowthReviewCard: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const [review, setReview] = useState<WeeklyGrowthReviewOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const loadReview = async () => {
    setIsLoading(true);
    try {
      const existing = await WeeklyReviewService.getLatestWeeklyReview(currentWorkspace.id);
      if (existing && existing.raw_json) {
        setReview(existing.raw_json as unknown as WeeklyGrowthReviewOutput);
      } else {
        const generated = await WeeklyReviewService.generateWeeklyReview(currentWorkspace.id);
        setReview(generated);
      }
    } catch (err) {
      console.error("Failed to load weekly review:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReview();
  }, [currentWorkspace.id]);

  const handleRegenerate = async () => {
    setIsGenerating(true);
    toast.info("Synthesizing fresh Weekly Retrospective Review...");
    try {
      const fresh = await WeeklyReviewService.generateWeeklyReview(currentWorkspace.id);
      setReview(fresh);
      toast.success("Weekly Growth Review updated!");
    } catch {
      toast.error("Failed to regenerate review.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 border-[#E5E0D6] bg-[#FCFAF7] space-y-3">
        <div className="flex items-center space-x-2 text-primary font-mono text-xs font-bold">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>Synthesizing Weekly Retrospective Review...</span>
        </div>
      </Card>
    );
  }

  if (!review) return null;

  return (
    <Card className="p-6 md:p-8 rounded-[22px] border-[#E5E0D6] bg-[#FCFAF7] shadow-md space-y-6 select-none">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E0D6] pb-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              WEEKLY RETROSPECTIVE REVIEW / {review.weekStartDate}
            </span>
            <span className="inline-flex items-center space-x-1 font-mono text-[10px] text-[#1E4620] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0]">
              <ShieldCheck className="h-3 w-3 text-[#2D6A4F]" />
              <span>SUPABASE STORED</span>
            </span>
          </div>
          <h2 className="font-sans font-bold text-xl md:text-2xl text-foreground tracking-tight">
            {review.title}
          </h2>
        </div>

        <Button
          onClick={handleRegenerate}
          disabled={isGenerating}
          variant="outline"
          className="h-9 px-4 rounded-xl font-mono text-xs border-[#E5E0D6] gap-1.5 shrink-0"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isGenerating ? "animate-spin" : ""}`} />
          <span>Regenerate Review</span>
        </Button>
      </div>

      {/* 1 & 2: WINS AND LOSSES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* WINS */}
        <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
            <span className="font-mono text-xs font-bold text-emerald-700 uppercase flex items-center gap-1.5">
              <Trophy className="h-4 w-4 text-emerald-600" />
              01. WINS ACHIEVED THIS WEEK
            </span>
            <Badge variant="outline" className="font-mono text-[9px] bg-emerald-500/10 text-emerald-700 border-emerald-500/20">
              High Impact
            </Badge>
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground">
            {review.wins.map((win, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-mono text-[10px] text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                <span>{win}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* LOSSES */}
        <div className="p-5 rounded-2xl border border-rose-500/30 bg-rose-500/5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-rose-500/20">
            <span className="font-mono text-xs font-bold text-rose-700 uppercase flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-rose-600" />
              02. LOSSES & FRICTION POINTS
            </span>
            <Badge variant="outline" className="font-mono text-[9px] bg-rose-500/10 text-rose-700 border-rose-500/20">
              Area to Correct
            </Badge>
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground">
            {review.losses.map((loss, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-mono text-[10px] text-rose-600 font-bold shrink-0 mt-0.5">✗</span>
                <span>{loss}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3 & 4: RISKS AND MISSED OPPORTUNITIES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* RISKS */}
        <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
            <span className="font-mono text-xs font-bold text-amber-700 uppercase flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-amber-600" />
              03. ACTIVE RISKS
            </span>
            <Badge variant="outline" className="font-mono text-[9px] bg-amber-500/10 text-amber-700 border-amber-500/20">
              Forward Concern
            </Badge>
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground">
            {review.risks.map((rk, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-mono text-[10px] text-amber-600 font-bold shrink-0 mt-0.5">!</span>
                <span>{rk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* MISSED OPPORTUNITIES */}
        <div className="p-5 rounded-2xl border border-sky-500/30 bg-sky-500/5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-sky-500/20">
            <span className="font-mono text-xs font-bold text-sky-700 uppercase flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-sky-600" />
              04. MISSED OPPORTUNITIES
            </span>
            <Badge variant="outline" className="font-mono text-[9px] bg-sky-500/10 text-sky-700 border-sky-500/20">
              TAM Gap
            </Badge>
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground">
            {review.missedOpportunities.map((op, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-mono text-[10px] text-sky-600 font-bold shrink-0 mt-0.5">?</span>
                <span>{op}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 5, 6, 7: CAMPAIGN SUMMARY, CONTENT PERFORMANCE, PIPELINE HEALTH */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* CAMPAIGN SUMMARY */}
        <div className="p-4 rounded-2xl border border-[#E5E0D6] bg-background space-y-2">
          <span className="font-mono text-[10px] font-bold text-primary uppercase flex items-center gap-1">
            <Share2 className="h-3.5 w-3.5 text-primary" /> 05. CAMPAIGN SUMMARY
          </span>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">Active Campaigns:</span><span className="font-bold text-foreground">{review.campaignSummary.activeCount}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Top Channel:</span><span className="font-bold text-foreground">{review.campaignSummary.topPerformingChannel}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Conversion Rate:</span><span className="font-bold text-emerald-600">{review.campaignSummary.conversionRate}</span></div>
          </div>
        </div>

        {/* CONTENT PERFORMANCE */}
        <div className="p-4 rounded-2xl border border-[#E5E0D6] bg-background space-y-2">
          <span className="font-mono text-[10px] font-bold text-primary uppercase flex items-center gap-1">
            <FileText className="h-3.5 w-3.5 text-primary" /> 06. CONTENT PERFORMANCE
          </span>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">Total Impressions:</span><span className="font-bold text-foreground">{review.contentPerformance.totalImpressions}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Engagement Rate:</span><span className="font-bold text-emerald-600">{review.contentPerformance.engagementRate}</span></div>
            <p className="text-[10px] text-muted-foreground truncate pt-0.5">Top: {review.contentPerformance.topPostTitle}</p>
          </div>
        </div>

        {/* PIPELINE HEALTH */}
        <div className="p-4 rounded-2xl border border-[#E5E0D6] bg-background space-y-2">
          <span className="font-mono text-[10px] font-bold text-primary uppercase flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5 text-primary" /> 07. PIPELINE HEALTH
          </span>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">Total Pipeline:</span><span className="font-bold text-foreground">{review.pipelineHealth.totalPipelineValue}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">New Deals:</span><span className="font-bold text-emerald-600">+{review.pipelineHealth.newQualifiedDeals}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Win Rate:</span><span className="font-bold text-foreground">{review.pipelineHealth.winRate}</span></div>
          </div>
        </div>
      </div>

      {/* 8. RECOMMENDED NEXT STEPS */}
      <div className="p-5 rounded-2xl border border-[#E5E0D6] bg-background space-y-3">
        <span className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-1.5">
          <Zap className="h-4 w-4 text-primary" />
          08. RECOMMENDED NEXT STEPS (NEXT 7 DAYS)
        </span>
        <div className="space-y-2">
          {review.recommendedNextSteps.map((step, idx) => (
            <div key={idx} className="p-3 rounded-xl border border-[#E5E0D6] bg-secondary/30 flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">{step}</span>
              <ArrowRight className="h-3.5 w-3.5 text-primary shrink-0 ml-2" />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
