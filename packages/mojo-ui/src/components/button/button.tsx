import clsx from 'clsx';
import type { ButtonHTMLAttributes, FC } from 'react';
import { type Size, type Variant, getSizeTextClass } from '../../utils';
import styles from './button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
  size?: Size;
}

export const Button: FC<ButtonProps> = ({
  variant,
  size = 'medium',
  title,
  className,
  ...props
}) => {
  const variantClass = props.disabled ? 'disabled' : variant;
  const textColorClass = variant === 'gray' ? 'gray' : 'colored';

  return (
    <button className={clsx(styles.button, styles[size], className)} {...props}>
      <div className={styles.baseLayer} />
      <div className={styles.lampBase} />
      <div className={clsx(styles.lampSurface, styles[variantClass])} />
      <span
        className={clsx(
          styles.text,
          styles[textColorClass],
          getSizeTextClass(size),
        )}
      >
        {title}
      </span>
    </button>
  );
};
