// Content Service Layer — Isolates future Supabase / OpenRouter content creation & repurposing integrations.

export interface ContentItemData {
  id: string;
  title: string;
  channel: "LinkedIn" | "Medium" | "Reddit" | "Newsletter" | "Twitter";
  status: "Draft" | "Scheduled" | "Published";
  date: string;
  excerpt: string;
}

export async function getContent(filters?: {
  channel?: string;
  status?: string;
}): Promise<ContentItemData[]> {
  // Static mock content service implementation
  return [
    {
      id: "cnt-1",
      title: "Why Traditional B2B Marketing Funnels Are Broken in 2026",
      channel: "LinkedIn",
      status: "Published",
      date: "AUG 03",
      excerpt: "Buyers rely on AI search citations and peer communities before visiting landing pages...",
    },
    {
      id: "cnt-2",
      title: "Building an Autonomous AI Growth OS for Early-Stage B2B Founders",
      channel: "Medium",
      status: "Published",
      date: "AUG 04",
      excerpt: "Deep-dive architecture walkthrough on integrating LLM radar with direct outreach...",
    },
    {
      id: "cnt-3",
      title: "Case Study: Scaling MRR from ₹50K to ₹2L via Organic Reddit Distribution",
      channel: "Reddit",
      status: "Scheduled",
      date: "AUG 05",
      excerpt: "Transparent teardown of value-first community posts without self-promotion penalty...",
    },
  ];
}

export async function generateContent(params: {
  topic: string;
  format: string;
  tone?: string;
}): Promise<ContentItemData> {
  // Mock placeholder for future OpenRouter AI content generation
  return {
    id: `cnt-${Date.now()}`,
    title: params.topic,
    channel: (params.format as any) || "LinkedIn",
    status: "Draft",
    date: "TODAY",
    excerpt: `AI generated content draft for ${params.topic} formatted as ${params.format}.`,
  };
}

export async function repurposeContent(
  assetId: string,
  targetFormat: string,
): Promise<ContentItemData> {
  // Mock placeholder for 1-click content repurposing engine
  return {
    id: `repurpose-${Date.now()}`,
    title: `Repurposed Asset #${assetId} -> ${targetFormat}`,
    channel: (targetFormat as any) || "LinkedIn",
    status: "Draft",
    date: "TODAY",
    excerpt: `Automated ${targetFormat} adaptation of asset ${assetId}.`,
  };
}
