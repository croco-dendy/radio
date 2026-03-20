import clsx from 'clsx';
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { type Size, type Variant, getSizeTextClass } from '../../utils';
import styles from './button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
  size?: Size;
  icon?: ReactNode;
  rounded?: 'full' | 'half';
}

export const Button: FC<ButtonProps> = ({
  variant,
  size = 'medium',
  title,
  icon,
  rounded = 'full',
  className,
  ...props
}) => {
  const variantClass = props.disabled ? 'disabled' : variant;
  const textColorClass = variant === 'gray' ? 'gray' : 'colored';

  return (
    <button
      className={clsx(
        styles.button,
        styles[size],
        styles[`rounded-${rounded}`],
        className,
      )}
      {...props}
    >
      <div className={styles.baseLayer} />
      <div className={styles.lampBase} />
      <div className={clsx(styles.lampSurface, styles[variantClass])} />
      <span
        className={clsx(
          styles.content,
          styles.text,
          styles[textColorClass],
          getSizeTextClass(size),
        )}
      >
        {title}
        {icon && <span className={styles.icon}>{icon}</span>}
      </span>
    </button>
  );
};
