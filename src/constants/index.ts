// Eminarc Growth OS System Constants

export const APP_NAME = "Eminarc Growth OS";
export const APP_VERSION = "v1.0.0";
export const APP_DESCRIPTION = "The premier operating system for founder-led B2B growth";

export const SYSTEM_STATUS = {
  OPERATIONAL: "All systems operational",
  MAINTENANCE: "System maintenance scheduled",
};

export const NAVIGATION_ITEMS = [
  { label: "Overview", path: "/" },
  { label: "Clients", path: "/clients" },
  { label: "Leads", path: "/leads" },
  { label: "Content", path: "/content" },
  { label: "Outreach", path: "/outreach" },
  { label: "LinkedIn", path: "/linkedin" },
  { label: "Analytics", path: "/analytics" },
  { label: "Reports", path: "/reports" },
  { label: "Tasks", path: "/tasks" },
  { label: "Integrations", path: "/integrations" },
  { label: "Settings", path: "/settings" },
] as const;

export const FEATURE_DOMAINS = [
  "dashboard",
  "research",
  "content",
  "distribution",
  "visibility",
  "analytics",
  "crm",
  "agents",
  "reports",
  "tasks",
  "settings",
] as const;
