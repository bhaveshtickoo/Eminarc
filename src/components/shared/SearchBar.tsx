import React from "react";
import { Search } from "lucide-react";
import { cn } from "@/design-system/utils/cn";

export interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  className,
  placeholder = "Search commands, research, leads...",
}) => {
  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#716D64] pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-9 pl-9 pr-12 bg-[#FFFFFF] text-[#18181B] text-xs font-sans placeholder-[#9E988D] rounded-full border border-[#E5E0D6] transition-all duration-150 ease-out focus:outline-none focus:border-[#18181B] focus:ring-1 focus:ring-[#18181B] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]"
      />
      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center space-x-0.5 rounded border border-[#E5E0D6] bg-[#FBF9F5] px-1.5 py-0.5 font-mono text-[9px] font-medium text-[#716D64] pointer-events-none">
        <span>⌘</span>
        <span>K</span>
      </div>
    </div>
  );
};
