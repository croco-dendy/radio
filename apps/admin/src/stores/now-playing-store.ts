import { create } from 'zustand';

export interface NowPlayingTrack {
  title: string;
  artist: string;
  album?: string;
  audioUrl?: string;
}

interface NowPlayingStore {
  currentTrack: NowPlayingTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;

  playTrack: (track: NowPlayingTrack) => void;
  togglePlayPause: () => void;
  pause: () => void;
  stop: () => void;
  seek: (time: number) => void;
}

// Singleton Audio element — lives outside React, survives all route changes
let audio: HTMLAudioElement | null = null;

const getAudio = (): HTMLAudioElement => {
  if (!audio) {
    audio = new Audio();
  }
  return audio;
};

export const useNowPlayingStore = create<NowPlayingStore>()((set, get) => {
  // Wire up audio events once the store is created
  const el = getAudio();

  el.addEventListener('timeupdate', () => {
    set({ currentTime: el.currentTime });
  });

  el.addEventListener('loadedmetadata', () => {
    set({ duration: el.duration });
  });

  el.addEventListener('durationchange', () => {
    set({ duration: el.duration });
  });

  el.addEventListener('ended', () => {
    set({ isPlaying: false, currentTime: 0 });
  });

  el.addEventListener('pause', () => {
    set({ isPlaying: false });
  });

  el.addEventListener('play', () => {
    set({ isPlaying: true });
  });

  return {
    currentTrack: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,

    playTrack: (track) => {
      const el = getAudio();
      const current = get().currentTrack;

      // If it's the same track, just toggle play/pause
      if (current?.audioUrl === track.audioUrl && el.src) {
        if (el.paused) {
          el.play();
        } else {
          el.pause();
        }
        return;
      }

      // New track — set source and play
      // audioUrl is now a full URL from MEDIA_BASE_URL (external CDN), use it directly
      const src = track.audioUrl || '';

      el.src = src;
      el.load();
      set({ currentTrack: track, currentTime: 0, duration: 0 });
      el.play();
    },

    togglePlayPause: () => {
      const el = getAudio();
      if (el.paused) {
        el.play();
      } else {
        el.pause();
      }
    },

    pause: () => {
      getAudio().pause();
    },

    stop: () => {
      const el = getAudio();
      el.pause();
      el.currentTime = 0;
      el.src = '';
      set({ currentTrack: null, isPlaying: false, currentTime: 0, duration: 0 });
    },

    seek: (time: number) => {
      const el = getAudio();
      el.currentTime = time;
      set({ currentTime: time });
    },
  };
});
