"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Linkedin,
  Twitter,
  Mail,
  FileText,
  MessageSquare,
  Video,
  Send,
} from "lucide-react";

export interface PlatformOption {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const platformsList: PlatformOption[] = [
  { id: "linkedin-post", name: "LinkedIn Post", icon: Linkedin },
  { id: "linkedin-carousel", name: "LinkedIn Carousel", icon: Linkedin },
  { id: "x-thread", name: "X Thread", icon: Twitter },
  { id: "newsletter", name: "Newsletter", icon: Mail },
  { id: "blog", name: "Blog / Medium", icon: FileText },
  { id: "reddit", name: "Reddit Post", icon: MessageSquare },
  { id: "video", name: "Video Script", icon: Video },
  { id: "email", name: "Outreach Email", icon: Send },
];

export interface PlatformSelectorProps {
  selectedPlatform: string;
  onSelectPlatform: (id: string) => void;
  className?: string;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatform,
  onSelectPlatform,
  className,
}) => {
  return (
    <div className={cn("flex flex-wrap gap-1.5 select-none", className)}>
      {platformsList.map((p) => {
        const Icon = p.icon;
        const isSelected = selectedPlatform === p.id;

        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelectPlatform(p.id)}
            className={cn(
              "flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-150 border cursor-pointer active:scale-[0.98]",
              isSelected
                ? "bg-[#000000] text-[#FFFFFF] border-black shadow-sm font-bold"
                : "bg-[#FFFFFF] text-[#716D64] border-[#E5E0D6] hover:bg-[#F7F4EE] hover:text-[#18181B]",
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{p.name}</span>
          </button>
        );
      })}
    </div>
  );
};
