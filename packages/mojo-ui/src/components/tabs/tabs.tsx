import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import type { Variant } from '../../utils';
import { Card } from '../card/card';
import styles from './tabs.module.scss';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  variant?: Variant;
  className?: string;
  onTabChange?: (tabId: string) => void;
}

export const Tabs: FC<TabsProps> = ({
  tabs,
  defaultTab,
  variant = 'gray',
  className,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={clsx(styles.tabs, className)}>
      <div className={styles.tabList}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={clsx(
              styles.tabButton,
              activeTab === tab.id && styles.active,
            )}
            onClick={() => handleTabClick(tab.id)}
            type="button"
          >
            <div className={styles.baseLayer} />
            <div className={styles.lampBase} />
            <div
              className={clsx(
                styles.lampSurface,
                styles[variant],
                activeTab === tab.id && styles.active,
              )}
            />
            <span
              className={clsx(
                styles.tabText,
                activeTab === tab.id && styles.active,
              )}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      <div className={styles.tabContent}>
        <Card>{activeTabContent}</Card>
      </div>
    </div>
  );
};
