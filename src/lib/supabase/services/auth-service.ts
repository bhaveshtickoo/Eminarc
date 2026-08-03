/**
 * Modular Supabase Authentication Service
 * Eminarc Growth OS
 */

import { supabase } from "../client";
import type { UserProfile, ServiceResult } from "../types";
import type { User, Session, AuthError, Provider } from "@supabase/supabase-js";

export const authService = {
  /**
   * Sign in user with email and password
   */
  async signInWithPassword(
    email: string,
    password: string
  ): Promise<ServiceResult<{ user: User | null; session: Session | null }>> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { data: null, error };
      return { data: { user: data.user, session: data.session }, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Sign up new user with email, password, and optional metadata
   */
  async signUp(
    email: string,
    password: string,
    fullName?: string
  ): Promise<ServiceResult<{ user: User | null; session: Session | null }>> {
    try {
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectTo,
          data: {
            full_name: fullName || null,
          },
        },
      });
      if (error) return { data: null, error };

      if (data.user) {
        try {
          await supabase.from("profiles").upsert({
            id: data.user.id,
            email: data.user.email || email,
            full_name: fullName || null,
            role: "user",
            updated_at: new Date().toISOString(),
          });
        } catch {
          // Table might not exist yet
        }
      }

      return { data: { user: data.user, session: data.session }, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Sign in with Social OAuth Provider (Google, GitHub)
   */
  async signInWithOAuth(provider: Provider, returnUrl?: string): Promise<ServiceResult<{ url: string | null }>> {
    try {
      const redirectTo = `${window.location.origin}/auth/callback${
        returnUrl ? `?redirect=${encodeURIComponent(returnUrl)}` : ""
      }`;
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) return { data: null, error };
      return { data: { url: data.url }, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Send password recovery email
   */
  async forgotPassword(email: string): Promise<ServiceResult<null>> {
    try {
      const redirectTo = `${window.location.origin}/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });
      if (error) return { data: null, error };
      return { data: null, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Reset password for authenticated user (following password reset email link)
   */
  async resetPassword(newPassword: string): Promise<ServiceResult<User>> {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) return { data: null, error };
      return { data: data.user, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Sign out current user session
   */
  async signOut(): Promise<ServiceResult<null>> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) return { data: null, error };
      return { data: null, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Fetch user profile from Supabase Database
   */
  async getUserProfile(userId: string): Promise<ServiceResult<UserProfile>> {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) return { data: null, error };
      return {
        data: {
          id: data.id,
          email: data.email,
          fullName: data.full_name,
          avatarUrl: data.avatar_url,
          role: data.role,
        },
        error: null,
      };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Update user profile metadata
   */
  async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<ServiceResult<null>> {
    try {
      const payload: {
        full_name?: string | null;
        avatar_url?: string | null;
        role?: string | null;
        updated_at: string;
      } = {
        updated_at: new Date().toISOString(),
      };

      if (updates.fullName !== undefined) payload.full_name = updates.fullName;
      if (updates.avatarUrl !== undefined) payload.avatar_url = updates.avatarUrl;
      if (updates.role !== undefined) payload.role = updates.role;

      const { error } = await supabase.from("profiles").update(payload).eq("id", userId);

      if (error) return { data: null, error };
      return { data: null, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },
};
