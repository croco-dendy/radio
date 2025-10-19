import clsx from 'clsx';
import type { ChangeEvent, FC } from 'react';
import type { Size, Variant } from '../../utils';
import styles from './switch.module.scss';

interface SwitchProps {
  variant: Variant;
  size?: Size;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export const Switch: FC<SwitchProps> = ({
  variant,
  size = 'medium',
  checked = false,
  onChange,
  disabled,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(e.currentTarget.checked);
    }
  };

  const toggleClass = checked ? 'checked' : 'unchecked';

  return (
    <label
      className={clsx(
        styles.container,
        styles[size],
        checked && styles.checked,
        disabled && styles.disabled,
      )}
    >
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <div className={styles.base} />
      <div className={styles.lampBase} />
      <div className={clsx(styles.background, styles[variant])} />
      <div
        className={clsx(styles.toggle, styles[toggleClass], styles[variant])}
      />
      <div className={styles.labels}>
        <span
          className={clsx(styles.label, styles.off, checked && styles.checked)}
        >
          O
        </span>
        <span
          className={clsx(
            styles.label,
            styles.on,
            !checked && styles.unchecked,
          )}
        >
          I
        </span>
      </div>
      <div className={styles.divider} />
    </label>
  );
};
