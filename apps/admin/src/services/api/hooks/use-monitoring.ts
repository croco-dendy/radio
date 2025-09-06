import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { monitoringApi } from '../monitoring-api';
import type { MonitoringData } from '@radio/types';

// Main monitoring hook - single request every 10 seconds for all monitoring data
export const useMonitoringData = (
  options?: Omit<UseQueryOptions<MonitoringData>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: ['monitoring', 'data'],
    queryFn: monitoringApi.getMonitoringData,
    refetchInterval: 10000, // Single request every 10 seconds
    staleTime: 5000, // Consider data stale after 5 seconds
    ...options,
  });
};
