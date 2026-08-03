"use client";

import React, { useState } from "react";
import { Palette, Upload, Check, Save } from "lucide-react";
import { toast } from "sonner";

export const SettingsBrandingTab: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState("#18181B");
  const [accentColor, setAccentColor] = useState("#2D6A4F");
  const [whiteLabelDomain, setWhiteLabelDomain] = useState("reports.eminarc.com");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Branding System Updated", {
      description: "Custom colors and logo assets saved.",
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 select-none max-w-4xl">
      <div className="p-6 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
        <div className="border-b border-[rgba(0,0,0,0.06)] pb-3">
          <h3 className="font-sans font-bold text-base text-[#111111]">Brand Identity & Custom Styling</h3>
          <p className="font-sans text-xs text-[#52525B]">Customize brand palette, logos, and white-label consulting reports.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
          <div className="space-y-2">
            <label className="font-bold text-[#111111]">Primary Ink Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="h-8 w-12 rounded bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="font-mono text-xs rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] px-3 py-1.5 text-[#18181B]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-bold text-[#111111]">Accent Forest Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="h-8 w-12 rounded bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="font-mono text-xs rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] px-3 py-1.5 text-[#18181B]"
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="font-bold text-[#111111]">White-Label Report Subdomain</label>
            <input
              type="text"
              value={whiteLabelDomain}
              onChange={(e) => setWhiteLabelDomain(e.target.value)}
              className="w-full rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] px-3.5 py-2 text-xs font-mono text-[#18181B] focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-3 flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#000000] text-[#FFFFFF] font-mono text-xs font-bold hover:bg-[#222222] transition-colors cursor-pointer"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Branding Changes</span>
          </button>
        </div>
      </div>
    </form>
  );
};
