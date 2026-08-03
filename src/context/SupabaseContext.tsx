import React, { createContext, useContext, useEffect, useState } from "react";
import type { User, Session, AuthError } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase/client";
import { isSupabaseConfigured } from "../lib/supabase/config";
import type { UserProfile } from "../lib/supabase/types";

export interface SupabaseContextType {
  supabase: typeof supabase;
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
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
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AuthError | Error | null>(null);
  const isConfigured = isSupabaseConfigured();

  const fetchProfile = async (currentUser: User) => {
    try {
      const { data, error: profileErr } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .single();

      if (profileErr) {
        const metadata = currentUser.user_metadata || {};
        setProfile({
          id: currentUser.id,
          email: currentUser.email || "",
          fullName: (metadata["full_name"] as string) || null,
          avatarUrl: (metadata["avatar_url"] as string) || null,
          role: (metadata["role"] as string) || "user",
        });
        return;
      }

      if (data) {
        setProfile({
          id: data.id,
          email: data.email,
          fullName: data.full_name,
          avatarUrl: data.avatar_url,
          role: data.role,
        });
      }
    } catch (err) {
      console.warn("[SupabaseContext] Profile fetch warning:", err);
    }
  };

  useEffect(() => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }

    let mounted = true;

    // Fetch active session on mount
    supabase.auth
      .getSession()
      .then(({ data: { session: initialSession }, error: sessionErr }) => {
        if (!mounted) return;
        if (sessionErr) {
          setError(sessionErr);
        }
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
        if (initialSession?.user) {
          fetchProfile(initialSession.user);
        }
      })
      .catch((err) => {
        if (mounted) setError(err as Error);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    // Listen to authentication state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!mounted) return;
      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (newSession?.user) {
        await fetchProfile(newSession.user);
      } else {
        setProfile(null);
      }
      setLoading(false);
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
    }
  };

  return (
    <SupabaseContext.Provider
      value={{
        supabase,
        user,
        session,
        profile,
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
