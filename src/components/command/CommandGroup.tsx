"use client";

import React from "react";

export interface CommandGroupProps {
  heading: string;
  count?: number;
  children: React.ReactNode;
}

export const CommandGroup: React.FC<CommandGroupProps> = ({ heading, count, children }) => {
  return (
    <div className="space-y-1 py-1.5 select-none">
      <div className="flex items-center justify-between px-3.5 py-1 font-mono text-[10px] font-bold text-[#716D64] uppercase tracking-wider">
        <span>{heading}</span>
        {count !== undefined && <span>{count}</span>}
      </div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
};
