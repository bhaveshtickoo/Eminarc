"use client";

import React from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { useWorkspace } from "@/hooks/useWorkspace";
import { SettingsTabs, settingsTabsList } from "./SettingsTabs";
import { SettingsWorkspaceTab } from "./SettingsWorkspaceTab";
import { SettingsOrganizationTab } from "./SettingsOrganizationTab";
import { SettingsMembersTab } from "./SettingsMembersTab";
import { SettingsRolesTab } from "./SettingsRolesTab";
import { SettingsBrandingTab } from "./SettingsBrandingTab";
import { SettingsNotificationsTab } from "./SettingsNotificationsTab";
import { SettingsAppearanceTab } from "./SettingsAppearanceTab";
import { SettingsBillingTab } from "./SettingsBillingTab";
import { SettingsIntegrationsTab } from "./SettingsIntegrationsTab";
import { SettingsApiKeysTab } from "./SettingsApiKeysTab";
import { SettingsSecurityTab } from "./SettingsSecurityTab";
import { SettingsAuditLogsTab } from "./SettingsAuditLogsTab";

export const SettingsView: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const navigate = useNavigate();
  const search = useSearch({ from: "/_dashboard/settings" }) as { tab?: string };

  const rawTab = search.tab || "workspace";
  const activeTabId = rawTab.replace(/^tab-/, "");

  const activeTabItem = settingsTabsList.find((t) => t.id === activeTabId) || settingsTabsList[0]!;
  const breadcrumbLabel = activeTabId === "roles" ? "Roles" : activeTabItem.name;
  const activeTabLabel = breadcrumbLabel;

  const handleSelectTab = (tabId: string) => {
    navigate({
      to: "/settings",
      search: { tab: tabId },
    });
  };

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Settings Header Banner with Functional TanStack Router Breadcrumb */}
      <div className="p-6 md:p-8 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          {/* Functional SaaS Breadcrumb Header */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center space-x-2 font-mono text-xs mb-3"
          >
            <Link
              to="/settings"
              search={{ tab: "workspace" }}
              className="font-semibold text-[#716D64] hover:text-[#111111] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1 -ml-1"
            >
              Settings
            </Link>
            <span className="text-[#A19D94] select-none font-bold">/</span>
            <span
              aria-current="page"
              className="font-bold text-[#111111] cursor-default pointer-events-none select-none"
            >
              {breadcrumbLabel}
            </span>
          </nav>

          <div className="flex items-center space-x-2 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-1 rounded-full">
              {currentWorkspace.name.toUpperCase()} OS CONFIG
            </span>
            <span className="font-mono text-[10px] text-[#2D6A4F] bg-[#EDF6F0] px-2.5 py-1 rounded-full border border-[#C8E4D0] font-bold flex items-center">
              <ShieldCheck className="h-3 w-3 mr-1 text-[#2D6A4F]" />
              ENTERPRISE OS CONTROL
            </span>
          </div>

          <h1 className="font-sans font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#111111]">
            {activeTabLabel} Configuration
          </h1>

          <p className="font-sans text-xs md:text-sm text-[#52525B] mt-1">
            Manage workspace organization, team seats, white-label branding, API secrets, and
            compliance policies.
          </p>
        </div>
      </div>

      {/* 12 Tab Switcher with TanStack Router URL Sync */}
      <SettingsTabs activeTabId={activeTabId} onSelectTab={handleSelectTab} />

      {/* TAB CONTENT PANELS */}
      {activeTabId === "workspace" && <SettingsWorkspaceTab />}
      {activeTabId === "organization" && <SettingsOrganizationTab />}
      {activeTabId === "members" && <SettingsMembersTab />}
      {activeTabId === "roles" && <SettingsRolesTab />}
      {activeTabId === "branding" && <SettingsBrandingTab />}
      {activeTabId === "notifications" && <SettingsNotificationsTab />}
      {activeTabId === "appearance" && <SettingsAppearanceTab />}
      {activeTabId === "billing" && <SettingsBillingTab />}
      {activeTabId === "integrations" && <SettingsIntegrationsTab />}
      {activeTabId === "apikeys" && <SettingsApiKeysTab />}
      {activeTabId === "security" && <SettingsSecurityTab />}
      {activeTabId === "auditlogs" && <SettingsAuditLogsTab />}
    </div>
  );
};
