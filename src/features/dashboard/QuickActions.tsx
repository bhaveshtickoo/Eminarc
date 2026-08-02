import React from "react";
import { SearchCode, Sparkles, Eye, UserPlus, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

export const quickActionsList = [
  {
    id: "act-1",
    label: "Research Company",
    icon: SearchCode,
    badge: "AGENTS",
  },
  {
    id: "act-2",
    label: "Generate Content",
    icon: Sparkles,
    badge: "COPILOT",
  },
  {
    id: "act-3",
    label: "Run AI Audit",
    icon: Eye,
    badge: "SCANNER",
  },
  {
    id: "act-4",
    label: "Add Lead",
    icon: UserPlus,
    badge: "CRM",
  },
  {
    id: "act-5",
    label: "New Experiment",
    icon: FlaskConical,
    badge: "LABS",
  },
];

export const QuickActions: React.FC = () => {
  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 md:p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#716D64]">
            ACTIONS / FAST
          </span>
        </div>
        <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#716D64]">
          Quick Workflows
        </h4>
      </div>

      {/* Grid of Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {quickActionsList.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              type="button"
              className={cn(
                "group flex flex-col items-center justify-center rounded-2xl bg-[#FFFFFF] border border-[#E5E0D6] p-4 text-center transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-[#18181B] hover:bg-[#F7F4EE] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] active:scale-[0.98]",
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#000000] text-[#FFFFFF] shadow-sm mb-2.5 transition-transform group-hover:scale-105">
                <Icon className="h-4 w-4" />
              </div>
              <span className="font-sans text-xs font-semibold text-[#18181B] tracking-tight line-clamp-1">
                {act.label}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#716D64] mt-0.5">
                {act.badge}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
