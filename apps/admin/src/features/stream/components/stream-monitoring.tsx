import type React from 'react';
import { useMonitoringDashboard } from '../hooks/use-optimized-monitoring';
import { MonitoringHeader } from './monitoring/monitoring-header';
import { StreamOverviewCards } from './cards/stream-overview-cards';
import { RtmpStatusSection } from './monitoring/rtmp-status-section';
import { TelegramStatusSection } from './monitoring/telegram-status-section';

interface StreamMonitoringProps {
  telegramRunning: boolean;
  rtmpRunning: boolean;
  streamHealth?: StreamHealth;
}

export const StreamMonitoring: React.FC<StreamMonitoringProps> = ({
  telegramRunning,
  rtmpRunning,
  streamHealth,
}) => {
  const {
    data: dashboard,
    isLoading,
    error,
    refetch,
  } = useMonitoringDashboard();

  const telegramHealth = dashboard?.services.telegram.health ?? null;
  const rtmpStats =
    (dashboard?.services.rtmp.stats as unknown as RtmpStats) ?? null;
  const websiteStats =
    (dashboard?.services.website.stats as unknown as WebsiteStats) ?? null;

  return (
    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
      <MonitoringHeader
        telegramHealth={telegramHealth}
        isLoading={isLoading}
        error={error?.message || null}
        onRetry={refetch}
      />

      <StreamOverviewCards
        rtmpRunning={rtmpRunning}
        telegramRunning={telegramRunning}
        rtmpStats={rtmpStats}
        websiteStats={websiteStats}
        telegramHealth={telegramHealth}
        streamHealth={streamHealth}
      />

      <RtmpStatusSection rtmpStats={rtmpStats} websiteStats={websiteStats} />

      <TelegramStatusSection
        telegramHealth={telegramHealth}
        telegramRunning={telegramRunning}
      />
    </div>
  );
};
