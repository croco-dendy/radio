import clsx from 'clsx';
import type { FC, ReactNode } from 'react';

interface PageLayoutProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const PageLayout: FC<PageLayoutProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <div className={clsx('w-full min-h-screen', className)}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
