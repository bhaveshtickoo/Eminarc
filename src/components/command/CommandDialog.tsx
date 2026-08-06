"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";

export interface CommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const CommandDialog: React.FC<CommandDialogProps> = ({ open, onOpenChange, children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 select-none">
      {/* Backdrop */}
      <div
        onClick={() => onOpenChange(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in-0 duration-200"
      />

      {/* Centered Modal Window */}
      <div className="relative w-full max-w-2xl rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.12)] shadow-[0_16px_48px_-8px_rgba(0,0,0,0.2)] overflow-hidden transition-all transform animate-in fade-in-0 zoom-in-95 duration-150">
        {children}
      </div>
    </div>
  );
};
