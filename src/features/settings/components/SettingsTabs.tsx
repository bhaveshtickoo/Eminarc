"use client";

import React from "react";
import {
  Building2,
  Users,
  Shield,
  Palette,
  Bell,
  Sun,
  CreditCard,
  Blocks,
  Lock,
  Key,
  FileText,
  Clock,
  HelpCircle,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface SettingsTabItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const settingsTabsList: SettingsTabItem[] = [
  { id: "workspace", name: "Workspace", icon: Building2 },
  { id: "organization", name: "Organization", icon: Briefcase },
  { id: "members", name: "Members", icon: Users },
  { id: "roles", name: "Roles & Permissions", icon: Shield },
  { id: "branding", name: "Branding", icon: Palette },
  { id: "notifications", name: "Notifications", icon: Bell },
  { id: "appearance", name: "Appearance", icon: Sun },
  { id: "billing", name: "Billing", icon: CreditCard },
  { id: "integrations", name: "Integrations", icon: Blocks },
  { id: "apikeys", name: "API Keys", icon: Key },
  { id: "security", name: "Security", icon: Lock },
  { id: "auditlogs", name: "Audit Logs", icon: FileText },
];

export interface SettingsTabsProps {
  activeTabId: string;
  onSelectTab: (id: string) => void;
}

export const SettingsTabs: React.FC<SettingsTabsProps> = ({ activeTabId, onSelectTab }) => {
  // Map any legacy "tab-foo" to "foo"
  const normalizedActiveId = activeTabId.replace(/^tab-/, "");

  return (
    <div
      role="tablist"
      aria-label="Settings categories"
      className="flex items-center space-x-1.5 overflow-x-auto pb-2 select-none font-mono text-xs border-b border-[#E5E0D6] scrollbar-none"
    >
      {settingsTabsList.map((tab) => {
        const Icon = tab.icon;
        const isSelected = normalizedActiveId === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelectTab(tab.id)}
            className={cn(
              "flex items-center space-x-2 px-3.5 py-2 rounded-xl border transition-all cursor-pointer shrink-0 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isSelected
                ? "bg-[#000000] text-[#FFFFFF] border-black font-bold shadow-sm"
                : "bg-[#FFFFFF] text-[#716D64] border-[#E5E0D6] hover:bg-[#F7F4EE] hover:text-[#111111]",
            )}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" />
            <span className="whitespace-nowrap">{tab.name}</span>
          </button>
        );
      })}
    </div>
  );
};
