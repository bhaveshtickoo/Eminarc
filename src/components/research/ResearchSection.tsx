import React from 'react';
import { cn } from '@/design-system/utils/cn';

export interface ResearchSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  sectionNumber: string; // e.g. "01", "02"
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badgeText?: string;
}

export const ResearchSection: React.FC<ResearchSectionProps> = ({
  sectionNumber,
  title,
  subtitle,
  icon,
  badgeText,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 md:p-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] transition-all duration-200 hover:border-[rgba(0,0,0,0.14)]',
        className
      )}
      {...props}
    >
      {/* Section Header */}
      <div className="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-[rgba(0,0,0,0.06)]">
        <div>
          <div className="flex items-center space-x-2.5 mb-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#716D64] bg-[#EFEAE1] px-2.5 py-0.5 rounded-full">
              SECTION / {sectionNumber}
            </span>
            {badgeText && (
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#1E4620] bg-[#EDF6F0] px-2.5 py-0.5 rounded-full border border-[#C8E4D0]">
                {badgeText}
              </span>
            )}
          </div>

          <h3 className="font-sans text-xl md:text-2xl font-bold tracking-tight text-[#111111]">
            {title}
          </h3>

          {subtitle && (
            <p className="font-sans font-medium text-xs md:text-sm text-[#52525B] mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#000000] text-[#FFFFFF] shrink-0">
            {icon}
          </div>
        )}
      </div>

      {/* Section Body */}
      <div className="font-sans text-sm text-[#18181B] leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  );
};
