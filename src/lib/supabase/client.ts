/**
 * Supabase Browser Client Singleton
 * Eminarc Growth OS
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { supabaseConfig } from "./config";
import type { Database } from "./types";

let supabaseClientInstance: SupabaseClient<Database> | null = null;

/**
 * Gets or initializes the browser Supabase client singleton instance.
 */
export const getSupabaseClient = (): SupabaseClient<Database> => {
  if (supabaseClientInstance) {
    return supabaseClientInstance;
  }

  supabaseClientInstance = createClient<Database>(supabaseConfig.url, supabaseConfig.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "eminarc_supabase_auth_token",
    },
  });

  return supabaseClientInstance;
};

/**
 * Exported browser client instance for convenient access across components and services.
 */
export const supabase = getSupabaseClient();
