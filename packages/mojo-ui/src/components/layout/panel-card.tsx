import type { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface PanelCardProps {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  minHeight?: string;
}

export const PanelCard: FC<PanelCardProps> = ({
  title,
  children,
  footer,
  className,
  minHeight = 'min-h-[280px]',
}) => {
  return (
    <div
      className={clsx(
        minHeight,
        'flex flex-col p-6 bg-slate-800/50 border border-slate-700 rounded-lg',
        className,
      )}
    >
      {title && (
        <div className="mb-4 border-b border-white/20 pb-3">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
      )}

      <div
        className={clsx(title ? 'flex-1 flex flex-col justify-between' : '')}
      >
        {children}
      </div>

      {footer && (
        <div className="mt-auto pt-3 border-t border-white/10">{footer}</div>
      )}
    </div>
  );
};

export default PanelCard;
