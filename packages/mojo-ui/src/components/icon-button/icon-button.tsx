import clsx from 'clsx';
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import type { Size, Variant } from '../../utils';
import styles from './icon-button.module.scss';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
  size?: Size;
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
  const variantClass = disabled ? 'disabled' : variant;

  return (
    <button
      className={clsx(styles.button, styles[size], className)}
      disabled={disabled}
      {...props}
    >
      <div className={styles.baseLayer} />
      <div className={styles.lampBase} />
      <div className={clsx(styles.lampSurface, styles[variantClass])} />
      <span className={styles.icon}>{children}</span>
    </button>
  );
};
