import React from 'react';
import { Button, type ButtonProps } from './button';

interface CloseButtonProps extends Omit<ButtonProps, 'variant' | 'children'> {
  'aria-label'?: string;
}

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  CloseButtonProps
>(({ 'aria-label': ariaLabel = 'Close', ...props }, ref) => {
  return (
    <Button variant="icon" aria-label={ariaLabel} ref={ref} {...props}>
      ✕
    </Button>
  );
});

CloseButton.displayName = 'CloseButton';
