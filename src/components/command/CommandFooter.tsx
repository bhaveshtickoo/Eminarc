"use client";

import React from "react";
import { CommandShortcut } from "./CommandShortcut";

export const CommandFooter: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-[#FCFAF7] border-t border-[rgba(0,0,0,0.08)] rounded-b-[18px] font-mono text-[10px] text-[#716D64] select-none">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1">
          <CommandShortcut shortcut="↑" />
          <CommandShortcut shortcut="↓" />
          <span>Navigate</span>
        </div>

        <div className="flex items-center space-x-1">
          <CommandShortcut shortcut="↵" />
          <span>Open</span>
        </div>

        <div className="flex items-center space-x-1">
          <CommandShortcut shortcut="Tab" />
          <span>Filter</span>
        </div>
      </div>

      <div className="flex items-center space-x-1.5 font-semibold text-[#18181B]">
        <span>EMINARC COMMAND OS v1.0</span>
      </div>
    </div>
  );
};
