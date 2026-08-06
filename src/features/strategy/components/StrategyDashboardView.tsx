"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  FileText,
  Target,
  UserCheck,
  MessageSquare,
  Compass,
  Share2,
  MapPin,
  BarChart3,
  RefreshCw,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Layers,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { useWorkspace } from "@/hooks/useWorkspace";
import { GrowthStrategyService } from "@/core/agents/growth-strategy/strategy-service";
import { GrowthStrategyAgent } from "@/core/agents/growth-strategy/agent";
import { GrowthStrategyOutput, GrowthStrategyRow } from "@/core/agents/growth-strategy/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const StrategyDashboardView: React.FC = () => {
  const { currentWorkspace } = useWorkspace();

  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [strategyRow, setStrategyRow] = useState<GrowthStrategyRow | null>(null);
  const [strategyData, setStrategyData] = useState<GrowthStrategyOutput | null>(null);

  // Load existing strategy from Supabase
  const loadStrategy = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await GrowthStrategyService.getStrategy(currentWorkspace.id);
      if (res.error) {
        throw res.error;
      }

      if (res.data) {
        setStrategyRow(res.data);
        if (res.data.raw_json) {
          setStrategyData(res.data.raw_json as unknown as GrowthStrategyOutput);
        }
      } else {
        setStrategyRow(null);
        setStrategyData(null);
      }
    } catch (err) {
      console.error("Failed to load growth strategy:", err);
      setError(err instanceof Error ? err.message : "Failed to load strategy database.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStrategy();
  }, [currentWorkspace.id]);

  // Handle Strategy Generation / Regeneration
  const handleGenerateStrategy = async () => {
    setIsGenerating(true);
    setError(null);
    toast.info("Growth Strategy Agent is synthesizing intelligence...");

    try {
      const agent = new GrowthStrategyAgent();
      let output: GrowthStrategyOutput;

      if (strategyRow) {
        // Regenerate existing strategy
        output = await agent.regenerateStrategy({
          workspaceId: currentWorkspace.id,
          companyId: strategyRow.company_id || "comp-default",
          companyName: currentWorkspace.name,
          website: currentWorkspace.domain || "eminarc.com",
          currentStrategyId: strategyRow.id,
          currentVersion: strategyRow.version || 1,
        });
        toast.success(`Strategy regenerated! Incremented to version ${strategyRow.version + 1}.`);
      } else {
        // Generate new strategy
        output = await agent.generateStrategy({
          workspaceId: currentWorkspace.id,
          companyId: "comp-default",
          companyName: currentWorkspace.name,
          website: currentWorkspace.domain || "eminarc.com",
        });
        toast.success("New 12-section Growth Strategy generated & persisted in Supabase!");
      }

      await loadStrategy();
    } catch (err) {
      console.error("Strategy generation error:", err);
      setError(err instanceof Error ? err.message : "Failed to generate Growth Strategy.");
      toast.error("Generation failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 select-none max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="rounded-[18px] bg-[#FCFAF7] border border-[#E5E0D6] p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-1 rounded-full">
              STRATEGY DASHBOARD / {currentWorkspace.name.toUpperCase()}
            </span>
            <span className="inline-flex items-center space-x-1 font-mono text-[10px] uppercase tracking-wider text-[#1E4620] bg-[#EDF6F0] px-2.5 py-1 rounded-full border border-[#C8E4D0]">
              <ShieldCheck className="h-3 w-3 text-[#2D6A4F]" />
              <span>SUPABASE STRATEGY DB CONNECTED</span>
            </span>
          </div>
          <h1 className="font-sans font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#111111]">
            Strategic Growth Playbook
          </h1>
          <p className="mt-1 text-sm text-[#52525B]">
            Ingests Founder Research, Company Profile, and Workspace Memory to synthesize
            positioning and execution roadmaps.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {strategyRow && (
            <Badge
              variant="outline"
              className="font-mono text-xs px-3 py-1.5 bg-background border-[#E5E0D6]"
            >
              Version v{strategyRow.version}
            </Badge>
          )}

          <Button
            onClick={handleGenerateStrategy}
            disabled={isGenerating || isLoading}
            className="h-11 px-6 rounded-xl font-bold bg-[#000000] text-[#FFFFFF] hover:bg-[#222222] transition-colors gap-2 cursor-pointer shadow-md"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin text-[#FFFFFF]" />
                <span>Synthesizing...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-amber-300" />
                <span>{strategyData ? "Regenerate Strategy" : "Generate Strategy"}</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 1. LOADING STATE */}
      {isLoading && (
        <Card className="p-12 border-[#E5E0D6] bg-card text-center space-y-4">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto" />
          <h3 className="font-display font-bold text-lg text-foreground">
            Loading Growth Strategy Database...
          </h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Retrieving persisted strategy playbooks, buyer personas, positioning, and 30/60/90 plans
            from Supabase.
          </p>
        </Card>
      )}

      {/* 2. ERROR STATE */}
      {error && !isLoading && (
        <Card className="p-8 border-destructive/20 bg-destructive/5 text-center space-y-4">
          <AlertCircle className="h-8 w-8 text-destructive mx-auto" />
          <h3 className="font-display font-bold text-lg text-foreground">
            Strategy Database Connection Issue
          </h3>
          <p className="text-xs text-destructive max-w-md mx-auto">{error}</p>
          <Button
            onClick={loadStrategy}
            variant="outline"
            className="h-10 px-6 rounded-xl font-mono text-xs"
          >
            Retry Connection
          </Button>
        </Card>
      )}

      {/* 3. EMPTY STATE */}
      {!isLoading && !error && !strategyData && (
        <Card className="p-12 border-[#E5E0D6] bg-card text-center space-y-6">
          <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto text-primary">
            <Layers className="h-8 w-8" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="font-display font-bold text-xl text-foreground">
              No Active Growth Strategy Found
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Trigger the Growth Strategy Agent to analyze your company research report and
              workspace context to build a complete 12-section strategic playbook.
            </p>
          </div>
          <Button
            onClick={handleGenerateStrategy}
            disabled={isGenerating}
            className="h-12 px-8 rounded-xl font-bold bg-[#000000] text-[#FFFFFF] hover:bg-[#222222] transition-colors gap-2 cursor-pointer shadow-md"
          >
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span>Generate First Strategy</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </Card>
      )}

      {/* 4. SUCCESS STATE — Full 9 Requested Sections */}
      {!isLoading && !error && strategyData && (
        <div className="space-y-8 animate-in fade-in duration-500">
          {/* SECTION 1: EXECUTIVE SUMMARY */}
          <Card className="p-6 md:p-8 border-[#E5E0D6] bg-card space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
              <span className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                01. EXECUTIVE SUMMARY
              </span>
              <Badge variant="secondary" className="font-mono text-[10px]">
                McKinsey-Grade Teardown
              </Badge>
            </div>
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight">
              {strategyData.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {strategyData.executiveSummary}
            </p>
          </Card>

          {/* SECTION 2: ICP */}
          <Card className="p-6 md:p-8 border-[#E5E0D6] bg-card space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
              <span className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                02. IDEAL CUSTOMER PROFILE (ICP)
              </span>
              <Badge
                variant="outline"
                className="font-mono text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
              >
                Target Lock
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-secondary/50 border border-[#E5E0D6] space-y-1">
                <span className="font-mono text-[10px] text-muted-foreground uppercase font-bold">
                  PRIMARY TARGET
                </span>
                <p className="font-bold text-xs text-foreground">
                  {strategyData.icp.primaryTarget}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 border border-[#E5E0D6] space-y-1">
                <span className="font-mono text-[10px] text-muted-foreground uppercase font-bold">
                  COMPANY SIZE TIER
                </span>
                <p className="font-bold text-xs text-foreground">
                  {strategyData.icp.companySizeTier}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 border border-[#E5E0D6] space-y-1">
                <span className="font-mono text-[10px] text-muted-foreground uppercase font-bold">
                  REVENUE TIER
                </span>
                <p className="font-bold text-xs text-foreground">{strategyData.icp.revenueTier}</p>
              </div>
              <div className="p-4 rounded-xl bg-secondary/50 border border-[#E5E0D6] space-y-1">
                <span className="font-mono text-[10px] text-muted-foreground uppercase font-bold">
                  DECISION MAKERS
                </span>
                <p className="font-bold text-xs text-foreground">
                  {strategyData.icp.decisionMakerTitles.join(", ")}
                </p>
              </div>
            </div>
          </Card>

          {/* SECTION 3: PERSONAS */}
          <Card className="p-6 md:p-8 border-[#E5E0D6] bg-card space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
              <span className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-primary" />
                03. BUYER PERSONAS
              </span>
              <Badge variant="secondary" className="font-mono text-[10px]">
                {strategyData.buyerPersonas.length} Archetypes Enriched
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strategyData.buyerPersonas.map((persona, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl border border-[#E5E0D6] bg-background space-y-3"
                >
                  <h3 className="font-display font-bold text-base text-foreground">
                    {persona.roleTitle}
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div>
                      <strong className="text-primary font-mono text-[11px] block">
                        KEY MOTIVATIONS:
                      </strong>
                      <p className="text-muted-foreground">{persona.keyMotivations.join(", ")}</p>
                    </div>
                    <div>
                      <strong className="text-emerald-600 font-mono text-[11px] block">
                        BUYING TRIGGERS:
                      </strong>
                      <p className="text-muted-foreground">{persona.buyingTriggers.join(", ")}</p>
                    </div>
                    <div>
                      <strong className="text-destructive font-mono text-[11px] block">
                        OBJECTIONS:
                      </strong>
                      <p className="text-muted-foreground">{persona.objections.join(", ")}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* SECTION 4: MESSAGING */}
          <Card className="p-6 md:p-8 border-[#E5E0D6] bg-card space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
              <span className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                04. MESSAGING PILLARS & VALUE PROPOSITION
              </span>
              <Badge variant="secondary" className="font-mono text-[10px]">
                Core Value Drivers
              </Badge>
            </div>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
              <span className="font-mono text-[10px] text-amber-700 uppercase font-bold">
                PRIMARY VALUE PROPOSITION
              </span>
              <h4 className="font-display font-bold text-base text-foreground">
                {strategyData.valueProposition.headline}
              </h4>
              <p className="text-xs text-muted-foreground">
                {strategyData.valueProposition.primaryOutcome} (
                {strategyData.valueProposition.roiEstimate})
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {strategyData.messagingPillars.map((pillar, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-[#E5E0D6] bg-background space-y-2"
                >
                  <h4 className="font-bold text-sm text-foreground">{pillar.pillarName}</h4>
                  <p className="text-xs text-muted-foreground">{pillar.coreMessage}</p>
                  <div className="pt-2 flex flex-wrap gap-1">
                    {pillar.proofPoints.map((proof, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono bg-secondary px-2 py-0.5 rounded text-foreground"
                      >
                        ✓ {proof}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* SECTION 5: POSITIONING */}
          <Card className="p-6 md:p-8 border-[#E5E0D6] bg-card space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
              <span className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-2">
                <Compass className="h-4 w-4 text-primary" />
                05. MARKET POSITIONING
              </span>
              <Badge variant="secondary" className="font-mono text-[10px]">
                Category Creation
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-muted-foreground font-bold uppercase">
                    CATEGORY NAME
                  </span>
                  <h4 className="font-display font-bold text-lg text-foreground">
                    {strategyData.positioning.categoryName}
                  </h4>
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-muted-foreground font-bold uppercase">
                    TAGLINE
                  </span>
                  <p className="font-semibold text-xs text-primary font-mono">
                    &quot;{strategyData.positioning.tagline}&quot;
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-muted-foreground font-bold uppercase">
                    CORE DIFFERENTIATION
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {strategyData.positioning.coreDifferentiation}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-[10px] text-muted-foreground font-bold uppercase">
                  COMPETITOR POSITIONING GAPS
                </span>
                {strategyData.competitorPositioning.map((comp, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl border border-[#E5E0D6] bg-background text-xs space-y-1"
                  >
                    <p className="font-bold text-foreground">{comp.competitorName}</p>
                    <p className="text-muted-foreground text-[11px]">
                      <strong>Their Position:</strong> {comp.theirPositioning}
                    </p>
                    <p className="text-emerald-600 font-semibold text-[11px]">
                      <strong>Our Advantage:</strong> {comp.ourAdvantage}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* SECTION 6: CHANNELS */}
          <Card className="p-6 md:p-8 border-[#E5E0D6] bg-card space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
              <span className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-2">
                <Share2 className="h-4 w-4 text-primary" />
                06. CHANNEL DISTRIBUTION STRATEGY
              </span>
              <Badge variant="secondary" className="font-mono text-[10px]">
                Omnichannel Matrix
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {strategyData.channelStrategy.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-[#E5E0D6] bg-background space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-foreground">{item.channelName}</h4>
                    <span className="font-mono text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">
                      {item.priority} Priority
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <strong>Target Metrics:</strong> {item.targetMetrics}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* SECTION 7: ROADMAP */}
          <Card className="p-6 md:p-8 border-[#E5E0D6] bg-card space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
              <span className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                07. GROWTH ROADMAP & 30 / 60 / 90 DAY PLAN
              </span>
              <Badge variant="secondary" className="font-mono text-[10px]">
                Execution Milestones
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl border border-[#E5E0D6] bg-background space-y-3">
                <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-2">
                  <span className="font-mono text-xs font-bold text-primary">DAYS 1 – 30</span>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    FOUNDATION
                  </Badge>
                </div>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {strategyData.plan306090.days30.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl border border-[#E5E0D6] bg-background space-y-3">
                <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-2">
                  <span className="font-mono text-xs font-bold text-emerald-600">DAYS 31 – 60</span>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    OPTIMIZATION
                  </Badge>
                </div>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {strategyData.plan306090.days60.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl border border-[#E5E0D6] bg-background space-y-3">
                <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-2">
                  <span className="font-mono text-xs font-bold text-amber-600">DAYS 61 – 90</span>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    SCALE
                  </Badge>
                </div>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {strategyData.plan306090.days90.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* SECTION 8: KPIs */}
          <Card className="p-6 md:p-8 border-[#E5E0D6] bg-card space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
              <span className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                08. TARGET SUCCESS METRICS & KPIS
              </span>
              <Badge variant="secondary" className="font-mono text-[10px]">
                Target Benchmarks
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {strategyData.successMetrics.map((kpi, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-[#E5E0D6] bg-background space-y-1"
                >
                  <span className="font-mono text-[10px] text-muted-foreground uppercase font-bold">
                    {kpi.metricName}
                  </span>
                  <p className="font-display font-bold text-lg text-foreground">
                    {kpi.targetBenchmark}
                  </p>
                  <span className="text-[10px] font-mono text-emerald-600 font-semibold block">
                    Frequency: {kpi.measurementFrequency}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* SECTION 9: REGENERATE STRATEGY FOOTER ACTION */}
          <Card className="p-6 border-[#E5E0D6] bg-[#FCFAF7] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold text-sm text-foreground flex items-center gap-2 justify-center sm:justify-start">
                <RefreshCw className="h-4 w-4 text-primary" />
                09. REGENERATE STRATEGY PLAYBOOK
              </h4>
              <p className="text-xs text-muted-foreground">
                Re-run intelligence synthesis against updated research reports and fresh workspace
                context.
              </p>
            </div>
            <Button
              onClick={handleGenerateStrategy}
              disabled={isGenerating}
              className="h-11 px-6 rounded-xl font-bold bg-[#000000] text-[#FFFFFF] hover:bg-[#222222] transition-colors gap-2 cursor-pointer shadow-md shrink-0"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-[#FFFFFF]" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>Regenerate Strategy v{strategyRow ? strategyRow.version + 1 : 2}</span>
                </>
              )}
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};
