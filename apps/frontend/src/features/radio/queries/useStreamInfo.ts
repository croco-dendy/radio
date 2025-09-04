import { radioApiClient } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import type { StreamInfo } from '@radio/types';

export const useStreamInfo = () => {
  return useQuery<StreamInfo>({
    queryKey: ['stream-info'],
    queryFn: async () => {
      const { data } = await radioApiClient.get('/api/stream/info');
      return data;
    },
    refetchInterval: 30000, // Refetch every 30 seconds for live data
  });
};
