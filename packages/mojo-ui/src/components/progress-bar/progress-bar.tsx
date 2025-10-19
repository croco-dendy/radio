import clsx from 'clsx';
import type { FC } from 'react';
import type { Size, Variant } from '../../utils';
import styles from './progress-bar.module.scss';

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: Variant;
  size?: Size;
  showLabel?: boolean;
  label?: string;
  lampCount?: number;
  className?: string;
}

export const ProgressBar: FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = 'green',
  size = 'medium',
  showLabel = true,
  label,
  lampCount = 10,
  className,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const activeLamps = (percentage / 100) * lampCount;
  const fullLamps = Math.floor(activeLamps);
  const partialLamp = activeLamps - fullLamps;

  const lights = Array.from({ length: lampCount }, (_, i) => ({
    id: `progress-light-${i}`,
    index: i,
  }));

  return (
    <div className={clsx(styles.container, className)}>
      {showLabel && (
        <div className={styles.header}>
          <span className={styles.labelText}>{label || 'Progress'}</span>
          <span className={styles.percentageText}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}

      <div
        className={clsx(styles.wrapper, styles[size])}
        style={
          {
            '--lamp-count': lampCount,
          } as React.CSSProperties
        }
      >
        <div className={styles.baseLayer} />
        <div className={styles.track}>
          <div className={styles.lightsContainer}>
            {lights.map((light) => (
              <div
                key={light.id}
                className={clsx(
                  styles.light,
                  styles[variant],
                  light.index < fullLamps && styles.active,
                  light.index === fullLamps &&
                    partialLamp > 0 &&
                    styles.partial,
                )}
                style={
                  light.index === fullLamps && partialLamp > 0
                    ? { opacity: 0.3 + partialLamp * 0.7 }
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
