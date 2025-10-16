import type { FC, ReactNode } from 'react';
import clsx from 'clsx';

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
    <div
      className={clsx(
        'w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
        className,
      )}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
