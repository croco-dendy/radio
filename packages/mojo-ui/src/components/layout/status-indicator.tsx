import type { FC } from 'react';
import clsx from 'clsx';

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
          color: 'bg-green-400/90 shadow-green-400/60',
          textColor: 'text-green-400',
          text: 'Running',
          animate: true,
        };
      case 'stopped':
        return {
          color: 'bg-red-400/90 shadow-red-400/60',
          textColor: 'text-red-400',
          text: 'Stopped',
          animate: false,
        };
      case 'error':
        return {
          color: 'bg-red-400/90 shadow-red-400/60',
          textColor: 'text-red-400',
          text: 'Error',
          animate: false,
        };
      case 'initializing':
        return {
          color: 'bg-yellow-400/90 shadow-yellow-400/60',
          textColor: 'text-yellow-400',
          text: 'Starting',
          animate: true,
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <div
        className={clsx(
          'h-3 w-3 rounded-full shadow-lg',
          config.color,
          config.animate && 'animate-pulse',
        )}
      />
      <span
        className={clsx(
          'text-sm font-semibold uppercase tracking-wide',
          config.textColor,
        )}
      >
        {config.text}
      </span>
    </div>
  );
};

export default StatusIndicator;
