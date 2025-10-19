import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import styles from './card.module.scss';

interface CardProps {
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  className?: string;
  minHeight?: string;
}

export const Card: FC<CardProps> = ({
  title,
  children,
  actions,
  footer,
  className,
  minHeight = 'min-h-[280px]',
}) => {
  return (
    <div className={clsx(styles.panel, minHeight, className)}>
      <div className={styles.baseLayer} />
      <div className={styles.innerField} />

      <div className={clsx(styles.pin, styles.pinTopLeft)} />
      <div className={clsx(styles.pin, styles.pinTopRight)} />
      <div className={clsx(styles.pin, styles.pinBottomLeft)} />
      <div className={clsx(styles.pin, styles.pinBottomRight)} />

      <div className={styles.contentWrapper}>
        {title && (
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
          </div>
        )}

        <div className={styles.content}>{children}</div>

        {actions && <div className={styles.actions}>{actions}</div>}

        {footer && <div className={styles.footer}>{footer}</div>}

        {(actions || footer) && (
          <div className={styles.ventilation}>
            <div className={styles.ventilationBase} />
            <div className={styles.ventilationInner} />
            <div className={styles.ventilationStripes} />
          </div>
        )}
      </div>
    </div>
  );
};
