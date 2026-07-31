import React from 'react';
import { cn } from '@/design-system/utils/cn';

export interface EmptyCardPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  indexCode?: string; // e.g. "INDEX / 001"
  badge?: React.ReactNode;
  heightClass?: string;
  headerAction?: React.ReactNode;
}

/**
 * EmptyCardPlaceholder
 *
 * Specific Eminarc Growth OS dashboard card container:
 * Background: #FCFAF7
 * Border: rgba(0, 0, 0, 0.08)
 * Radius: 18px
 * Tiny paper shadow
 */
export const EmptyCardPlaceholder: React.FC<EmptyCardPlaceholderProps> = ({
  className,
  title,
  subtitle,
  indexCode,
  badge,
  heightClass = 'min-h-[220px]',
  headerAction,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-[18px] bg-[#FCFAF7] border border-[rgba(0,0,0,0.08)] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.025)] transition-all duration-200 ease-out hover:border-[rgba(0,0,0,0.14)] hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.04)]',
        heightClass,
        className
      )}
      {...props}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center space-x-2.5">
            {indexCode && (
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#716D64]">
                {indexCode}
              </span>
            )}
            {badge}
          </div>
          <h3 className="font-sans text-base font-semibold tracking-tight text-[#111111] mt-1">
            {title}
          </h3>
          {subtitle && (
            <p className="font-sans text-xs text-[#716D64] mt-0.5 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {headerAction && <div className="shrink-0">{headerAction}</div>}
      </div>

      {/* Empty Content Canvas */}
      <div className="flex-1 w-full rounded-xl border border-dashed border-[rgba(0,0,0,0.08)] bg-[#F8F5EE]/50 p-4 flex flex-col items-center justify-center text-center">
        {children || (
          <div className="space-y-1 py-4">
            <div className="w-8 h-8 mx-auto rounded-full bg-[#EFEAE1] flex items-center justify-center text-[#716D64]">
              <span className="font-sans font-semibold text-sm">+</span>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-[#9E988D] pt-1">
              Empty Module Shell
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
