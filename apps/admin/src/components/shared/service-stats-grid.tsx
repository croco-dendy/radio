import type React from 'react';
import clsx from 'clsx';

interface StatItem {
  label: string;
  value: string | number;
  suffix?: string;
  highlight?: boolean;
}

interface ServiceStatsGridProps {
  stats: StatItem[];
}

export const ServiceStatsGrid: React.FC<ServiceStatsGridProps> = ({
  stats,
}) => {
  const formatValue = (value: string | number, suffix?: string) => {
    if (typeof value === 'number') {
      if (suffix === '%') return `${value.toFixed(1)}%`;
      if (suffix === 'MB') return `${(value / 1024 / 1024).toFixed(1)}MB`;
      if (suffix === 'KB') return `${(value / 1024).toFixed(1)}KB`;
      return value.toString();
    }
    return value;
  };

  return (
    <div className="grid grid-cols-2 gap-4 text-sm">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col space-y-1">
          <span className="text-amber-400/80 uppercase tracking-wide text-xs font-display font-medium">
            {stat.label}
          </span>
          <span
            className={clsx(
              'font-mono font-semibold text-base',
              stat.highlight ? 'text-red-400' : 'text-white',
            )}
          >
            {formatValue(stat.value, stat.suffix)}
            {stat.suffix && !['%', 'MB', 'KB'].includes(stat.suffix) && (
              <span className="ml-1 text-amber-400/50 text-xs">
                {stat.suffix}
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};
