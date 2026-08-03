"use client";

import React from "react";
import { Search, X, Sparkles } from "lucide-react";
import { CommandShortcut } from "./CommandShortcut";

export interface CommandInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export const CommandInput: React.FC<CommandInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder = "Type a command or search across Eminarc...",
}) => {
  return (
    <div className="relative flex items-center border-b border-[rgba(0,0,0,0.08)] px-4 py-3.5 bg-[#FCFAF7] rounded-t-[18px]">
      <Search className="h-4 w-4 text-[#716D64] shrink-0 mr-3" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus
        className="w-full bg-transparent font-sans text-sm font-medium text-[#111111] placeholder-[#9E988D] focus:outline-none"
      />

      {value ? (
        <button
          type="button"
          onClick={onClear}
          className="p-1 hover:bg-[#EFEAE1] rounded text-[#716D64] hover:text-[#18181B] transition-colors cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : (
        <div className="flex items-center space-x-1.5 shrink-0">
          <CommandShortcut shortcut="Esc" />
          <span className="font-mono text-[10px] text-[#716D64]">to close</span>
        </div>
      )}
    </div>
  );
};
