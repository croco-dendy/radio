import type { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import '../../globals.css';
import './icon-button.css';

type IconButtonVariant = 'green' | 'yellow' | 'gray' | 'red';
type IconButtonSize = 'small' | 'medium' | 'large';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: IconButtonVariant;
  size?: IconButtonSize;
  children: ReactNode;
}

export const IconButton: FC<IconButtonProps> = ({
  variant,
  size = 'medium',
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      style={{
        position: 'relative',
        transition: 'all 200ms ease-out',
        outline: 'none',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transform: disabled ? 'none' : 'scale(1)',
        opacity: disabled ? 0.5 : 1,
        ...getSizeStyles(size),
      }}
      disabled={disabled}
      className={className}
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
          borderRadius: '50%',
        }}
      />

      {/* Icon */}
      <span
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          pointerEvents: 'none',
        }}
      >
        {children}
      </span>
    </button>
  );
};

const getSizeStyles = (size: IconButtonSize) => {
  switch (size) {
    case 'small':
      return {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
      };
    case 'medium':
      return {
        width: '56px',
        height: '56px',
        borderRadius: '50%',
      };
    case 'large':
      return {
        width: '72px',
        height: '72px',
        borderRadius: '50%',
      };
  }
};

const getGradientClass = (variant: IconButtonVariant, disabled?: boolean) => {
  if (disabled) {
    return 'icon-button-disabled-gradient';
  }

  switch (variant) {
    case 'green':
      return 'icon-button-green-gradient';
    case 'yellow':
      return 'icon-button-yellow-gradient';
    case 'gray':
      return 'icon-button-gray-gradient';
    case 'red':
      return 'icon-button-red-gradient';
  }
};

const getHoverShadowClass = (
  variant: IconButtonVariant,
  disabled?: boolean,
) => {
  if (disabled) {
    return '';
  }

  switch (variant) {
    case 'green':
      return 'icon-button-green-glow';
    case 'yellow':
      return 'icon-button-yellow-glow';
    case 'gray':
      return 'icon-button-gray-glow';
    case 'red':
      return 'icon-button-red-glow';
  }
};
