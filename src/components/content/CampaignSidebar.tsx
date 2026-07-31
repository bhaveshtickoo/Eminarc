'use client';

import React, { useState } from 'react';
import {
  FolderKanban,
  Plus,
} from 'lucide-react';
import { cn } from '@/design-system/utils/cn';
import { BrandVoiceCard } from './BrandVoiceCard';
import { ContentFilters } from './ContentFilters';
import { ContentCard } from './ContentCard';

export interface CampaignItem {
  id: string;
  name: string;
  count: number;
  active?: boolean;
}

export interface DraftItem {
  id: string;
  title: string;
  type: string;
  status: 'Draft' | 'Scheduled' | 'Published';
  updatedAt: string;
}

export const initialDrafts: DraftItem[] = [
  {
    id: 'd-1',
    title: 'Why Growth OS Architecture Replaces Fragmented Marketing Tech Stacks',
    type: 'LinkedIn Post',
    status: 'Draft',
    updatedAt: '12m ago',
  },
  {
    id: 'd-2',
    title: 'How We Scaled B2B AI Visibility Citation Scores by 38% in 30 Days',
    type: 'Medium Article',
    status: 'Scheduled',
    updatedAt: '2h ago',
  },
  {
    id: 'd-3',
    title: 'The Systemic Founder: Building Content Engine Workflows without Burnout',
    type: 'Reddit Case Study',
    status: 'Published',
    updatedAt: 'Yesterday',
  },
  {
    id: 'd-4',
    title: '5 AI Search Optimization Frameworks Every B2B Founder Must Implement',
    type: 'LinkedIn Carousel',
    status: 'Draft',
    updatedAt: '2 days ago',
  },
];

export interface CampaignSidebarProps {
  activeDraftId?: string;
  onSelectDraft?: (draft: DraftItem) => void;
  onNewDraft?: () => void;
}

export const CampaignSidebar: React.FC<CampaignSidebarProps> = ({
  activeDraftId = 'd-1',
  onSelectDraft,
  onNewDraft,
}) => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const campaigns: CampaignItem[] = [
    { id: 'c-1', name: 'Growth OS Launch', count: 6, active: true },
    { id: 'c-2', name: 'AI Visibility Audit', count: 4 },
    { id: 'c-3', name: 'Founder Stories Series', count: 8 },
  ];

  const filteredDrafts = initialDrafts.filter((draft) => {
    const matchesFilter =
      filter === 'All' ||
      draft.status === filter ||
      draft.type.toLowerCase().includes(filter.toLowerCase());
    const matchesSearch =
      search === '' || draft.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] space-y-5 overflow-y-auto">
      {/* New Post Button */}
      <button
        type="button"
        onClick={onNewDraft}
        className="flex w-full items-center justify-center space-x-2 rounded-xl bg-[#000000] px-4 py-2.5 text-xs font-sans font-bold text-[#FFFFFF] shadow-sm hover:bg-[#222222] transition-all active:scale-[0.98]"
      >
        <Plus className="h-4 w-4" />
        <span>New Content Item</span>
      </button>

      {/* Brand Voice Card */}
      <BrandVoiceCard />

      {/* Campaigns Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#716D64]">
            Active Campaigns
          </span>
          <span className="font-mono text-[9px] text-[#716D64] bg-[#EFEAE1] px-1.5 py-0.5 rounded">
            3 CAMPAIGNS
          </span>
        </div>

        <div className="space-y-1">
          {campaigns.map((c) => (
            <div
              key={c.id}
              className={cn(
                'group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-sans transition-all duration-150 cursor-pointer select-none',
                c.active
                  ? 'bg-[#FFFFFF] text-[#111111] font-semibold border border-[#E5E0D6] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]'
                  : 'text-[#716D64] hover:bg-[#FFFFFF]/70 hover:text-[#111111]'
              )}
            >
              <div className="flex items-center space-x-2 truncate">
                <FolderKanban className="h-3.5 w-3.5 shrink-0 text-[#716D64]" />
                <span className="truncate">{c.name}</span>
              </div>
              <span className="font-mono text-[9px] text-[#716D64] bg-[#EFEAE1] px-1.5 py-0.5 rounded">
                {c.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter & Search */}
      <div className="space-y-2 pt-2 border-t border-[#E5E0D6]/60">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#716D64]">
          Content Repository
        </span>
        <ContentFilters
          activeFilter={filter}
          onFilterChange={setFilter}
          searchQuery={search}
          onSearchChange={setSearch}
        />
      </div>

      {/* Drafts List */}
      <div className="space-y-2 pt-2 border-t border-[#E5E0D6]/60 flex-1">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#716D64]">
            Drafts & Posts
          </span>
          <span className="font-mono text-[9px] text-[#716D64]">
            {filteredDrafts.length} ITEMS
          </span>
        </div>

        <div className="space-y-2">
          {filteredDrafts.map((draft) => (
            <ContentCard
              key={draft.id}
              title={draft.title}
              type={draft.type}
              status={draft.status}
              updatedAt={draft.updatedAt}
              active={draft.id === activeDraftId}
              onClick={() => onSelectDraft?.(draft)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
