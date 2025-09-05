import type React from 'react';
import clsx from 'clsx';
import { sharedStyles } from '@/styles/shared-styles';

interface ActionButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return sharedStyles.buttonPrimary;
      case 'secondary':
        return sharedStyles.buttonSecondary;
      case 'accent':
        return sharedStyles.buttonAccent;
      default:
        return sharedStyles.buttonPrimary;
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(getVariantStyles())}
    >
      {children}
    </button>
  );
};
