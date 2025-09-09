import { radioApiClient } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import type { ApiResponse } from '@radio/types';

interface StreamStatus {
  isLive: boolean;
  listeners: number;
  bitrate: number;
  uptime: number;
  lastUpdate: string;
}

export const useStreamStatus = () => {
  return useQuery<ApiResponse<StreamStatus>>({
    queryKey: ['stream-status'],
    queryFn: async () => {
      const { data } = await radioApiClient.get('/api/stream/status');
      return data;
    },
    refetchInterval: 10000, // Refetch every 10 seconds for real-time status
  });
};
