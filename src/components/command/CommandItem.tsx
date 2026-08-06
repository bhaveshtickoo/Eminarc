"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandShortcut } from "./CommandShortcut";

export interface CommandItemData {
  id: string;
  title: string;
  description?: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  isAiPlaceholder?: boolean;
  onSelect: () => void;
}

export interface CommandItemProps {
  item: CommandItemData;
  isActive: boolean;
  onMouseEnter?: () => void;
}

export const CommandItem: React.FC<CommandItemProps> = ({ item, isActive, onMouseEnter }) => {
  const Icon = item.icon;

  return (
    <div
      onClick={item.onSelect}
      onMouseEnter={onMouseEnter}
      className={cn(
        "group flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-100 cursor-pointer select-none font-sans",
        isActive ? "bg-[#18181B] text-[#FFFFFF] shadow-sm" : "hover:bg-[#FCFAF7] text-[#111111]",
      )}
    >
      <div className="flex items-center space-x-3 min-w-0 flex-1">
        <div
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-lg font-mono text-xs shrink-0 transition-colors",
            isActive ? "bg-[#FFFFFF]/20 text-[#FFFFFF]" : "bg-[#EFEAE1] text-[#18181B]",
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-2">
            <h4
              className={cn(
                "font-bold text-xs truncate",
                isActive ? "text-[#FFFFFF]" : "text-[#111111]",
              )}
            >
              {item.title}
            </h4>

            {item.isAiPlaceholder && (
              <span
                className={cn(
                  "font-mono text-[8px] uppercase font-bold px-1.5 py-0.2 rounded border shrink-0 flex items-center",
                  isActive
                    ? "bg-[#2D6A4F] text-[#FFFFFF] border-transparent"
                    : "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]",
                )}
              >
                <Sparkles className="h-2.5 w-2.5 mr-0.5" />
                AI PLACEHOLDER
              </span>
            )}
          </div>

          {item.description && (
            <p
              className={cn(
                "font-sans text-[11px] truncate leading-tight mt-0.5",
                isActive ? "text-[#A1A1AA]" : "text-[#716D64]",
              )}
            >
              {item.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2 shrink-0 ml-3">
        <span
          className={cn(
            "font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded",
            isActive ? "bg-[#FFFFFF]/20 text-[#FFFFFF]" : "bg-[#EFEAE1] text-[#716D64]",
          )}
        >
          {item.category}
        </span>

        {item.shortcut ? (
          <CommandShortcut shortcut={item.shortcut} />
        ) : (
          <ArrowRight
            className={cn(
              "h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5",
              isActive ? "text-[#FFFFFF]" : "text-[#A19B8E]",
            )}
          />
        )}
      </div>
    </div>
  );
};
