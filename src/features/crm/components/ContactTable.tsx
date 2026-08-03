"use client";

import React, { useState } from "react";
import {
  User,
  Building2,
  Mail,
  Linkedin,
  Phone,
  Sparkles,
  Calendar,
  Search,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface ContactRow {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  linkedin: string;
  phone: string;
  stage: string;
  aiFitScore: number;
  lastContact: string;
  nextTask: string;
}

export const initialContacts: ContactRow[] = [
  {
    id: "cnt-1",
    name: "Alex Vance",
    company: "TrueLift.ai",
    role: "CEO & Co-Founder",
    email: "alex@truelift.ai",
    linkedin: "linkedin.com/in/alexvance",
    phone: "+1 (555) 234-5678",
    stage: "Negotiation",
    aiFitScore: 96,
    lastContact: "Yesterday",
    nextTask: "Send MSA Contract",
  },
  {
    id: "cnt-2",
    name: "Sarah Jenkins",
    company: "Revix Systems",
    role: "VP of Marketing",
    email: "sarah@revix.io",
    linkedin: "linkedin.com/in/sarahjenkins",
    phone: "+1 (555) 876-5432",
    stage: "Proposal",
    aiFitScore: 92,
    lastContact: "2 days ago",
    nextTask: "Present Q3 Proposal",
  },
  {
    id: "cnt-3",
    name: "Kenji Sato",
    company: "Senpai AI",
    role: "Head of Growth",
    email: "kenji@senpai.ai",
    linkedin: "linkedin.com/in/kenjisato",
    phone: "+1 (555) 345-6789",
    stage: "Won",
    aiFitScore: 98,
    lastContact: "Aug 01, 2026",
    nextTask: "Kickoff Onboarding",
  },
  {
    id: "cnt-4",
    name: "Elena Rostova",
    company: "OmniFlow Cloud",
    role: "CMO",
    email: "elena@omniflow.com",
    linkedin: "linkedin.com/in/elenarostova",
    phone: "+1 (555) 987-6543",
    stage: "Qualified",
    aiFitScore: 90,
    lastContact: "Jul 29, 2026",
    nextTask: "Schedule Founder Audit",
  },
  {
    id: "cnt-5",
    name: "Marcus Brody",
    company: "HyperScale SaaS",
    role: "Founder",
    email: "marcus@hyperscale.io",
    linkedin: "linkedin.com/in/marcusbrody",
    phone: "+1 (555) 456-7890",
    stage: "Discovery",
    aiFitScore: 84,
    lastContact: "Jul 25, 2026",
    nextTask: "Demo Call",
  },
];

export const ContactTable: React.FC = () => {
  const [contacts, setContacts] = useState<ContactRow[]>(initialContacts);
  const [search, setSearch] = useState("");

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-4 select-none">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[rgba(0,0,0,0.06)]">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
            CONTACTS DATABASE
          </span>
          <h3 className="font-sans font-bold text-xl text-[#111111] mt-1 tracking-tight">
            High-Intent Lead Contacts
          </h3>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#716D64]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contacts..."
            className="w-full rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] pl-9 pr-3 py-1.5 text-xs font-sans text-[#18181B] focus:outline-none focus:ring-1 focus:ring-[#18181B]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[#E5E0D6] bg-[#FFFFFF]">
        <table className="w-full text-left text-xs font-sans">
          <thead>
            <tr className="border-b border-[#E5E0D6] bg-[#FBF9F5] font-mono text-[10px] uppercase text-[#716D64]">
              <th className="py-3 px-4">Contact Name & Role</th>
              <th className="py-3 px-4">Company</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">LinkedIn / Phone</th>
              <th className="py-3 px-4">Stage</th>
              <th className="py-3 px-4">AI Fit Score</th>
              <th className="py-3 px-4">Last Contact</th>
              <th className="py-3 px-4">Next Task</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E0D6]/60">
            {filteredContacts.map((c) => (
              <tr key={c.id} className="hover:bg-[#F7F4EE]/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-bold text-[#111111] flex items-center">
                    <User className="h-3.5 w-3.5 mr-1.5 text-[#18181B]" />
                    {c.name}
                  </div>
                  <div className="font-mono text-[10px] text-[#716D64]">{c.role}</div>
                </td>
                <td className="py-3 px-4 font-bold text-[#111111]">
                  <div className="flex items-center">
                    <Building2 className="h-3.5 w-3.5 mr-1 text-[#716D64]" />
                    {c.company}
                  </div>
                </td>
                <td className="py-3 px-4 font-mono text-[11px] text-[#0369A1]">{c.email}</td>
                <td className="py-3 px-4 font-mono text-[10px] text-[#716D64]">
                  <div>{c.linkedin}</div>
                  <div>{c.phone}</div>
                </td>
                <td className="py-3 px-4">
                  <span className="font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-[#EFEAE1] text-[#18181B]">
                    {c.stage}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="font-mono text-[10px] font-bold text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0]">
                    {c.aiFitScore}%
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-[10px] text-[#716D64]">{c.lastContact}</td>
                <td className="py-3 px-4 font-mono text-[10px] font-bold text-[#18181B]">{c.nextTask}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
