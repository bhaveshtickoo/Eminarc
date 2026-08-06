import React from "react";
import { Sun, Moon, Laptop, Check } from "lucide-react";
import { useTheme, ThemeMode } from "./ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  align?: "start" | "end" | "center";
  variant?: "outline" | "ghost" | "default" | "secondary";
  size?: "sm" | "default" | "icon";
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  align = "end",
  variant = "ghost",
  size = "icon",
  showLabel = false,
  className,
}) => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const renderIcon = () => {
    if (theme === "system") {
      return <Laptop className="h-4 w-4 text-muted-foreground transition-transform hover:scale-110" />;
    }
    return resolvedTheme === "dark" ? (
      <Moon className="h-4 w-4 text-amber-400 transition-transform hover:scale-110" />
    ) : (
      <Sun className="h-4 w-4 text-amber-500 transition-transform hover:scale-110" />
    );
  };

  const getLabel = () => {
    if (theme === "light") return "Light";
    if (theme === "dark") return "Dark";
    return "System";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn(
            "relative gap-2 rounded-xl transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary",
            className
          )}
          aria-label={`Current theme is ${theme}. Click to switch theme (Shift+T)`}
          title="Switch theme (Shift+T)"
        >
          {renderIcon()}
          {showLabel && <span className="text-xs font-medium">{getLabel()}</span>}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align} className="w-36 rounded-xl border border-border/80 shadow-md">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center justify-between cursor-pointer rounded-lg text-xs font-medium"
        >
          <div className="flex items-center gap-2">
            <Sun className="h-3.5 w-3.5 text-amber-500" />
            <span>Light</span>
          </div>
          {theme === "light" && <Check className="h-3.5 w-3.5 text-primary font-bold" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center justify-between cursor-pointer rounded-lg text-xs font-medium"
        >
          <div className="flex items-center gap-2">
            <Moon className="h-3.5 w-3.5 text-amber-400" />
            <span>Dark</span>
          </div>
          {theme === "dark" && <Check className="h-3.5 w-3.5 text-primary font-bold" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center justify-between cursor-pointer rounded-lg text-xs font-medium"
        >
          <div className="flex items-center gap-2">
            <Laptop className="h-3.5 w-3.5 text-muted-foreground" />
            <span>System</span>
          </div>
          {theme === "system" && <Check className="h-3.5 w-3.5 text-primary font-bold" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
