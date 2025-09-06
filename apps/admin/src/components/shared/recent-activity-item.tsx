import type React from 'react';
import clsx from 'clsx';
import { sharedStyles } from '@/styles/shared-styles';

interface RecentActivityItemProps {
  title: string;
  meta: string;
}

export const RecentActivityItem: React.FC<RecentActivityItemProps> = ({
  title,
  meta,
}) => {
  return (
    <div className={clsx(sharedStyles.recentItem)}>
      <span className={clsx(sharedStyles.recentTitle)}>{title}</span>
      <span className={clsx(sharedStyles.recentMeta)}>{meta}</span>
    </div>
  );
};
