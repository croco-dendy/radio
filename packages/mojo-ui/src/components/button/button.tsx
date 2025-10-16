import type { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import '../../globals.css';
import './button.css';

type ButtonVariant = 'green' | 'yellow' | 'gray' | 'red';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  size?: ButtonSize;
}

export const Button: FC<ButtonProps> = ({
  variant,
  size = 'medium',
  title,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'relative transition-all duration-200 ease-out rounded-full',
        'focus:outline-none focus:ring-4 focus:ring-white/40',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        getSizeStyles(size),
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {/* Steel Base */}
      <div className="base-layer" />

      {/* Lamp Base */}
      <div className="lamp-base" />

      {/* Glow/Lamp Surface */}
      <div
        className={clsx(
          'lamp-surface',
          getGradientClass(variant, disabled),
          getHoverShadowClass(variant, disabled),
        )}
        style={{
          ...getShadowStyle(variant, disabled),
        }}
      />

      {/* Text */}
      <span
        className={clsx(
          'pointer-events-none relative z-10 flex items-center justify-center h-full',
          'font-semibold font-serif text-xl leading-8',
          'text-shadow-[0_0_1px_rgba(255,255,255,0.9),_0_2px_4px_rgba(0,0,0,0.5),_0_0_8px_rgba(0,0,0,0.3)]',
          'drop-shadow-md',
          variant === 'gray' ? 'text-stone-800' : 'text-white',
        )}
      >
        {title}
      </span>
    </button>
  );
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return ['px-6 py-2 text-sm', 'rounded-3xl', 'min-w-[80px] h-[32px]'];
    case 'medium':
      return ['px-8 py-3 text-base', 'rounded-3xl', 'min-w-[104px] h-[48px]'];
    case 'large':
      return ['px-10 py-4 text-lg', 'rounded-3xl', 'min-w-[120px] h-[56px]'];
  }
};

const getShadowStyle = (variant: ButtonVariant, disabled?: boolean) => {
  return {};
};

const getGradientClass = (variant: ButtonVariant, disabled?: boolean) => {
  if (disabled) {
    return 'button-disabled-gradient';
  }

  switch (variant) {
    case 'green':
      return 'button-green-gradient';
    case 'yellow':
      return 'button-yellow-gradient';
    case 'gray':
      return 'button-gray-gradient';
    case 'red':
      return 'button-red-gradient';
  }
};

const getHoverShadowClass = (variant: ButtonVariant, disabled?: boolean) => {
  if (disabled) {
    return '';
  }

  switch (variant) {
    case 'green':
      return 'button-green-glow';
    case 'yellow':
      return 'button-yellow-glow';
    case 'gray':
      return 'button-gray-glow';
    case 'red':
      return 'button-red-glow';
  }
};
