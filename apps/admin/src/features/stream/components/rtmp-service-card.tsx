import type React from 'react';
import type { StreamHealth, RtmpStats } from '@/services/streaming/types';
import { ServiceCardTemplate } from './cards/service-card';

interface ServiceStatus {
  isRunning: boolean;
  status?: string;
  error?: string;
  message?: string;
}

interface RtmpServiceCardProps {
  title: string;
  status: ServiceStatus | undefined;
  isLoading: boolean;
  onStart: () => void;
  onStop: () => void;
  onRestart?: () => void;
  showRestart?: boolean;
  isStarting?: boolean;
  isStopping?: boolean;
  isRestarting?: boolean;
  healthData?: StreamHealth;
  rtmpStats?: RtmpStats;
}

const convertRtmpStatsToHealth = (stats: RtmpStats): StreamHealth => {
  const totalBandwidth = stats.applications.reduce((total, app) => {
    return (
      total +
      app.streams.reduce((appTotal, stream) => appTotal + stream.bandwidth, 0)
    );
  }, 0);

  return {
    isConnected: stats.isRunning && stats.activePublishers > 0,
    lastConnectionTime: stats.isRunning ? new Date().toISOString() : null,
    totalFramesSent: stats.totalConnections,
    currentBitrate: Math.round(totalBandwidth / 1024), // Convert to kbps
    connectionErrors: 0, // RTMP doesn't track errors the same way
    lastHealthCheck: new Date().toISOString(),
  };
};

export const RtmpServiceCard: React.FC<RtmpServiceCardProps> = ({
  title,
  status,
  isLoading,
  onStart,
  onStop,
  onRestart,
  showRestart = false,
  isStarting = false,
  isStopping = false,
  isRestarting = false,
  healthData,
  rtmpStats,
}) => {
  const effectiveHealthData =
    healthData || (rtmpStats ? convertRtmpStatsToHealth(rtmpStats) : undefined);

  return (
    <ServiceCardTemplate
      title={title}
      status={status}
      isLoading={isLoading}
      onStart={onStart}
      onStop={onStop}
      onRestart={onRestart}
      showRestart={showRestart}
      isStarting={isStarting}
      isStopping={isStopping}
      isRestarting={isRestarting}
      healthData={effectiveHealthData}
    />
  );
};
