'use client';

import React, { useState } from 'react';
import {
  Save,
  Copy,
  Archive,
  Check,
  Bold,
  Italic,
  List,
  Quote,
  Code,
} from 'lucide-react';

export interface ContentToolbarProps {
  contentType?: string;
  onTypeChange?: (type: string) => void;
  status?: string;
  onSave?: () => void;
  onDuplicate?: () => void;
  onArchive?: () => void;
}

export const contentTypes = [
  'LinkedIn Post',
  'Medium Article',
  'Reddit Case Study',
  'Newsletter',
  'Twitter/X Thread',
  'Video Script',
];

export const ContentToolbar: React.FC<ContentToolbarProps> = ({
  contentType = 'LinkedIn Post',
  onTypeChange,
  status = 'Draft',
  onSave,
  onDuplicate,
  onArchive,
}) => {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    setSaved(true);
    onSave?.();
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDuplicate = () => {
    setCopied(true);
    onDuplicate?.();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[rgba(0,0,0,0.06)] mb-6 select-none">
      {/* Content Type Selector & Status Badge */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <select
            value={contentType}
            onChange={(e) => onTypeChange?.(e.target.value)}
            className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] px-3 py-1.5 font-mono text-xs font-bold text-[#111111] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] focus:outline-none focus:ring-1 focus:ring-[#18181B] cursor-pointer"
          >
            {contentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <span className="font-mono text-[9px] uppercase tracking-wider font-semibold bg-[#EDF6F0] text-[#1E4620] px-2.5 py-1 rounded-full border border-[#C8E4D0]">
          {status}
        </span>
      </div>

      {/* Basic Formatting Quick Buttons */}
      <div className="hidden sm:flex items-center space-x-1 rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-1">
        <button
          type="button"
          className="p-1.5 text-[#716D64] hover:bg-[#F7F4EE] hover:text-[#111111] rounded-lg transition-colors"
          title="Bold"
        >
          <Bold className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          className="p-1.5 text-[#716D64] hover:bg-[#F7F4EE] hover:text-[#111111] rounded-lg transition-colors"
          title="Italic"
        >
          <Italic className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          className="p-1.5 text-[#716D64] hover:bg-[#F7F4EE] hover:text-[#111111] rounded-lg transition-colors"
          title="Bullet List"
        >
          <List className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          className="p-1.5 text-[#716D64] hover:bg-[#F7F4EE] hover:text-[#111111] rounded-lg transition-colors"
          title="Quote"
        >
          <Quote className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          className="p-1.5 text-[#716D64] hover:bg-[#F7F4EE] hover:text-[#111111] rounded-lg transition-colors"
          title="Code Block"
        >
          <Code className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Action Buttons: Save, Duplicate, Archive */}
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={handleDuplicate}
          className="flex items-center space-x-1.5 rounded-xl border border-[#E5E0D6] bg-[#FFFFFF] px-3 py-1.5 font-sans text-xs font-medium text-[#18181B] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] hover:bg-[#F7F4EE] transition-all"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-[#2D6A4F]" /> : <Copy className="h-3.5 w-3.5 text-[#716D64]" />}
          <span>{copied ? 'Duplicated' : 'Duplicate'}</span>
        </button>

        <button
          type="button"
          onClick={onArchive}
          className="flex items-center space-x-1.5 rounded-xl border border-[#E5E0D6] bg-[#FFFFFF] px-3 py-1.5 font-sans text-xs font-medium text-[#716D64] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] hover:bg-[#F7F4EE] hover:text-[#111111] transition-all"
        >
          <Archive className="h-3.5 w-3.5 text-[#716D64]" />
          <span>Archive</span>
        </button>

        <button
          type="button"
          onClick={handleSave}
          className="flex items-center space-x-1.5 rounded-xl bg-[#000000] px-4 py-1.5 font-sans text-xs font-bold text-[#FFFFFF] shadow-sm hover:bg-[#222222] transition-all active:scale-[0.98]"
        >
          {saved ? <Check className="h-3.5 w-3.5 text-[#FFFFFF]" /> : <Save className="h-3.5 w-3.5" />}
          <span>{saved ? 'Saved!' : 'Save'}</span>
        </button>
      </div>
    </div>
  );
};
