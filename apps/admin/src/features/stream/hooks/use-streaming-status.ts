import { useState, useEffect } from 'react';
import type { ServiceStatus } from '@/services/streaming/types';

export const useStreamingStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const streamingStatus: ServiceStatus = {
    isRunning: true,
    status: 'active',
    message: 'Streaming services are operational',
  };

  useEffect(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    streamingStatus,
    isLoading,
    error,
  };
};
