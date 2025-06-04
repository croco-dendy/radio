import { type InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  theme?: 'light' | 'dark';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, theme = 'light', ...props }, ref) => {
    const inputId = id || props.name || 'input';

    const themeClasses =
      theme === 'dark'
        ? 'bg-paper-calm/10 text-white border border-paper/20 placeholder-paper/40 focus:ring-moss'
        : 'bg-paper-calm text-coal border border-coal/20 placeholder-coal/40 focus:ring-bark';

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm mb-1">
            {label}
          </label>
        )}

        <input
          id={inputId}
          ref={ref}
          className={clsx(
            'w-full px-3 py-2 rounded-md transition focus:outline-none focus:ring-2',
            themeClasses,
            error && 'border-red-500 focus:ring-red-500',
            className,
          )}
          {...props}
        />

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
