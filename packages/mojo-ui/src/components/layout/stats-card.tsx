import type { FC } from 'react';
import clsx from 'clsx';

interface StatsCardProps {
  title: string;
  value: string | number;
  isHighlight?: boolean;
  className?: string;
}

export const StatsCard: FC<StatsCardProps> = ({
  title,
  value,
  isHighlight = false,
  className,
}) => {
  return (
    <div
      className={clsx(
        'p-4 bg-slate-700/30 border border-slate-600 rounded',
        className,
      )}
    >
      <h3 className="text-xs font-semibold text-amber-400/80 uppercase tracking-wide mb-2">
        {title}
      </h3>
      <p
        className={clsx(
          'text-2xl font-semibold font-mono',
          isHighlight ? 'text-red-400' : 'text-white',
        )}
      >
        {value}
      </p>
    </div>
  );
};

export default StatsCard;
