import clsx from 'clsx';
import type { FC } from 'react';
import styles from './status-indicator.module.scss';

type Status = 'running' | 'stopped' | 'error' | 'initializing';

interface StatusIndicatorProps {
  status: Status;
  className?: string;
}

export const StatusIndicator: FC<StatusIndicatorProps> = ({
  status,
  className,
}) => {
  const getStatusConfig = (status: Status) => {
    switch (status) {
      case 'running':
        return {
          variant: 'green',
          text: 'Running',
          animate: true,
        };
      case 'stopped':
        return {
          variant: 'disabled',
          text: 'Stopped',
          animate: false,
        };
      case 'error':
        return {
          variant: 'red',
          text: 'Error',
          animate: false,
        };
      case 'initializing':
        return {
          variant: 'yellow',
          text: 'Starting',
          animate: true,
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.lamp}>
        <div className={styles.baseLayer} />
        <div className={styles.lampBase} />
        <div
          className={clsx(
            styles.lampSurface,
            styles[config.variant],
            config.animate && styles.animate,
          )}
        />
      </div>
      <span className={clsx(styles.text, styles[config.variant])}>
        {config.text}
      </span>
    </div>
  );
};
