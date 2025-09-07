import type React from 'react';
import clsx from 'clsx';
import { sharedStyles } from '@/styles/shared-styles';
import { ServiceStatusIndicator } from './service-status-indicator';
import { ActionButton } from './action-button';

interface ServiceAction {
  label: string;
  variant: 'primary' | 'secondary' | 'accent';
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

interface ServiceControlCardProps {
  title: string;
  isRunning: boolean;
  status?: string;
  actions: ServiceAction[];
  children?: React.ReactNode;
}

export const ServiceControlCard: React.FC<ServiceControlCardProps> = ({
  title,
  isRunning,
  status,
  actions,
  children,
}) => {
  return (
    <div
      className={clsx(sharedStyles.statsCard, 'min-h-[280px] flex flex-col')}
    >
      {/* Header with vinyl record aesthetic */}
      <div className="mb-4 flex items-center justify-between border-b border-white/20 pb-3">
        <h3 className={clsx(sharedStyles.statsTitle, 'mb-0')}>{title}</h3>
        <ServiceStatusIndicator isRunning={isRunning} status={status} />
      </div>

      {/* Stats section - flexible height */}
      {children && (
        <div className="mb-4 flex-1 flex flex-col justify-between">
          {children}
        </div>
      )}

      {/* Controls section - always at bottom */}
      <div className="mt-auto pt-3 border-t border-white/10">
        <div className="flex flex-wrap gap-2 justify-center">
          {actions.map((action) => (
            <ActionButton
              key={action.label}
              variant={action.variant}
              onClick={action.onClick}
              disabled={action.disabled}
              loading={action.loading}
            >
              {action.label}
            </ActionButton>
          ))}
        </div>
      </div>
    </div>
  );
};
