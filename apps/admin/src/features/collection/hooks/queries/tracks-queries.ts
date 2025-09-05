import { useQuery } from '@tanstack/react-query';
import { streamingApi } from '@/services/streaming-api';

export const tracksKeys = {
  all: ['streaming', 'tracks'] as const,
  tracks: () => [...tracksKeys.all, 'list'] as const,
  nowPlaying: () => ['streaming', 'nowPlaying'] as const,
};

export const useAudioTracks = () => {
  return useQuery({
    queryKey: tracksKeys.tracks(),
    queryFn: () => streamingApi.tracks,
  });
};

export const useNowPlaying = () => {
  return useQuery({
    queryKey: tracksKeys.nowPlaying(),
    queryFn: () => streamingApi.nowPlaying,
    refetchInterval: 5000, // Refetch every 5 seconds
    refetchIntervalInBackground: true,
  });
};
