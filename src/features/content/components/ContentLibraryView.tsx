"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Search,
  ExternalLink,
  Copy,
  Archive,
  Trash2,
  Filter,
  Tag,
  Clock,
  Linkedin,
  Twitter,
  Mail,
  FileText,
  MessageSquare,
  Video,
  Send,
  Layers,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useWorkspace } from "@/hooks/useWorkspace";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { CardSkeleton } from "@/components/shared/SkeletonLoader";
import { getContent } from "@/services/content";

export interface LibraryItem {
  id: string;
  title: string;
  excerpt: string;
  platform: string;
  platformIcon: React.ComponentType<{ className?: string }>;
  status: "Draft" | "Review" | "Approved" | "Scheduled" | "Published";
  campaign: string;
  tags: string[];
  lastUpdated: string;
  author: string;
}

export const initialLibraryItems: LibraryItem[] = [
  {
    id: "lib-1",
    title: "System Over Campaign Breakdown",
    excerpt:
      "Why B2B SaaS founders must transition from one-off marketing sprints to an operating system.",
    platform: "LinkedIn Post",
    platformIcon: Linkedin,
    status: "Published",
    campaign: "System Over Campaign Q3",
    tags: ["#growth-os", "#founder-led", "#b2b-saas"],
    lastUpdated: "Aug 02, 2026",
    author: "Bhavesh Tickoo",
  },
  {
    id: "lib-2",
    title: "Generative Engine Optimization (GEO) Playbook",
    excerpt:
      "How to structure technical markdown breakdowns to rank in ChatGPT, Perplexity, and Claude search queries.",
    platform: "Medium Teardown",
    platformIcon: FileText,
    status: "Scheduled",
    campaign: "GEO AI Citation",
    tags: ["#geo-citation", "#ai-search", "#seo"],
    lastUpdated: "Aug 01, 2026",
    author: "Pratyush",
  },
  {
    id: "lib-3",
    title: "10 Founder Bottlenecks in Scaling Content",
    excerpt: "5-tweet breakdown on removing editorial friction without burning 20 hours weekly.",
    platform: "X Thread",
    platformIcon: Twitter,
    status: "Approved",
    campaign: "System Over Campaign Q3",
    tags: ["#founder-led", "#repurposing", "#x-thread"],
    lastUpdated: "Jul 30, 2026",
    author: "Aditya",
  },
  {
    id: "lib-4",
    title: "B2B Growth OS Architecture Newsletter #42",
    excerpt: "Deep-dive newsletter on unifying market research, AI search radar, and CRM pipeline.",
    platform: "Newsletter",
    platformIcon: Mail,
    status: "Review",
    campaign: "Organic Inbound",
    tags: ["#newsletter", "#growth-os"],
    lastUpdated: "Jul 28, 2026",
    author: "Bhavesh Tickoo",
  },
  {
    id: "lib-5",
    title: "r/SaaS Community AMA: Zero Ad-Spend Scaling",
    excerpt: "Authentic Reddit breakdown answering technical founder questions on CAC reduction.",
    platform: "Reddit Post",
    platformIcon: MessageSquare,
    status: "Draft",
    campaign: "Community Growth",
    tags: ["#community", "#reddit", "#b2b-saas"],
    lastUpdated: "Jul 25, 2026",
    author: "Pratyush",
  },
  {
    id: "lib-6",
    title: "Why Campaigns Die in 30 Days (Short Script)",
    excerpt:
      "60-second video script for LinkedIn and YouTube Shorts explaining growth system compounding.",
    platform: "Video Script",
    platformIcon: Video,
    status: "Draft",
    campaign: "Video OS",
    tags: ["#video", "#shorts"],
    lastUpdated: "Jul 22, 2026",
    author: "Aditya",
  },
];

export const statusBadges: Record<string, string> = {
  Draft: "bg-[#EFEAE1] text-[#716D64] border-[#E5E0D6]",
  Review: "bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]",
  Approved: "bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]",
  Scheduled: "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]",
  Published: "bg-[#18181B] text-[#FFFFFF] border-black",
};

export const ContentLibraryView: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const navigate = useNavigate();
  const [library, setLibrary] = useState<LibraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");

  const loadContentData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getContent({ workspaceId: currentWorkspace?.id });
      const mapped: LibraryItem[] = data.map((item) => ({
        id: item.id,
        title: item.title,
        excerpt: item.excerpt,
        platform: item.channel,
        platformIcon:
          item.channel === "LinkedIn"
            ? Linkedin
            : item.channel === "Reddit"
              ? MessageSquare
              : FileText,
        status: item.status as any,
        campaign: "Growth OS Campaign",
        tags: [item.channel, "Growth"],
        lastUpdated: item.date,
        author: "Bhavesh Tickoo",
      }));
      setLibrary(mapped);
    } catch (err) {
      setError((err as Error).message || "Failed to load content from Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContentData();
  }, [currentWorkspace?.id]);

  const allTags = Array.from(new Set(library.flatMap((item) => item.tags)));

  const handleOpen = (item: LibraryItem) => {
    toast.success(`Opening "${item.title}"`, {
      description: "Loading draft into Content OS Editor workspace...",
    });
  };

  const handleDuplicate = (item: LibraryItem) => {
    const newItem: LibraryItem = {
      ...item,
      id: `lib-${Date.now()}`,
      title: `${item.title} (Copy)`,
      status: "Draft",
      lastUpdated: "Just now",
    };
    setLibrary((prev) => [newItem, ...prev]);
    toast.success(`Duplicated "${item.title}"`);
  };

  const handleArchive = (id: string) => {
    setLibrary((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "Draft" ? "Published" : "Draft" }
          : item,
      ),
    );
    toast.success("Updated content status");
  };

  const handleDelete = (id: string, title: string) => {
    setLibrary((prev) => prev.filter((item) => item.id !== id));
    toast.success(`Deleted "${title}"`);
  };

  const filteredItems = library.filter((item) => {
    const matchesSearch =
      search === "" ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      item.campaign.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    const matchesPlatform =
      platformFilter === "All" ||
      item.platform.toLowerCase().includes(platformFilter.toLowerCase());
    const matchesTag = selectedTag === "All" || item.tags.includes(selectedTag);
    return matchesSearch && matchesStatus && matchesPlatform && matchesTag;
  });

  return (
    <div className="space-y-6 select-none">
      {/* Top Header Card */}
      <div className="p-6 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              CONTENT LIBRARY / {currentWorkspace.name.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0] font-bold">
              {filteredItems.length} ASSETS FOUND
            </span>
          </div>
          <h1 className="font-sans font-bold text-2xl md:text-3xl text-[#111111] tracking-tight">
            Central Content Library
          </h1>
          <p className="font-sans font-medium text-xs text-[#52525B] mt-0.5">
            Repository of all published, scheduled, and draft content assets.
          </p>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <div className="flex items-center space-x-1 bg-[#FFFFFF] border border-[#E5E0D6] p-1 rounded-xl">
            {["All", "Draft", "Scheduled", "Published"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={cn(
                  "font-mono text-xs px-2.5 py-1 rounded-lg transition-all cursor-pointer font-medium",
                  statusFilter === st
                    ? "bg-[#000000] text-[#FFFFFF] font-bold shadow-sm"
                    : "text-[#716D64] hover:bg-[#F7F4EE]",
                )}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#716D64]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search library assets..."
              className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] pl-9 pr-3 py-1.5 text-xs font-sans text-[#18181B] placeholder-[#9E988D] focus:outline-none focus:ring-1 focus:ring-[#18181B]"
            />
          </div>
        </div>
      </div>

      {/* Tag Filters Bar */}
      <div className="flex items-center space-x-2 font-mono text-xs bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-3 rounded-xl">
        <span className="text-[#716D64] font-bold flex items-center shrink-0">
          <Tag className="h-3.5 w-3.5 mr-1" />
          TAGS:
        </span>
        <div className="flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => setSelectedTag("All")}
            className={cn(
              "px-2 py-0.5 rounded text-[10px] transition-all cursor-pointer",
              selectedTag === "All"
                ? "bg-[#18181B] text-[#FFFFFF] font-bold"
                : "bg-[#FFFFFF] text-[#716D64] border border-[#E5E0D6] hover:bg-[#F7F4EE]",
            )}
          >
            All Tags
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={cn(
                "px-2 py-0.5 rounded text-[10px] transition-all cursor-pointer",
                selectedTag === tag
                  ? "bg-[#18181B] text-[#FFFFFF] font-bold"
                  : "bg-[#FFFFFF] text-[#716D64] border border-[#E5E0D6] hover:bg-[#F7F4EE]",
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Loading & Error States */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : error ? (
        <ErrorState
          categoryTag="CONTENT LIBRARY ERROR"
          title="Unable to load content assets"
          description="A database connection error occurred while querying content library items from Supabase."
          errorMessage={error}
          onRetry={loadContentData}
        />
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const Icon = item.platformIcon;

            return (
              <div
                key={item.id}
                className="group flex flex-col justify-between rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] transition-all duration-200 hover:border-[rgba(0,0,0,0.14)] hover:shadow-[0_6px_16px_-4px_rgba(26,26,26,0.04)]"
              >
                {/* Card Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#000000] text-[#FFFFFF] shrink-0">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#18181B]">
                        {item.platform}
                      </span>
                    </div>

                    <span
                      className={cn(
                        "font-mono text-[9px] uppercase px-2 py-0.5 rounded-full font-bold border shrink-0",
                        statusBadges[item.status],
                      )}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-sm text-[#111111] leading-snug">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs text-[#716D64] mt-1.5 leading-normal line-clamp-2">
                    {item.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 font-mono text-[9px] pt-3">
                    {item.tags.map((t, idx) => (
                      <span key={idx} className="bg-[#EFEAE1] text-[#716D64] px-1.5 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer & Actions */}
                <div className="pt-4 mt-4 border-t border-[rgba(0,0,0,0.06)] space-y-3">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#716D64]">
                    <span>
                      Campaign: <strong className="text-[#18181B]">{item.campaign}</strong>
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {item.lastUpdated}
                    </span>
                  </div>

                  {/* Explicit Action Buttons */}
                  <div className="grid grid-cols-4 gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpen(item)}
                      className="flex items-center justify-center space-x-1 rounded-xl bg-[#000000] text-[#FFFFFF] py-1.5 font-mono text-[10px] font-bold hover:bg-[#222222] transition-colors cursor-pointer"
                      title="Open Asset"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Open</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDuplicate(item)}
                      className="flex items-center justify-center space-x-1 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-[#18181B] py-1.5 font-mono text-[10px] font-medium hover:bg-[#F7F4EE] transition-colors cursor-pointer"
                      title="Duplicate Asset"
                    >
                      <Copy className="h-3 w-3 text-[#716D64]" />
                      <span>Copy</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleArchive(item.id)}
                      className="flex items-center justify-center space-x-1 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-[#716D64] py-1.5 font-mono text-[10px] font-medium hover:bg-[#F7F4EE] hover:text-[#18181B] transition-colors cursor-pointer"
                      title="Toggle Status"
                    >
                      <Archive className="h-3 w-3" />
                      <span>Toggle</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id, item.title)}
                      className="flex items-center justify-center space-x-1 rounded-xl bg-[#FFFFFF] border border-[#FEE2E2] text-[#7F1D1D] py-1.5 font-mono text-[10px] font-medium hover:bg-[#FEE2E2]/50 transition-colors cursor-pointer"
                      title="Delete Asset"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          categoryTag="EDITORIAL CONTENT LIBRARY"
          icon={FileText}
          title="No Content Assets Found"
          description="Draft a technical teardown in the Content Operating System or trigger 1-click multi-channel repurposing to populate the library."
          nextActionText="Open Content Operating System"
          onNextAction={() => navigate({ to: "/content" })}
          secondaryActionText="Reset Asset Filters"
          onSecondaryAction={() => {
            setSearch("");
            setStatusFilter("All");
            setSelectedTag("All");
          }}
        />
      )}
    </div>
  );
};
