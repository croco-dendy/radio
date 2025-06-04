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

    const themeClasses = theme === 'dark' ? styles.dark : styles.light;

    return (
      <div className={clsx(styles.wrapper)}>
        {label && (
          <label htmlFor={inputId} className={clsx(styles.label)}>
            {label}
          </label>
        )}

        <input
          id={inputId}
          ref={ref}
          className={clsx(
            styles.input,
            themeClasses,
            error && styles.error,
            className,
          )}
          {...props}
        />

        {error && <p className={clsx(styles.errorText)}>{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

const styles = {
  wrapper: ['w-full'],
  label: ['block text-sm mb-1'],
  input: ['w-full px-3 py-2 rounded-md transition focus:outline-none focus:ring-2'],
  dark: ['bg-paper-calm/10 text-white border border-paper/20 placeholder-paper/40 focus:ring-moss'],
  light: ['bg-paper-calm text-coal border border-coal/20 placeholder-coal/40 focus:ring-bark'],
  error: ['border-red-500 focus:ring-red-500'],
  errorText: ['mt-1 text-sm text-red-500'],
};
