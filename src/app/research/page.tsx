import React from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { ResearchForm } from '@/components/research/ResearchForm';
import { ResearchHeader } from '@/components/research/ResearchHeader';
import { ResearchSidebar } from '@/components/research/ResearchSidebar';
import { ResearchReport } from '@/components/research/ResearchReport';

export const metadata = {
  title: 'Founder Research Workspace | Eminarc Growth OS',
  description: 'Analyze companies and generate strategic McKinsey-grade growth reports.',
};

export default function FounderResearchPage() {
  return (
    <DashboardShell activeNavId="research">
      {/* Two-Column Responsive Workspace Grid (35% Left Input / 65% Right Report) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Panel: Research Input & Recent History (35% width -> 4 cols on 12-col grid) */}
        <div className="lg:col-span-4 sticky top-20">
          <ResearchForm />
        </div>

        {/* Right Panel: Research Report & Tools (65% width -> 8 cols on 12-col grid) */}
        <div className="lg:col-span-8 space-y-6">
          <ResearchHeader
            companyName="Eminarc Growth OS"
            website="https://eminarc.com"
            founderLinkedIn="linkedin.com/in/bhaveshtickoo"
          />

          {/* Action Toolbar */}
          <ResearchSidebar />

          {/* 8 Strategic Research Sections */}
          <ResearchReport />
        </div>
      </div>
    </DashboardShell>
  );
}
