'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { ContentHeader } from '@/components/content/ContentHeader';
import { CampaignSidebar, DraftItem } from '@/components/content/CampaignSidebar';
import { ContentEditor } from '@/components/content/ContentEditor';
import { AICopilot } from '@/components/content/AICopilot';
import { RepurposePanel } from '@/components/content/RepurposePanel';
import { ContentCalendar } from '@/components/content/ContentCalendar';

export default function ContentOperatingSystemPage() {
  const [activeTab, setActiveTab] = useState<'editor' | 'calendar'>('editor');
  const [selectedDraft, setSelectedDraft] = useState<DraftItem>({
    id: 'd-1',
    title: 'Why Growth OS Architecture Replaces Fragmented Marketing Tech Stacks',
    type: 'LinkedIn Post',
    status: 'Draft',
    updatedAt: '12m ago',
  });

  return (
    <DashboardShell activeNavId="content">
      {/* Content OS Header with View Toggle */}
      <ContentHeader activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'editor' ? (
        <div className="space-y-6">
          {/* Three-Column Workspace Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 25% Column: Campaign Sidebar & Repository (3 cols on 12-col grid) */}
            <div className="lg:col-span-3 h-[720px] sticky top-20">
              <CampaignSidebar
                activeDraftId={selectedDraft.id}
                onSelectDraft={setSelectedDraft}
              />
            </div>

            {/* Center 50% Column: Notion-like Studio Canvas (6 cols on 12-col grid) */}
            <div className="lg:col-span-6 min-h-[720px]">
              <ContentEditor
                key={selectedDraft.id}
                initialTitle={selectedDraft.title}
                initialType={selectedDraft.type}
              />
            </div>

            {/* Right 25% Column: AI Copilot & Content Intelligence (3 cols on 12-col grid) */}
            <div className="lg:col-span-3 h-[720px] sticky top-20">
              <AICopilot />
            </div>
          </div>

          {/* Bottom 1-Click Multi-Channel Repurpose Panel */}
          <RepurposePanel />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Weekly Content Calendar View */}
          <ContentCalendar />

          {/* Bottom 1-Click Multi-Channel Repurpose Panel */}
          <RepurposePanel />
        </div>
      )}
    </DashboardShell>
  );
}
