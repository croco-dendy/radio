import type React from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

interface FormCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-1">
        <div className="flex items-center">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className={clsx(
              'h-4 w-4 text-amber-500 focus:ring-amber-400/50 bg-stone-800/30 border-white/20 rounded',
              error && 'border-red-400/50 focus:ring-red-400/50',
              className,
            )}
            {...props}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className="ml-2 block text-sm text-stone-300"
            >
              {label}
            </label>
          )}
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    );
  },
);

FormCheckbox.displayName = 'FormCheckbox';
