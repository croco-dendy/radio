import type React from 'react';
import clsx from 'clsx';

interface NavButtonProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const NavButton: React.FC<NavButtonProps> = ({
  children,
  isActive = false,
  onClick,
  disabled = false,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        // Base styles
        'flex flex-col items-center transition-all duration-300',
        'px-4 py-2 border rounded-full font-display font-medium',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        // Active state
        isActive && [
          'bg-gradient-to-b from-ember/25 to-ember/15 text-ember backdrop-blur-sm',
          'shadow-xl border-ember/40',
        ],
        // Inactive state
        !isActive && [
          'text-paper-calm hover:text-paper-fog border-ember/0',
          'hover:bg-white/5',
        ],
        className,
      )}
    >
      {children}
    </button>
  );
};
