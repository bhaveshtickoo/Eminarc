/**
 * Supabase Database Schema & Domain Types
 * Eminarc Growth OS
 */

import type { User, Session, AuthError } from "@supabase/supabase-js";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      workspaces: {
        Row: {
          id: string;
          name: string;
          domain: string | null;
          industry: string | null;
          brand: string | null;
          country: string | null;
          timezone: string | null;
          logo_url: string | null;
          status: string;
          tagline: string | null;
          logo_letter: string | null;
          target_market: Json | null;
          brand_voice: Json | null;
          metrics: Json | null;
          weekly_goal: Json | null;
          knowledge_base: Json | null;
          owner_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          domain?: string | null;
          industry?: string | null;
          brand?: string | null;
          country?: string | null;
          timezone?: string | null;
          logo_url?: string | null;
          status?: string;
          tagline?: string | null;
          logo_letter?: string | null;
          target_market?: Json | null;
          brand_voice?: Json | null;
          metrics?: Json | null;
          weekly_goal?: Json | null;
          knowledge_base?: Json | null;
          owner_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          domain?: string | null;
          industry?: string | null;
          brand?: string | null;
          country?: string | null;
          timezone?: string | null;
          logo_url?: string | null;
          status?: string;
          tagline?: string | null;
          logo_letter?: string | null;
          target_market?: Json | null;
          brand_voice?: Json | null;
          metrics?: Json | null;
          weekly_goal?: Json | null;
          knowledge_base?: Json | null;
          owner_id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workspaces_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      workspace_members: {
        Row: {
          id: string;
          workspace_id: string;
          user_id: string;
          role: "owner" | "admin" | "member" | "viewer";
          created_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          user_id: string;
          role?: "owner" | "admin" | "member" | "viewer";
          created_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          user_id?: string;
          role?: "owner" | "admin" | "member" | "viewer";
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workspace_members_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "workspace_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      workspace_invites: {
        Row: {
          id: string;
          workspace_id: string;
          email: string;
          role: "admin" | "member" | "viewer";
          status: "pending" | "accepted" | "declined";
          invited_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          email: string;
          role?: "admin" | "member" | "viewer";
          status?: "pending" | "accepted" | "declined";
          invited_by: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          email?: string;
          role?: "admin" | "member" | "viewer";
          status?: "pending" | "accepted" | "declined";
          invited_by?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workspace_invites_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      leads: {
        Row: {
          id: string;
          workspace_id: string;
          company_name: string;
          contact_name: string | null;
          email: string | null;
          stage: string;
          value: number | null;
          score: number | null;
          metadata: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          company_name: string;
          contact_name?: string | null;
          email?: string | null;
          stage?: string;
          value?: number | null;
          score?: number | null;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          company_name?: string;
          contact_name?: string | null;
          email?: string | null;
          stage?: string;
          value?: number | null;
          score?: number | null;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "leads_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      content_items: {
        Row: {
          id: string;
          workspace_id: string;
          title: string;
          type: string;
          status: string;
          channel: string | null;
          scheduled_at: string | null;
          content: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          title: string;
          type?: string;
          status?: string;
          channel?: string | null;
          scheduled_at?: string | null;
          content?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          title?: string;
          type?: string;
          status?: string;
          channel?: string | null;
          scheduled_at?: string | null;
          content?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "content_items_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      workspace_role: "owner" | "admin" | "member" | "viewer";
    };
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export interface UserProfile {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  role: string | null;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  error: AuthError | Error | null;
  isConfigured: boolean;
}

export interface ServiceResult<T> {
  data: T | null;
  error: Error | AuthError | null;
}
