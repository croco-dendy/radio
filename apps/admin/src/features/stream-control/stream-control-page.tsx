import clsx from 'clsx';
import { PageLayout } from '@/components/shared';
import { sharedStyles } from '@/styles/shared-styles';
import { useMonitoringData } from '@/services/api/hooks/use-monitoring';
import { useWebSocket } from '@/hooks/use-websocket';
import { Tabs, MonitoringTab, ConfigurationTab, LogsTab } from './components';

export const StreamControlPage = () => {
  const { data: monitoring, isLoading, error } = useMonitoringData();

  // Enable WebSocket for real-time updates
  useWebSocket({ autoConnect: true });

  if (error) {
    return (
      <PageLayout title="Stream Control">
        <div className={clsx(sharedStyles.statsCard)}>
          <p className="text-red-400">Error loading monitoring data</p>
        </div>
      </PageLayout>
    );
  }

  const tabs = [
    {
      id: 'monitoring',
      label: 'Monitoring',
      content: <MonitoringTab monitoring={monitoring} isLoading={isLoading} />,
    },
    {
      id: 'logs',
      label: 'Logs',
      content: <LogsTab />,
    },
    {
      id: 'configuration',
      label: 'Configuration',
      content: <ConfigurationTab />,
    },
  ];

  return (
    <PageLayout title="Stream Control">
      <Tabs tabs={tabs} defaultTab="monitoring" />
    </PageLayout>
  );
};
