// AI Visibility Radar Service Layer — Isolates future OpenRouter / Search Engine API integrations.

export interface VisibilityPlatformScore {
  platform: string;
  citationsMonth: number;
  status: "Found" | "Missing";
}

export interface VisibilityAuditResult {
  score: number;
  platforms: VisibilityPlatformScore[];
  lastScanned: string;
}

export async function getVisibilityAudit(
  workspaceId?: string,
): Promise<VisibilityAuditResult> {
  // Static mock visibility service implementation
  return {
    score: 63,
    platforms: [
      { platform: "ChatGPT", citationsMonth: 12, status: "Found" },
      { platform: "Claude", citationsMonth: 8, status: "Found" },
      { platform: "Gemini", citationsMonth: 0, status: "Missing" },
      { platform: "Perplexity", citationsMonth: 15, status: "Found" },
    ],
    lastScanned: "2 minutes ago",
  };
}

export async function runVisibilityScan(
  domain: string,
): Promise<VisibilityAuditResult> {
  // Mock visibility scanner API trigger placeholder
  return {
    score: 68,
    platforms: [
      { platform: "ChatGPT", citationsMonth: 14, status: "Found" },
      { platform: "Claude", citationsMonth: 9, status: "Found" },
      { platform: "Gemini", citationsMonth: 2, status: "Found" },
      { platform: "Perplexity", citationsMonth: 16, status: "Found" },
    ],
    lastScanned: "Just now",
  };
}
