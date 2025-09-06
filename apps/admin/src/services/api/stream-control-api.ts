import { waveApiClient } from './clients/http-client';
import type {
  StreamControlResponse,
  TelegramStreamConfig,
  ConfigResponse,
} from '@radio/types';

export const streamControlApi = {
  // Telegram Stream Control
  telegram: {
    start: async (): Promise<StreamControlResponse> => {
      const response = await waveApiClient.post<StreamControlResponse>(
        '/api/stream/telegram/start',
      );
      return response.data;
    },

    stop: async (): Promise<StreamControlResponse> => {
      const response = await waveApiClient.post<StreamControlResponse>(
        '/api/stream/telegram/stop',
      );
      return response.data;
    },

    restart: async (): Promise<StreamControlResponse> => {
      const response = await waveApiClient.post<StreamControlResponse>(
        '/api/stream/telegram/restart',
      );
      return response.data;
    },

    getConfig: async (): Promise<TelegramStreamConfig> => {
      const response = await waveApiClient.get<
        ConfigResponse<TelegramStreamConfig>
      >('/api/stream/telegram/config');

      if (!response.data.success || !response.data.config) {
        throw new Error(
          response.data.error || 'Failed to fetch Telegram config',
        );
      }

      return response.data.config;
    },

    updateConfig: async (
      config: Partial<TelegramStreamConfig>,
    ): Promise<StreamControlResponse> => {
      const response = await waveApiClient.put<StreamControlResponse>(
        '/api/stream/telegram/config',
        config,
      );
      return response.data;
    },
  },

  // RTMP Server Control
  rtmp: {
    start: async (): Promise<StreamControlResponse> => {
      const response = await waveApiClient.post<StreamControlResponse>(
        '/api/stream/rtmp/start',
      );
      return response.data;
    },

    stop: async (): Promise<StreamControlResponse> => {
      const response = await waveApiClient.post<StreamControlResponse>(
        '/api/stream/rtmp/stop',
      );
      return response.data;
    },

    restart: async (): Promise<StreamControlResponse> => {
      const response = await waveApiClient.post<StreamControlResponse>(
        '/api/stream/rtmp/restart',
      );
      return response.data;
    },
  },
};
