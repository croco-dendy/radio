import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variantClasses =
      variant === 'primary'
        ? 'bg-moss text-white hover:bg-moss/90'
        : 'bg-paper text-coal border border-coal/20 hover:bg-paper/80';

    return (
      <button
        ref={ref}
        className={clsx(
          'px-6 py-2 rounded-xl transition font-semibold',
          variantClasses,
          props.disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
