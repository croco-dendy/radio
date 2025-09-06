import { useMutation, useQueryClient } from '@tanstack/react-query';
import { streamingApi, type AudioTrack } from '@/services/streaming-api';
import { tracksKeys } from '../queries/tracks-queries';

export const useAddTrack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (track: Omit<AudioTrack, 'id' | 'addedAt'>) =>
      streamingApi.addTrack(track),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tracksKeys.tracks() });
    },
    onError: (error) => {
      console.error('Error adding track:', error);
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
      queryClient.invalidateQueries({ queryKey: tracksKeys.tracks() });
    },
    onError: (error) => {
      console.error('Error updating track:', error);
    },
  });
};

export const useDeleteTrack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => streamingApi.deleteTrack(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tracksKeys.tracks() });
    },
    onError: (error) => {
      console.error('Error deleting track:', error);
    },
  });
};

export const useSkipTrack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => streamingApi.skipTrack(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tracksKeys.nowPlaying() });
    },
    onError: (error) => {
      console.error('Error skipping track:', error);
    },
  });
};
