import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { statsApi, type StatsResponse } from '../stats-api';

export const useStats = (
  options?: Omit<UseQueryOptions<StatsResponse>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: statsApi.getStats,
    staleTime: 60000, // Consider data stale after 1 minute
    refetchInterval: 300000, // Refetch every 5 minutes
    ...options,
  });
};
