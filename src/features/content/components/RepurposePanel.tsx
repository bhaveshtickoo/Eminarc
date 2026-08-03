"use client";

import React from "react";
import {
  Linkedin,
  Twitter,
  Mail,
  FileText,
  MessageSquare,
  Video,
  Send,
  Zap,
  ArrowRight,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface RepurposeCardOption {
  id: string;
  name: string;
  description: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const repurposeChannels: RepurposeCardOption[] = [
  {
    id: "rep-linkedin-post",
    name: "LinkedIn Post",
    description: "Convert core narrative into a 150-word founder text post with engagement hooks.",
    badge: "1-CLICK",
    icon: Linkedin,
  },
  {
    id: "rep-linkedin-carousel",
    name: "LinkedIn Carousel",
    description: "Format breakdown into 7 visual PDF slide frames for high save rates.",
    badge: "PDF SLIDES",
    icon: Layers,
  },
  {
    id: "rep-x-thread",
    name: "X Thread",
    description: "Structure key points into a 5-tweet thread with punchy intro and CTA.",
    badge: "THREAD",
    icon: Twitter,
  },
  {
    id: "rep-newsletter",
    name: "Newsletter",
    description: "Expand into a 500-word deep-dive email newsletter for subscribers.",
    badge: "EMAIL OS",
    icon: Mail,
  },
  {
    id: "rep-blog",
    name: "Blog / Medium Article",
    description: "Format with H2 subheadings and code blocks for search engine indexing.",
    badge: "LONG FORM",
    icon: FileText,
  },
  {
    id: "rep-reddit",
    name: "Reddit Post",
    description: "Re-frame into an authentic case study for r/SaaS and r/startups.",
    badge: "COMMUNITY",
    icon: MessageSquare,
  },
  {
    id: "rep-video",
    name: "Video Script",
    description: "Convert into a 60-second video script for LinkedIn and YouTube Shorts.",
    badge: "60S SCRIPT",
    icon: Video,
  },
  {
    id: "rep-email",
    name: "Outreach Email",
    description: "Draft a 4-line personalized outreach email for high-fit leads.",
    badge: "COLD EMAIL",
    icon: Send,
  },
];

export const RepurposePanel: React.FC = () => {
  const handleTriggerRepurpose = (channel: RepurposeCardOption) => {
    toast.success(`Repurposed to ${channel.name}`, {
      description: `Generated ${channel.name} asset from current draft context.`,
    });
  };

  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[rgba(0,0,0,0.06)]">
        <div>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
            BOTTOM SECTION / REPURPOSE ENGINE
          </span>
          <h3 className="font-sans font-bold text-xl text-[#111111] mt-1 tracking-tight flex items-center">
            <Zap className="h-4 w-4 mr-1.5 text-[#2D6A4F]" />
            1-Click Multi-Channel Repurpose Engine
          </h3>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-[#2D6A4F] bg-[#EDF6F0] px-2.5 py-1 rounded-full border border-[#C8E4D0]">
          8 CHANNELS READY
        </span>
      </div>

      {/* 8 Channel Repurpose Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {repurposeChannels.map((channel) => {
          const Icon = channel.icon;

          return (
            <div
              key={channel.id}
              onClick={() => handleTriggerRepurpose(channel)}
              className="group flex flex-col justify-between rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-4 transition-all duration-150 hover:border-[rgba(0,0,0,0.14)] hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.04)] cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EFEAE1] text-[#18181B] group-hover:bg-[#000000] group-hover:text-[#FFFFFF] transition-colors">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-mono text-[8px] uppercase font-bold text-[#716D64] bg-[#EFEAE1] px-1.5 py-0.5 rounded">
                    {channel.badge}
                  </span>
                </div>

                <h4 className="font-sans font-bold text-xs text-[#111111] group-hover:text-[#2D6A4F] transition-colors">
                  {channel.name}
                </h4>

                <p className="font-sans text-[11px] text-[#716D64] mt-1 leading-normal">
                  {channel.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-[rgba(0,0,0,0.05)] font-mono text-[10px] font-bold text-[#18181B]">
                <span>Convert Draft</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#716D64] group-hover:text-[#2D6A4F] group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
