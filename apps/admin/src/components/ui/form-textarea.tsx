import type React from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const textareaId =
      id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-display font-semibold text-stone-300 uppercase tracking-wide"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={clsx(
            'w-full px-4 py-3 bg-stone-800/30 border border-white/10 rounded-xl text-white placeholder-white/40',
            'focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-white/20 backdrop-blur-xl resize-none',
            error && 'border-red-400/50 focus:ring-red-400/50',
            className,
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    );
  },
);

FormTextarea.displayName = 'FormTextarea';
