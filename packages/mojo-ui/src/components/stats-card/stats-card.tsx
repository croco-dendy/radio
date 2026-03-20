import clsx from 'clsx';
import type { FC } from 'react';
import styles from './stats-card.module.scss';

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
    <div className={clsx(styles.card, className)}>
      <div className={styles.baseLayer} />
      <div className={styles.innerField} />
      {/* <div className={styles.frostedLayer} /> */}

      <div className={styles.contentWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <p className={clsx(styles.value, isHighlight && styles.valueHighlight)}>
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
