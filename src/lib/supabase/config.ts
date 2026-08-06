/**
 * Supabase Environment & Client Configuration
 * Eminarc Growth OS
 */

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConfigured: boolean;
}

const getEnvVar = (...keys: string[]): string => {
  for (const key of keys) {
    let val = "";
    if (typeof import.meta !== "undefined" && import.meta.env) {
      val = (import.meta.env[key] as string) || "";
    }
    if (!val && typeof process !== "undefined" && process.env) {
      val = (process.env[key] as string) || "";
    }
    if (val) return val;
  }
  return "";
};

const supabaseUrl = getEnvVar("VITE_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL");
const supabaseAnonKey = getEnvVar(
  "VITE_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
);

const isPlaceholder = (val: string): boolean => {
  if (!val) return true;
  return val.includes("your-project-id") || val.includes("your-anon-key");
};

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    !isPlaceholder(supabaseUrl) &&
    !isPlaceholder(supabaseAnonKey),
  );
};

export const supabaseConfig: SupabaseConfig = {
  url: supabaseUrl || "https://your-project-id.supabase.co",
  anonKey: supabaseAnonKey || "your-anon-key-here",
  isConfigured: isSupabaseConfigured(),
};

if (!supabaseConfig.isConfigured && typeof window !== "undefined") {
  console.warn(
    "[Eminarc Growth OS] Supabase is not fully configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.",
  );
}
