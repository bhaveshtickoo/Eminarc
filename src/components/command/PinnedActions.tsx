"use client";

import React from "react";
import { Pin, Search, Plus, Eye, FileText, Kanban } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export interface PinnedItem {
  id: string;
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const pinnedActions: PinnedItem[] = [
  { id: "pin-1", name: "New Founder Research", url: "/research", icon: Search },
  { id: "pin-2", name: "Generate Content", url: "/content", icon: FileText },
  { id: "pin-3", name: "AI Visibility Audit", url: "/visibility", icon: Eye },
  { id: "pin-4", name: "Open Growth CRM", url: "/crm", icon: Kanban },
];

export interface PinnedActionsProps {
  onExecute: () => void;
}

export const PinnedActions: React.FC<PinnedActionsProps> = ({ onExecute }) => {
  const navigate = useNavigate();

  const handleAction = (pin: PinnedItem) => {
    navigate({ to: pin.url as any });
    toast.success(`Navigating to ${pin.name}`);
    onExecute();
  };

  return (
    <div className="space-y-1.5 px-3 py-2 border-b border-[rgba(0,0,0,0.06)] bg-[#FCFAF7]/50 select-none">
      <div className="flex items-center space-x-1 font-mono text-[9px] uppercase font-bold text-[#716D64] px-1">
        <Pin className="h-3 w-3 text-[#18181B]" />
        <span>PINNED QUICK ACTIONS</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 font-mono text-xs">
        {pinnedActions.map((pin) => {
          const Icon = pin.icon;

          return (
            <button
              key={pin.id}
              type="button"
              onClick={() => handleAction(pin)}
              className="flex items-center space-x-2 p-2 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-[#18181B] hover:border-[#18181B] hover:bg-[#F7F4EE] transition-all cursor-pointer text-left truncate"
            >
              <Icon className="h-3.5 w-3.5 text-[#18181B] shrink-0" />
              <span className="font-sans text-[11px] font-bold truncate">{pin.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
