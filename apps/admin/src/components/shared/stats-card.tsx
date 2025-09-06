import type React from 'react';
import clsx from 'clsx';
import { sharedStyles } from '@/styles/shared-styles';

interface StatsCardProps {
  title: string;
  value: string | number;
  isOnline?: boolean;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  isOnline = false,
}) => {
  return (
    <div className={clsx(sharedStyles.statsCard)}>
      <h3 className={clsx(sharedStyles.statsTitle)}>{title}</h3>
      <p
        className={clsx(
          isOnline ? sharedStyles.statsValueOnline : sharedStyles.statsValue,
        )}
      >
        {value}
      </p>
    </div>
  );
};
