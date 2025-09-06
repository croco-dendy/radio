import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { streamControlApi } from '../stream-control-api';
import type { TelegramStreamConfig } from '@radio/types';

// Telegram Stream Hooks
export const useTelegramConfig = (
  options?: Omit<UseQueryOptions<TelegramStreamConfig>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: ['stream', 'telegram', 'config'],
    queryFn: streamControlApi.telegram.getConfig,
    staleTime: 30000, // Config doesn't change often
    ...options,
  });
};

export const useStartTelegramStream = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: streamControlApi.telegram.start,
    onSuccess: () => {
      // Invalidate monitoring data to reflect the new state
      queryClient.invalidateQueries({ queryKey: ['monitoring'] });
    },
  });
};

export const useStopTelegramStream = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: streamControlApi.telegram.stop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['monitoring'] });
    },
  });
};

export const useRestartTelegramStream = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: streamControlApi.telegram.restart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['monitoring'] });
    },
  });
};

export const useUpdateTelegramConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (config: Partial<TelegramStreamConfig>) =>
      streamControlApi.telegram.updateConfig(config),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['stream', 'telegram', 'config'],
      });
    },
  });
};

// RTMP Server Hooks
export const useStartRtmpServer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: streamControlApi.rtmp.start,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['monitoring'] });
    },
  });
};

export const useStopRtmpServer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: streamControlApi.rtmp.stop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['monitoring'] });
    },
  });
};

export const useRestartRtmpServer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: streamControlApi.rtmp.restart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['monitoring'] });
    },
  });
};
