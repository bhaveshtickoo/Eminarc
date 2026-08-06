/**
 * Supabase Server Client Initialization Helper
 * Eminarc Growth OS
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { createServerClient as createSSRServerClient, CookieOptions } from "@supabase/ssr";
import { supabaseConfig } from "./config";
import type { Database } from "./types";

export interface CookieHandler {
  get: (name: string) => string | undefined;
  set: (name: string, value: string, options: CookieOptions) => void;
  remove: (name: string, options: CookieOptions) => void;
}

/**
 * Creates a server-side Supabase client for SSR or server route handlers with custom cookie handling.
 */
export function createServerClient(cookieHandler?: CookieHandler): SupabaseClient<Database> {
  if (cookieHandler) {
    return createSSRServerClient<Database>(supabaseConfig.url, supabaseConfig.anonKey, {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // no-op default or custom handler
        },
      },
    });
  }

  return createClient<Database>(supabaseConfig.url, supabaseConfig.anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Admin / Service Role Supabase Client helper for privileged server side operations.
 * Requires SUPABASE_SERVICE_ROLE_KEY env variable in backend environment.
 */
export function createAdminClient(serviceRoleKey?: string): SupabaseClient<Database> {
  const key =
    serviceRoleKey ||
    (typeof process !== "undefined" && process.env ? process.env["SUPABASE_SERVICE_ROLE_KEY"] : "");
  if (!key) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is required to initialize Admin Supabase client.");
  }
  return createClient<Database>(supabaseConfig.url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
