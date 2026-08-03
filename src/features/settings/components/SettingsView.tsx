"use client";

import React, { useState } from "react";
import { ShieldCheck, HelpCircle, Blocks, Lock, Clock, Sun, Bell, Shield, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { useWorkspace } from "@/hooks/useWorkspace";
import { SettingsTabs, settingsTabsList } from "./SettingsTabs";
import { SettingsWorkspaceTab } from "./SettingsWorkspaceTab";
import { SettingsMembersTab } from "./SettingsMembersTab";
import { SettingsBrandingTab } from "./SettingsBrandingTab";
import { SettingsBillingTab } from "./SettingsBillingTab";
import { SettingsApiKeysTab } from "./SettingsApiKeysTab";
import { SettingsAuditLogsTab } from "./SettingsAuditLogsTab";

export const SettingsView: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const [activeTabId, setActiveTabId] = useState("tab-workspace");

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Settings Header Banner */}
      <div className="p-6 md:p-8 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-1 rounded-full">
              SETTINGS ENGINE / {currentWorkspace.name.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-[#2D6A4F] bg-[#EDF6F0] px-2.5 py-1 rounded-full border border-[#C8E4D0] font-bold flex items-center">
              <ShieldCheck className="h-3 w-3 mr-1 text-[#2D6A4F]" />
              ENTERPRISE OS CONTROL
            </span>
          </div>

          <h1 className="font-sans font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#111111]">
            Workspace Configuration Hub
          </h1>

          <p className="font-sans text-xs md:text-sm text-[#52525B] mt-1">
            Manage organization details, team seats, white-label branding, API secrets, and compliance security.
          </p>
        </div>
      </div>

      {/* 14 Tab Switcher */}
      <SettingsTabs activeTabId={activeTabId} onSelectTab={setActiveTabId} />

      {/* TAB CONTENT PANELS */}
      {activeTabId === "tab-workspace" && <SettingsWorkspaceTab />}
      {activeTabId === "tab-members" && <SettingsMembersTab />}
      {activeTabId === "tab-branding" && <SettingsBrandingTab />}
      {activeTabId === "tab-billing" && <SettingsBillingTab />}
      {activeTabId === "tab-apikeys" && <SettingsApiKeysTab />}
      {activeTabId === "tab-auditlogs" && <SettingsAuditLogsTab />}

      {/* Generic Settings Tab Panel for remaining tabs */}
      {activeTabId !== "tab-workspace" &&
        activeTabId !== "tab-members" &&
        activeTabId !== "tab-branding" &&
        activeTabId !== "tab-billing" &&
        activeTabId !== "tab-apikeys" &&
        activeTabId !== "tab-auditlogs" && (
          <div className="p-6 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4 max-w-4xl font-sans text-xs">
            <div className="border-b border-[rgba(0,0,0,0.06)] pb-3">
              <h3 className="font-bold text-base text-[#111111]">
                {settingsTabsList.find((t) => t.id === activeTabId)?.name} Settings
              </h3>
              <p className="text-[#52525B] mt-0.5">
                Configure enterprise preferences for {settingsTabsList.find((t) => t.id === activeTabId)?.name.toLowerCase()}.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
              <p className="font-mono text-xs text-[#18181B] font-bold">
                Status: Operational & Connected
              </p>
              <p className="text-[#716D64] leading-relaxed">
                Settings panel is active in workspace mode. All changes made here will persist across team sessions.
              </p>
              <button
                type="button"
                onClick={() => toast.success("Configuration updated successfully")}
                className="mt-2 px-3.5 py-1.5 rounded-xl bg-[#000000] text-[#FFFFFF] font-mono font-bold hover:bg-[#222222] transition-colors cursor-pointer"
              >
                Update Preferences
              </button>
            </div>
          </div>
        )}
    </div>
  );
};
