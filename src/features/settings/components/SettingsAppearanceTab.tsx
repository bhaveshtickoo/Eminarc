import React, { useState } from "react";
import { Sun, Moon, Laptop, LayoutGrid, Check, Palette, Sparkles, Eye } from "lucide-react";
import { useTheme, ThemeMode } from "@/components/theme/ThemeProvider";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

export const SettingsAppearanceTab: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [accentColor, setAccentColor] = useState<string>("emerald");
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  const selectThemeMode = (mode: ThemeMode) => {
    setTheme(mode);
    const label = mode === "light" ? "Light ☀" : mode === "dark" ? "Dark 🌙" : "System 🖥";
    toast.success(`Theme updated to ${label}`);
  };

  return (
    <div className="space-y-6 max-w-4xl font-sans">
      <div className="p-6 rounded-[18px] bg-card border border-border/80 shadow-sm space-y-6">
        <div className="border-b border-border/60 pb-4">
          <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
            <Sun className="h-5 w-5 text-primary" />
            Appearance & Interface Theme
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Customize visual workspace themes, color modes, typography, and motion preferences.
          </p>
        </div>

        {/* Theme Selector */}
        <div className="space-y-4">
          <label className="text-xs font-semibold text-foreground block">Color Theme Mode (Shift + T)</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                id: "light" as ThemeMode,
                name: "Light Mode ☀",
                desc: "High-contrast editorial layout optimized for daytime productivity.",
                icon: Sun,
              },
              {
                id: "dark" as ThemeMode,
                name: "Dark Onyx 🌙",
                desc: "Sleek low-light mode designed for late-night data analysis.",
                icon: Moon,
              },
              {
                id: "system" as ThemeMode,
                name: "System Match 🖥",
                desc: "Automatically sync theme with your operating system preference.",
                icon: Laptop,
              },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = theme === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectThemeMode(item.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between h-32 bg-card ${
                    isSelected
                      ? "ring-2 ring-primary border-primary font-bold shadow-sm"
                      : "border-border/80 hover:border-foreground/30 text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <Icon className={`h-4 w-4 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    {isSelected && <Check className="h-4 w-4 text-emerald-500 font-bold" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{item.name}</h4>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{item.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accent Color Placeholder */}
        <div className="pt-4 border-t border-border/60 space-y-3">
          <label className="text-xs font-semibold text-foreground flex items-center gap-2">
            <Palette className="h-4 w-4 text-primary" /> Brand Accent Color (Customization)
          </label>
          <div className="flex items-center space-x-3">
            {[
              { id: "emerald", label: "Eminarc Emerald", colorBg: "bg-emerald-500" },
              { id: "violet", label: "Royal Violet", colorBg: "bg-violet-500" },
              { id: "amber", label: "Amber Gold", colorBg: "bg-amber-500" },
              { id: "slate", label: "Executive Obsidian", colorBg: "bg-slate-800" },
            ].map((acc) => (
              <button
                key={acc.id}
                type="button"
                onClick={() => {
                  setAccentColor(acc.id);
                  toast.info(`Accent color set to ${acc.label}`);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                  accentColor === acc.id
                    ? "border-primary bg-primary/10 text-primary font-bold"
                    : "border-border/80 text-muted-foreground hover:bg-accent"
                }`}
              >
                <span className={`h-3 w-3 rounded-full ${acc.colorBg}`} />
                <span>{acc.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar & Dashboard Density */}
        <div className="pt-4 border-t border-border/60 space-y-3">
          <label className="text-xs font-semibold text-foreground flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-primary" /> Sidebar & Dashboard Density
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
                  toast.success(`Layout density set to ${d.label}`);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                  density === d.id
                    ? "bg-primary text-primary-foreground border-primary font-bold"
                    : "bg-card text-muted-foreground border-border/80 hover:bg-accent"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Motion & Animations Settings */}
        <div className="pt-4 border-t border-border/60 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" /> Interface Animations & Transitions
              </label>
              <p className="text-[11px] text-muted-foreground">Enable subtle micro-interactions and smooth page transitions.</p>
            </div>
            <Switch
              checked={animationsEnabled}
              onCheckedChange={(checked) => {
                setAnimationsEnabled(checked);
                toast.success(`Animations ${checked ? "enabled" : "disabled"}`);
              }}
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="space-y-0.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary" /> Reduced Motion Preference
              </label>
              <p className="text-[11px] text-muted-foreground">Minimize motion for enhanced accessibility (prefers-reduced-motion).</p>
            </div>
            <Switch
              checked={reducedMotion}
              onCheckedChange={(checked) => {
                setReducedMotion(checked);
                toast.success(`Reduced motion ${checked ? "enabled" : "disabled"}`);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
