import type React from 'react';
import clsx from 'clsx';
import { sharedStyles } from '@/styles/shared-styles';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <div className={clsx(sharedStyles.container)}>
      <div className={clsx(sharedStyles.content)}>
        <h1 className={clsx(sharedStyles.title)}>{title}</h1>
        {children}
      </div>
    </div>
  );
};
