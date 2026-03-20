import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import { CloseIcon } from '../../icons';
import { IconButton } from '../icon-button';
import styles from './panel.module.scss';

export interface PanelSection {
  title?: string;
  header?: ReactNode;
  content: ReactNode;
}

interface PanelProps {
  sections?: PanelSection[];
  content?: ReactNode;
  header?: ReactNode;
  sectionTitle?: string;
  className?: string;
  minHeight?: string;
  responsive?: boolean;
  maxColumns?: number;
  title?: string;
  subtitle?: string;
  decorated?: boolean;
  onClose?: () => void;
}

export const Panel: FC<PanelProps> = ({
  sections: propSections,
  content,
  header,
  sectionTitle,
  className,
  minHeight = 'min-h-[400px]',
  responsive = true,
  maxColumns = 4,
  title,
  subtitle,
  decorated = true,
  onClose,
}) => {
  const sections =
    propSections || (content ? [{ content, header, title: sectionTitle }] : []);
  const isSingleSection = sections.length === 1;

  const shouldUseFlexLayout =
    !decorated && isSingleSection ? true : !responsive;

  const contentClassName = shouldUseFlexLayout
    ? styles.contentSingleColumn
    : `${styles.content} ${styles[`maxColumns${maxColumns}`]}`;

  return (
    <div
      className={clsx(
        styles.panel,
        !decorated && styles.panelPlain,
        isSingleSection && styles.panelSingleSection,
        onClose && styles.panelWithClose,
        minHeight,
        className,
      )}
    >
      {decorated && (
        <>
          <div className={styles.baseLayer} />
          <div className={styles.innerField} />
        </>
      )}

      {(title || subtitle || onClose) && (
        <div className={styles.header}>
          {onClose && (
            <IconButton
              variant="red"
              size="small"
              onClick={onClose}
              className={styles.closeButton}
              aria-label="Close"
            >
              <CloseIcon size={16} />
            </IconButton>
          )}
          {(title || subtitle) && (
            <div className={styles.headerContent}>
              {title && <h2 className={styles.title}>{title}</h2>}
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
          )}
        </div>
      )}
      <div
        className={clsx(
          contentClassName,
          isSingleSection && styles.contentSingleSection,
          onClose && styles.contentWithClose,
        )}
      >
        {sections.map((section) => (
          <div
            key={section.title}
            className={clsx(
              styles.section,
              isSingleSection && styles.sectionFullWidth,
            )}
          >
            <div
              className={clsx(
                styles.sectionBorder,
                !decorated && styles.sectionBorderPlain,
              )}
            >
              {section.header && (
                <div className={styles.sectionHeader}>{section.header}</div>
              )}
              {!section.header &&
                section.title &&
                !decorated &&
                isSingleSection && (
                  <div className={styles.sectionTitlePlain}>
                    <span className={styles.sectionTitleTextPlain}>
                      {section.title}
                    </span>
                  </div>
                )}
              {!section.header && section.title && decorated && (
                <div className={styles.sectionTitle}>
                  <span className={styles.sectionTitleText}>
                    {section.title}
                  </span>
                </div>
              )}
              <div
                className={clsx(
                  styles.sectionContent,
                  !decorated && styles.sectionContentPlain,
                )}
              >
                {section.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
