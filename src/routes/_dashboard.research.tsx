import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Building2,
  User,
  Globe,
  Target,
  AlertTriangle,
  Zap,
  Cpu,
  Swords,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  FileText,
  Clock,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useWorkspace } from "@/hooks/useWorkspace";
import { FounderResearchService } from "@/services/research/founder-research-service";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_dashboard/research")({
  head: () => ({
    meta: [
      { title: "Founder Research Agent — Eminarc Growth OS" },
      {
        name: "description",
        content:
          "Autonomous Founder Research Agent — asynchronous background jobs with 3s polling, Supabase persistence, and 9-section report output.",
      },
    ],
  }),
  component: FounderResearchPage,
});

export interface GeneratedReport {
  company: {
    name: string;
    website: string;
    industry: string;
    companySize: string;
    description: string;
  };
  founder: {
    fullName: string;
    title: string;
    linkedinUrl: string;
    bio: string;
  };
  industry: string;
  icp: {
    primaryTarget: string;
    companySize: string;
    decisionMakers: string[];
    geographies: string[];
  };
  painPoints: Array<{ title: string; impact: string; severity: "High" | "Critical" }>;
  buyingSignals: Array<{ signal: string; intentLevel: "High" | "Medium"; source: string }>;
  techStack: string[];
  competitors: Array<{ name: string; gap: string }>;
  opportunityScore: number;
}

type JobStatus = "idle" | "queued" | "running" | "completed" | "failed";

function FounderResearchPage() {
  const { currentWorkspace } = useWorkspace();

  // Input states
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");

  // Job Execution & Polling States
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [activeCompanyId, setActiveCompanyId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<JobStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [isResearching, setIsResearching] = useState(false);

  // Completed Report State
  const [reportData, setReportData] = useState<GeneratedReport | null>(null);

  // Trigger Research Job
  const handleStartResearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = companyName.trim();
    const website = companyWebsite.trim();

    if (!name || !website) {
      toast.error("Please enter both Company Name and Company Website.");
      return;
    }

    setIsResearching(true);
    setJobStatus("queued");
    setProgress(0);
    setStatusMessage("Persisting target company & queueing job in Supabase...");
    setReportData(null);

    try {
      // 1. Save company to Supabase
      const compRes = await FounderResearchService.saveCompany({
        workspace_id: currentWorkspace.id,
        name: name,
        website: website,
        industry: "B2B SaaS / Growth Tech",
        company_size: "10–50 employees",
        description: `${name} is an innovative B2B organization operating in the software & intelligence ecosystem.`,
      });

      if (compRes.error || !compRes.data) {
        throw compRes.error || new Error("Failed to save company record to Supabase.");
      }

      const savedCompany = compRes.data;
      setActiveCompanyId(savedCompany.id);

      // 2. Queue Research Job in Supabase
      const jobRes = await FounderResearchService.startResearch(
        currentWorkspace.id,
        savedCompany.id,
      );

      if (jobRes.error || !jobRes.data) {
        throw jobRes.error || new Error("Failed to queue research job in Supabase.");
      }

      const newJobId = jobRes.data.id;
      setActiveJobId(newJobId);
      setStatusMessage("Job Queued in Supabase. Triggering async background worker...");

      // 3. Immediately launch non-blocking async background job processing
      FounderResearchService.processResearchJobAsync(
        newJobId,
        currentWorkspace.id,
        savedCompany.id,
        name,
        website,
      );

      toast.info(`Research job queued for ${name}! Polling status every 3s...`);
    } catch (err) {
      console.error("Job Trigger Error:", err);
      setIsResearching(false);
      setJobStatus("failed");
      toast.error(err instanceof Error ? err.message : "Failed to queue research job.");
    }
  };

  // Polling Effect (Polls Supabase every 3 seconds for activeJobId updates)
  useEffect(() => {
    if (!activeJobId || jobStatus === "completed" || jobStatus === "failed") {
      return;
    }

    const pollInterval = setInterval(async () => {
      const jobRes = await FounderResearchService.getJob(activeJobId);
      if (jobRes.data) {
        const currentStatus = jobRes.data.status as JobStatus;
        const currentProgress = jobRes.data.progress;

        setJobStatus(currentStatus);
        setProgress(currentProgress);

        if (currentStatus === "queued") {
          setStatusMessage("Queued — Waiting for background AI worker pickup...");
        } else if (currentStatus === "running") {
          setStatusMessage(
            `Running — Extracting persona, ICP & pain points (${currentProgress}%)...`,
          );
        } else if (currentStatus === "completed") {
          setStatusMessage("Completed — Persisted to Supabase `research_reports`!");
          setIsResearching(false);
          clearInterval(pollInterval);

          // Automatically fetch completed report from Supabase
          if (activeCompanyId) {
            const reportRes = await FounderResearchService.getReport(activeCompanyId);
            if (reportRes.data?.raw_json) {
              setReportData(reportRes.data.raw_json as any);
              toast.success("Research completed & results loaded automatically from Supabase!");
            }
          }
        } else if (currentStatus === "failed") {
          setStatusMessage(`Failed — ${jobRes.data.error || "Async research execution error."}`);
          setIsResearching(false);
          clearInterval(pollInterval);
          toast.error(jobRes.data.error || "Research job failed during execution.");
        }
      }
    }, 3000); // 3-second polling requirement

    return () => clearInterval(pollInterval);
  }, [activeJobId, activeCompanyId, jobStatus]);

  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case "queued":
        return (
          <Badge
            variant="outline"
            className="bg-amber-500/10 text-amber-600 border-amber-500/20 font-mono text-xs gap-1"
          >
            <Clock className="h-3 w-3 animate-pulse" /> Queued
          </Badge>
        );
      case "running":
        return (
          <Badge
            variant="outline"
            className="bg-blue-500/10 text-blue-600 border-blue-500/20 font-mono text-xs gap-1"
          >
            <RefreshCw className="h-3 w-3 animate-spin" /> Running
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-mono text-xs gap-1"
          >
            <CheckCircle2 className="h-3 w-3" /> Completed
          </Badge>
        );
      case "failed":
        return (
          <Badge
            variant="outline"
            className="bg-destructive/10 text-destructive border-destructive/20 font-mono text-xs gap-1"
          >
            <XCircle className="h-3 w-3" /> Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 pb-16 select-none max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="rounded-[18px] bg-[#FCFAF7] border border-[#E5E0D6] p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-1 rounded-full">
                FOUNDER RESEARCH AGENT / ASYNC WORKER
              </span>
              <span className="inline-flex items-center space-x-1 font-mono text-[10px] uppercase tracking-wider text-[#78350F] bg-[#FEF3C7] px-2.5 py-1 rounded-full border border-[#FDE68A]">
                <ShieldCheck className="h-3 w-3 text-[#B45309]" />
                <span>3S POLLING ENABLED</span>
              </span>
            </div>
            <h1 className="font-sans font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#111111]">
              Asynchronous Founder Research Workspace
            </h1>
            <p className="mt-1 text-sm text-[#52525B]">
              Input target company details to trigger an asynchronous background research job
              persisted in Supabase.
            </p>
          </div>
          <Badge
            variant="secondary"
            className="font-mono text-xs px-3 py-1.5 self-start md:self-auto"
          >
            Supabase `research_jobs` Active
          </Badge>
        </div>
      </div>

      {/* Inputs & Form Card */}
      <Card className="p-6 md:p-8 border-[#E5E0D6] bg-card">
        <form onSubmit={handleStartResearch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name Input */}
            <div className="space-y-2">
              <Label
                htmlFor="company-name"
                className="font-bold text-sm text-foreground flex items-center gap-2"
              >
                <Building2 className="h-4 w-4 text-primary" />
                Company Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="company-name"
                type="text"
                placeholder="e.g. Apex SaaS"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                disabled={isResearching}
                className="h-11 rounded-xl bg-background border-[#E5E0D6]"
              />
            </div>

            {/* Company Website Input */}
            <div className="space-y-2">
              <Label
                htmlFor="company-website"
                className="font-bold text-sm text-foreground flex items-center gap-2"
              >
                <Globe className="h-4 w-4 text-primary" />
                Company Website <span className="text-destructive">*</span>
              </Label>
              <Input
                id="company-website"
                type="text"
                placeholder="e.g. https://apexsaas.com"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
                disabled={isResearching}
                className="h-11 rounded-xl bg-background border-[#E5E0D6]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              {jobStatus !== "idle" && getStatusBadge(jobStatus)}
            </div>

            <Button
              type="submit"
              disabled={isResearching}
              className="h-12 px-8 rounded-xl font-bold bg-[#000000] text-[#FFFFFF] hover:bg-[#222222] transition-colors gap-2 cursor-pointer shadow-md"
            >
              {isResearching ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-[#FFFFFF]" />
                  <span>Researching... ({progress}%)</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>Start Founder Research</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Progress & Live Polling Card */}
        {jobStatus !== "idle" && (
          <div className="mt-8 pt-6 border-t border-[#E5E0D6] space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-primary flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-primary" />
                {statusMessage}
              </span>
              <span className="font-bold text-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2.5 rounded-full bg-secondary" />
          </div>
        )}
      </Card>

      {/* Completed Report Display Sections */}
      {reportData && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between border-b border-[#E5E0D6] pb-3">
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Generated Intelligence Report: {reportData.company.name}
            </h2>
            <Badge
              variant="outline"
              className="font-mono text-xs bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
            >
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Auto-Fetched from Supabase
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Section 1: Company Summary */}
            <Card className="p-6 space-y-3 border-[#E5E0D6] bg-card hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-primary">
                <Building2 className="h-4 w-4" />
                01. COMPANY SUMMARY
              </div>
              <h3 className="font-display font-bold text-lg text-foreground">
                {reportData.company.name}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {reportData.company.description}
              </p>
              <div className="pt-2 text-xs font-mono text-muted-foreground border-t border-[#E5E0D6]/60 flex justify-between">
                <span>Domain: {reportData.company.website}</span>
                <span>Size: {reportData.company.companySize}</span>
              </div>
            </Card>

            {/* Section 2: Founder */}
            <Card className="p-6 space-y-3 border-[#E5E0D6] bg-card hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-primary">
                <User className="h-4 w-4" />
                02. FOUNDER PERSONA
              </div>
              <h3 className="font-display font-bold text-lg text-foreground">
                {reportData.founder.fullName}
              </h3>
              <p className="text-xs font-semibold text-primary">{reportData.founder.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {reportData.founder.bio}
              </p>
              <div className="pt-2 text-xs font-mono text-muted-foreground border-t border-[#E5E0D6]/60">
                <a
                  href={`https://${reportData.founder.linkedinUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary font-bold hover:underline"
                >
                  {reportData.founder.linkedinUrl}
                </a>
              </div>
            </Card>

            {/* Section 3: Industry */}
            <Card className="p-6 space-y-3 border-[#E5E0D6] bg-card hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-primary">
                <Globe className="h-4 w-4" />
                03. INDUSTRY CLASSIFICATION
              </div>
              <h3 className="font-display font-bold text-lg text-foreground">
                {reportData.industry}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                High growth sector with expanding generative AI search query volume and B2B SaaS
                adoption.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                <span className="bg-secondary px-2.5 py-1 rounded text-[11px] font-mono font-medium">
                  B2B SaaS
                </span>
                <span className="bg-secondary px-2.5 py-1 rounded text-[11px] font-mono font-medium">
                  AI OS
                </span>
              </div>
            </Card>

            {/* Section 4: ICP */}
            <Card className="p-6 space-y-3 border-[#E5E0D6] bg-card hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-primary">
                <Target className="h-4 w-4" />
                04. IDEAL CUSTOMER PROFILE (ICP)
              </div>
              <h3 className="font-display font-bold text-sm text-foreground">
                {reportData.icp.primaryTarget}
              </h3>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <p>
                  <strong>Decision Makers:</strong> {reportData.icp.decisionMakers.join(", ")}
                </p>
                <p>
                  <strong>Geographies:</strong>{" "}
                  {reportData.icp.geographies
                    ? reportData.icp.geographies.join(", ")
                    : "USA, MENA, Europe"}
                </p>
              </div>
            </Card>

            {/* Section 5: Pain Points */}
            <Card className="p-6 space-y-3 border-[#E5E0D6] bg-card hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-destructive">
                <AlertTriangle className="h-4 w-4" />
                05. PAIN POINTS
              </div>
              <ul className="space-y-2">
                {reportData.painPoints.map((p, i) => (
                  <li
                    key={i}
                    className="text-xs space-y-0.5 border-b border-[#E5E0D6]/40 pb-2 last:border-0"
                  >
                    <div className="flex items-center justify-between font-bold text-foreground">
                      <span>{p.title}</span>
                      <span className="text-[10px] font-mono bg-destructive/10 text-destructive px-1.5 py-0.5 rounded">
                        {p.severity}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-[11px]">{p.impact}</p>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Section 6: Buying Signals */}
            <Card className="p-6 space-y-3 border-[#E5E0D6] bg-card hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-600">
                <Zap className="h-4 w-4" />
                06. BUYING SIGNALS
              </div>
              <ul className="space-y-2">
                {reportData.buyingSignals.map((s, i) => (
                  <li key={i} className="text-xs flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">{s.signal}</p>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {s.source}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Section 7: Tech Stack */}
            <Card className="p-6 space-y-3 border-[#E5E0D6] bg-card hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-primary">
                <Cpu className="h-4 w-4" />
                07. TECH STACK
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {reportData.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-secondary text-foreground px-3 py-1 rounded-xl text-xs font-mono font-medium border border-[#E5E0D6]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>

            {/* Section 8: Competitors */}
            <Card className="p-6 space-y-3 border-[#E5E0D6] bg-card hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-600">
                <Swords className="h-4 w-4" />
                08. COMPETITOR GAPS
              </div>
              <ul className="space-y-2">
                {reportData.competitors.map((c, i) => (
                  <li key={i} className="text-xs space-y-0.5">
                    <p className="font-bold text-foreground">{c.name}</p>
                    <p className="text-muted-foreground text-[11px]">{c.gap}</p>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Section 9: Opportunity Score */}
            <Card className="p-6 space-y-3 border-[#E5E0D6] bg-card hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-primary">
                  <TrendingUp className="h-4 w-4" />
                  09. OPPORTUNITY SCORE
                </div>
                <div className="mt-4 text-center">
                  <span className="font-display text-5xl font-extrabold text-foreground tracking-tight">
                    {reportData.opportunityScore}
                  </span>
                  <span className="font-mono text-lg text-muted-foreground">/100</span>
                  <p className="text-xs font-mono text-emerald-600 font-bold mt-1">
                    HIGH OPPORTUNITY MATCH
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-[#E5E0D6] text-center text-xs text-muted-foreground font-mono">
                Fetched from Supabase `research_reports`
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
