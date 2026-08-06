import React, { createContext, useContext, useEffect, useState } from "react";
import type { User, Session, AuthError } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase/client";
import { isSupabaseConfigured } from "../lib/supabase/config";
import {
  profileService,
  formatProfileData,
  type ProfileData,
} from "../lib/supabase/services/profile-service";
import { workspaceService } from "../lib/supabase/services/workspace-service";

export interface SupabaseContextType {
  supabase: typeof supabase;
  user: User | null;
  session: Session | null;
  profile: ProfileData | null;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData | null>>;
  refreshProfile: () => Promise<ProfileData | null>;
  loading: boolean;
  error: AuthError | Error | null;
  isConfigured: boolean;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AuthError | Error | null>(null);
  const isConfigured = isSupabaseConfigured();

  const refreshProfile = async (): Promise<ProfileData | null> => {
    if (!user) {
      setProfile(null);
      return null;
    }
    const { data: userProfile } = await profileService.ensureProfile(user);
    await workspaceService.ensureWorkspace(user.id);
    const formatted = userProfile ? formatProfileData(userProfile) : null;
    setProfile(formatted);
    return formatted;
  };

  useEffect(() => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }

    let mounted = true;

    // Fetch active session, ensure profile, and ensure workspace on mount
    const loadSessionAndProfile = async () => {
      try {
        const {
          data: { session: initialSession },
          error: sessionErr,
        } = await supabase.auth.getSession();
        if (!mounted) return;
        if (sessionErr) {
          setError(sessionErr);
        }
        setSession(initialSession);
        const currentUser = initialSession?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          const { data: userProfile } = await profileService.ensureProfile(currentUser);
          await workspaceService.ensureWorkspace(currentUser.id);
          if (mounted) {
            setProfile(userProfile ? formatProfileData(userProfile) : null);
          }
        } else {
          if (mounted) {
            setProfile(null);
          }
        }
      } catch (err) {
        if (mounted) setError(err as Error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadSessionAndProfile();

    // Listen to authentication state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!mounted) return;
      setSession(newSession);
      const currentUser = newSession?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const { data: userProfile } = await profileService.ensureProfile(currentUser);
        await workspaceService.ensureWorkspace(currentUser.id);
        if (mounted) {
          setProfile(userProfile ? formatProfileData(userProfile) : null);
        }
      } else {
        if (mounted) {
          setProfile(null);
        }
      }
      if (mounted) {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [isConfigured]);

  const signOut = async () => {
    if (!isConfigured) return;
    setLoading(true);
    const { error: signOutErr } = await supabase.auth.signOut();
    if (signOutErr) {
      setError(signOutErr);
    } else {
      setSession(null);
      setUser(null);
      setProfile(null);
    }
    setLoading(false);
  };

  const refreshSession = async () => {
    if (!isConfigured) return;
    const { data, error: refreshErr } = await supabase.auth.refreshSession();
    if (refreshErr) {
      setError(refreshErr);
    } else {
      setSession(data.session);
      setUser(data.user);
      if (data.user) {
        const { data: userProfile } = await profileService.ensureProfile(data.user);
        setProfile(userProfile ? formatProfileData(userProfile) : null);
      }
    }
  };

  return (
    <SupabaseContext.Provider
      value={{
        supabase,
        user,
        session,
        profile,
        setProfile,
        refreshProfile,
        loading,
        error,
        isConfigured,
        signOut,
        refreshSession,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabaseContext = (): SupabaseContextType => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabaseContext must be used within a SupabaseProvider");
  }
  return context;
};
