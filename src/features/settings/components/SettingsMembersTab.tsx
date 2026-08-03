"use client";

import React, { useState } from "react";
import { Users, UserPlus, Shield, Trash2, Mail } from "lucide-react";
import { toast } from "sonner";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Workspace Owner" | "Admin" | "Growth Lead" | "Editor";
  status: "Active" | "Pending";
}

export const initialMembers: TeamMember[] = [
  { id: "mem-1", name: "Bhavesh Tickoo", email: "bhavesh@eminarc.com", role: "Workspace Owner", status: "Active" },
  { id: "mem-2", name: "Pratyush", email: "pratyush@eminarc.com", role: "Admin", status: "Active" },
  { id: "mem-3", name: "Aditya", email: "aditya@eminarc.com", role: "Growth Lead", status: "Active" },
  { id: "mem-4", name: "Jordan Davis", email: "jordan@eminarc.com", role: "Editor", status: "Pending" },
];

export const SettingsMembersTab: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<TeamMember["role"]>("Editor");

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    const newMem: TeamMember = {
      id: `mem-${Date.now()}`,
      name: inviteEmail.split("@")[0],
      email: inviteEmail,
      role: inviteRole,
      status: "Pending",
    };

    setMembers((prev) => [...prev, newMem]);
    toast.success(`Invitation sent to ${inviteEmail}`, {
      description: `Role assigned: ${inviteRole}`,
    });
    setInviteEmail("");
  };

  const handleRemove = (id: string, name: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    toast.success(`Removed ${name} from workspace`);
  };

  return (
    <div className="space-y-6 select-none max-w-4xl">
      {/* Invite Box */}
      <form onSubmit={handleInvite} className="p-5 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-3">
        <h3 className="font-sans font-bold text-sm text-[#111111] flex items-center">
          <UserPlus className="h-4 w-4 mr-2 text-[#2D6A4F]" />
          Invite Team Member
        </h3>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="email"
            placeholder="colleague@company.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="w-full sm:flex-1 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] px-3.5 py-2 text-xs font-sans text-[#18181B] focus:outline-none focus:ring-1 focus:ring-[#18181B]"
          />

          <select
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value as TeamMember["role"])}
            className="w-full sm:w-auto rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] px-3 py-2 text-xs font-mono text-[#18181B] focus:outline-none cursor-pointer"
          >
            <option value="Admin">Admin</option>
            <option value="Growth Lead">Growth Lead</option>
            <option value="Editor">Editor</option>
          </select>

          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-[#000000] text-[#FFFFFF] font-mono text-xs font-bold hover:bg-[#222222] transition-colors cursor-pointer shrink-0"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Send Invite</span>
          </button>
        </div>
      </form>

      {/* Members Table */}
      <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-3">
        <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.06)] pb-2.5 font-mono text-xs">
          <span className="font-bold text-[#111111]">ACTIVE MEMBERS ({members.length}/10 SEATS)</span>
          <span className="text-[#2D6A4F] font-bold">EMINARC PRO SEATS</span>
        </div>

        <div className="space-y-2">
          {members.map((mem) => (
            <div key={mem.id} className="flex items-center justify-between p-3 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-xs">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#18181B] text-[#FFFFFF] font-bold text-[10px]">
                  {mem.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-[#111111] truncate">{mem.name}</h4>
                  <p className="font-mono text-[10px] text-[#716D64] truncate">{mem.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 font-mono text-xs shrink-0">
                <span className="bg-[#EFEAE1] px-2 py-0.5 rounded text-[#18181B] font-bold text-[10px]">
                  {mem.role}
                </span>

                {mem.role !== "Workspace Owner" && (
                  <button
                    type="button"
                    onClick={() => handleRemove(mem.id, mem.name)}
                    className="p-1 text-[#716D64] hover:text-[#7F1D1D] transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
