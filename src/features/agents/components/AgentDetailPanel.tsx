"use client";

import React from "react";
import {
  Terminal,
  Layers,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Database,
  Globe,
  Sparkles,
  CheckCircle2,
  Clock,
  Play,
} from "lucide-react";
import { toast } from "sonner";
import { AgentCardData } from "./AgentCard";

export interface AgentDetailPanelProps {
  agent: AgentCardData;
}

export const AgentDetailPanel: React.FC<AgentDetailPanelProps> = ({ agent }) => {
  const mockTerminalLogs = [
    `[${new Date().toLocaleTimeString()}] INIT: Launching ${agent.name}...`,
    `[${new Date().toLocaleTimeString()}] INPUT_VAL: Schema and parameters validated.`,
    `[${new Date().toLocaleTimeString()}] EXEC: Querying local Workspace Knowledge Base context...`,
    `[${new Date().toLocaleTimeString()}] TRANSFORM: Formatting output markdown payload.`,
    `[${new Date().toLocaleTimeString()}] STATUS 200: Execution completed cleanly (${agent.avgRuntime}).`,
  ];

  const handleManualRun = () => {
    toast.success(`Triggered ${agent.name}`, {
      description: "Executing agent workflow in mock background process.",
    });
  };

  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-6 select-none">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(0,0,0,0.06)] pb-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              AGENT INSPECTOR PANEL
            </span>
            <span className="font-mono text-[10px] text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded-full border border-[#C8E4D0] font-bold">
              CONFIDENCE {agent.confidenceScore}%
            </span>
          </div>
          <h2 className="font-sans font-bold text-2xl text-[#111111]">{agent.name}</h2>
          <p className="font-sans text-xs text-[#52525B] mt-0.5">{agent.purpose}</p>
        </div>

        <button
          type="button"
          onClick={handleManualRun}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#000000] text-[#FFFFFF] font-mono text-xs font-bold hover:bg-[#222222] transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          <span>Execute Agent Now</span>
        </button>
      </div>

      {/* Grid of Inspection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Inputs */}
        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
          <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase block">
            01. AGENT INPUTS
          </span>
          <div className="space-y-1.5 font-mono text-xs text-[#18181B]">
            <p>• Company Website URL & LinkedIn</p>
            <p>• Workspace Knowledge Base Context</p>
            <p>• Competitor Domain Telemetry</p>
          </div>
        </div>

        {/* Outputs */}
        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
          <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase block">
            02. AGENT OUTPUTS
          </span>
          <div className="space-y-1.5 font-mono text-xs text-[#2D6A4F] font-bold">
            <p>• 13 Structured KB Entities</p>
            <p>• McKinsey Consulting Report Markdown</p>
            <p>• GEO AI Search Citation Schema</p>
          </div>
        </div>

        {/* Future Integrations */}
        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-2">
          <span className="font-mono text-[10px] font-bold text-[#716D64] uppercase block">
            03. FUTURE INTEGRATIONS
          </span>
          <div className="space-y-1.5 font-mono text-xs text-[#0369A1]">
            <p>• OpenRouter API (Claude 3.5 & GPT-4o)</p>
            <p>• Supabase PostgreSQL Vector DB</p>
            <p>• Anthropic Computer-Use Protocol</p>
          </div>
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="space-y-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-[#716D64] block">
          WORKFLOW EXECUTION PIPELINE
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-1">
            <span className="text-[#2D6A4F] font-bold block">STEP 1: RESEARCH & FETCH</span>
            <p className="text-[#716D64] text-[11px] font-sans">
              Extract company domain headers, founder profile, and market positioning.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-1">
            <span className="text-[#2D6A4F] font-bold block">STEP 2: SYNTHESIZE & MAP</span>
            <p className="text-[#716D64] text-[11px] font-sans">
              Map friction points to 13 Workspace Knowledge Base structured entities.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] space-y-1">
            <span className="text-[#2D6A4F] font-bold block">STEP 3: DEPLOY & MONITOR</span>
            <p className="text-[#716D64] text-[11px] font-sans">
              Publish consultation report and feed distribution queue & CRM.
            </p>
          </div>
        </div>
      </div>

      {/* Mock Terminal Console Logs */}
      <div className="rounded-xl bg-[#18181B] text-[#00FF66] p-4 font-mono text-xs space-y-2 border border-[#27272A] shadow-inner">
        <div className="flex items-center justify-between border-b border-[#27272A] pb-2 text-[#A1A1AA]">
          <span className="flex items-center">
            <Terminal className="h-4 w-4 mr-1.5 text-[#00FF66]" />
            MOCK TERMINAL CONSOLE LOGS
          </span>
          <span className="text-[10px]">LOG LEVEL: INFO</span>
        </div>

        <div className="space-y-1">
          {mockTerminalLogs.map((log, idx) => (
            <div key={idx}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
