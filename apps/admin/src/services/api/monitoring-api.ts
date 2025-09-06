import { waveApiClient } from './clients/http-client';
import type { ApiResponse, MonitoringData } from '@radio/types';

export const monitoringApi = {
  getMonitoringData: async (): Promise<MonitoringData> => {
    const response =
      await waveApiClient.get<ApiResponse<MonitoringData>>('/api/monitoring');

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch monitoring data');
    }

    return response.data.data;
  },
};
