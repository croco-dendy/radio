import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import styles from './panel.module.scss';

export interface PanelSection {
  title: string;
  content: ReactNode;
}

interface PanelProps {
  sections: PanelSection[];
  className?: string;
  minHeight?: string;
  responsive?: boolean;
  maxColumns?: number;
  title?: string;
  subtitle?: string;
}

export const Panel: FC<PanelProps> = ({
  sections,
  className,
  minHeight = 'min-h-[400px]',
  responsive = true,
  maxColumns = 4,
  title,
  subtitle,
}) => {
  const contentClassName = responsive
    ? `${styles.content} ${styles[`maxColumns${maxColumns}`]}`
    : styles.contentSingleColumn;

  return (
    <div className={clsx(styles.panel, minHeight, className)}>
      <div className={styles.baseLayer} />
      <div className={styles.innerField} />

      {(title || subtitle) && (
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}
      <div className={contentClassName}>
        {sections.map((section) => (
          <div key={section.title} className={styles.section}>
            <div className={styles.sectionBorder}>
              <div className={styles.sectionTitle}>
                <span className={styles.sectionTitleText}>{section.title}</span>
              </div>
              <div className={styles.sectionContent}>{section.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
