import React from 'react';
import {
  Building2,
  User,
  Target,
  Compass,
  Users,
  AlertTriangle,
  Zap,
  CheckSquare,
} from 'lucide-react';
import { ResearchSection } from './ResearchSection';

export const ResearchReport: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 1. Company Overview */}
      <ResearchSection
        sectionNumber="01"
        title="Company Overview"
        subtitle="Core product architecture, mission, and operating model"
        icon={<Building2 className="h-4 w-4" />}
        badgeText="PRIMARY ENTITY"
      >
        <p className="text-[#18181B] font-medium leading-relaxed">
          Eminarc Growth OS is an AI-native platform designed to unify market research, content generation, AI search visibility, and customer relationship management into a single cohesive workspace.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#716D64] block mb-1">
              CATEGORY DEFINITION
            </span>
            <span className="font-sans text-sm font-semibold text-[#111111]">
              AI Growth Operating System (Growth OS)
            </span>
          </div>
          <div className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#716D64] block mb-1">
              CORE PHILOSOPHY
            </span>
            <span className="font-serif italic text-sm text-[#111111]">
              &quot;Growth as a System, Not a Campaign.&quot;
            </span>
          </div>
        </div>
      </ResearchSection>

      {/* 2. Founder Summary */}
      <ResearchSection
        sectionNumber="02"
        title="Founder Summary"
        subtitle="Leadership background, strategic focus, and personal brand leverage"
        icon={<User className="h-4 w-4" />}
      >
        <div className="space-y-3">
          <p>
            Led by founder <strong className="text-[#111111]">Bhavesh Tickoo</strong>, the company combines deep technical architecture expertise with B2B growth strategy.
          </p>
          <ul className="space-y-2 border-l-2 border-[#18181B] pl-4 py-1 text-xs md:text-sm text-[#18181B]">
            <li><strong>Primary Focus:</strong> Building autonomous AI growth workflows for technical founders and B2B SaaS teams.</li>
            <li><strong>Content Persona:</strong> Systemic thinker, analytical B2B strategist, and minimalist product architect.</li>
            <li><strong>Distribution Channels:</strong> LinkedIn personal brand, technical Medium breakdowns, and targeted X threads.</li>
          </ul>
        </div>
      </ResearchSection>

      {/* 3. Ideal Customer Profile */}
      <ResearchSection
        sectionNumber="03"
        title="Ideal Customer Profile"
        subtitle="High-intent target segments, buyer personas, and pain points"
        icon={<Target className="h-4 w-4" />}
        badgeText="ICP MATCH: 96%"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-4 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#2D6A4F] bg-[#EDF6F0] px-2 py-0.5 rounded border border-[#C8E4D0]">
              TIER 1 TARGET
            </span>
            <h4 className="font-sans font-bold text-sm text-[#111111]">
              B2B SaaS Founders ($1M–$10M ARR)
            </h4>
            <p className="text-xs text-[#716D64] leading-relaxed">
              Founders spending 15+ hours weekly juggling 5+ disconnected marketing tools without a unified growth dashboard.
            </p>
          </div>

          <div className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-4 space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#1E293B] bg-[#F1F5F9] px-2 py-0.5 rounded border border-[#CBD5E1]">
              TIER 2 TARGET
            </span>
            <h4 className="font-sans font-bold text-sm text-[#111111]">
              Growth Agencies & Fractional CMOs
            </h4>
            <p className="text-xs text-[#716D64] leading-relaxed">
              Consultants needing standardized research reports and automated client content calendar workflows.
            </p>
          </div>
        </div>
      </ResearchSection>

      {/* 4. Market Positioning */}
      <ResearchSection
        sectionNumber="04"
        title="Market Positioning"
        subtitle="Competitive moat, value proposition, and brand differentiation"
        icon={<Compass className="h-4 w-4" />}
      >
        <div className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-bold text-[#111111] uppercase tracking-wider">
              SWISS MINIMALIST EDITORIAL BRAND
            </span>
            <span className="font-mono text-[10px] text-[#716D64]">POSITION: PREMIUM</span>
          </div>
          <p className="text-xs md:text-sm text-[#18181B] leading-relaxed">
            Positioned as the intelligent calm alternative to noisy, bloated CRM tools. While competitors focus on complex feature matrices, Eminarc delivers an editorial, paper-on-grid experience tailored for daily founder decision-making.
          </p>
        </div>
      </ResearchSection>

      {/* 5. Top Competitors */}
      <ResearchSection
        sectionNumber="05"
        title="Top Competitors"
        subtitle="Benchmark landscape and key points of contrast"
        icon={<Users className="h-4 w-4" />}
      >
        <div className="space-y-3">
          {[
            {
              name: 'HubSpot',
              type: 'Legacy Enterprise CRM',
              contrast: 'Bloated, high monthly cost, steep learning curve.',
            },
            {
              name: 'Notion / Airtable',
              type: 'Generic Workspaces',
              contrast: 'Requires 100+ hours of manual formula and workflow building.',
            },
            {
              name: 'Clay.com',
              type: 'Data Enrichment Platform',
              contrast: 'Highly complex table setup focused purely on outbound data.',
            },
          ].map((comp, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-3.5 text-xs"
            >
              <div>
                <span className="font-sans font-bold text-sm text-[#111111]">{comp.name}</span>
                <span className="font-mono text-[10px] text-[#716D64] ml-2">({comp.type})</span>
                <p className="text-[#716D64] mt-0.5">{comp.contrast}</p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#7F1D1D] bg-[#FEE2E2] px-2 py-0.5 rounded border border-[#FCA5A5] shrink-0 ml-3">
                LEGACY
              </span>
            </div>
          ))}
        </div>
      </ResearchSection>

      {/* 6. Messaging Gaps */}
      <ResearchSection
        sectionNumber="06"
        title="Messaging Gaps"
        subtitle="Critical friction points and copy vulnerabilities to resolve"
        icon={<AlertTriangle className="h-4 w-4" />}
        badgeText="3 GAPS DETECTED"
      >
        <div className="space-y-2.5">
          {[
            'Over-emphasis on raw AI tools rather than tangible revenue & lead generation outcomes.',
            'Need prominent customer proof points specifically demonstrating AI Search Visibility scores.',
            'Clarity required on self-serve onboarding vs white-glove agency setup options.',
          ].map((gap, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] p-3.5 text-xs text-[#78350F]"
            >
              <span className="font-mono font-bold text-[#B45309]">0{idx + 1}.</span>
              <span className="font-medium">{gap}</span>
            </div>
          ))}
        </div>
      </ResearchSection>

      {/* 7. Growth Opportunities */}
      <ResearchSection
        sectionNumber="07"
        title="Growth Opportunities"
        subtitle="Uncapped leverage vectors for customer acquisition"
        icon={<Zap className="h-4 w-4" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              title: 'Free AI Audit Tool',
              desc: 'Launch a 1-click URL scanner for instant viral lead acquisition.',
            },
            {
              title: 'LinkedIn Authority',
              desc: 'Execute a 30-day founder story series on growth system design.',
            },
            {
              title: 'n8n Integrations',
              desc: 'Partner with workflow automation communities for distribution.',
            },
          ].map((opp, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-4 space-y-1.5"
            >
              <span className="font-mono text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider">
                OPPORTUNITY 0{idx + 1}
              </span>
              <h4 className="font-sans font-bold text-sm text-[#111111]">{opp.title}</h4>
              <p className="text-xs text-[#716D64] leading-relaxed">{opp.desc}</p>
            </div>
          ))}
        </div>
      </ResearchSection>

      {/* 8. Recommended Next Actions */}
      <ResearchSection
        sectionNumber="08"
        title="Recommended Next Actions"
        subtitle="Actionable step-by-step implementation sequence"
        icon={<CheckSquare className="h-4 w-4" />}
        badgeText="HIGH PRIORITY"
      >
        <div className="space-y-3">
          {[
            {
              action: 'Publish LinkedIn Carousel: "Growth OS vs Fragmented Marketing Tech Stack"',
              eta: 'Today',
              channel: 'LinkedIn',
            },
            {
              action: 'Run AI Search Visibility Audit on Top 20 Target SaaS Accounts',
              eta: 'Tomorrow',
              channel: 'AI Scanner',
            },
            {
              action: 'Configure Automated Lead Enrichment Sequences in Growth CRM',
              eta: 'This Week',
              channel: 'CRM',
            },
          ].map((act, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-xl bg-[#FFFFFF] border border-[#E5E0D6] p-4 text-xs font-sans"
            >
              <div className="flex items-center space-x-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#000000] text-[#FFFFFF] font-mono text-[10px] font-bold shrink-0">
                  {idx + 1}
                </span>
                <span className="font-semibold text-[#18181B]">{act.action}</span>
              </div>
              <div className="flex items-center space-x-2 shrink-0 ml-3 font-mono text-[10px]">
                <span className="bg-[#EFEAE1] text-[#716D64] px-2 py-0.5 rounded">
                  {act.channel}
                </span>
                <span className="bg-[#EDF6F0] text-[#1E4620] px-2 py-0.5 rounded font-bold">
                  {act.eta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ResearchSection>
    </div>
  );
};
