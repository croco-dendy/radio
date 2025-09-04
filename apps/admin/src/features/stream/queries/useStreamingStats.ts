import { useQuery } from '@tanstack/react-query';
import { apiUrl } from '@/services/env';
import type { ApiResponse } from '@radio/types';

interface StreamingStats {
  totalListeners: number;
  peakListeners: number;
  totalUptime: number;
  averageBitrate: number;
  totalDataTransferred: number;
  errorCount: number;
  lastError?: string;
}

export const useStreamingStats = (
  timeRange: 'hour' | 'day' | 'week' = 'day',
) => {
  return useQuery<ApiResponse<StreamingStats>>({
    queryKey: ['streaming-stats', timeRange],
    queryFn: async () => {
      const response = await fetch(
        `${apiUrl}/api/streaming/stats?range=${timeRange}`,
      );
      return response.json();
    },
    refetchInterval: 60000, // Refetch every minute for stats
  });
};

export const useStreamingHistory = (limit = 50) => {
  return useQuery<
    ApiResponse<
      Array<{
        timestamp: string;
        listeners: number;
        bitrate: number;
        status: 'active' | 'inactive';
      }>
    >
  >({
    queryKey: ['streaming-history', limit],
    queryFn: async () => {
      const response = await fetch(
        `${apiUrl}/api/streaming/history?limit=${limit}`,
      );
      return response.json();
    },
  });
};
