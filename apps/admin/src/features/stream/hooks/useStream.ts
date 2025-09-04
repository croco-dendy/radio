import {
  useStreamingStatus,
  useStreamingMode,
  useAudioTracks,
  useNowPlaying,
  useTelegramStreamStatus,
  useTelegramStreamConfig,
  useRtmpServerStatus,
} from './useStreamingQueries';
import {
  useSetMode,
  useStartStreaming,
  useStopStreaming,
  useSkipTrack,
  useAddTrack,
  useDeleteTrack,
  useStartTelegramStream,
  useStopTelegramStream,
  useUpdateTelegramConfig,
  useStartRtmpServer,
  useStopRtmpServer,
  useRestartRtmpServer,
} from './useStreamingQueries';
import type {
  AudioTrack,
  TelegramStreamConfig,
} from '@/services/streaming-api';

export const useStream = () => {
  // Queries
  const {
    data: status,
    isLoading: statusLoading,
    error: statusError,
  } = useStreamingStatus();
  const {
    data: modeData,
    isLoading: modeLoading,
    error: modeError,
  } = useStreamingMode();
  const {
    data: tracksData,
    isLoading: tracksLoading,
    error: tracksError,
  } = useAudioTracks();
  const {
    data: nowPlaying,
    isLoading: nowPlayingLoading,
    error: nowPlayingError,
  } = useNowPlaying();
  const {
    data: telegramStreamStatus,
    isLoading: telegramStreamStatusLoading,
    error: telegramStreamStatusError,
  } = useTelegramStreamStatus();
  const {
    data: telegramConfig,
    isLoading: telegramConfigLoading,
    error: telegramConfigError,
  } = useTelegramStreamConfig();
  const {
    data: rtmpServerStatus,
    isLoading: rtmpServerStatusLoading,
    error: rtmpServerStatusError,
  } = useRtmpServerStatus();

  // Mutations
  const setModeMutation = useSetMode();
  const startStreamingMutation = useStartStreaming();
  const stopStreamingMutation = useStopStreaming();
  const skipTrackMutation = useSkipTrack();
  const addTrackMutation = useAddTrack();
  const deleteTrackMutation = useDeleteTrack();
  const startTelegramStreamMutation = useStartTelegramStream();
  const stopTelegramStreamMutation = useStopTelegramStream();
  const updateTelegramConfigMutation = useUpdateTelegramConfig();
  const startRtmpServerMutation = useStartRtmpServer();
  const stopRtmpServerMutation = useStopRtmpServer();
  const restartRtmpServerMutation = useRestartRtmpServer();

  // Computed values
  const mode = modeData?.mode || 'radio';
  const tracks = tracksData?.tracks || [];
  const isLoading =
    statusLoading ||
    modeLoading ||
    tracksLoading ||
    nowPlayingLoading ||
    telegramStreamStatusLoading ||
    telegramConfigLoading ||
    rtmpServerStatusLoading;
  const error =
    statusError ||
    modeError ||
    tracksError ||
    nowPlayingError ||
    telegramStreamStatusError ||
    telegramConfigError ||
    rtmpServerStatusError;

  // Wrapper functions for mutations
  const setMode = async (newMode: 'live' | 'radio') => {
    try {
      await setModeMutation.mutateAsync(newMode);
    } catch (err) {
      console.error('Error setting mode:', err);
      throw err;
    }
  };

  const startStream = async () => {
    try {
      await startStreamingMutation.mutateAsync();
    } catch (err) {
      console.error('Error starting stream:', err);
      throw err;
    }
  };

  const stopStream = async () => {
    try {
      await stopStreamingMutation.mutateAsync();
    } catch (err) {
      console.error('Error stopping stream:', err);
      throw err;
    }
  };

  const skipTrack = async () => {
    try {
      await skipTrackMutation.mutateAsync();
    } catch (err) {
      console.error('Error skipping track:', err);
      throw err;
    }
  };

  const addTrack = async (track: Omit<AudioTrack, 'id' | 'addedAt'>) => {
    try {
      await addTrackMutation.mutateAsync(track);
    } catch (err) {
      console.error('Error adding track:', err);
      throw err;
    }
  };

  const deleteTrack = async (trackId: string) => {
    try {
      await deleteTrackMutation.mutateAsync(trackId);
    } catch (err) {
      console.error('Error deleting track:', err);
      throw err;
    }
  };

  const startTelegramStream = async () => {
    try {
      await startTelegramStreamMutation.mutateAsync();
    } catch (err) {
      console.error('Error starting Telegram stream:', err);
      throw err;
    }
  };

  const stopTelegramStream = async () => {
    try {
      await stopTelegramStreamMutation.mutateAsync();
    } catch (err) {
      console.error('Error stopping Telegram stream:', err);
      throw err;
    }
  };

  const updateTelegramConfig = async (
    updates: Partial<TelegramStreamConfig>,
  ) => {
    try {
      await updateTelegramConfigMutation.mutateAsync(updates);
    } catch (err) {
      console.error('Error updating Telegram config:', err);
      throw err;
    }
  };

  const startRtmpServer = async () => {
    try {
      await startRtmpServerMutation.mutateAsync();
    } catch (err) {
      console.error('Error starting RTMP server:', err);
      throw err;
    }
  };

  const stopRtmpServer = async () => {
    try {
      await stopRtmpServerMutation.mutateAsync();
    } catch (err) {
      console.error('Error stopping RTMP server:', err);
      throw err;
    }
  };

  const restartRtmpServer = async () => {
    try {
      await restartRtmpServerMutation.mutateAsync();
    } catch (err) {
      console.error('Error restarting RTMP server:', err);
      throw err;
    }
  };

  return {
    status,
    mode,
    tracks,
    nowPlaying,
    telegramStreamStatus,
    telegramConfig,
    rtmpServerStatus,
    isLoading,
    error: error?.message || null,
    setMode,
    startStream,
    stopStream,
    skipTrack,
    addTrack,
    deleteTrack,
    startTelegramStream,
    stopTelegramStream,
    updateTelegramConfig,
    startRtmpServer,
    stopRtmpServer,
    restartRtmpServer,
    refresh: () => {
      // React Query handles refetching automatically
      // This is kept for compatibility but doesn't need to do anything
    },
  };
};
