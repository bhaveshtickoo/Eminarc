/**
 * Modular Supabase Profile Service
 * Eminarc Growth OS
 */

import type { User } from "@supabase/supabase-js";
import { supabase } from "../client";
import { isSupabaseConfigured } from "../config";
import type { Tables, InsertTables, UpdateTables, ServiceResult, UserProfile } from "../types";

export type Profile = Tables<"profiles">;
export type ProfileInsert = InsertTables<"profiles">;
export type ProfileUpdate = UpdateTables<"profiles">;

export interface ProfileData extends Profile {
  fullName?: string | null;
  avatarUrl?: string | null;
  onboardingCompleted?: boolean;
  theme?: string | null;
}

export const formatProfileData = (profile: Profile): ProfileData => ({
  ...profile,
  fullName: profile.full_name,
  avatarUrl: profile.avatar_url,
  onboardingCompleted: profile.onboarding_completed ?? false,
  theme: profile.theme ?? null,
});

/**
 * User input type accepted by createProfile and ensureProfile.
 * Supports Supabase Auth User object or custom user profile payloads.
 */
export type UserInput =
  | User
  | {
      id: string;
      email?: string | null;
      full_name?: string | null;
      avatar_url?: string | null;
      role?: string | null;
      onboarding_completed?: boolean;
      theme?: string | null;
      user_metadata?: Record<string, any>;
      [key: string]: any;
    };

export const profileService = {
  /**
   * Fetch user profile from Supabase Database by User ID
   */
  async getProfile(userId: string): Promise<ServiceResult<Profile>> {
    try {
      if (!userId) {
        return {
          data: null,
          error: new Error("User ID is required to fetch profile"),
        };
      }

      if (!isSupabaseConfigured()) {
        return {
          data: {
            id: userId,
            email: "user@eminarc.com",
            full_name: "Eminarc User",
            avatar_url: null,
            role: "user",
            onboarding_completed: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          error: null,
        };
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        return { data: null, error };
      }

      return { data, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Create or upsert a new profile row from auth.user or user metadata
   */
  async createProfile(user: UserInput): Promise<ServiceResult<Profile>> {
    try {
      if (!user || !user.id) {
        return {
          data: null,
          error: new Error("Valid user object with an ID is required to create a profile"),
        };
      }

      const userMetadata = (user as User).user_metadata || {};
      const email = user.email || (userMetadata["email"] as string) || "";

      const fullName =
        (user as any).full_name ??
        (user as any).fullName ??
        (userMetadata["full_name"] as string) ??
        (userMetadata["fullName"] as string) ??
        (userMetadata["name"] as string) ??
        null;

      const avatarUrl =
        (user as any).avatar_url ??
        (user as any).avatarUrl ??
        (userMetadata["avatar_url"] as string) ??
        (userMetadata["avatarUrl"] as string) ??
        (userMetadata["picture"] as string) ??
        null;

      const role = (user as any).role ?? (userMetadata["role"] as string) ?? "user";
      const onboardingCompleted =
        (user as any).onboarding_completed ??
        (user as any).onboardingCompleted ??
        (userMetadata["onboarding_completed"] as boolean) ??
        false;

      const now = new Date().toISOString();
      const newProfileData: ProfileInsert = {
        id: user.id,
        email,
        full_name: fullName,
        avatar_url: avatarUrl,
        role,
        onboarding_completed: onboardingCompleted,
        created_at: now,
        updated_at: now,
      };

      if (!isSupabaseConfigured()) {
        const mockProfile: Profile = {
          id: newProfileData.id,
          email: newProfileData.email,
          full_name: newProfileData.full_name ?? null,
          avatar_url: newProfileData.avatar_url ?? null,
          role: newProfileData.role ?? "user",
          onboarding_completed: newProfileData.onboarding_completed ?? false,
          created_at: newProfileData.created_at || now,
          updated_at: newProfileData.updated_at || now,
        };
        return { data: mockProfile, error: null };
      }

      const { data, error } = await supabase
        .from("profiles")
        .upsert(newProfileData, { onConflict: "id" })
        .select("*")
        .single();

      if (error) {
        return { data: null, error };
      }

      return { data, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Update profile fields for a given User ID
   */
  async updateProfile(
    userId: string,
    updates:
      | Partial<ProfileUpdate>
      | Partial<UserProfile>
      | { onboardingCompleted?: boolean; [key: string]: any },
  ): Promise<ServiceResult<Profile>> {
    try {
      if (!userId) {
        return {
          data: null,
          error: new Error("User ID is required to update profile"),
        };
      }

      const now = new Date().toISOString();
      const payload: ProfileUpdate = {
        updated_at: now,
      };

      if ("email" in updates && updates.email !== undefined) payload.email = updates.email;
      if ("full_name" in updates && updates.full_name !== undefined)
        payload.full_name = updates.full_name;
      if ("fullName" in updates && (updates as UserProfile).fullName !== undefined) {
        payload.full_name = (updates as UserProfile).fullName;
      }
      if ("avatar_url" in updates && updates.avatar_url !== undefined)
        payload.avatar_url = updates.avatar_url;
      if ("avatarUrl" in updates && (updates as UserProfile).avatarUrl !== undefined) {
        payload.avatar_url = (updates as UserProfile).avatarUrl;
      }
      if ("role" in updates && updates.role !== undefined) payload.role = updates.role;
      if ("onboarding_completed" in updates && updates.onboarding_completed !== undefined) {
        payload.onboarding_completed = updates.onboarding_completed;
      }
      if ("onboardingCompleted" in updates && (updates as any).onboardingCompleted !== undefined) {
        payload.onboarding_completed = (updates as any).onboardingCompleted;
      }

      if (!isSupabaseConfigured()) {
        return {
          data: {
            id: userId,
            email: payload.email || "user@eminarc.com",
            full_name: payload.full_name ?? null,
            avatar_url: payload.avatar_url ?? null,
            role: payload.role ?? "user",
            onboarding_completed: payload.onboarding_completed ?? true,
            created_at: now,
            updated_at: now,
          },
          error: null,
        };
      }

      const { data, error } = await supabase
        .from("profiles")
        .update(payload)
        .eq("id", userId)
        .select("*")
        .single();

      if (error) {
        return { data: null, error };
      }

      return { data, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },

  /**
   * Ensure a profile exists for the given auth user.
   * Checks whether a profile exists; if not, creates it from auth.user, and returns the profile.
   */
  async ensureProfile(user: UserInput): Promise<ServiceResult<Profile>> {
    try {
      if (!user || !user.id) {
        return {
          data: null,
          error: new Error("Valid user object with an ID is required"),
        };
      }

      const existingResult = await this.getProfile(user.id);

      if (existingResult.error) {
        return existingResult;
      }

      if (existingResult.data) {
        return existingResult;
      }

      return await this.createProfile(user);
    } catch (err) {
      return { data: null, error: err as Error };
    }
  },
};

export default profileService;
