import React, { useState } from "react";
import { Blocks, CheckCircle2, AlertCircle, ExternalLink, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface IntegrationItem {
  id: string;
  name: string;
  category: string;
  status: "connected" | "disconnected" | "action_required";
  icon: string;
  description: string;
}

export const SettingsIntegrationsTab: React.FC = () => {
  const [integrations, setIntegrations] = useState<IntegrationItem[]>([
    {
      id: "linkedin",
      name: "LinkedIn Sales & Marketing API",
      category: "Social & Prospecting",
      status: "connected",
      icon: "💼",
      description:
        "Automated post publishing, organic impression tracking, and direct message outreach.",
    },
    {
      id: "openai",
      name: "OpenAI & OpenRouter Multi-LLM",
      category: "AI & Synthesis",
      status: "connected",
      icon: "⚡",
      description: "Powers Research Engine, Content Hub generation, and AI Agent reasoning.",
    },
    {
      id: "stripe",
      name: "Stripe Billing & Subscriptions",
      category: "Payments",
      status: "connected",
      icon: "💳",
      description: "Processes customer invoices, usage metering, and seat licensing.",
    },
    {
      id: "resend",
      name: "Resend Email Infrastructure",
      category: "Messaging",
      status: "connected",
      icon: "✉️",
      description: "High-deliverability email outreach, transactional reports, and team digests.",
    },
    {
      id: "n8n",
      name: "n8n Workflow Automation",
      category: "Webhooks",
      status: "disconnected",
      icon: "🔄",
      description:
        "Custom trigger webhooks for CRM updates, automated enrichment, and sync pipelines.",
    },
    {
      id: "posthog",
      name: "PostHog Analytics & Telemetry",
      category: "Analytics",
      status: "connected",
      icon: "🦔",
      description: "Real-time user event tracking, conversion funnel analysis, and feature flags.",
    },
  ]);

  const toggleStatus = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === "connected" ? "disconnected" : "connected";
          toast.success(`${item.name} status updated to ${nextStatus}`);
          return { ...item, status: nextStatus };
        }
        return item;
      }),
    );
  };

  return (
    <div className="space-y-6 max-w-4xl font-sans">
      <div className="p-6 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-6">
        <div className="border-b border-[rgba(0,0,0,0.06)] pb-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-[#111111] flex items-center gap-2">
              <Blocks className="h-5 w-5 text-[#716D64]" />
              Enterprise Ecosystem Integrations
            </h3>
            <p className="text-xs text-[#52525B] mt-0.5">
              Connect external APIs, data warehouses, LLM providers, and automation pipelines.
            </p>
          </div>
          <button
            type="button"
            onClick={() => toast.info("Syncing integration statuses with remote gateways...")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-xs font-semibold text-[#111111] hover:bg-[#F7F4EE] transition-colors cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Sync Gateway</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-xs text-[#111111]">{item.name}</h4>
                      <span className="font-mono text-[10px] text-[#716D64]">{item.category}</span>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                      item.status === "connected"
                        ? "bg-[#EDF6F0] text-[#2D6A4F] border-[#C8E4D0]"
                        : "bg-[#FAFAFA] text-[#716D64] border-[#E5E0D6]"
                    }`}
                  >
                    {item.status === "connected" ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 mr-1 text-[#2D6A4F]" /> Connected
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-3 w-3 mr-1 text-[#716D64]" /> Disconnected
                      </>
                    )}
                  </span>
                </div>
                <p className="text-xs text-[#52525B] leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-2 border-t border-[#F2EDE4] flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => toggleStatus(item.id)}
                  className={`font-mono text-[11px] font-bold px-3 py-1 rounded-lg border transition-colors cursor-pointer ${
                    item.status === "connected"
                      ? "bg-[#FFFFFF] text-[#716D64] border-[#E5E0D6] hover:bg-[#F7F4EE]"
                      : "bg-[#000000] text-[#FFFFFF] border-black hover:bg-[#222222]"
                  }`}
                >
                  {item.status === "connected" ? "Configure" : "Connect Gateway"}
                </button>
                <a
                  href={`/integrations#${item.id}`}
                  className="text-[#716D64] hover:text-[#111111] inline-flex items-center gap-1 font-mono text-[11px]"
                >
                  Docs <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
