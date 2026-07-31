import React from 'react';
import { cn } from '../utils/cn';

// Label Primitive
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}
export const Label: React.FC<LabelProps> = ({ className, required, children, ...props }) => (
  <label
    className={cn(
      'block font-sans text-xs font-semibold uppercase tracking-wider text-[#18181B] mb-1.5',
      className
    )}
    {...props}
  >
    {children}
    {required && <span className="text-[#B91C1C] ml-1">*</span>}
  </label>
);

// Input Primitive
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, leftIcon, rightIcon, type = 'text', ...props }, ref) => {
    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#716D64] pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            'w-full h-11 px-4 bg-[#FFFFFF] text-[#18181B] text-sm font-sans placeholder-[#9E988D] rounded-xl border border-[#E5E0D6] transition-all duration-150 ease-out focus:outline-none focus:border-[#18181B] focus:ring-1 focus:ring-[#18181B] disabled:bg-[#FBF9F5] disabled:cursor-not-allowed shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            error && 'border-[#B91C1C] focus:border-[#B91C1C] focus:ring-[#B91C1C]',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#716D64] pointer-events-none">
            {rightIcon}
          </div>
        )}
        {error && (
          <p className="mt-1.5 font-sans text-xs text-[#B91C1C]">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

// Textarea Primitive
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            'w-full p-4 bg-[#FFFFFF] text-[#18181B] text-sm font-sans placeholder-[#9E988D] rounded-xl border border-[#E5E0D6] transition-all duration-150 ease-out focus:outline-none focus:border-[#18181B] focus:ring-1 focus:ring-[#18181B] disabled:bg-[#FBF9F5] disabled:cursor-not-allowed shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] resize-y',
            error && 'border-[#B91C1C] focus:border-[#B91C1C] focus:ring-[#B91C1C]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1.5 font-sans text-xs text-[#B91C1C]">{error}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

// Select Primitive
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={cn(
            'w-full h-11 px-4 pr-10 bg-[#FFFFFF] text-[#18181B] text-sm font-sans rounded-xl border border-[#E5E0D6] appearance-none transition-all duration-150 ease-out focus:outline-none focus:border-[#18181B] focus:ring-1 focus:ring-[#18181B] cursor-pointer shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]',
            error && 'border-[#B91C1C]',
            className
          )}
          {...props}
        >
          {children}
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#716D64]">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        {error && (
          <p className="mt-1.5 font-sans text-xs text-[#B91C1C]">{error}</p>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';

// Checkbox Primitive
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const defaultId = React.useId();
    const generatedId = id || defaultId;

    return (
      <div className="flex items-center space-x-2.5">
        <input
          type="checkbox"
          id={generatedId}
          ref={ref}
          className={cn(
            'h-4 w-4 rounded-md border-[#E5E0D6] text-[#000000] focus:ring-0 focus:ring-offset-0 accent-[#000000] cursor-pointer transition-all',
            className
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={generatedId}
            className="font-sans text-sm text-[#18181B] cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';
