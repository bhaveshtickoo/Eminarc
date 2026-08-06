"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Clock,
  Target,
  Users,
  MessageSquare,
  FileText,
  ListTodo,
  TrendingUp,
  Share2,
  Globe,
  Search,
  Handshake,
  DollarSign,
  Calendar,
  Layers,
  ShieldCheck,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import { useWorkspace } from "@/hooks/useWorkspace";
import { campaignEngine } from "@/core/campaigns/campaign-engine";
import { CampaignService } from "@/core/campaigns/campaign-service";
import { CampaignSpec, CampaignStatus, CampaignType } from "@/core/campaigns/types";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { CardSkeleton } from "@/components/shared/SkeletonLoader";
import { cn } from "@/lib/utils";

export const campaignTypesList: { type: CampaignType; icon: any; label: string; desc: string }[] = [
  {
    type: "LinkedIn",
    icon: Share2,
    label: "LinkedIn Authority",
    desc: "Founder brand & DM outbound",
  },
  {
    type: "Email",
    icon: Send,
    label: "Cold Email Outreach",
    desc: "Multi-touch personalized campaigns",
  },
  {
    type: "Content Calendar",
    icon: Calendar,
    label: "Content Calendar",
    desc: "Multi-channel editorial schedule",
  },
  { type: "Launch Plan", icon: Zap, label: "Product Launch Plan", desc: "3-phase launch playbook" },
  { type: "Webinar", icon: Globe, label: "Webinar Funnels", desc: "Live teardowns & registration" },
  {
    type: "SEO",
    icon: Search,
    label: "SEO & GEO Radar",
    desc: "Perplexity & ChatGPT citation radar",
  },
  {
    type: "Paid",
    icon: DollarSign,
    label: "Paid Acquisition",
    desc: "Sponsored content & paid social",
  },
  {
    type: "Partnership",
    icon: Handshake,
    label: "B2B Partnerships",
    desc: "Co-marketing & integration alliances",
  },
  {
    type: "Community",
    icon: Users,
    label: "Community Growth",
    desc: "Slack, Discord & forum marketing",
  },
  { type: "Referral", icon: Target, label: "Referral Loops", desc: "Founder advocacy & credits" },
];

export const CampaignEngineView: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const [campaigns, setCampaigns] = useState<CampaignSpec[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [generating, setGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<CampaignType | "All">("All");
  const [goalInput, setGoalInput] = useState<string>("");

  const loadCampaigns = async () => {
    if (!currentWorkspace?.id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await CampaignService.getWorkspaceCampaigns(
        currentWorkspace.id,
        selectedChannel === "All" ? undefined : selectedChannel,
      );
      if (res.data && res.data.length > 0) {
        const mapped: CampaignSpec[] = res.data.map((row) => ({
          id: row.id,
          title: row.title,
          type: row.type as CampaignType,
          goal: row.goal,
          audience: row.audience,
          messaging: row.messaging,
          assets: (row.assets as any) || [],
          tasks: (row.tasks as any) || [],
          timeline: row.timeline,
          kpis: (row.kpis as any) || [],
          status: row.status as CampaignStatus,
        }));
        setCampaigns(mapped);
      } else {
        setCampaigns([]);
      }
    } catch (err) {
      setError((err as Error).message || "Failed to query campaigns from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, [currentWorkspace?.id, selectedChannel]);

  const handleGenerateCampaign = async (typeToGen: CampaignType) => {
    if (!currentWorkspace?.id) return;
    setGenerating(true);
    setError(null);
    try {
      toast.info(`Synthesizing ${typeToGen} Campaign...`, {
        description: "Executing AI Orchestrator across multi-layer memory and prompt library.",
      });

      const newCmp = await campaignEngine.generateCampaign({
        workspaceId: currentWorkspace.id,
        type: typeToGen,
        ...(goalInput.trim() ? { goalPrompt: goalInput.trim() } : {}),
      });

      setCampaigns((prev) => [newCmp, ...prev]);
      toast.success(`${typeToGen} Campaign Synthesized!`, {
        description:
          "Goal, Audience, Messaging, Assets, Tasks, Timeline, and KPIs generated and saved to Supabase.",
      });
      setGoalInput("");
    } catch (err) {
      const msg = (err as Error).message || "Failed to generate campaign.";
      setError(msg);
      toast.error("Campaign Synthesis Error", { description: msg });
    } finally {
      setGenerating(false);
    }
  };

  const handleStatusUpdate = async (campaignId: string, currentStatus: CampaignStatus) => {
    const nextStatus: CampaignStatus =
      currentStatus === "draft"
        ? "active"
        : currentStatus === "active"
          ? "paused"
          : currentStatus === "paused"
            ? "completed"
            : "draft";

    try {
      await CampaignService.updateCampaignStatus(campaignId, nextStatus);
      setCampaigns((prev) =>
        prev.map((c) => (c.id === campaignId ? { ...c, status: nextStatus } : c)),
      );
      toast.success(`Updated Campaign Status to "${nextStatus.toUpperCase()}"`);
    } catch (err) {
      toast.error("Failed to update campaign status");
    }
  };

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-1 rounded-full">
              CAMPAIGN ENGINE / {currentWorkspace.name.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-[#2D6A4F] bg-[#EDF6F0] px-2.5 py-1 rounded-full border border-[#C8E4D0] font-bold flex items-center">
              <ShieldCheck className="h-3 w-3 mr-1 text-[#2D6A4F]" />8 CHANNELS SUPPORTED
            </span>
          </div>

          <h1 className="font-sans font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#111111]">
            Multi-Channel Growth Campaign Engine
          </h1>

          <p className="font-sans text-xs md:text-sm text-[#52525B] mt-1">
            Synthesize, persist, and manage campaigns across LinkedIn, Email, SEO, Website,
            Partnerships, Paid, Events, and Communities.
          </p>
        </div>
      </div>

      {/* Campaign Synthesizer Input Toolbar */}
      <div className="p-5 rounded-2xl bg-white border border-[#E5E0D6] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-sans font-bold text-base text-[#111111] flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#D97706]" />
              Launch AI Campaign Synthesizer
            </h3>
            <p className="font-sans text-xs text-[#716D64] mt-0.5">
              Select a target growth channel below to instantly generate a complete campaign with
              Goal, Audience, Messaging, Assets, Tasks, Timeline, KPIs & Status.
            </p>
          </div>

          <input
            type="text"
            placeholder="Custom Campaign Objective / Goal (Optional)..."
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-[#FCFAF7] border border-[#E5E0D6] text-xs font-mono focus:outline-none focus:border-black w-full sm:w-80"
          />
        </div>

        {/* 8 Channel Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {campaignTypesList.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.type}
                type="button"
                disabled={generating}
                onClick={() => handleGenerateCampaign(item.type)}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FCFAF7] hover:bg-black hover:text-white border border-[#E5E0D6] hover:border-black transition-all cursor-pointer group text-center space-y-1.5"
              >
                <Icon className="h-4 w-4 text-[#716D64] group-hover:text-white shrink-0" />
                <span className="font-mono text-[11px] font-bold tracking-tight">{item.type}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Tabs by Channel */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 font-mono text-xs border-b border-[#E5E0D6]">
        <button
          type="button"
          onClick={() => setSelectedChannel("All")}
          className={cn(
            "px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer font-medium shrink-0",
            selectedChannel === "All"
              ? "bg-[#000000] text-[#FFFFFF] border-black font-bold shadow-sm"
              : "bg-[#FFFFFF] text-[#716D64] border-[#E5E0D6] hover:bg-[#F7F4EE] hover:text-[#111111]",
          )}
        >
          All Channels
        </button>
        {campaignTypesList.map((c) => (
          <button
            key={c.type}
            type="button"
            onClick={() => setSelectedChannel(c.type)}
            className={cn(
              "px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer font-medium shrink-0 flex items-center space-x-1",
              selectedChannel === c.type
                ? "bg-[#000000] text-[#FFFFFF] border-black font-bold shadow-sm"
                : "bg-[#FFFFFF] text-[#716D64] border-[#E5E0D6] hover:bg-[#F7F4EE] hover:text-[#111111]",
            )}
          >
            <span>{c.type}</span>
          </button>
        ))}
      </div>

      {/* Campaigns Listing State */}
      {loading ? (
        <div className="space-y-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : error ? (
        <ErrorState
          categoryTag="CAMPAIGN ENGINE ERROR"
          title="Failed to Load Growth Campaigns"
          description="A query error occurred while fetching campaigns from Supabase."
          errorMessage={error}
          onRetry={loadCampaigns}
        />
      ) : campaigns.length === 0 ? (
        <EmptyState
          categoryTag="CAMPAIGN HUB"
          icon={Send}
          title={`No ${selectedChannel === "All" ? "" : selectedChannel} Campaigns Generated Yet`}
          description="Click any of the 8 channel buttons above (LinkedIn, Email, SEO, Website, Partnerships, Paid, Events, Communities) to generate a complete growth campaign."
          nextActionText="Synthesize LinkedIn Campaign"
          onNextAction={() => handleGenerateCampaign("LinkedIn")}
        />
      ) : (
        <div className="space-y-6">
          {campaigns.map((cmp) => (
            <div
              key={cmp.id}
              className="p-6 rounded-2xl bg-white border border-[#E5E0D6] hover:border-black transition-all shadow-sm space-y-5"
            >
              {/* Campaign Header & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F3F0E6] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#059669] bg-[#ECFDF5] px-2.5 py-1 rounded-md border border-[#A7F3D0]">
                      {cmp.type} CHANNEL
                    </span>
                    <span className="font-mono text-[11px] text-[#716D64]">
                      Timeline: {cmp.timeline}
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-xl text-[#111111]">{cmp.title}</h3>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleStatusUpdate(cmp.id, cmp.status)}
                    className={cn(
                      "font-mono text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer capitalize",
                      cmp.status === "active"
                        ? "bg-[#059669] text-white border-[#059669]"
                        : cmp.status === "scheduled"
                          ? "bg-[#2563EB] text-white border-[#2563EB]"
                          : cmp.status === "paused"
                            ? "bg-[#D97706] text-white border-[#D97706]"
                            : cmp.status === "completed"
                              ? "bg-[#4B5563] text-white border-[#4B5563]"
                              : "bg-[#F7F4EE] text-[#716D64] border-[#E5E0D6] hover:text-black",
                    )}
                  >
                    Status: {cmp.status}
                  </button>
                </div>
              </div>

              {/* Goal, Audience, Messaging Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
                <div className="p-4 rounded-xl bg-[#FCFAF7] border border-[#E5E0D6] space-y-1">
                  <span className="font-mono text-[10px] font-bold uppercase text-[#716D64] flex items-center gap-1">
                    <Target className="h-3 w-3 text-[#D97706]" /> GOAL
                  </span>
                  <p className="text-[#111111] font-medium">{cmp.goal}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#FCFAF7] border border-[#E5E0D6] space-y-1">
                  <span className="font-mono text-[10px] font-bold uppercase text-[#716D64] flex items-center gap-1">
                    <Users className="h-3 w-3 text-[#2563EB]" /> AUDIENCE
                  </span>
                  <p className="text-[#111111] font-medium">{cmp.audience}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#FCFAF7] border border-[#E5E0D6] space-y-1">
                  <span className="font-mono text-[10px] font-bold uppercase text-[#716D64] flex items-center gap-1">
                    <MessageSquare className="h-3 w-3 text-[#059669]" /> MESSAGING
                  </span>
                  <p className="text-[#111111] font-medium">{cmp.messaging}</p>
                </div>
              </div>

              {/* Assets & Tasks Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Campaign Assets */}
                <div className="p-4 rounded-xl bg-white border border-[#E5E0D6] space-y-2">
                  <span className="font-mono text-[10px] font-bold uppercase text-[#716D64] flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5 text-[#2563EB]" /> CAMPAIGN ASSETS (
                    {cmp.assets?.length || 0})
                  </span>
                  <div className="space-y-2">
                    {cmp.assets?.map((ast, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-[#FCFAF7] border border-[#E5E0D6] space-y-1"
                      >
                        <div className="flex items-center justify-between font-mono text-[10px]">
                          <span className="font-bold text-[#111111]">{ast.title}</span>
                          <span className="px-1.5 py-0.5 rounded bg-[#EFEAE1] text-[#716D64]">
                            {ast.type}
                          </span>
                        </div>
                        <p className="font-mono text-[11px] text-[#52525B] whitespace-pre-line">
                          {ast.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Campaign Tasks */}
                <div className="p-4 rounded-xl bg-white border border-[#E5E0D6] space-y-2">
                  <span className="font-mono text-[10px] font-bold uppercase text-[#716D64] flex items-center gap-1">
                    <ListTodo className="h-3.5 w-3.5 text-[#059669]" /> CAMPAIGN TASKS (
                    {cmp.tasks?.length || 0})
                  </span>
                  <div className="space-y-2">
                    {cmp.tasks?.map((tsk, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-[#FCFAF7] border border-[#E5E0D6] space-y-1"
                      >
                        <div className="flex items-center justify-between font-sans text-xs">
                          <span className="font-bold text-[#111111]">{tsk.title}</span>
                          <span className="font-mono text-[10px] text-[#716D64]">
                            Due: {tsk.dueDate}
                          </span>
                        </div>
                        <p className="font-sans text-[11px] text-[#52525B]">{tsk.description}</p>
                        <div className="flex items-center justify-between font-mono text-[10px] pt-1 text-[#716D64]">
                          <span>Owner: {tsk.owner}</span>
                          <span className="font-bold text-[#059669]">{tsk.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* KPIs Footer */}
              <div className="p-3 rounded-xl bg-[#FCFAF7] border border-[#E5E0D6] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                <span className="font-bold text-[#111111] flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 text-[#D97706]" /> CAMPAIGN KPIS:
                </span>
                <div className="flex flex-wrap items-center gap-4">
                  {cmp.kpis?.map((k, i) => (
                    <div key={i} className="flex items-center space-x-1.5">
                      <span className="text-[#716D64]">{k.metric}:</span>
                      <span className="font-bold text-[#059669]">{k.targetBenchmark}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
