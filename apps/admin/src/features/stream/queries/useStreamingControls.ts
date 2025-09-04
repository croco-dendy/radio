import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiUrl } from '@/services/env';

export const useStreamingControls = () => {
  const queryClient = useQueryClient();

  const startStream = useMutation({
    mutationFn: async (streamKey: string) => {
      const response = await fetch(`${apiUrl}/api/streaming/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ streamKey }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streaming-status'] });
    },
  });

  const stopStream = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${apiUrl}/api/streaming/stop`, {
        method: 'POST',
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streaming-status'] });
    },
  });

  const updateStreamSettings = useMutation({
    mutationFn: async (settings: {
      bitrate?: number;
      quality?: string;
      format?: string;
    }) => {
      const response = await fetch(`${apiUrl}/api/streaming/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streaming-status'] });
    },
  });

  return {
    startStream,
    stopStream,
    updateStreamSettings,
  };
};
