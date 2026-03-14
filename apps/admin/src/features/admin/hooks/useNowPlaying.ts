import { useNowPlayingStore } from '@/stores/now-playing-store';

export const useNowPlaying = () => {
  const { currentTrack, isPlaying, currentTime, duration } =
    useNowPlayingStore();

  return {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
  };
};
