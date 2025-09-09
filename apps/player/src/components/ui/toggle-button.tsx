import React from 'react';
import { Button, type ButtonProps } from './button';

interface ToggleButtonProps
  extends Omit<ButtonProps, 'variant' | 'children' | 'active'> {
  checked: boolean;
  onToggle: (checked: boolean) => void;
  'aria-label'?: string;
}

export const ToggleButton = React.forwardRef<
  HTMLButtonElement,
  ToggleButtonProps
>(({ checked, onToggle, 'aria-label': ariaLabel, onClick, ...props }, ref) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onToggle(!checked);
    onClick?.(e);
  };

  return (
    <Button
      variant="toggle"
      active={checked}
      onClick={handleClick}
      aria-label={ariaLabel}
      ref={ref}
      {...props}
    />
  );
});

ToggleButton.displayName = 'ToggleButton';
