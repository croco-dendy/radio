import { radioApiClient } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import type { AudioFile, PaginatedResponse } from '@radio/types';

export const useAudioFiles = (page = 1, limit = 20) => {
  return useQuery<PaginatedResponse<AudioFile>>({
    queryKey: ['audio-files', page, limit],
    queryFn: async () => {
      const { data } = await radioApiClient.get('/api/audio/files', {
        params: { page, limit },
      });
      return data;
    },
  });
};

export const useAudioFile = (id: string) => {
  return useQuery<AudioFile>({
    queryKey: ['audio-file', id],
    queryFn: async () => {
      const { data } = await radioApiClient.get(`/api/audio/files/${id}`);
      return data;
    },
    enabled: !!id,
  });
};
