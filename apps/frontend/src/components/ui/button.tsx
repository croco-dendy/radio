import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variantClasses =
      variant === 'primary' ? styles.primary : styles.secondary;

    return (
      <button
        ref={ref}
        className={clsx(
          styles.base,
          variantClasses,
          props.disabled && styles.disabled,
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

const styles = {
  base: ['px-6 py-2 rounded-xl transition font-semibold'],
  primary: ['bg-moss text-white hover:bg-moss/90'],
  secondary: ['bg-paper text-coal border border-coal/20 hover:bg-paper/80'],
  disabled: ['opacity-50 cursor-not-allowed'],
};
