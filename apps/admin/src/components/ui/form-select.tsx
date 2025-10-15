import type React from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, options, className, id, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-display font-semibold text-stone-300 uppercase tracking-wide"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={clsx(
            'w-full px-4 py-3 bg-stone-800/30 border border-white/10 rounded-xl text-white',
            'focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-white/20 backdrop-blur-xl',
            error && 'border-red-400/50 focus:ring-red-400/50',
            className,
          )}
          {...props}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-stone-800 text-white"
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    );
  },
);

FormSelect.displayName = 'FormSelect';
