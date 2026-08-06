"use client";

import React, { useState } from "react";
import { Key, Plus, Copy, Trash2, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export interface ApiKeyItem {
  id: string;
  name: string;
  keyMasked: string;
  createdAt: string;
  lastUsed: string;
}

export const initialApiKeys: ApiKeyItem[] = [
  {
    id: "key-1",
    name: "OpenRouter LLM Pipeline",
    keyMasked: "em_live_pk_••••••••••••9482",
    createdAt: "Jul 15, 2026",
    lastUsed: "10 mins ago",
  },
  {
    id: "key-2",
    name: "Supabase Vector DB Sync",
    keyMasked: "em_live_sk_••••••••••••1048",
    createdAt: "Jul 20, 2026",
    lastUsed: "2 hours ago",
  },
  {
    id: "key-3",
    name: "HubSpot CRM Webhook",
    keyMasked: "em_live_wh_••••••••••••5819",
    createdAt: "Aug 01, 2026",
    lastUsed: "Yesterday",
  },
];

export const SettingsApiKeysTab: React.FC = () => {
  const [keys, setKeys] = useState<ApiKeyItem[]>(initialApiKeys);

  const handleGenerateKey = () => {
    const newKey: ApiKeyItem = {
      id: `key-${Date.now()}`,
      name: "New Custom API Secret",
      keyMasked: `em_live_sk_••••••••••••${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: "Today",
      lastUsed: "Never",
    };
    setKeys((prev) => [...prev, newKey]);
    toast.success("New API Secret Key Generated", {
      description: "Copied secret key to clipboard.",
    });
  };

  const handleCopyKey = (name: string) => {
    toast.success(`Copied API Key for ${name}`);
  };

  const handleRevokeKey = (id: string, name: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
    toast.success(`Revoked API Key for ${name}`);
  };

  return (
    <div className="space-y-6 select-none max-w-4xl">
      <div className="p-6 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(0,0,0,0.06)] pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-[9px] uppercase font-bold text-[#716D64] bg-[#EFEAE1] px-2 py-0.5 rounded">
                API KEYS & WEBHOOKS (UI ONLY)
              </span>
            </div>
            <h3 className="font-sans font-bold text-lg text-[#111111] mt-1">
              Secret API Key Management
            </h3>
            <p className="font-sans text-xs text-[#52525B]">
              Manage secret API keys for automated programmatic integration with Eminarc Growth OS.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGenerateKey}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#000000] text-[#FFFFFF] font-mono text-xs font-bold hover:bg-[#222222] transition-colors cursor-pointer shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Generate New Secret Key</span>
          </button>
        </div>

        <div className="space-y-2">
          {keys.map((key) => (
            <div
              key={key.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] gap-3 text-xs"
            >
              <div className="space-y-0.5">
                <h4 className="font-bold text-[#111111]">{key.name}</h4>
                <p className="font-mono text-xs text-[#18181B] bg-[#FCFAF7] px-2 py-0.5 rounded border border-[#E5E0D6] inline-block">
                  {key.keyMasked}
                </p>
                <div className="font-mono text-[10px] text-[#716D64] pt-0.5">
                  Created {key.createdAt} • Last used {key.lastUsed}
                </div>
              </div>

              <div className="flex items-center space-x-2 font-mono text-xs shrink-0 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => handleCopyKey(key.name)}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-[#18181B] font-bold hover:bg-[#F7F4EE] transition-colors cursor-pointer"
                >
                  <Copy className="h-3.5 w-3.5 text-[#716D64]" />
                  <span>Copy Key</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRevokeKey(key.id, key.name)}
                  className="p-1.5 rounded-xl bg-[#FFFFFF] border border-[#FEE2E2] text-[#7F1D1D] hover:bg-[#FEE2E2]/50 transition-colors cursor-pointer"
                  title="Revoke Key"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
