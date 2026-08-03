import React, { useState } from "react";
import { Sun, Moon, Monitor, LayoutGrid, Check } from "lucide-react";
import { toast } from "sonner";

export const SettingsAppearanceTab: React.FC = () => {
  const [themeMode, setThemeMode] = useState<"cream" | "dark" | "system">("cream");
  const [density, setDensity] = useState<"compact" | "comfortable">("comfortable");

  const selectTheme = (mode: "cream" | "dark" | "system") => {
    setThemeMode(mode);
    toast.success(`Appearance theme updated to ${mode}`);
  };

  return (
    <div className="space-y-6 max-w-4xl font-sans">
      <div className="p-6 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-6">
        <div className="border-b border-[rgba(0,0,0,0.06)] pb-4">
          <h3 className="font-bold text-lg text-[#111111] flex items-center gap-2">
            <Sun className="h-5 w-5 text-[#716D64]" />
            Appearance & Interface Theme
          </h3>
          <p className="text-xs text-[#52525B] mt-0.5">
            Customize visual workspace themes, layout density, and typography preferences.
          </p>
        </div>

        <div className="space-y-4">
          <label className="text-xs font-semibold text-[#18181B] block">Color Palette</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                id: "cream",
                name: "Eminarc Cream (Default)",
                desc: "Signature high-contrast editorial look with subtle warm grid background.",
                icon: Sun,
                bgClass: "bg-[#FCFAF7] border-[#E5E0D6]",
              },
              {
                id: "dark",
                name: "Dark Onyx",
                desc: "Low-light mode designed for intensive late-night data analysis.",
                icon: Moon,
                bgClass: "bg-[#18181B] border-[#27272A] text-white",
              },
              {
                id: "system",
                name: "System Match",
                desc: "Automatically sync theme with your operating system preference.",
                icon: Monitor,
                bgClass: "bg-[#FFFFFF] border-[#E5E0D6]",
              },
            ].map((theme) => {
              const Icon = theme.icon;
              const isSelected = themeMode === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => selectTheme(theme.id as any)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between h-32 ${
                    theme.bgClass
                  } ${isSelected ? "ring-2 ring-black font-bold shadow-md" : "hover:border-[#111111]"}`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-4 w-4" />
                    {isSelected && <Check className="h-4 w-4 text-emerald-600" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold">{theme.name}</h4>
                    <p className="text-[11px] text-[#716D64] mt-0.5 leading-snug">{theme.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-[rgba(0,0,0,0.06)] space-y-3">
          <label className="text-xs font-semibold text-[#18181B] flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-[#716D64]" /> Table & Dashboard Density
          </label>
          <div className="flex items-center space-x-3">
            {[
              { id: "comfortable", label: "Comfortable (Default)" },
              { id: "compact", label: "Compact Data View" },
            ].map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  setDensity(d.id as any);
                  toast.success(`Density updated to ${d.label}`);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                  density === d.id
                    ? "bg-[#000000] text-[#FFFFFF] border-black font-bold"
                    : "bg-[#FFFFFF] text-[#716D64] border-[#E5E0D6] hover:bg-[#F7F4EE]"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
