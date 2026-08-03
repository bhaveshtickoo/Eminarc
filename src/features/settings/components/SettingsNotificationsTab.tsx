import React, { useState } from "react";
import { Bell, Mail, MessageSquare, AlertCircle, Check } from "lucide-react";
import { toast } from "sonner";

export const SettingsNotificationsTab: React.FC = () => {
  const [preferences, setPreferences] = useState({
    emailDigest: true,
    agentOutputs: true,
    weeklyReport: true,
    securityAlerts: true,
    slackIntegration: false,
    campaignMilestones: true,
  });

  const toggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      toast.success("Notification preferences updated");
      return updated;
    });
  };

  return (
    <div className="space-y-6 max-w-4xl font-sans">
      <div className="p-6 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-6">
        <div className="border-b border-[rgba(0,0,0,0.06)] pb-4">
          <h3 className="font-bold text-lg text-[#111111] flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#716D64]" />
            Notification Channels & Rules
          </h3>
          <p className="text-xs text-[#52525B] mt-0.5">
            Configure how and when your workspace team receives growth reports, AI completion digests, and security alerts.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              key: "emailDigest",
              title: "Daily Executive Email Digest",
              desc: "Receive a consolidated summary of growth metrics, lead acquisitions, and content performance at 08:00 AM.",
              icon: Mail,
            },
            {
              key: "agentOutputs",
              title: "AI Agent Execution Alerts",
              desc: "Instant notifications when an autonomous agent finishes research or content generation runs.",
              icon: AlertCircle,
            },
            {
              key: "weeklyReport",
              title: "Weekly Performance Analytics",
              desc: "Comprehensive weekly breakdown of CRM deals closed and SEO visibility movement.",
              icon: Mail,
            },
            {
              key: "securityAlerts",
              title: "Critical Security & Audit Alerts",
              desc: "Real-time alerts for new login locations, API key rotations, or privilege escalations.",
              icon: Bell,
            },
            {
              key: "slackIntegration",
              title: "Slack Workspace Integration",
              desc: "Push lead alerts and content approvals directly to your team's designated Slack channel.",
              icon: MessageSquare,
            },
          ].map((item) => {
            const Icon = item.icon;
            const isChecked = preferences[item.key as keyof typeof preferences];
            return (
              <div
                key={item.key}
                className="flex items-center justify-between p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6]"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-[#F7F4EE] text-[#111111] mt-0.5">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#111111]">{item.title}</h4>
                    <p className="text-xs text-[#52525B] mt-0.5 max-w-lg">{item.desc}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggle(item.key as keyof typeof preferences)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isChecked ? "bg-[#000000]" : "bg-[#E5E0D6]"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isChecked ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
