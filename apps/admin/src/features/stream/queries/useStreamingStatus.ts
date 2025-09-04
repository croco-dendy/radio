import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiUrl } from '@/services/env';
import type { ApiResponse } from '@radio/types';

interface StreamingStatus {
  isActive: boolean;
  currentStream: string | null;
  listeners: number;
  bitrate: number;
  uptime: number;
  lastActivity: string;
}

export const useStreamingStatus = () => {
  return useQuery<ApiResponse<StreamingStatus>>({
    queryKey: ['streaming-status'],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/api/streaming/status`);
      return response.json();
    },
    refetchInterval: 5000, // Refetch every 5 seconds for admin dashboard
  });
};

export const useToggleStreaming = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (action: 'start' | 'stop') => {
      const response = await fetch(`${apiUrl}/api/streaming/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streaming-status'] });
    },
  });
};
