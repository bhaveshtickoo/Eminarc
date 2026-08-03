"use client";

import React, { useState } from "react";
import { Mail, Send, Sparkles, Check, Paperclip, Clock } from "lucide-react";
import { toast } from "sonner";
import { useWorkspace } from "@/hooks/useWorkspace";

export const EmailPanel: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const [recipient, setRecipient] = useState("alex@truelift.ai");
  const [subject, setSubject] = useState("MSA Contract Draft & Growth OS Onboarding Roadmap");
  const [body, setBody] = useState(
    `Hi Alex,\n\nFollowing our review call, attached is the Master Services Agreement for TrueLift.ai.\n\nKey highlights:\n- Full 1-Click Multi-Channel Repurposing Engine\n- Generative Engine Optimization (GEO) AI Radar\n- 96% ICP Lead Intelligence Integration\n\nLet me know if you have any questions before our kickoff call on Tuesday!\n\nBest,\nBhavesh Tickoo`,
  );
  const [sent, setSent] = useState(false);

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success(`Email Sent to ${recipient}`, {
      description: "Dispatched via Eminarc Outreach Engine.",
    });
    setTimeout(() => setSent(false), 2000);
  };

  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4 select-none">
      <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] pb-3">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
            EMAIL COMPOSER & DISPATCH
          </span>
          <h3 className="font-sans font-bold text-xl text-[#111111] mt-1 tracking-tight">
            High-Intent Lead Email Studio
          </h3>
        </div>

        <span className="font-mono text-[9px] uppercase font-bold text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0]">
          OUTREACH ENGINE READY
        </span>
      </div>

      {/* Email Form */}
      <form onSubmit={handleSendEmail} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-sans text-xs">
          <div>
            <label className="font-mono text-[10px] uppercase font-bold text-[#716D64] block mb-1">
              To Recipient
            </label>
            <input
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] px-3.5 py-2 text-xs font-mono text-[#18181B] focus:outline-none focus:ring-1 focus:ring-[#18181B]"
            />
          </div>

          <div>
            <label className="font-mono text-[10px] uppercase font-bold text-[#716D64] block mb-1">
              Subject Line
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] px-3.5 py-2 text-xs font-sans font-bold text-[#18181B] focus:outline-none focus:ring-1 focus:ring-[#18181B]"
            />
          </div>
        </div>

        <div>
          <label className="font-mono text-[10px] uppercase font-bold text-[#716D64] block mb-1">
            Email Body Content
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={7}
            className="w-full rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-4 text-xs font-sans text-[#18181B] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#18181B] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]"
          />
        </div>

        <div className="flex items-center justify-between pt-2 font-mono text-xs">
          <div className="flex items-center space-x-2 text-[#716D64]">
            <Paperclip className="h-4 w-4" />
            <span>Attachment: MSA_TrueLift_GrowthOS.pdf (1.2 MB)</span>
          </div>

          <button
            type="submit"
            className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-[#000000] text-[#FFFFFF] font-bold text-xs hover:bg-[#222222] transition-colors cursor-pointer"
          >
            {sent ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
            <span>{sent ? "Dispatched" : "Send Email"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
