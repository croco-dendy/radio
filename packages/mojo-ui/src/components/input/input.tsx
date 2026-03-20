import clsx from 'clsx';
import type { FC, InputHTMLAttributes } from 'react';
import {
  type Size,
  capitalizeFirst,
  getSizeTextClass,
} from '../../utils/style-helpers';
import styles from './input.module.scss';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: Size;
  label?: string;
  error?: string;
}

export const Input: FC<InputProps> = ({
  size = 'medium',
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={props.id || `input-${size}`} className={styles.label}>
          {label}
        </label>
      )}
      <div
        className={clsx(styles.wrapper, styles[size], error && styles.error)}
      >
        <div
          className={clsx(
            styles.baseLayer,
            styles[`baseLayer${capitalizeFirst(size)}`],
          )}
        />

        <div
          className={clsx(
            styles.field,
            styles[`field${capitalizeFirst(size)}`],
            props.disabled && styles.fieldDisabled,
          )}
        />

        <input
          id={props.id || `input-${size}`}
          className={clsx(
            styles.input,
            styles[size],
            getSizeTextClass(size),
            className,
          )}
          {...props}
        />
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};
