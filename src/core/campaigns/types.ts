/**
 * Campaign Engine Types & Interfaces
 * Eminarc Growth OS Core
 */

import { Database } from "@/lib/supabase/types";

export type GrowthCampaignRow = Database["public"]["Tables"]["growth_campaigns"]["Row"];
export type GrowthCampaignInsert = Database["public"]["Tables"]["growth_campaigns"]["Insert"];
export type GrowthCampaignUpdate = Database["public"]["Tables"]["growth_campaigns"]["Update"];

export type CampaignType =
  | "LinkedIn"
  | "Email"
  | "SEO"
  | "Website"
  | "Partnerships"
  | "Events"
  | "Paid"
  | "Communities";

export type CampaignStatus = "draft" | "scheduled" | "active" | "paused" | "completed" | "archived";

export interface CampaignAsset {
  id: string;
  title: string;
  type: "Carousel" | "Email Template" | "Landing Page" | "Ad Copy" | "Deck" | "Article";
  content: string;
  status: "Draft" | "Approved" | "Published";
}

export interface CampaignTaskItem {
  id: string;
  title: string;
  description: string;
  owner: string;
  dueDate: string;
  status: "Pending" | "In Progress" | "Completed";
}

export interface CampaignKPIItem {
  metric: string;
  targetBenchmark: string;
  currentValue: string;
}

export interface CampaignSpec {
  id: string;
  title: string;
  type: CampaignType;
  goal: string;
  audience: string;
  messaging: string;
  assets: CampaignAsset[];
  tasks: CampaignTaskItem[];
  timeline: string;
  kpis: CampaignKPIItem[];
  status: CampaignStatus;
}
