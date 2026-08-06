import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { profileService } from "@/lib/supabase/services/profile-service";
import { toast } from "sonner";

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  resolvedTheme: "light" | "dark";
  systemTheme: "light" | "dark";
  cycleTheme: () => void;
}

const STORAGE_KEY = "eminarc-theme";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "system";
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (saved && ["light", "dark", "system"].includes(saved)) {
      return saved;
    }
  } catch {
    // Ignore storage errors
  }
  return "system";
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile } = useAuth();
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme);
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(getSystemTheme);

  // Compute actual resolved theme
  const resolvedTheme: "light" | "dark" = theme === "system" ? systemTheme : theme;

  // Apply class to HTML element dynamically
  const applyThemeClass = useCallback((resolved: "light" | "dark") => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (resolved === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  }, []);

  // Update theme state and save to local storage & Supabase
  const setTheme = useCallback(
    async (newTheme: ThemeMode, syncWithProfile = true) => {
      setThemeState(newTheme);

      try {
        localStorage.setItem(STORAGE_KEY, newTheme);
      } catch {
        // Ignore local storage error
      }

      // Sync with Supabase profile if user is logged in
      if (syncWithProfile && user?.id) {
        try {
          await profileService.updateProfile(user.id, {
            theme: newTheme,
          });
        } catch (err) {
          console.warn("[ThemeProvider] Failed to persist theme to Supabase profile:", err);
        }
      }
    },
    [user?.id]
  );

  // Cycle theme: light -> dark -> system -> light
  const cycleTheme = useCallback(() => {
    const nextTheme: ThemeMode =
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(nextTheme);

    const label =
      nextTheme === "light" ? "Light ☀" : nextTheme === "dark" ? "Dark 🌙" : "System 🖥";
    toast.info(`Theme set to ${label}`, { duration: 1500 });
  }, [theme, setTheme]);

  // Sync state when user logs in and has a profile theme preference
  useEffect(() => {
    if (profile?.theme && ["light", "dark", "system"].includes(profile.theme)) {
      if (profile.theme !== theme) {
        setThemeState(profile.theme as ThemeMode);
        try {
          localStorage.setItem(STORAGE_KEY, profile.theme);
        } catch {
          // Ignore
        }
      }
    }
  }, [profile?.theme]);

  // Handle system preference change
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setSystemTheme(mediaQuery.matches ? "dark" : "light");
    };

    setSystemTheme(mediaQuery.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Sync HTML class whenever resolved theme changes
  useEffect(() => {
    applyThemeClass(resolvedTheme);
  }, [resolvedTheme, applyThemeClass]);

  // Cross-tab synchronization
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue && ["light", "dark", "system"].includes(e.newValue)) {
        setThemeState(e.newValue as ThemeMode);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Global Keyboard Shortcut (Shift + T)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when user is typing in input, textarea, or contenteditable
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable ||
        target.getAttribute("role") === "textbox"
      ) {
        return;
      }

      if (e.shiftKey && e.key.toUpperCase() === "T" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        cycleTheme();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cycleTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        resolvedTheme,
        systemTheme,
        cycleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
