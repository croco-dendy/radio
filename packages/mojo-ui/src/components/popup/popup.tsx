import clsx from 'clsx';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import type { Size, Variant } from '../../utils';
import { Button } from '../button';
import styles from './popup.module.scss';

type PopupProps = {
  trigger?: ReactNode;
  label?: string;
  icon?: ReactNode;
  variant?: Variant;
  size?: Size;
  rounded?: 'full' | 'half';
  children: ReactNode;
  align?: 'left' | 'right' | 'center';
  className?: string;
  buttonClassName?: string;
};

export const Popup = ({
  trigger,
  label,
  icon,
  variant = 'dark',
  size = 'small',
  rounded = 'half',
  children,
  align = 'left',
  className,
  buttonClassName,
}: PopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const renderTrigger = () => {
    if (trigger) {
      return trigger;
    }

    return (
      <Button
        variant={variant}
        size={size}
        rounded={rounded}
        title={label}
        icon={icon}
        className={buttonClassName}
      />
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    }
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.popupContainer}>
      <button
        type="button"
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={styles.triggerButton}
      >
        {renderTrigger()}
      </button>

      {isOpen && (
        <div
          ref={popupRef}
          className={clsx(styles.popup, styles[`align-${align}`], className)}
          onClick={handleClose}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleClose();
            }
          }}
          role="menu"
          tabIndex={-1}
        >
          {children}
        </div>
      )}
    </div>
  );
};
