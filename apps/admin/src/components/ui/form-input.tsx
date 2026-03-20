import type React from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightElement?: React.ReactNode;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, rightElement, className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-display font-semibold text-stone-300 uppercase tracking-wide"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              'w-full px-4 py-3 bg-stone-800/30 border border-white/10 rounded-xl text-white placeholder-white/40',
              'focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-white/20 backdrop-blur-xl',
              rightElement && 'pr-12',
              error && 'border-red-400/50 focus:ring-red-400/50',
              className,
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {rightElement}
            </div>
          )}
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';
