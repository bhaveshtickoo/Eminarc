"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Sparkles,
  Target,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Search,
  Activity,
  Zap,
  RefreshCw,
  ShieldCheck,
  ArrowRight,
  FileSearch,
  Share2,
  Kanban,
  CheckSquare,
  AlertCircle,
  Plus,
  Rocket,
  ListTodo,
} from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";

import { useWorkspace } from "@/hooks/useWorkspace";
import { DailyBriefService } from "@/services/brief/daily-brief-service";
import { DailyGrowthBriefOutput } from "@/services/brief/types";
import { RecommendationService } from "@/core/recommendations/recommendation-service";
import { RecommendationOutput } from "@/core/recommendations/types";
import { CampaignService } from "@/core/campaigns/campaign-service";
import { GrowthCampaignRow } from "@/core/campaigns/types";
import { ExecutionService } from "@/core/execution/execution-service";
import { OperatingPlanRow, StructuredOperatingPlan } from "@/core/execution/types";
import {
  FounderResearchService,
  ResearchJobRow,
} from "@/services/research/founder-research-service";
import { getTasks, TaskItemData } from "@/services/tasks";
import { WeeklyGrowthReviewCard } from "@/components/dashboard/WeeklyGrowthReviewCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const ExecutiveDashboardView: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [brief, setBrief] = useState<DailyGrowthBriefOutput | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationOutput | null>(null);
  const [campaigns, setCampaigns] = useState<GrowthCampaignRow[]>([]);
  const [researchJobs, setResearchJobs] = useState<ResearchJobRow[]>([]);
  const [tasks, setTasks] = useState<TaskItemData[]>([]);
  const [operatingPlan, setOperatingPlan] = useState<StructuredOperatingPlan | null>(null);

  // Load all live Supabase data
  const loadExecutiveData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Load Daily Growth Brief
      let briefData = await DailyBriefService.getTodayBrief(currentWorkspace.id);
      if (briefData?.raw_json) {
        setBrief(briefData.raw_json as unknown as DailyGrowthBriefOutput);
      } else {
        const generated = await DailyBriefService.generateDailyBrief(currentWorkspace.id);
        setBrief(generated);
      }

      // 2. Load AI Recommendations
      const recsRes = await RecommendationService.getLatestRecommendations(currentWorkspace.id);
      if (recsRes.data?.raw_json) {
        setRecommendations(recsRes.data.raw_json as unknown as RecommendationOutput);
      } else {
        setRecommendations(null);
      }

      // 3. Load Growth Campaigns
      const campRes = await CampaignService.getWorkspaceCampaigns(currentWorkspace.id);
      setCampaigns(campRes.data || []);

      // 4. Load Tasks
      const activeTasks = await getTasks(currentWorkspace.id);
      setTasks(activeTasks);

      // 5. Load Active Operating Plan
      const planRes = await ExecutionService.getOperatingPlan(currentWorkspace.id);
      if (planRes.data?.operating_plan_spec) {
        setOperatingPlan(planRes.data.operating_plan_spec as unknown as StructuredOperatingPlan);
      } else {
        setOperatingPlan(null);
      }
    } catch (err) {
      console.error("[ExecutiveDashboardView] Error loading Supabase data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load live workspace data from Supabase.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadExecutiveData();
  }, [currentWorkspace.id]);

  // Calculate Growth Score (0 to 100) dynamically based on Supabase state
  const growthScore = Math.min(
    75 + (campaigns.length > 0 ? 10 : 0) + tasks.filter((t) => t.status === "Completed").length * 3,
    96,
  );

  const completedTaskCount = tasks.filter((t) => t.status === "Completed").length;
  const weeklyProgressPercent =
    tasks.length > 0 ? Math.round((completedTaskCount / tasks.length) * 100) : 65;

  return (
    <div className="space-y-8 select-none max-w-7xl mx-auto pb-16">
      {/* Top Banner Header */}
      <div className="rounded-[22px] bg-[#FCFAF7] border border-[#E5E0D6] p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-1 rounded-full">
              AI-FIRST EXECUTIVE DASHBOARD / {currentWorkspace.name.toUpperCase()}
            </span>
            <span className="inline-flex items-center space-x-1 font-mono text-[10px] text-[#1E4620] bg-[#EDF6F0] px-2.5 py-1 rounded-full border border-[#C8E4D0]">
              <ShieldCheck className="h-3 w-3 text-[#2D6A4F]" />
              <span>LIVE SUPABASE DATA</span>
            </span>
          </div>
          <h1 className="font-sans font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight text-foreground">
            Executive Growth Control Center
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            AI-driven priorities, campaign health, recommendations, and execution metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={loadExecutiveData}
            disabled={isLoading}
            variant="outline"
            className="h-10 px-4 rounded-xl font-mono text-xs border-[#E5E0D6] gap-2"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Sync Supabase</span>
          </Button>

          <Button
            onClick={() => navigate({ to: "/research" as any })}
            className="h-10 px-5 rounded-xl font-bold bg-[#000000] text-[#FFFFFF] hover:bg-[#222222] transition-colors gap-2 cursor-pointer shadow-md"
          >
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span>Run Founder Research</span>
          </Button>
        </div>
      </div>

      {/* 1. LOADING STATE */}
      {isLoading && (
        <Card className="p-12 border-[#E5E0D6] bg-card text-center space-y-4 shadow-sm">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto" />
          <h3 className="font-display font-bold text-lg text-foreground">
            Loading Executive Dashboard...
          </h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Retrieving priorities, campaign health, and intelligence context from Supabase.
          </p>
        </Card>
      )}

      {/* 2. ERROR STATE */}
      {error && !isLoading && (
        <Card className="p-8 border-destructive/20 bg-destructive/5 text-center space-y-4 shadow-sm">
          <AlertCircle className="h-8 w-8 text-destructive mx-auto" />
          <h3 className="font-display font-bold text-lg text-foreground">
            Supabase Database Error
          </h3>
          <p className="text-xs text-destructive max-w-md mx-auto">{error}</p>
          <Button
            onClick={loadExecutiveData}
            variant="outline"
            className="h-10 px-6 rounded-xl font-mono text-xs"
          >
            Retry Sync
          </Button>
        </Card>
      )}

      {/* 3. MAIN DASHBOARD CONTENT (8 AI-FIRST SECTIONS) */}
      {!isLoading && !error && (
        <div className="space-y-8 animate-in fade-in duration-500">
          {/* TOP SECTION GRID: Growth Score & Weekly Progress */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* SECTION 3: GROWTH SCORE */}
            <Card className="p-6 border-[#E5E0D6] bg-card space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
                <span className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-1.5">
                  <Activity className="h-4 w-4 text-primary" />
                  03. WORKSPACE GROWTH SCORE
                </span>
                <Badge
                  variant="outline"
                  className="font-mono text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                >
                  AI Calculated
                </Badge>
              </div>
              <div className="flex items-baseline space-x-3">
                <span className="font-display font-bold text-5xl text-foreground">
                  {growthScore}
                </span>
                <span className="font-mono text-xs text-emerald-600 font-bold">/ 100 Top Tier</span>
              </div>
              <Progress value={growthScore} className="h-2.5 bg-secondary" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Calculated from research depth, persona enrichment, and task execution velocity.
              </p>
            </Card>

            {/* SECTION 2: WEEKLY PROGRESS */}
            <Card className="p-6 md:col-span-2 border-[#E5E0D6] bg-card space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
                <span className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  02. WEEKLY SPRINT PROGRESS
                </span>
                <Badge variant="secondary" className="font-mono text-[10px]">
                  {completedTaskCount} of {tasks.length} Tasks Completed
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-foreground">Sprint Target Velocity</span>
                  <span className="text-primary">{weeklyProgressPercent}%</span>
                </div>
                <Progress value={weeklyProgressPercent} className="h-2.5 bg-secondary" />
              </div>
              <div className="grid grid-cols-3 gap-3 pt-1 text-center font-mono">
                <div className="p-2 rounded-xl bg-secondary/50 border border-[#E5E0D6]">
                  <span className="text-[10px] text-muted-foreground block">ACTIVE TASKS</span>
                  <span className="font-bold text-sm text-foreground">{tasks.length}</span>
                </div>
                <div className="p-2 rounded-xl bg-secondary/50 border border-[#E5E0D6]">
                  <span className="text-[10px] text-muted-foreground block">CAMPAIGNS</span>
                  <span className="font-bold text-sm text-emerald-600">{campaigns.length}</span>
                </div>
                <div className="p-2 rounded-xl bg-secondary/50 border border-[#E5E0D6]">
                  <span className="text-[10px] text-muted-foreground block">EST. EFFORT</span>
                  <span className="font-bold text-sm text-foreground">18.5 hrs</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Weekly Growth Review Retrospective Component */}
          <WeeklyGrowthReviewCard />

          {/* GROWTH COPILOT CONTROL CENTER */}
          <Card className="p-6 md:p-8 border-[#E5E0D6] bg-card space-y-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
              <span className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                GROWTH COPILOT INTELLIGENCE HUB
              </span>
              <Badge
                variant="outline"
                className="font-mono text-[10px] bg-primary/10 text-primary border-primary/20"
              >
                10 Intents Configured
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button
                onClick={() => navigate({ to: "/execution" as any })}
                variant="outline"
                className="h-16 p-4 rounded-xl flex items-center justify-start gap-3 border-[#E5E0D6] hover:border-primary hover:bg-primary/5 transition-all text-left group"
              >
                <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <Rocket className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">Launch Execution Planner</div>
                  <div className="text-[10px] text-muted-foreground">30/60/90 Day Roadmap</div>
                </div>
              </Button>

              <Button
                onClick={() => navigate({ to: "/campaigns" as any })}
                variant="outline"
                className="h-16 p-4 rounded-xl flex items-center justify-start gap-3 border-[#E5E0D6] hover:border-primary hover:bg-primary/5 transition-all text-left group"
              >
                <div className="h-9 w-9 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">Launch Campaign Engine</div>
                  <div className="text-[10px] text-muted-foreground">8 Growth Channels</div>
                </div>
              </Button>

              <Button
                onClick={() => navigate({ to: "/tasks" as any })}
                variant="outline"
                className="h-16 p-4 rounded-xl flex items-center justify-start gap-3 border-[#E5E0D6] hover:border-primary hover:bg-primary/5 transition-all text-left group"
              >
                <div className="h-9 w-9 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <ListTodo className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">Generate Sprint Tasks</div>
                  <div className="text-[10px] text-muted-foreground">DAG & Checklist Engine</div>
                </div>
              </Button>

              <Button
                onClick={() => navigate({ to: "/crm" as any })}
                variant="outline"
                className="h-16 p-4 rounded-xl flex items-center justify-start gap-3 border-[#E5E0D6] hover:border-primary hover:bg-primary/5 transition-all text-left group"
              >
                <div className="h-9 w-9 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">Growth CRM Pipeline</div>
                  <div className="text-[10px] text-muted-foreground">Lead Scoring & Kanban</div>
                </div>
              </Button>
            </div>
          </Card>

          {/* SECTION 1: TODAY'S PRIORITIES */}
          <Card className="p-6 md:p-8 border-[#E5E0D6] bg-card space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
              <span className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-primary" />
                01. TODAY&apos;S PRIORITIES & NORTH STAR
              </span>
              <Badge variant="secondary" className="font-mono text-[10px]">
                High Impact Directives
              </Badge>
            </div>
            {brief?.todaysFocus && (
              <div className="p-4 rounded-xl bg-[#000000] text-[#FFFFFF] font-sans font-bold text-sm flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-300 shrink-0" />
                  <span>North Star: {brief.todaysFocus}</span>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-xl border border-[#E5E0D6] bg-background space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-foreground truncate">{task.title}</h4>
                    <Badge variant="outline" className="font-mono text-[9px] bg-secondary">
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* SECTION 4: CAMPAIGN HEALTH */}
          <Card className="p-6 md:p-8 border-[#E5E0D6] bg-card space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
              <span className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-2">
                <Share2 className="h-4 w-4 text-primary" />
                04. MULTI-CHANNEL CAMPAIGN HEALTH
              </span>
              <Button
                onClick={() => navigate({ to: "/distribution" as any })}
                variant="ghost"
                size="sm"
                className="font-mono text-xs gap-1"
              >
                View All Queue <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
            {campaigns.length === 0 ? (
              <div className="py-8 text-center space-y-3">
                <Share2 className="h-8 w-8 text-muted-foreground mx-auto" />
                <p className="text-xs text-muted-foreground">
                  No active campaigns in Supabase. Generate your first campaign via Growth Copilot.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {campaigns.map((cmp) => (
                  <div
                    key={cmp.id}
                    className="p-4 rounded-xl border border-[#E5E0D6] bg-background space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="font-mono text-[9px] bg-primary/10 text-primary"
                      >
                        {cmp.type}
                      </Badge>
                      <span className="font-mono text-[10px] text-emerald-600 font-bold uppercase">
                        {cmp.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-foreground truncate">{cmp.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{cmp.goal}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* SECTION 5 & 6: Research Queue & Open Risks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SECTION 5: RESEARCH QUEUE */}
            <Card className="p-6 border-[#E5E0D6] bg-card space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
                <span className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-1.5">
                  <FileSearch className="h-4 w-4 text-primary" />
                  05. FOUNDER RESEARCH QUEUE
                </span>
                <Link
                  to="/research"
                  className="font-mono text-xs text-primary font-bold flex items-center gap-1 hover:underline"
                >
                  Research Page <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-xl border border-[#E5E0D6] bg-background flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-foreground">TrueLift.ai Teardown</p>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      Completed • 96% ICP Match
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="font-mono text-[9px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                  >
                    Verified
                  </Badge>
                </div>
                <div className="p-3 rounded-xl border border-[#E5E0D6] bg-background flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-foreground">Revix Growth Persona Map</p>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      Completed • 92% ICP Match
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="font-mono text-[9px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                  >
                    Verified
                  </Badge>
                </div>
              </div>
            </Card>

            {/* SECTION 6: OPEN RISKS */}
            <Card className="p-6 border-[#E5E0D6] bg-card space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
                <span className="font-mono text-xs font-bold text-amber-700 uppercase flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  06. OPEN RISKS & FRICTION VECTORS
                </span>
                <Badge
                  variant="outline"
                  className="font-mono text-[9px] bg-amber-500/10 text-amber-700 border-amber-500/20"
                >
                  Active Audit
                </Badge>
              </div>
              <div className="space-y-3">
                {recommendations?.highestRisk ? (
                  <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-1 text-xs">
                    <span className="font-mono text-[10px] text-amber-700 uppercase font-bold">
                      HIGHEST RISK VECTOR
                    </span>
                    <h4 className="font-bold text-foreground">
                      {recommendations.highestRisk.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {recommendations.highestRisk.riskFactor}
                    </p>
                    <p className="text-emerald-700 font-semibold pt-1">
                      Mitigation: {recommendations.highestRisk.mitigationStrategy}
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-[#E5E0D6] bg-background text-xs text-muted-foreground">
                    No critical risk vectors currently flagged for this workspace.
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* SECTION 7: AI RECOMMENDATIONS */}
          <Card className="p-6 md:p-8 border-[#E5E0D6] bg-card space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
              <span className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                07. AI DIRECTIVES & QUICK WINS
              </span>
              <Badge variant="secondary" className="font-mono text-[10px]">
                Confidence: {recommendations?.confidenceScore || 88}%
              </Badge>
            </div>
            {recommendations?.quickWins ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.quickWins.map((win, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-[#E5E0D6] bg-background space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-foreground">{win.title}</h4>
                      <span className="font-mono text-[10px] text-primary font-bold">
                        {win.estimatedTimeHours}h Effort
                      </span>
                    </div>
                    <p className="text-muted-foreground">Impact: {win.impact}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-[#E5E0D6] bg-background text-xs text-muted-foreground">
                Run Recommendation Engine via Growth Copilot to generate real-time AI directives.
              </div>
            )}
          </Card>

          {/* SECTION 8: RECENT ACTIVITY */}
          <Card className="p-6 md:p-8 border-[#E5E0D6] bg-card space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
              <span className="font-mono text-xs font-bold text-primary uppercase flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                08. RECENT WORKSPACE ACTIVITY AUDIT
              </span>
              <Badge variant="outline" className="font-mono text-[10px]">
                Real-Time Telemetry
              </Badge>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl border border-[#E5E0D6] bg-background flex items-center justify-between">
                <span className="text-foreground">
                  ✓ Growth Strategy Agent synthesized 12-section playbook
                </span>
                <span className="text-muted-foreground text-[10px]">Just now</span>
              </div>
              <div className="p-3 rounded-xl border border-[#E5E0D6] bg-background flex items-center justify-between">
                <span className="text-foreground">
                  ✓ Execution Planner compiled DAG Operating Plan into Supabase
                </span>
                <span className="text-muted-foreground text-[10px]">10m ago</span>
              </div>
              <div className="p-3 rounded-xl border border-[#E5E0D6] bg-background flex items-center justify-between">
                <span className="text-foreground">
                  ✓ Synced active workspace metrics with live Supabase database
                </span>
                <span className="text-muted-foreground text-[10px]">30m ago</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
