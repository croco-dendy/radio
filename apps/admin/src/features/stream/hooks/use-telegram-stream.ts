import { useState, useCallback } from 'react';
import type { TelegramStreamStatus } from '@/services/streaming/types';

export const useTelegramStream = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);

  const telegramStreamStatus: TelegramStreamStatus = {
    isRunning: true,
    status: 'active',
    message: 'Telegram stream is running',
    pm2Status: {
      daemonStatus: {
        isRunning: true,
        lastUpdate: new Date().toISOString(),
        streamHealth: {
          isConnected: true,
          lastConnectionTime: new Date().toISOString(),
          totalFramesSent: 1250,
          currentBitrate: 2500,
          connectionErrors: 0,
          lastHealthCheck: new Date().toISOString(),
        },
      },
    },
  };

  const startTelegramStream = useCallback(async () => {
    setIsStarting(true);
    setError(null);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsStarting(false);
  }, []);

  const stopTelegramStream = useCallback(async () => {
    setIsStopping(true);
    setError(null);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsStopping(false);
  }, []);

  const restartTelegramStream = useCallback(async () => {
    setIsRestarting(true);
    setError(null);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsRestarting(false);
  }, []);

  return {
    telegramStreamStatus,
    isLoading,
    error,
    isStarting,
    isStopping,
    isRestarting,
    startTelegramStream,
    stopTelegramStream,
    restartTelegramStream,
  };
};
