import React from 'react';
import { cn } from '../utils/cn';
import { colors } from '../tokens/colors';

export interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  legend?: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  className,
  title,
  subtitle,
  legend,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'w-full rounded-2xl bg-[#FFFFFF] border border-[#E5E0D6] p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]',
        className
      )}
      {...props}
    >
      {(title || subtitle || legend) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3 pb-4 border-b border-[#E5E0D6]/60">
          <div>
            {title && (
              <h4 className="font-sans font-semibold text-lg tracking-tight text-[#111111]">
                {title}
              </h4>
            )}
            {subtitle && (
              <p className="font-sans text-xs text-[#716D64] mt-0.5">{subtitle}</p>
            )}
          </div>
          {legend && <div className="flex items-center space-x-4">{legend}</div>}
        </div>
      )}
      <div className="w-full relative min-h-[220px] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

// Chart Legend Item Primitive
export interface ChartLegendItemProps {
  color: string;
  label: string;
}

export const ChartLegendItem: React.FC<ChartLegendItemProps> = ({ color, label }) => (
  <div className="flex items-center space-x-2">
    <span
      className="h-2.5 w-2.5 rounded-full"
      style={{ backgroundColor: color }}
    />
    <span className="font-mono text-xs text-[#716D64] uppercase tracking-wide">
      {label}
    </span>
  </div>
);

// Export Chart Palette Reference
export const chartColors = colors.chart;
