import React, { createContext, useContext } from "react";
import { useSupabaseContext } from "./SupabaseContext";
import { authService } from "../lib/supabase/services/auth-service";
import type { User, Session, AuthError } from "@supabase/supabase-js";
import type { ServiceResult } from "../lib/supabase/types";
import type { ProfileData } from "../lib/supabase/services/profile-service";

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

  const signInWithGoogle = (returnUrl?: string) =>
    authService.signInWithOAuth("google", returnUrl);

  const signInWithGitHub = (returnUrl?: string) =>
    authService.signInWithOAuth("github", returnUrl);

  const value: AuthContextType = {
    user: supabaseCtx.user,
    session: supabaseCtx.session,
    profile: supabaseCtx.profile,
    setProfile: supabaseCtx.setProfile,
    refreshProfile: supabaseCtx.refreshProfile,
    isAuthenticated: Boolean(supabaseCtx.user && supabaseCtx.session),
    isLoading: supabaseCtx.loading,
    error: supabaseCtx.error,
    isConfigured: supabaseCtx.isConfigured,
    signInWithPassword: authService.signInWithPassword,
    signUp: authService.signUp,
    signInWithGoogle,
    signInWithGitHub,
    forgotPassword: authService.forgotPassword,
    resetPassword: authService.resetPassword,
    signOut: supabaseCtx.signOut,
    refreshSession: supabaseCtx.refreshSession,
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
