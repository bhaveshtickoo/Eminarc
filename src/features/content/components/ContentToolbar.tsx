"use client";

import React, { useState } from "react";
import { Save, Copy, Archive, Bold, Italic, List, Code, Check, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface ContentToolbarProps {
  status: "Draft" | "Review" | "Approved" | "Scheduled" | "Published";
  onStatusChange: (status: "Draft" | "Review" | "Approved" | "Scheduled" | "Published") => void;
  onSave?: () => void;
  onDuplicate?: () => void;
  onArchive?: () => void;
  onFormat?: (format: string) => void;
}

export const statusOptions = ["Draft", "Review", "Approved", "Scheduled", "Published"] as const;

export const ContentToolbar: React.FC<ContentToolbarProps> = ({
  status,
  onStatusChange,
  onSave,
  onDuplicate,
  onArchive,
  onFormat,
}) => {
  const [saved, setSaved] = useState(false);

  const handleSaveTrigger = () => {
    setSaved(true);
    toast.success("Draft Saved", {
      description: "Content changes stored in active workspace memory.",
    });
    setTimeout(() => setSaved(false), 2000);
    onSave?.();
  };

  const handleDuplicateTrigger = () => {
    toast.success("Content Duplicated", {
      description: "New draft instance created in Content OS.",
    });
    onDuplicate?.();
  };

  const handleArchiveTrigger = () => {
    toast.success("Draft Archived");
    onArchive?.();
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] select-none">
      {/* Formatting Shortcuts */}
      <div className="flex items-center space-x-1 border-r border-[#E5E0D6] pr-3">
        <button
          type="button"
          onClick={() => onFormat?.("bold")}
          className="p-1.5 rounded-lg hover:bg-[#EFEAE1] text-[#716D64] hover:text-[#18181B] transition-colors"
          title="Bold (**text**)"
        >
          <Bold className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onFormat?.("italic")}
          className="p-1.5 rounded-lg hover:bg-[#EFEAE1] text-[#716D64] hover:text-[#18181B] transition-colors"
          title="Italic (*text*)"
        >
          <Italic className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onFormat?.("list")}
          className="p-1.5 rounded-lg hover:bg-[#EFEAE1] text-[#716D64] hover:text-[#18181B] transition-colors"
          title="Bullet List"
        >
          <List className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onFormat?.("code")}
          className="p-1.5 rounded-lg hover:bg-[#EFEAE1] text-[#716D64] hover:text-[#18181B] transition-colors"
          title="Code Block"
        >
          <Code className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Content Status Selector */}
      <div className="flex items-center space-x-2 font-mono text-xs">
        <span className="text-[#716D64] font-bold">STATUS:</span>
        <select
          value={status}
          onChange={(e) =>
            onStatusChange(
              e.target.value as "Draft" | "Review" | "Approved" | "Scheduled" | "Published",
            )
          }
          className="bg-[#FFFFFF] border border-[#E5E0D6] rounded-xl px-3 py-1 text-xs font-bold text-[#18181B] focus:outline-none focus:ring-1 focus:ring-[#18181B] cursor-pointer"
        >
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2 font-mono text-xs">
        {/* Save */}
        <button
          type="button"
          onClick={handleSaveTrigger}
          className={cn(
            "flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border transition-all font-bold cursor-pointer active:scale-[0.98]",
            saved
              ? "bg-[#EDF6F0] text-[#1E4620] border-[#C8E4D0]"
              : "bg-[#000000] text-[#FFFFFF] border-black hover:bg-[#222222]",
          )}
        >
          {saved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
          <span>{saved ? "Saved" : "Save"}</span>
        </button>

        {/* Duplicate */}
        <button
          type="button"
          onClick={handleDuplicateTrigger}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-[#18181B] hover:bg-[#F7F4EE] transition-all cursor-pointer"
        >
          <Copy className="h-3.5 w-3.5 text-[#716D64]" />
          <span>Duplicate</span>
        </button>

        {/* Archive */}
        <button
          type="button"
          onClick={handleArchiveTrigger}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] text-[#716D64] hover:bg-[#F7F4EE] hover:text-[#18181B] transition-all cursor-pointer"
        >
          <Archive className="h-3.5 w-3.5" />
          <span>Archive</span>
        </button>
      </div>
    </div>
  );
};
