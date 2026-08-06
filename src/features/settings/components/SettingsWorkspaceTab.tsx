"use client";

import React, { useState } from "react";
import { Building2, Save, Globe, Clock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useWorkspace } from "@/hooks/useWorkspace";

export const SettingsWorkspaceTab: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const [name, setName] = useState(currentWorkspace.name);
  const [slug, setSlug] = useState(currentWorkspace.name.toLowerCase().replace(/\s+/g, "-"));
  const [domain, setDomain] = useState("app.eminarc.com");
  const [timezone, setTimezone] = useState("UTC-05:00 (Eastern Time)");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Workspace Settings Saved", {
      description: "Workspace configuration updated successfully.",
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 select-none max-w-4xl">
      <div className="p-6 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
        <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] pb-3">
          <div>
            <h3 className="font-sans font-bold text-base text-[#111111]">
              General Workspace Profile
            </h3>
            <p className="font-sans text-xs text-[#52525B]">
              Manage workspace name, slug, and regional settings.
            </p>
          </div>
          <span className="font-mono text-[9px] bg-[#EDF6F0] text-[#1E4620] px-2 py-0.5 rounded font-bold border border-[#C8E4D0]">
            ACTIVE WORKSPACE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-[#111111]">Workspace Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] px-3 py-2 text-xs font-medium text-[#18181B] focus:outline-none focus:ring-1 focus:ring-[#18181B]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-[#111111]">Workspace Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] px-3 py-2 text-xs font-mono text-[#18181B] focus:outline-none focus:ring-1 focus:ring-[#18181B]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-[#111111]">Custom Workspace Domain</label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] px-3 py-2 text-xs font-mono text-[#18181B] focus:outline-none focus:ring-1 focus:ring-[#18181B]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-[#111111]">Default Timezone</label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] px-3 py-2 text-xs font-mono text-[#18181B] focus:outline-none cursor-pointer"
            >
              <option value="UTC-05:00 (Eastern Time)">UTC-05:00 (Eastern Time)</option>
              <option value="UTC+00:00 (London)">UTC+00:00 (London)</option>
              <option value="UTC+05:30 (India)">UTC+05:30 (India)</option>
              <option value="UTC-08:00 (Pacific Time)">UTC-08:00 (Pacific Time)</option>
            </select>
          </div>
        </div>

        <div className="pt-3 flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#000000] text-[#FFFFFF] font-mono text-xs font-bold hover:bg-[#222222] transition-colors cursor-pointer"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Workspace Changes</span>
          </button>
        </div>
      </div>
    </form>
  );
};
