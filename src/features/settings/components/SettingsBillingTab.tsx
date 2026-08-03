"use client";

import React from "react";
import { CreditCard, Download, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { toast } from "sonner";

export const invoiceHistory = [
  { id: "inv-101", date: "Aug 01, 2026", amount: "$299.00", plan: "Eminarc Pro (Monthly)", status: "Paid" },
  { id: "inv-100", date: "Jul 01, 2026", amount: "$299.00", plan: "Eminarc Pro (Monthly)", status: "Paid" },
  { id: "inv-099", date: "Jun 01, 2026", amount: "$299.00", plan: "Eminarc Pro (Monthly)", status: "Paid" },
];

export const SettingsBillingTab: React.FC = () => {
  return (
    <div className="space-y-6 select-none max-w-4xl">
      {/* Active Subscription Banner */}
      <div className="p-6 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(0,0,0,0.06)] pb-4">
          <div>
            <span className="font-mono text-[9px] uppercase font-bold text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0]">
              ACTIVE PLAN
            </span>
            <h3 className="font-sans font-bold text-xl text-[#111111] mt-1">Eminarc Pro Plan</h3>
            <p className="font-sans text-xs text-[#52525B]">Full access to Research, Content OS, GEO Radar, CRM, and 7 AI Agents.</p>
          </div>

          <div className="font-mono text-right">
            <span className="font-bold text-2xl text-[#111111]">$299</span>
            <span className="text-xs text-[#716D64]"> / month</span>
            <p className="text-[10px] text-[#2D6A4F] font-bold mt-0.5">Renews Aug 24, 2026</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center space-x-2 text-[#716D64]">
            <CreditCard className="h-4 w-4 text-[#18181B]" />
            <span>Card ending in <strong className="text-[#18181B]">•••• 4242</strong></span>
          </div>

          <button
            type="button"
            onClick={() => toast.success("Redirecting to billing portal...")}
            className="px-3.5 py-1.5 rounded-xl bg-[#000000] text-[#FFFFFF] font-bold hover:bg-[#222222] transition-colors cursor-pointer"
          >
            Manage Subscription
          </button>
        </div>
      </div>

      {/* Invoice History */}
      <div className="p-6 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-3">
        <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] pb-2.5 font-mono text-xs">
          <span className="font-bold text-[#111111]">INVOICE HISTORY</span>
          <span className="text-[#716D64]">DOWNLOAD PDF INVOICES</span>
        </div>

        <div className="space-y-2">
          {invoiceHistory.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-xs">
              <div>
                <h4 className="font-bold text-[#111111]">{inv.plan}</h4>
                <p className="font-mono text-[10px] text-[#716D64]">{inv.date} • {inv.amount}</p>
              </div>

              <button
                type="button"
                onClick={() => toast.success(`Downloaded ${inv.id}.pdf`)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-[#18181B] font-mono font-bold hover:bg-[#F7F4EE] transition-colors cursor-pointer"
              >
                <Download className="h-3.5 w-3.5 text-[#716D64]" />
                <span>PDF</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
