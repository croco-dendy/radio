import { useState, useCallback } from 'react';
import type { MonitoringDashboard } from '@/services/streaming/types';

export const useMonitoringDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const data: MonitoringDashboard = {
    services: {
      telegram: {
        health: {
          isConnected: true,
          lastMessageTime: new Date().toISOString(),
          totalMessagesSent: 342,
          connectionErrors: 0,
          lastHealthCheck: new Date().toISOString(),
        },
      },
      rtmp: {
        stats: {
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
        },
      },
      website: {
        stats: {
          activeViewers: 13,
          totalViews: 1250,
          peakViewers: 28,
          averageViewTime: 450,
        },
      },
    },
  };

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
