import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './popup-item.module.scss';

type PopupItemProps = {
  children: ReactNode;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
};

export const PopupItem = ({
  children,
  onClick,
  selected = false,
  className,
}: PopupItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(styles.item, selected && styles.selected, className)}
    >
      {children}
    </button>
  );
};
