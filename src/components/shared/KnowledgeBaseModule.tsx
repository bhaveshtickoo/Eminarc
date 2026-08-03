"use client";

import React, { useState } from "react";
import {
  Database,
  Building2,
  User,
  Package,
  Target,
  AlertTriangle,
  Compass,
  Users,
  MessageSquare,
  Mic,
  Zap,
  CheckSquare,
} from "lucide-react";
import { useWorkspace } from "@/hooks/useWorkspace";
import { cn } from "@/lib/utils";

export const KnowledgeBaseModule: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const kb = currentWorkspace.knowledgeBase;
  const [activeTab, setActiveTab] = useState<string>("all");

  const categories = [
    { id: "all", name: "All 13 Entities" },
    { id: "profile", name: "Profiles & Market" },
    { id: "offerings", name: "Products & Services" },
    { id: "messaging", name: "Messaging & Voice" },
    { id: "strategy", name: "Strategy & Goals" },
  ];

  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-5 select-none">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[rgba(0,0,0,0.06)]">
        <div className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#000000] text-[#FFFFFF]">
            <Database className="h-4 w-4" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64]">
              REUSABLE INTELLIGENCE MODULE
            </span>
            <h3 className="font-sans font-bold text-lg text-[#111111] leading-tight">
              Workspace Knowledge Base ({currentWorkspace.name})
            </h3>
          </div>
        </div>

        <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-[#2D6A4F] bg-[#EDF6F0] px-2.5 py-1 rounded-full border border-[#C8E4D0] self-start sm:self-auto">
          13 ENTITIES BOUND
        </span>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveTab(cat.id)}
            className={cn(
              "px-3 py-1.5 rounded-xl border transition-all font-medium",
              activeTab === cat.id
                ? "bg-[#000000] text-[#FFFFFF] border-black shadow-sm font-bold"
                : "bg-[#FFFFFF] text-[#716D64] border-[#E5E0D6] hover:bg-[#F7F4EE]",
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Structured Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        {/* 1. Company Profile */}
        {(activeTab === "all" || activeTab === "profile") && (
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
                <Building2 className="h-3.5 w-3.5 mr-1" />
                1. Company Profile
              </span>
              <span className="font-mono text-[9px] bg-[#EFEAE1] px-1.5 py-0.5 rounded text-[#716D64]">
                {kb.companyProfile.category}
              </span>
            </div>
            <h4 className="font-sans font-bold text-xs text-[#111111]">{kb.companyProfile.name}</h4>
            <p className="font-sans text-[11px] text-[#716D64]">{kb.companyProfile.description}</p>
          </div>
        )}

        {/* 2. Founder Profile */}
        {(activeTab === "all" || activeTab === "profile") && (
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
                <User className="h-3.5 w-3.5 mr-1" />
                2. Founder Profile
              </span>
              <span className="font-mono text-[9px] bg-[#EFEAE1] px-1.5 py-0.5 rounded text-[#716D64]">
                FOUNDER
              </span>
            </div>
            <h4 className="font-sans font-bold text-xs text-[#111111]">{kb.founderProfile.name}</h4>
            <p className="font-sans text-[11px] text-[#716D64]">{kb.founderProfile.bio}</p>
          </div>
        )}

        {/* 3. Industry */}
        {(activeTab === "all" || activeTab === "profile") && (
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
                <Compass className="h-3.5 w-3.5 mr-1" />
                3. Industry Vertical
              </span>
            </div>
            <h4 className="font-sans font-bold text-xs text-[#111111]">{kb.industry}</h4>
            <p className="font-sans text-[11px] text-[#716D64]">Primary competitive market sector.</p>
          </div>
        )}

        {/* 4. Target Markets */}
        {(activeTab === "all" || activeTab === "profile") && (
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
                <Target className="h-3.5 w-3.5 mr-1" />
                4. Target Markets
              </span>
            </div>
            <div className="flex flex-wrap gap-1 font-mono text-[10px]">
              {kb.targetMarkets.map((m, idx) => (
                <span key={idx} className="bg-[#EDF6F0] text-[#1E4620] px-2 py-0.5 rounded border border-[#C8E4D0]">
                  {m}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 5. Ideal Customer Profile */}
        {(activeTab === "all" || activeTab === "profile") && (
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
                <Users className="h-3.5 w-3.5 mr-1" />
                5. Ideal Customer Profile
              </span>
            </div>
            <h4 className="font-sans font-bold text-xs text-[#111111]">{kb.idealCustomerProfile.primaryICP}</h4>
            <p className="font-sans text-[11px] text-[#716D64]">
              Decision Makers: {kb.idealCustomerProfile.decisionMakers.join(", ")}
            </p>
          </div>
        )}

        {/* 6. Products & Services */}
        {(activeTab === "all" || activeTab === "offerings") && (
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
                <Package className="h-3.5 w-3.5 mr-1" />
                6. Products & Services
              </span>
            </div>
            <h4 className="font-sans font-bold text-xs text-[#111111]">
              {kb.productsAndServices.products.map((p) => p.name).join(", ")}
            </h4>
            <p className="font-sans text-[11px] text-[#716D64]">
              Services: {kb.productsAndServices.services.map((s) => s.name).join(", ")}
            </p>
          </div>
        )}

        {/* 7. Pain Points */}
        {(activeTab === "all" || activeTab === "messaging") && (
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
                <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                7. Pain Points ({kb.painPoints.length})
              </span>
            </div>
            <ul className="text-[11px] text-[#716D64] space-y-1">
              {kb.painPoints.map((pp, idx) => (
                <li key={idx}>• {pp.title}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 8. Messaging */}
        {(activeTab === "all" || activeTab === "messaging") && (
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
                <MessageSquare className="h-3.5 w-3.5 mr-1" />
                8. Core Messaging
              </span>
            </div>
            <h4 className="font-sans font-bold text-xs text-[#111111]">{kb.messaging.tagline}</h4>
            <p className="font-sans text-[11px] text-[#716D64]">&quot;{kb.messaging.elevatorPitch}&quot;</p>
          </div>
        )}

        {/* 9. Brand Voice */}
        {(activeTab === "all" || activeTab === "messaging") && (
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
                <Mic className="h-3.5 w-3.5 mr-1" />
                9. Brand Voice
              </span>
            </div>
            <div className="flex flex-wrap gap-1 font-mono text-[10px]">
              {kb.brandVoice.toneTags.map((tone, idx) => (
                <span key={idx} className="bg-[#18181B] text-[#FFFFFF] px-2 py-0.5 rounded">
                  {tone}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 10. Competitors */}
        {(activeTab === "all" || activeTab === "strategy") && (
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
                <Users className="h-3.5 w-3.5 mr-1" />
                10. Competitors ({kb.competitors.length})
              </span>
            </div>
            <p className="font-sans text-xs font-semibold text-[#111111]">
              {kb.competitors.map((c) => c.name).join(", ")}
            </p>
          </div>
        )}

        {/* 11. Growth Opportunities */}
        {(activeTab === "all" || activeTab === "strategy") && (
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
                <Zap className="h-3.5 w-3.5 mr-1" />
                11. Growth Opportunities
              </span>
            </div>
            <ul className="text-[11px] text-[#716D64] space-y-1">
              {kb.growthOpportunities.map((go, idx) => (
                <li key={idx}>• {go.title}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 12. Goals */}
        {(activeTab === "all" || activeTab === "strategy") && (
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
                <CheckSquare className="h-3.5 w-3.5 mr-1" />
                12. Strategic Goals
              </span>
            </div>
            <ul className="text-[11px] text-[#716D64] space-y-1 font-mono">
              {kb.goals.map((g, idx) => (
                <li key={idx}>• {g.title} ({g.target})</li>
              ))}
            </ul>
          </div>
        )}

        {/* 13. Challenges */}
        {(activeTab === "all" || activeTab === "strategy") && (
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase flex items-center">
                <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                13. Challenges ({kb.challenges.length})
              </span>
            </div>
            <ul className="text-[11px] text-[#716D64] space-y-1">
              {kb.challenges.map((c, idx) => (
                <li key={idx}>• {c.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
