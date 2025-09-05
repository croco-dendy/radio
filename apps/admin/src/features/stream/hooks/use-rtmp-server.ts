import { useState, useCallback } from 'react';
import type { ServiceStatus, RtmpStats } from '@/services/streaming/types';

export const useRtmpServer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);

  const rtmpServerStatus: ServiceStatus = {
    isRunning: true,
    status: 'active',
    message: 'RTMP server is running',
  };

  const rtmpStats: RtmpStats = {
    isRunning: true,
    activePublishers: 2,
    totalConnections: 15,
    applications: [
      {
        name: 'live',
        streams: [
          {
            name: 'stream1',
            bandwidth: 2500000,
            clients: 8,
          },
          {
            name: 'stream2',
            bandwidth: 1800000,
            clients: 5,
          },
        ],
      },
    ],
  };

  const startRtmpServer = useCallback(async () => {
    setIsStarting(true);
    setError(null);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsStarting(false);
  }, []);

  const stopRtmpServer = useCallback(async () => {
    setIsStopping(true);
    setError(null);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsStopping(false);
  }, []);

  const restartRtmpServer = useCallback(async () => {
    setIsRestarting(true);
    setError(null);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsRestarting(false);
  }, []);

  return {
    rtmpServerStatus,
    rtmpStats,
    isLoading,
    error,
    isStarting,
    isStopping,
    isRestarting,
    startRtmpServer,
    stopRtmpServer,
    restartRtmpServer,
  };
};
