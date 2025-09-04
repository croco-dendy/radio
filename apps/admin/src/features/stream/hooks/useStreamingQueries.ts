import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  streamingApi,
  type AudioTrack,
  type TelegramStreamConfig,
} from '@/services/streaming-api';

// Query keys
export const streamingKeys = {
  all: ['streaming'] as const,
  status: () => [...streamingKeys.all, 'status'] as const,
  mode: () => [...streamingKeys.all, 'mode'] as const,
  tracks: () => [...streamingKeys.all, 'tracks'] as const,
  nowPlaying: () => [...streamingKeys.all, 'nowPlaying'] as const,
  telegramStatus: () => [...streamingKeys.all, 'telegramStatus'] as const,
  telegramConfig: () => [...streamingKeys.all, 'telegramConfig'] as const,
  rtmpStatus: () => [...streamingKeys.all, 'rtmpStatus'] as const,
};

// Status query
export const useStreamingStatus = () => {
  return useQuery({
    queryKey: streamingKeys.status(),
    queryFn: () => streamingApi.getStatus(),
    refetchInterval: 5000, // Refetch every 5 seconds
    refetchIntervalInBackground: true,
  });
};

// Mode query
export const useStreamingMode = () => {
  return useQuery({
    queryKey: streamingKeys.mode(),
    queryFn: () => streamingApi.getMode(),
  });
};

// Tracks query
export const useAudioTracks = () => {
  return useQuery({
    queryKey: streamingKeys.tracks(),
    queryFn: () => streamingApi.getTracks(),
  });
};

// Now playing query
export const useNowPlaying = () => {
  return useQuery({
    queryKey: streamingKeys.nowPlaying(),
    queryFn: () => streamingApi.getNowPlaying(),
    refetchInterval: 5000, // Refetch every 5 seconds
    refetchIntervalInBackground: true,
  });
};

// Telegram stream status query
export const useTelegramStreamStatus = () => {
  return useQuery({
    queryKey: streamingKeys.telegramStatus(),
    queryFn: () => streamingApi.getTelegramStreamStatus(),
    refetchInterval: 5000, // Refetch every 5 seconds
    refetchIntervalInBackground: true,
  });
};

// Telegram stream config query
export const useTelegramStreamConfig = () => {
  return useQuery({
    queryKey: streamingKeys.telegramConfig(),
    queryFn: () => streamingApi.getTelegramConfig(),
  });
};

// RTMP server status query
export const useRtmpServerStatus = () => {
  return useQuery({
    queryKey: streamingKeys.rtmpStatus(),
    queryFn: () => streamingApi.getRtmpServerStatus(),
    refetchInterval: 5000, // Refetch every 5 seconds
    refetchIntervalInBackground: true,
  });
};

// Mutations
export const useSetMode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (mode: 'live' | 'radio') => streamingApi.setMode(mode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: streamingKeys.mode() });
      queryClient.invalidateQueries({ queryKey: streamingKeys.status() });
    },
  });
};

export const useStartStreaming = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => streamingApi.startStreaming(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: streamingKeys.status() });
      queryClient.invalidateQueries({ queryKey: streamingKeys.nowPlaying() });
    },
  });
};

export const useStopStreaming = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => streamingApi.stopStreaming(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: streamingKeys.status() });
      queryClient.invalidateQueries({ queryKey: streamingKeys.nowPlaying() });
    },
  });
};

export const useSkipTrack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => streamingApi.skipTrack(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: streamingKeys.nowPlaying() });
    },
  });
};

export const useAddTrack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (track: Omit<AudioTrack, 'id' | 'addedAt'>) =>
      streamingApi.addTrack(track),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: streamingKeys.tracks() });
    },
  });
};

export const useUpdateTrack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: { id: string; updates: Partial<AudioTrack> }) =>
      streamingApi.updateTrack(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: streamingKeys.tracks() });
    },
  });
};

export const useDeleteTrack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => streamingApi.deleteTrack(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: streamingKeys.tracks() });
    },
  });
};

// Telegram stream controls
export const useStartTelegramStream = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => streamingApi.startTelegramStream(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: streamingKeys.status() });
      queryClient.invalidateQueries({
        queryKey: streamingKeys.telegramStatus(),
      });
    },
  });
};

export const useStopTelegramStream = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => streamingApi.stopTelegramStream(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: streamingKeys.status() });
      queryClient.invalidateQueries({
        queryKey: streamingKeys.telegramStatus(),
      });
    },
  });
};

// Telegram stream config mutations
export const useUpdateTelegramConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: Partial<TelegramStreamConfig>) =>
      streamingApi.updateTelegramConfig(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: streamingKeys.telegramConfig(),
      });
    },
  });
};

// RTMP server management mutations
export const useStartRtmpServer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => streamingApi.startRtmpServer(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: streamingKeys.rtmpStatus() });
      queryClient.invalidateQueries({ queryKey: streamingKeys.status() });
    },
  });
};

export const useStopRtmpServer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => streamingApi.stopRtmpServer(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: streamingKeys.rtmpStatus() });
      queryClient.invalidateQueries({ queryKey: streamingKeys.status() });
    },
  });
};

export const useRestartRtmpServer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => streamingApi.restartRtmpServer(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: streamingKeys.rtmpStatus() });
      queryClient.invalidateQueries({ queryKey: streamingKeys.status() });
    },
  });
};
