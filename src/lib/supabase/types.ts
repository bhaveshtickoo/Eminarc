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
          onboarding_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: string | null;
          onboarding_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: string | null;
          onboarding_completed?: boolean;
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
      companies: {
        Row: {
          id: string;
          workspace_id: string;
          name: string;
          website: string | null;
          linkedin_url: string | null;
          industry: string | null;
          company_size: string | null;
          location: string | null;
          description: string | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          name: string;
          website?: string | null;
          linkedin_url?: string | null;
          industry?: string | null;
          company_size?: string | null;
          location?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          name?: string;
          website?: string | null;
          linkedin_url?: string | null;
          industry?: string | null;
          company_size?: string | null;
          location?: string | null;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      founders: {
        Row: {
          id: string;
          company_id: string;
          full_name: string;
          title: string | null;
          linkedin_url: string | null;
          bio: string | null;
          email: string | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          company_id: string;
          full_name: string;
          title?: string | null;
          linkedin_url?: string | null;
          bio?: string | null;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          company_id?: string;
          full_name?: string;
          title?: string | null;
          linkedin_url?: string | null;
          bio?: string | null;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      research_jobs: {
        Row: {
          id: string;
          workspace_id: string;
          company_id: string;
          status: string;
          progress: number;
          started_at: string | null;
          completed_at: string | null;
          error: string | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          company_id: string;
          status?: string;
          progress?: number;
          started_at?: string | null;
          completed_at?: string | null;
          error?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          company_id?: string;
          status?: string;
          progress?: number;
          started_at?: string | null;
          completed_at?: string | null;
          error?: string | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      research_reports: {
        Row: {
          id: string;
          company_id: string;
          founder_id: string | null;
          summary: string | null;
          icp: Json | null;
          pain_points: Json | null;
          buying_signals: Json | null;
          tech_stack: Json | null;
          competitors: Json | null;
          opportunities: Json | null;
          confidence_score: number | null;
          raw_json: Json | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          company_id: string;
          founder_id?: string | null;
          summary?: string | null;
          icp?: Json | null;
          pain_points?: Json | null;
          buying_signals?: Json | null;
          tech_stack?: Json | null;
          competitors?: Json | null;
          opportunities?: Json | null;
          confidence_score?: number | null;
          raw_json?: Json | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          company_id?: string;
          founder_id?: string | null;
          summary?: string | null;
          icp?: Json | null;
          pain_points?: Json | null;
          buying_signals?: Json | null;
          tech_stack?: Json | null;
          competitors?: Json | null;
          opportunities?: Json | null;
          confidence_score?: number | null;
          raw_json?: Json | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      ai_memories: {
        Row: {
          id: string;
          workspace_id: string;
          memory_type: string;
          entity_id: string | null;
          key: string;
          content: string;
          metadata: Json | null;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          memory_type: string;
          entity_id?: string | null;
          key: string;
          content: string;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          memory_type?: string;
          entity_id?: string | null;
          key?: string;
          content?: string;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      growth_strategies: {
        Row: {
          id: string;
          workspace_id: string;
          company_id: string | null;
          research_report_id: string | null;
          title: string;
          status: string;
          executive_summary: string;
          icp: Json;
          buyer_personas: Json;
          positioning: Json;
          messaging_pillars: Json;
          value_proposition: Json;
          market_opportunities: Json;
          competitor_positioning: Json;
          channel_strategy: Json;
          growth_roadmap: Json;
          plan_30_60_90: Json;
          success_metrics: Json;
          raw_json: Json;
          version: number;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          company_id?: string | null;
          research_report_id?: string | null;
          title: string;
          status?: string;
          executive_summary: string;
          icp: Json;
          buyer_personas: Json;
          positioning: Json;
          messaging_pillars: Json;
          value_proposition: Json;
          market_opportunities: Json;
          competitor_positioning: Json;
          channel_strategy: Json;
          growth_roadmap: Json;
          plan_30_60_90: Json;
          success_metrics: Json;
          raw_json: Json;
          version?: number;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          company_id?: string | null;
          research_report_id?: string | null;
          title?: string;
          status?: string;
          executive_summary?: string;
          icp?: Json;
          buyer_personas?: Json;
          positioning?: Json;
          messaging_pillars?: Json;
          value_proposition?: Json;
          market_opportunities?: Json;
          competitor_positioning?: Json;
          channel_strategy?: Json;
          growth_roadmap?: Json;
          plan_30_60_90?: Json;
          success_metrics?: Json;
          raw_json?: Json;
          version?: number;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      personas: {
        Row: {
          id: string;
          workspace_id: string;
          company_id: string;
          research_report_id: string | null;
          strategy_id: string | null;
          role_title: string;
          seniority_level: string;
          key_motivations: Json;
          buying_triggers: Json;
          objections: Json;
          preferred_channels: Json;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          company_id: string;
          research_report_id?: string | null;
          strategy_id?: string | null;
          role_title: string;
          seniority_level?: string;
          key_motivations?: Json;
          buying_triggers?: Json;
          objections?: Json;
          preferred_channels?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          company_id?: string;
          research_report_id?: string | null;
          strategy_id?: string | null;
          role_title?: string;
          seniority_level?: string;
          key_motivations?: Json;
          buying_triggers?: Json;
          objections?: Json;
          preferred_channels?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      positioning: {
        Row: {
          id: string;
          workspace_id: string;
          company_id: string;
          research_report_id: string | null;
          strategy_id: string | null;
          category_name: string;
          tagline: string;
          core_differentiation: string;
          competitor_gaps: Json;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          company_id: string;
          research_report_id?: string | null;
          strategy_id?: string | null;
          category_name: string;
          tagline: string;
          core_differentiation: string;
          competitor_gaps?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          company_id?: string;
          research_report_id?: string | null;
          strategy_id?: string | null;
          category_name?: string;
          tagline?: string;
          core_differentiation?: string;
          competitor_gaps?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      messaging_frameworks: {
        Row: {
          id: string;
          workspace_id: string;
          company_id: string;
          research_report_id: string | null;
          strategy_id: string | null;
          pillar_name: string;
          core_message: string;
          proof_points: Json;
          objection_handles: Json;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          company_id: string;
          research_report_id?: string | null;
          strategy_id?: string | null;
          pillar_name: string;
          core_message: string;
          proof_points?: Json;
          objection_handles?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          company_id?: string;
          research_report_id?: string | null;
          strategy_id?: string | null;
          pillar_name?: string;
          core_message?: string;
          proof_points?: Json;
          objection_handles?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      channel_plans: {
        Row: {
          id: string;
          workspace_id: string;
          company_id: string;
          research_report_id: string | null;
          strategy_id: string | null;
          channel_name: string;
          priority: string;
          target_audience: string;
          target_metrics: string;
          execution_tactics: Json;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          company_id: string;
          research_report_id?: string | null;
          strategy_id?: string | null;
          channel_name: string;
          priority?: string;
          target_audience: string;
          target_metrics: string;
          execution_tactics?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          company_id?: string;
          research_report_id?: string | null;
          strategy_id?: string | null;
          channel_name?: string;
          priority?: string;
          target_audience?: string;
          target_metrics?: string;
          execution_tactics?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      roadmaps: {
        Row: {
          id: string;
          workspace_id: string;
          company_id: string;
          research_report_id: string | null;
          strategy_id: string | null;
          timeframe: string;
          milestone_title: string;
          key_deliverables: Json;
          plan_30_60_90: Json;
          success_metrics: Json;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          company_id: string;
          research_report_id?: string | null;
          strategy_id?: string | null;
          timeframe: string;
          milestone_title: string;
          key_deliverables?: Json;
          plan_30_60_90?: Json;
          success_metrics?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          company_id?: string;
          research_report_id?: string | null;
          strategy_id?: string | null;
          timeframe?: string;
          milestone_title?: string;
          key_deliverables?: Json;
          plan_30_60_90?: Json;
          success_metrics?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      execution_plans: {
        Row: {
          id: string;
          workspace_id: string;
          strategy_id: string | null;
          title: string;
          status: string;
          campaigns: Json;
          projects: Json;
          tasks: Json;
          kpis: Json;
          machine_readable_spec: Json;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          strategy_id?: string | null;
          title: string;
          status?: string;
          campaigns?: Json;
          projects?: Json;
          tasks?: Json;
          kpis?: Json;
          machine_readable_spec?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          strategy_id?: string | null;
          title?: string;
          status?: string;
          campaigns?: Json;
          projects?: Json;
          tasks?: Json;
          kpis?: Json;
          machine_readable_spec?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      recommendations: {
        Row: {
          id: string;
          workspace_id: string;
          company_id: string | null;
          strategy_id: string | null;
          title: string;
          highest_priority_action: Json;
          biggest_opportunity: Json;
          highest_risk: Json;
          quick_wins: Json;
          weekly_recommendations: Json;
          monthly_recommendations: Json;
          confidence_score: number;
          raw_json: Json;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          company_id?: string | null;
          strategy_id?: string | null;
          title: string;
          highest_priority_action: Json;
          biggest_opportunity: Json;
          highest_risk: Json;
          quick_wins?: Json;
          weekly_recommendations?: Json;
          monthly_recommendations?: Json;
          confidence_score?: number;
          raw_json?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          company_id?: string | null;
          strategy_id?: string | null;
          title?: string;
          highest_priority_action?: Json;
          biggest_opportunity?: Json;
          highest_risk?: Json;
          quick_wins?: Json;
          weekly_recommendations?: Json;
          monthly_recommendations?: Json;
          confidence_score?: number;
          raw_json?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      daily_growth_briefs: {
        Row: {
          id: string;
          workspace_id: string;
          brief_date: string;
          todays_focus: string;
          top_opportunities: Json;
          risks: Json;
          tasks_due: Json;
          research_completed: Json;
          campaign_performance: Json;
          recommended_actions: Json;
          raw_json: Json;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          brief_date?: string;
          todays_focus: string;
          top_opportunities?: Json;
          risks?: Json;
          tasks_due?: Json;
          research_completed?: Json;
          campaign_performance?: Json;
          recommended_actions?: Json;
          raw_json?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          brief_date?: string;
          todays_focus?: string;
          top_opportunities?: Json;
          risks?: Json;
          tasks_due?: Json;
          research_completed?: Json;
          campaign_performance?: Json;
          recommended_actions?: Json;
          raw_json?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      operating_plans: {
        Row: {
          id: string;
          workspace_id: string;
          strategy_id: string | null;
          research_report_id: string | null;
          title: string;
          status: string;
          campaigns: Json;
          projects: Json;
          milestones: Json;
          tasks: Json;
          kpis: Json;
          operating_plan_spec: Json;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          strategy_id?: string | null;
          research_report_id?: string | null;
          title: string;
          status?: string;
          campaigns?: Json;
          projects?: Json;
          milestones?: Json;
          tasks?: Json;
          kpis?: Json;
          operating_plan_spec?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          strategy_id?: string | null;
          research_report_id?: string | null;
          title?: string;
          status?: string;
          campaigns?: Json;
          projects?: Json;
          milestones?: Json;
          tasks?: Json;
          kpis?: Json;
          operating_plan_spec?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      growth_campaigns: {
        Row: {
          id: string;
          workspace_id: string;
          operating_plan_id: string | null;
          title: string;
          type: string;
          goal: string;
          audience: string;
          messaging: string;
          assets: Json;
          tasks: Json;
          timeline: string;
          kpis: Json;
          status: string;
          raw_json: Json;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          operating_plan_id?: string | null;
          title: string;
          type: string;
          goal: string;
          audience: string;
          messaging: string;
          assets?: Json;
          tasks?: Json;
          timeline: string;
          kpis?: Json;
          status?: string;
          raw_json?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          operating_plan_id?: string | null;
          title?: string;
          type?: string;
          goal?: string;
          audience?: string;
          messaging?: string;
          assets?: Json;
          tasks?: Json;
          timeline?: string;
          kpis?: Json;
          status?: string;
          raw_json?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      workspace_projects: {
        Row: {
          id: string;
          workspace_id: string;
          campaign_id: string | null;
          title: string;
          description: string | null;
          category: string;
          status: string;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          campaign_id?: string | null;
          title: string;
          description?: string | null;
          category?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          campaign_id?: string | null;
          title?: string;
          description?: string | null;
          category?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      workspace_tasks: {
        Row: {
          id: string;
          workspace_id: string;
          campaign_id: string | null;
          project_id: string | null;
          title: string;
          description: string | null;
          subtasks: Json;
          dependencies: Json;
          due_date: string;
          priority: string;
          estimated_effort_hours: number;
          assigned_owner: string;
          status: string;
          raw_json: Json;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          campaign_id?: string | null;
          project_id?: string | null;
          title: string;
          description?: string | null;
          subtasks?: Json;
          dependencies?: Json;
          due_date?: string;
          priority?: string;
          estimated_effort_hours?: number;
          assigned_owner?: string;
          status?: string;
          raw_json?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          campaign_id?: string | null;
          project_id?: string | null;
          title?: string;
          description?: string | null;
          subtasks?: Json;
          dependencies?: Json;
          due_date?: string;
          priority?: string;
          estimated_effort_hours?: number;
          assigned_owner?: string;
          status?: string;
          raw_json?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
      };
      weekly_growth_reviews: {
        Row: {
          id: string;
          workspace_id: string;
          week_start_date: string;
          title: string;
          wins: Json;
          losses: Json;
          risks: Json;
          missed_opportunities: Json;
          campaign_summary: Json;
          content_performance: Json;
          pipeline_health: Json;
          recommended_next_steps: Json;
          raw_json: Json;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          week_start_date?: string;
          title: string;
          wins?: Json;
          losses?: Json;
          risks?: Json;
          missed_opportunities?: Json;
          campaign_summary?: Json;
          content_performance?: Json;
          pipeline_health?: Json;
          recommended_next_steps?: Json;
          raw_json?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          week_start_date?: string;
          title?: string;
          wins?: Json;
          losses?: Json;
          risks?: Json;
          missed_opportunities?: Json;
          campaign_summary?: Json;
          content_performance?: Json;
          pipeline_health?: Json;
          recommended_next_steps?: Json;
          raw_json?: Json;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [];
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
