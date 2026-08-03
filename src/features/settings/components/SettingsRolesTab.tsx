import React, { useState } from "react";
import { Shield, Lock, CheckCircle2, UserCheck, Plus } from "lucide-react";
import { toast } from "sonner";

interface RoleDef {
  id: string;
  name: string;
  usersCount: number;
  description: string;
  permissions: {
    manageWorkspace: boolean;
    manageBilling: boolean;
    publishContent: boolean;
    runAgents: boolean;
    viewAnalytics: boolean;
  };
}

export const SettingsRolesTab: React.FC = () => {
  const [roles, setRoles] = useState<RoleDef[]>([
    {
      id: "admin",
      name: "Owner / Admin",
      usersCount: 2,
      description: "Full control over organization settings, billing, API keys, and workspace members.",
      permissions: {
        manageWorkspace: true,
        manageBilling: true,
        publishContent: true,
        runAgents: true,
        viewAnalytics: true,
      },
    },
    {
      id: "growth-lead",
      name: "Growth Lead",
      usersCount: 4,
      description: "Can configure AI agents, execute campaigns, edit CRM records, and view metrics.",
      permissions: {
        manageWorkspace: false,
        manageBilling: false,
        publishContent: true,
        runAgents: true,
        viewAnalytics: true,
      },
    },
    {
      id: "analyst",
      name: "Growth Analyst",
      usersCount: 3,
      description: "Read-only access to analytics dashboards, campaign reports, and customer insights.",
      permissions: {
        manageWorkspace: false,
        manageBilling: false,
        publishContent: false,
        runAgents: false,
        viewAnalytics: true,
      },
    },
  ]);

  const togglePermission = (roleId: string, permKey: keyof RoleDef["permissions"]) => {
    setRoles((prev) =>
      prev.map((r) => {
        if (r.id === roleId) {
          return {
            ...r,
            permissions: {
              ...r.permissions,
              [permKey]: !r.permissions[permKey],
            },
          };
        }
        return r;
      }),
    );
    toast.success("Role permission matrix updated");
  };

  return (
    <div className="space-y-6 max-w-4xl font-sans">
      <div className="p-6 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-6">
        <div className="border-b border-[rgba(0,0,0,0.06)] pb-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-[#111111] flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#716D64]" />
              Role-Based Access Control (RBAC)
            </h3>
            <p className="text-xs text-[#52525B] mt-0.5">
              Define team member access levels, security policies, and feature execution privileges.
            </p>
          </div>
          <button
            type="button"
            onClick={() => toast.info("Custom role creation is available on Enterprise tier")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-xs font-semibold text-[#111111] hover:bg-[#F7F4EE] transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Create Custom Role</span>
          </button>
        </div>

        <div className="space-y-4">
          {roles.map((role) => (
            <div key={role.id} className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <UserCheck className="h-4 w-4 text-[#2D6A4F]" />
                  <h4 className="font-bold text-sm text-[#111111]">{role.name}</h4>
                  <span className="font-mono text-[10px] bg-[#EFEAE1] px-2 py-0.5 rounded-full text-[#716D64]">
                    {role.usersCount} users assigned
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#52525B]">{role.description}</p>

              <div className="pt-2 border-t border-[#F2EDE4] grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                {(Object.keys(role.permissions) as Array<keyof RoleDef["permissions"]>).map((permKey) => {
                  const isChecked = role.permissions[permKey];
                  return (
                    <button
                      key={permKey}
                      type="button"
                      onClick={() => togglePermission(role.id, permKey)}
                      className={`flex items-center justify-between p-2 rounded-lg border text-[11px] font-mono transition-colors cursor-pointer ${
                        isChecked
                          ? "bg-[#EDF6F0] border-[#C8E4D0] text-[#2D6A4F]"
                          : "bg-[#FAFAFA] border-[#E5E0D6] text-[#716D64]"
                      }`}
                    >
                      <span className="capitalize">{permKey.replace(/([A-Z])/g, " $1")}</span>
                      {isChecked && <CheckCircle2 className="h-3 w-3 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
