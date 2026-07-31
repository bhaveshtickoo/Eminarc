import React from 'react';
import { Globe, ShieldCheck } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export interface ResearchHeaderProps {
  companyName?: string;
  website?: string;
  founderLinkedIn?: string;
}

export const ResearchHeader: React.FC<ResearchHeaderProps> = ({
  companyName = 'Eminarc Growth OS',
  website = 'https://eminarc.com',
  founderLinkedIn = 'linkedin.com/in/bhaveshtickoo',
}) => {
  return (
    <div className="rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 md:p-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-1 rounded-full">
              DEEP RESEARCH / REPORT
            </span>
            <span className="inline-flex items-center space-x-1 font-mono text-[10px] uppercase tracking-wider text-[#78350F] bg-[#FEF3C7] px-2.5 py-1 rounded-full border border-[#FDE68A]">
              <ShieldCheck className="h-3 w-3 mr-0.5 text-[#B45309]" />
              <span>MCKINSEY AUDIT GRADE</span>
            </span>
          </div>

          <h1 className="font-sans font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#111111]">
            {companyName}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-2 text-xs font-mono text-[#716D64]">
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:text-[#111111] transition-colors"
            >
              <Globe className="h-3.5 w-3.5 mr-1 text-[#716D64]" />
              <span>{website}</span>
            </a>
            <span>•</span>
            <a
              href={`https://${founderLinkedIn}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:text-[#111111] transition-colors"
            >
              <Globe className="h-3.5 w-3.5 mr-1 text-[#716D64]" />
              <span>{founderLinkedIn}</span>
            </a>
          </div>
        </div>

        {/* Status Badge Group */}
        <div className="shrink-0">
          <StatusBadge status="Completed" confidence="93%" timeAgo="2 minutes ago" />
        </div>
      </div>
    </div>
  );
};
