"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Globe,
  Bot,
  MessageSquare,
  Search,
  Linkedin,
  Clock,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { useWorkspace } from "@/hooks/useWorkspace";
import { PlatformCard, PlatformCardData } from "./PlatformCard";
import { VisibilityCharts } from "./VisibilityCharts";
import { RecommendationsCard } from "./RecommendationsCard";
import { CompetitorComparison } from "./CompetitorComparison";
import { ErrorState } from "@/components/shared/ErrorState";
import { CardSkeleton } from "@/components/shared/SkeletonLoader";
import { getVisibilityAudit } from "@/services/visibility";

export const platformList: PlatformCardData[] = [
  {
    id: "p-chatgpt",
    name: "ChatGPT (GPT-4o)",
    category: "LLM Search Engine",
    icon: Bot,
    visibilityScore: 82,
    trend: 14,
    citationsCount: 42,
    lastScan: "30 mins ago",
  },
  {
    id: "p-claude",
    name: "Claude 3.5 Sonnet",
    category: "LLM Knowledge Engine",
    icon: Bot,
    visibilityScore: 76,
    trend: 9,
    citationsCount: 24,
    lastScan: "1 hour ago",
  },
  {
    id: "p-perplexity",
    name: "Perplexity AI",
    category: "Answer Engine",
    icon: Search,
    visibilityScore: 79,
    trend: 12,
    citationsCount: 30,
    lastScan: "45 mins ago",
  },
  {
    id: "p-gemini",
    name: "Gemini 1.5 Pro",
    category: "Google Multimodal LLM",
    icon: Bot,
    visibilityScore: 61,
    trend: -2,
    citationsCount: 10,
    lastScan: "3 hours ago",
  },
  {
    id: "p-google-ai",
    name: "Google AI Overview",
    category: "Generative Search Experience",
    icon: Globe,
    visibilityScore: 68,
    trend: 6,
    citationsCount: 14,
    lastScan: "2 hours ago",
  },
  {
    id: "p-google-search",
    name: "Google Organic Search",
    category: "Traditional SEO Rank",
    icon: Globe,
    visibilityScore: 72,
    trend: 4,
    citationsCount: 28,
    lastScan: "1 hour ago",
  },
  {
    id: "p-reddit",
    name: "Reddit Community Index",
    category: "Social Discussion Search",
    icon: MessageSquare,
    visibilityScore: 85,
    trend: 18,
    citationsCount: 54,
    lastScan: "15 mins ago",
  },
  {
    id: "p-linkedin",
    name: "LinkedIn Brand Index",
    category: "Professional Network Graph",
    icon: Linkedin,
    visibilityScore: 88,
    trend: 15,
    citationsCount: 62,
    lastScan: "10 mins ago",
  },
];

export const VisibilityView: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const [aiScore, setAiScore] = useState<number>(currentWorkspace.metrics.aiVisibility || 78);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadVisibilityData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getVisibilityAudit(currentWorkspace?.id);
      setAiScore(data.score);
    } catch (err) {
      setError((err as Error).message || "Failed to load visibility audit from Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVisibilityData();
  }, [currentWorkspace?.id]);

  const handleRunScan = () => {
    toast.success("AI Search Scan Triggered", {
      description: "Auditing brand citations across ChatGPT, Claude, and Perplexity...",
    });
  };

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Hero Header Card */}
      <div className="p-6 md:p-8 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-1 rounded-full">
              AI CITATION RADAR / {currentWorkspace.name.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-[#2D6A4F] bg-[#EDF6F0] px-2.5 py-1 rounded-full border border-[#C8E4D0] font-bold flex items-center">
              <ShieldCheck className="h-3 w-3 mr-1 text-[#2D6A4F]" />
              GEO CITATION RADAR ACTIVE
            </span>
          </div>

          <h1 className="font-sans font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#111111]">
            AI Search Visibility Radar
          </h1>

          <p className="font-sans text-xs md:text-sm text-[#52525B] mt-1">
            Real-time citation tracking across LLMs, generative search, and professional graphs for{" "}
            {currentWorkspace.name}.
          </p>
        </div>

        {/* Hero Score Gauge */}
        <div className="flex items-center space-x-4 bg-[#FFFFFF] border border-[#E5E0D6] p-4 rounded-xl shrink-0">
          <div>
            <span className="font-mono text-[10px] uppercase text-[#716D64] font-bold block">
              OVERALL AI VISIBILITY SCORE
            </span>
            <div className="flex items-baseline space-x-2 mt-0.5">
              <span className="font-sans font-bold text-3xl md:text-4xl text-[#111111]">
                {aiScore}%
              </span>
              <span className="font-mono text-xs text-[#2D6A4F] font-bold flex items-center">
                <TrendingUp className="h-3.5 w-3.5 mr-0.5" />
                +8.4%
              </span>
            </div>
            <span className="font-mono text-[9px] text-[#716D64] block mt-0.5">
              Status: {currentWorkspace.metrics.aiVisibilityStatus}
            </span>
          </div>

          <button
            type="button"
            onClick={handleRunScan}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#000000] text-[#FFFFFF] font-mono text-xs font-bold hover:bg-[#222222] transition-colors cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Run Scan</span>
          </button>
        </div>
      </div>

      {/* 8 Platform Telemetry Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between font-mono text-xs text-[#716D64] px-1">
          <span className="font-bold text-[#111111]">8 PLATFORM TELEMETRY CARDS</span>
          <span>120 CITATIONS INDEXED</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : error ? (
          <ErrorState
            categoryTag="VISIBILITY RADAR ERROR"
            title="Unable to load AI Visibility Radar"
            description="A database error occurred while querying visibility report telemetry from Supabase."
            errorMessage={error}
            onRetry={loadVisibilityData}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {platformList.map((platform) => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        )}
      </div>

      {/* 4 Shared Recharts Charts */}
      <VisibilityCharts />

      {/* Priority Recommendations Card */}
      <RecommendationsCard />

      {/* Competitor Comparison Matrix */}
      <CompetitorComparison />
    </div>
  );
};
