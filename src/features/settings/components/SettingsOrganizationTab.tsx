import React, { useState } from "react";
import { Briefcase, Building, Globe, Mail, MapPin, ShieldCheck, Save, Check } from "lucide-react";
import { toast } from "sonner";

export const SettingsOrganizationTab: React.FC = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [orgData, setOrgData] = useState({
    name: "Eminarc Technologies Inc.",
    legalName: "Eminarc Enterprise Growth OS LLC",
    domain: "eminarc.com",
    industry: "Enterprise AI & B2B SaaS",
    taxId: "US-849204910",
    supportEmail: "support@eminarc.com",
    hqLocation: "San Francisco, CA, USA",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    toast.success("Organization profile updated successfully");
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl font-sans">
      <div className="p-6 rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-6">
        <div className="border-b border-[rgba(0,0,0,0.06)] pb-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-[#111111] flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-[#716D64]" />
              Organization Identity & Structure
            </h3>
            <p className="text-xs text-[#52525B] mt-0.5">
              Manage parent entity attributes, legal registration, domain authority, and billing
              contact points.
            </p>
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#000000] text-[#FFFFFF] font-mono text-xs font-bold hover:bg-[#222222] transition-colors cursor-pointer"
          >
            {isSaved ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            <span>{isSaved ? "Saved" : "Save Changes"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="org-name"
              className="text-xs font-semibold text-[#18181B] flex items-center gap-1.5"
            >
              <Building className="h-3.5 w-3.5 text-[#716D64]" /> Display Name
            </label>
            <input
              id="org-name"
              type="text"
              value={orgData.name}
              onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-xs font-medium text-[#111111] focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="org-legal" className="text-xs font-semibold text-[#18181B]">
              Legal Entity Name
            </label>
            <input
              id="org-legal"
              type="text"
              value={orgData.legalName}
              onChange={(e) => setOrgData({ ...orgData, legalName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-xs font-medium text-[#111111] focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="org-domain"
              className="text-xs font-semibold text-[#18181B] flex items-center gap-1.5"
            >
              <Globe className="h-3.5 w-3.5 text-[#716D64]" /> Corporate Domain
            </label>
            <input
              id="org-domain"
              type="text"
              value={orgData.domain}
              onChange={(e) => setOrgData({ ...orgData, domain: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-xs font-medium text-[#111111] focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="org-tax"
              className="text-xs font-semibold text-[#18181B] flex items-center gap-1.5"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-[#716D64]" /> Tax / VAT ID
            </label>
            <input
              id="org-tax"
              type="text"
              value={orgData.taxId}
              onChange={(e) => setOrgData({ ...orgData, taxId: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-xs font-medium text-[#111111] focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="org-email"
              className="text-xs font-semibold text-[#18181B] flex items-center gap-1.5"
            >
              <Mail className="h-3.5 w-3.5 text-[#716D64]" /> Primary Contact Email
            </label>
            <input
              id="org-email"
              type="email"
              value={orgData.supportEmail}
              onChange={(e) => setOrgData({ ...orgData, supportEmail: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-xs font-medium text-[#111111] focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="org-location"
              className="text-xs font-semibold text-[#18181B] flex items-center gap-1.5"
            >
              <MapPin className="h-3.5 w-3.5 text-[#716D64]" /> Headquarter Location
            </label>
            <input
              id="org-location"
              type="text"
              value={orgData.hqLocation}
              onChange={(e) => setOrgData({ ...orgData, hqLocation: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-xs font-medium text-[#111111] focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
