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
  { id: "tab-workspace", name: "Workspace", icon: Building2 },
  { id: "tab-organization", name: "Organization", icon: Briefcase },
  { id: "tab-members", name: "Members", icon: Users },
  { id: "tab-roles", name: "Roles", icon: Shield },
  { id: "tab-branding", name: "Branding", icon: Palette },
  { id: "tab-notifications", name: "Notifications", icon: Bell },
  { id: "tab-appearance", name: "Appearance", icon: Sun },
  { id: "tab-billing", name: "Billing", icon: CreditCard },
  { id: "tab-integrations", name: "Integrations", icon: Blocks },
  { id: "tab-security", name: "Security", icon: Lock },
  { id: "tab-apikeys", name: "API Keys", icon: Key },
  { id: "tab-auditlogs", name: "Audit Logs", icon: FileText },
  { id: "tab-history", name: "Activity History", icon: Clock },
  { id: "tab-support", name: "Support", icon: HelpCircle },
];

export interface SettingsTabsProps {
  activeTabId: string;
  onSelectTab: (id: string) => void;
}

export const SettingsTabs: React.FC<SettingsTabsProps> = ({
  activeTabId,
  onSelectTab,
}) => {
  return (
    <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 select-none font-mono text-xs border-b border-[#E5E0D6]">
      {settingsTabsList.map((tab) => {
        const Icon = tab.icon;
        const isSelected = activeTabId === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={cn(
              "flex items-center space-x-2 px-3.5 py-2 rounded-xl border transition-all cursor-pointer shrink-0 font-medium",
              isSelected
                ? "bg-[#000000] text-[#FFFFFF] border-black font-bold shadow-sm"
                : "bg-[#FFFFFF] text-[#716D64] border-[#E5E0D6] hover:bg-[#F7F4EE] hover:text-[#111111]",
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{tab.name}</span>
          </button>
        );
      })}
    </div>
  );
};
