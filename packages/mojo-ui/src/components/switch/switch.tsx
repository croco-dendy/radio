import clsx from 'clsx';
import type { ChangeEvent, FC } from 'react';
import '../../globals.css';
import './switch.css';

type SwitchVariant = 'green' | 'yellow' | 'gray' | 'red';
type SwitchSize = 'small' | 'medium' | 'large';

interface SwitchProps {
  variant: SwitchVariant;
  size?: SwitchSize;
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

  const sizeStyles = getSizeStyles(size);

  return (
    <label
      className="switch-container"
      style={{
        width: `${sizeStyles.width}px`,
        height: `${sizeStyles.height}px`,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      data-size={size}
    >
      <input
        type="checkbox"
        className="switch-input"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <div className="base-layer switch-base" />
      <div className="lamp-base switch-lamp-base" />
      <div className={clsx('switch-background', getBackgroundClass(variant))} />
      <div
        className={clsx('switch-toggle', getToggleSurfaceClass(variant))}
        style={{
          ...(checked ? { marginLeft: '8px' } : { marginRight: '8px' }),
        }}
      />
      <div className="switch-labels">
        <span className="switch-label switch-label-off">O</span>
        <span className="switch-label switch-label-on">I</span>
      </div>
      <div className="switch-divider" />
    </label>
  );
};

const getSizeStyles = (size: SwitchSize) => {
  switch (size) {
    case 'small':
      return { width: 56, height: 28 };
    case 'medium':
      return { width: 72, height: 36 };
    case 'large':
      return { width: 88, height: 44 };
  }
};

const getBackgroundClass = (variant: SwitchVariant) => {
  switch (variant) {
    case 'green':
      return 'switch-green-bg';
    case 'yellow':
      return 'switch-yellow-bg';
    case 'gray':
      return 'switch-gray-bg';
    case 'red':
      return 'switch-red-bg';
  }
};

const getToggleSurfaceClass = (variant: SwitchVariant) => {
  switch (variant) {
    case 'green':
      return 'switch-green-surface';
    case 'yellow':
      return 'switch-yellow-surface';
    case 'gray':
      return 'switch-gray-surface';
    case 'red':
      return 'switch-red-surface';
  }
};
