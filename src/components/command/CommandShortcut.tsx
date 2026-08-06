"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CommandShortcutProps {
  shortcut: string; // e.g. "⌘K", "↵", "Esc", "Tab"
  className?: string;
}

export const CommandShortcut: React.FC<CommandShortcutProps> = ({ shortcut, className }) => {
  return (
    <kbd
      className={cn(
        "font-mono text-[10px] font-bold bg-[#EFEAE1] text-[#18181B] border border-[#E5E0D6] px-1.5 py-0.5 rounded shadow-[0_1px_1px_0_rgba(0,0,0,0.04)] shrink-0",
        className,
      )}
    >
      {shortcut}
    </kbd>
  );
};
