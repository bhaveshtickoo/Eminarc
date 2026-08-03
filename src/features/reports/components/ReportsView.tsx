"use client";

import React, { useState, useEffect } from "react";
import { ReportSelector, reportsList } from "./ReportSelector";
import { ReportHeader } from "./ReportHeader";
import { ExecutiveSummarySection, ConsultingReportData } from "./ExecutiveSummarySection";
import { ReportCharts } from "./ReportCharts";
import { useWorkspace } from "@/hooks/useWorkspace";
import { ErrorState } from "@/components/shared/ErrorState";
import { CardSkeleton } from "@/components/shared/SkeletonLoader";
import { getReports } from "@/services/reports";

export const mockReportData: Record<string, ConsultingReportData> = {
  "rep-weekly": {
    summary:
      "Weekly growth velocity expanded by 18.4% across inbound founder leads and GEO AI search citations. CAC declined by 12% following deployment of the 1-click multi-channel repurposing pipeline.",
    keyWins: [
      "Acquired 8 new qualified B2B SaaS founder pipeline opportunities ($48k ARR).",
      "Achieved 78% AI Search Visibility Score across ChatGPT, Perplexity, and Claude.",
      "Dispatched 12 multi-channel content assets with zero editorial bottleneck.",
    ],
    risks: [
      {
        title: "Perplexity Citation Decay on Legacy Posts",
        severity: "Medium",
        mitigation: "Re-index markdown metadata with JSON-LD schema.",
      },
      {
        title: "Outreach Sequence Throttle Limit",
        severity: "Low",
        mitigation: "Warm up secondary domain IP pools.",
      },
    ],
    opportunities: [
      { title: "ChatGPT FAQ Schema Integration", impact: "+18% Citations", effort: "Low (2 hrs)" },
      { title: "LinkedIn Founder Carousel Expansion", impact: "+24% Engagement", effort: "Medium (4 hrs)" },
    ],
    recommendations: [
      {
        priority: "HIGH",
        title: "Publish Competitor Comparison Page",
        action: "Deploy explicit Eminarc vs HubSpot teardown to capture buyer search intent.",
      },
      {
        priority: "MEDIUM",
        title: "Expand Substack Editorial Newsletter",
        action: "Convert technical Medium teardowns into weekly founder email briefings.",
      },
    ],
    nextWeekPriorities: [
      "Finalize MSA contract with TrueLift.ai ($24,000 ARR).",
      "Deploy FAQ JSON-LD schema across product pages.",
      "Schedule Q3 content calendar for Revix Systems.",
    ],
  },

  "rep-monthly": {
    summary:
      "Monthly executive briefing demonstrates compounding organic inbound momentum. Net ARR increased to $142,000 with a 68% pipeline win rate and 98.4% AI agent task reliability.",
    keyWins: [
      "Closed $32,000 ARR contract with Senpai AI.",
      "Scaled AI Search Visibility score from 48% to 78% in 60 days.",
      "Automated 689 agent tasks with zero human intervention required.",
    ],
    risks: [
      {
        title: "Competitor B Launching Similar Content Automation",
        severity: "High",
        mitigation: "Double down on McKinsey-grade founder research depth.",
      },
    ],
    opportunities: [
      { title: "Enterprise CRM Integration", impact: "+35% Deal Size", effort: "High (1 week)" },
    ],
    recommendations: [
      {
        priority: "HIGH",
        title: "Scale Founder-Led LinkedIn Video Scripts",
        action: "Produce 60-second video teardowns for high-conversion leads.",
      },
    ],
    nextWeekPriorities: [
      "Present Q3 Board Report to investors.",
      "Expand AI agent orchestration suite.",
    ],
  },

  "rep-content": {
    summary:
      "Content Operating System achieved 71 total lead conversions from 53,600 cross-platform impressions. LinkedIn founder posts and Medium technical teardowns drove 65% of total pipeline.",
    keyWins: [
      "System Over Campaign breakdown generated 14,200 impressions and 14 leads.",
      "1-Click Repurposing reduced asset creation overhead from 20 hours to 2 hours weekly.",
    ],
    risks: [
      {
        title: "Platform Algorithm Shift on X Threads",
        severity: "Low",
        mitigation: "Diversify into Substack & Reddit communities.",
      },
    ],
    opportunities: [
      { title: "Reddit r/SaaS Teardown Series", impact: "+20% Inbound", effort: "Low" },
    ],
    recommendations: [
      {
        priority: "HIGH",
        title: "Standardize 7-Frame PDF Carousels",
        action: "Format all technical articles into downloadable slide decks.",
      },
    ],
    nextWeekPriorities: [
      "Draft 10 Founder Bottlenecks X Thread.",
      "Schedule August content calendar items.",
    ],
  },

  "rep-crm": {
    summary:
      "Growth CRM pipeline currently holds 14 active deals valued at $142,000. AI Qualification Scores average 91%, indicating high-intent buyer alignment.",
    keyWins: [
      "Moved TrueLift.ai ($24,000) to Negotiation stage.",
      "Maintained 68% win rate across qualified discovery calls.",
    ],
    risks: [
      {
        title: "Deal Stagnation in Proposal Stage",
        severity: "Medium",
        mitigation: "Introduce 14-day founder onboarding guarantee.",
      },
    ],
    opportunities: [
      { title: "Automated Lead Re-engagement", impact: "+$28k Pipeline", effort: "Medium" },
    ],
    recommendations: [
      {
        priority: "HIGH",
        title: "Send MSA Contract Drafts Promptly",
        action: "Close TrueLift.ai and Revix Systems before end of month.",
      },
    ],
    nextWeekPriorities: [
      "Follow up with 5 proposal-stage prospects.",
      "Log post-call AI meeting notes.",
    ],
  },

  "rep-visibility": {
    summary:
      "AI Search Visibility Radar indexed 120 total brand citations. ChatGPT and Perplexity account for 60% of LLM buyer recommendation traffic.",
    keyWins: [
      "ChatGPT (GPT-4o) visibility score reached 82%.",
      "Perplexity AI indexed 30 direct citation backlinks.",
    ],
    risks: [
      {
        title: "Gemini 1.5 Pro Citation Lag",
        severity: "Medium",
        mitigation: "Publish Google-formatted structured schema.",
      },
    ],
    opportunities: [
      { title: "Google AI Overview Optimization", impact: "+14% Citations", effort: "Low" },
    ],
    recommendations: [
      {
        priority: "HIGH",
        title: "Deploy Structured Schema Across All Features",
        action: "Ensure JSON-LD markup is active on research and CRM pages.",
      },
    ],
    nextWeekPriorities: [
      "Run daily LLM citation radar scans.",
      "Review competitor citation rank.",
    ],
  },

  "rep-competitor": {
    summary:
      "Eminarc Growth OS holds a 43% visibility advantage over Competitor A (HubSpot) and Competitor B (Taplio) due to integrated McKinsey founder research and GEO citation tracking.",
    keyWins: [
      "Outranked Competitor A in ChatGPT buyer comparison queries.",
      "Maintained 100% feature coverage across 13 Knowledge Base entities.",
    ],
    risks: [
      {
        title: "Competitor Pricing Aggression",
        severity: "Low",
        mitigation: "Highlight ROI and CAC reduction in founder pitches.",
      },
    ],
    opportunities: [
      { title: "Public Comparison Teardowns", impact: "+25% Inbound", effort: "Medium" },
    ],
    recommendations: [
      {
        priority: "HIGH",
        title: "Publish Competitor Comparison Matrix Publicly",
        action: "Provide founders with transparent feature benchmarks.",
      },
    ],
    nextWeekPriorities: [
      "Update competitor pricing telemetry.",
      "Refine sales objection handling Battlecard.",
    ],
  },
};

export const ReportsView: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const [selectedReportId, setSelectedReportId] = useState<string>("rep-weekly");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReportsData = async () => {
    setLoading(true);
    setError(null);
    try {
      await getReports(currentWorkspace?.id);
    } catch (err) {
      setError((err as Error).message || "Failed to load consulting reports from Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReportsData();
  }, [currentWorkspace?.id]);

  const currentReportOption = reportsList.find((r) => r.id === selectedReportId) || reportsList[0]!;
  const currentReportData = mockReportData[selectedReportId] || mockReportData["rep-weekly"]!;

  if (loading) {
    return (
      <div className="space-y-6 pb-12">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <ErrorState
          categoryTag="EXECUTIVE REPORTS ERROR"
          title="Unable to load consulting reports"
          description="A database connection error occurred while querying report telemetry from Supabase."
          errorMessage={error}
          onRetry={loadReportsData}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* 6 Report Selector Switcher */}
      <ReportSelector
        selectedReportId={selectedReportId}
        onSelectReport={setSelectedReportId}
      />

      {/* Consulting Brief Header & Action Toolbar */}
      <ReportHeader
        reportTitle={currentReportOption.name}
        reportCategory={currentReportOption.category}
      />

      {/* McKinsey/BCG Executive Summary & Analysis Sections */}
      <ExecutiveSummarySection data={currentReportData} />

      {/* 6 Shared Recharts Visualizers */}
      <ReportCharts />
    </div>
  );
};
