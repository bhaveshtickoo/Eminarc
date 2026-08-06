"use client";

import React from "react";
import { FileText, Download, ShieldCheck, Clock } from "lucide-react";
import { toast } from "sonner";

export interface AuditLogItem {
  id: string;
  action: string;
  actor: string;
  ipAddress: string;
  timestamp: string;
  severity: "Info" | "Warning" | "Security";
}

export const auditLogs: AuditLogItem[] = [
  {
    id: "log-1",
    action: "User Role Updated (Jordan Davis → Editor)",
    actor: "Bhavesh Tickoo",
    ipAddress: "192.168.1.42",
    timestamp: "10 mins ago",
    severity: "Info",
  },
  {
    id: "log-2",
    action: "Generated Secret API Key (HubSpot Webhook)",
    actor: "Pratyush",
    ipAddress: "192.168.1.88",
    timestamp: "1 hour ago",
    severity: "Security",
  },
  {
    id: "log-3",
    action: "Updated White-Label Subdomain Settings",
    actor: "Bhavesh Tickoo",
    ipAddress: "192.168.1.42",
    timestamp: "Yesterday 05:20 PM",
    severity: "Info",
  },
  {
    id: "log-4",
    action: "Failed Login Attempt (Password Throttle)",
    actor: "Unknown Actor",
    ipAddress: "45.14.22.109",
    timestamp: "Aug 01, 2026",
    severity: "Warning",
  },
];

export const SettingsAuditLogsTab: React.FC = () => {
  return (
    <div className="space-y-6 select-none max-w-4xl">
      <div className="p-6 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(0,0,0,0.06)] pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-[9px] uppercase font-bold text-[#716D64] bg-[#EFEAE1] px-2 py-0.5 rounded">
                COMPLIANCE AUDIT LOGS (UI ONLY)
              </span>
            </div>
            <h3 className="font-sans font-bold text-lg text-[#111111] mt-1">
              Enterprise Audit Trail
            </h3>
            <p className="font-sans text-xs text-[#52525B]">
              Immutable system audit trail logging all security events, role changes, and API
              actions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => toast.success("Exported Audit Logs (CSV)")}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-[#18181B] font-mono text-xs font-bold hover:bg-[#F7F4EE] transition-colors cursor-pointer shrink-0"
          >
            <Download className="h-3.5 w-3.5 text-[#716D64]" />
            <span>Export CSV</span>
          </button>
        </div>

        <div className="space-y-2">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-1 text-xs"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-[#111111]">{log.action}</h4>
                <span
                  className={`font-mono text-[8px] uppercase px-1.5 py-0.5 rounded font-bold border ${
                    log.severity === "Warning"
                      ? "bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]"
                      : log.severity === "Security"
                        ? "bg-[#FEE2E2] text-[#7F1D1D] border-[#FCA5A5]"
                        : "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]"
                  }`}
                >
                  {log.severity}
                </span>
              </div>
              <p className="font-mono text-[10px] text-[#716D64]">
                Actor: <strong className="text-[#18181B]">{log.actor}</strong> • IP: {log.ipAddress}{" "}
                • {log.timestamp}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
