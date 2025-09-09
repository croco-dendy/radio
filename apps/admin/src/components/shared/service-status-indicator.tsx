import type React from 'react';
import clsx from 'clsx';

interface ServiceStatusIndicatorProps {
  isRunning: boolean;
  status?: string;
  className?: string;
}

export const ServiceStatusIndicator: React.FC<ServiceStatusIndicatorProps> = ({
  isRunning,
  status,
  className,
}) => {
  const getStatusColor = () => {
    if (!isRunning) return 'bg-red-400/90 shadow-red-400/60';
    if (status === 'error') return 'bg-red-400/90 shadow-red-400/60';
    if (status === 'initializing')
      return 'bg-yellow-400/90 shadow-yellow-400/60';
    return 'bg-green-400/90 shadow-green-400/60';
  };

  const getStatusText = () => {
    if (!isRunning) return 'Stopped';
    if (status === 'error') return 'Error';
    if (status === 'initializing') return 'Starting';
    return 'Running';
  };

  const getTextColor = () => {
    if (!isRunning) return 'text-red-400';
    if (status === 'error') return 'text-red-400';
    if (status === 'initializing') return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <div
        className={clsx(
          'h-3 w-3 rounded-full shadow-lg',
          getStatusColor(),
          isRunning && 'animate-pulse',
        )}
      />
      <span
        className={clsx(
          'text-sm font-semibold uppercase tracking-wide',
          getTextColor(),
        )}
      >
        {getStatusText()}
      </span>
    </div>
  );
};
