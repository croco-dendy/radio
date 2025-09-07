import type React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import { NavButton } from '@/components/ui';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className="w-full">
      {/* Tab Navigation - Bottom Nav Style */}
      <div
        className={clsx(
          'bg-coal-deep/90 backdrop-blur-xl border border-white/20 rounded-full px-4 py-3',
          'shadow-2xl',
          'flex items-center space-x-4 mb-8 w-fit',
        )}
      >
        {tabs.map((tab) => (
          <NavButton
            key={tab.id}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </NavButton>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full">{activeTabContent}</div>
    </div>
  );
};
