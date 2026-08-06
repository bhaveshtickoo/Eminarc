import React, { createContext, useContext } from "react";
import { useSupabaseContext } from "./SupabaseContext";
import { authService } from "../lib/supabase/services/auth-service";
import type { User, Session, AuthError } from "@supabase/supabase-js";
import type { ServiceResult } from "../lib/supabase/types";
import type { ProfileData } from "../lib/supabase/services/profile-service";

export const isDemoModeEnabled = (): boolean => {
  if (typeof import.meta !== "undefined" && import.meta.env) {
    if (import.meta.env.VITE_DEMO_MODE === "true" || import.meta.env.VITE_DEMO_MODE === true) {
      return true;
    }
  }
  if (typeof process !== "undefined" && process.env) {
    if (process.env["VITE_DEMO_MODE"] === "true" || process.env["VITE_DEMO_MODE"] === "1") {
      return true;
    }
  }
  return false;
};

export const DEMO_USER: User = {
  id: "demo-user",
  app_metadata: { provider: "email" },
  user_metadata: { full_name: "Demo User" },
  aud: "authenticated",
  created_at: "2026-01-01T00:00:00.000Z",
  email: "demo@eminarc.ai",
  phone: "",
  role: "authenticated",
  updated_at: "2026-01-01T00:00:00.000Z",
};

export const DEMO_SESSION: Session = {
  access_token: "demo-access-token",
  token_type: "bearer",
  expires_in: 3600,
  refresh_token: "demo-refresh-token",
  user: DEMO_USER,
};

export const DEMO_PROFILE: ProfileData = {
  id: "demo-user",
  email: "demo@eminarc.ai",
  full_name: "Demo User",
  fullName: "Demo User",
  avatar_url: null,
  avatarUrl: null,
  role: "owner",
  onboarding_completed: true,
  onboardingCompleted: true,
  created_at: "2026-01-01T00:00:00.000Z",
  updated_at: "2026-01-01T00:00:00.000Z",
};

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: ProfileData | null;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData | null>>;
  refreshProfile: () => Promise<ProfileData | null>;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | Error | null;
  isConfigured: boolean;
  isDemoMode: boolean;
  signInWithPassword: typeof authService.signInWithPassword;
  signUp: typeof authService.signUp;
  signInWithGoogle: (returnUrl?: string) => Promise<ServiceResult<{ url: string | null }>>;
  signInWithGitHub: (returnUrl?: string) => Promise<ServiceResult<{ url: string | null }>>;
  forgotPassword: typeof authService.forgotPassword;
  resetPassword: typeof authService.resetPassword;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const supabaseCtx = useSupabaseContext();
  const isDemo = isDemoModeEnabled();

  const signInWithGoogle = (returnUrl?: string) => authService.signInWithOAuth("google", returnUrl);

  const signInWithGitHub = (returnUrl?: string) => authService.signInWithOAuth("github", returnUrl);

  const value: AuthContextType = {
    user: isDemo ? DEMO_USER : supabaseCtx.user,
    session: isDemo ? DEMO_SESSION : supabaseCtx.session,
    profile: isDemo ? DEMO_PROFILE : supabaseCtx.profile,
    setProfile: supabaseCtx.setProfile,
    refreshProfile: isDemo ? async () => DEMO_PROFILE : supabaseCtx.refreshProfile,
    isAuthenticated: isDemo ? true : Boolean(supabaseCtx.user && supabaseCtx.session),
    isLoading: isDemo ? false : supabaseCtx.loading,
    error: isDemo ? null : supabaseCtx.error,
    isConfigured: isDemo ? true : supabaseCtx.isConfigured,
    isDemoMode: isDemo,
    signInWithPassword: authService.signInWithPassword,
    signUp: authService.signUp,
    signInWithGoogle,
    signInWithGitHub,
    forgotPassword: authService.forgotPassword,
    resetPassword: authService.resetPassword,
    signOut: isDemo ? async () => {} : supabaseCtx.signOut,
    refreshSession: isDemo ? async () => {} : supabaseCtx.refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
