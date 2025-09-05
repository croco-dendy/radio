export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  filePath: string;
  addedAt: string;
  isPlaying?: boolean;
  position?: number;
}

export interface NowPlayingInfo {
  track: AudioTrack | null;
  isPlaying: boolean;
  position: number;
  duration: number;
  volume: number;
  queue: AudioTrack[];
}

class StreamingApiService {
  private mockTracks: AudioTrack[] = [
    {
      id: '1',
      title: 'Sample Song 1',
      artist: 'Artist One',
      album: 'Album One',
      duration: 240,
      filePath: '/music/song1.mp3',
      addedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Sample Song 2',
      artist: 'Artist Two',
      album: 'Album Two',
      duration: 180,
      filePath: '/music/song2.mp3',
      addedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Sample Song 3',
      artist: 'Artist Three',
      duration: 320,
      filePath: '/music/song3.mp3',
      addedAt: new Date().toISOString(),
    },
  ];

  private currentTrack: AudioTrack | null = this.mockTracks[0];
  private isPlaying = true;
  private position = 45;

  get tracks(): Promise<AudioTrack[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.mockTracks]), 500);
    });
  }

  get nowPlaying(): Promise<NowPlayingInfo> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          track: this.currentTrack,
          isPlaying: this.isPlaying,
          position: this.position,
          duration: this.currentTrack?.duration || 0,
          volume: 75,
          queue: this.mockTracks.slice(1),
        });
      }, 300);
    });
  }

  addTrack = async (
    track: Omit<AudioTrack, 'id' | 'addedAt'>,
  ): Promise<AudioTrack> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTrack: AudioTrack = {
          ...track,
          id: Math.random().toString(36).substr(2, 9),
          addedAt: new Date().toISOString(),
        };
        this.mockTracks.push(newTrack);
        resolve(newTrack);
      }, 800);
    });
  };

  updateTrack = async (
    id: string,
    updates: Partial<AudioTrack>,
  ): Promise<AudioTrack> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const trackIndex = this.mockTracks.findIndex((t) => t.id === id);
        if (trackIndex === -1) {
          reject(new Error('Track not found'));
          return;
        }

        this.mockTracks[trackIndex] = {
          ...this.mockTracks[trackIndex],
          ...updates,
        };
        resolve(this.mockTracks[trackIndex]);
      }, 600);
    });
  };

  deleteTrack = async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const trackIndex = this.mockTracks.findIndex((t) => t.id === id);
        if (trackIndex === -1) {
          reject(new Error('Track not found'));
          return;
        }

        this.mockTracks.splice(trackIndex, 1);

        if (this.currentTrack?.id === id) {
          this.currentTrack = this.mockTracks[0] || null;
        }

        resolve();
      }, 400);
    });
  };

  skipTrack = async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentIndex = this.mockTracks.findIndex(
          (t) => t.id === this.currentTrack?.id,
        );
        const nextIndex = (currentIndex + 1) % this.mockTracks.length;
        this.currentTrack = this.mockTracks[nextIndex] || null;
        this.position = 0;
        resolve();
      }, 300);
    });
  };

  play = async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isPlaying = true;
        resolve();
      }, 200);
    });
  };

  pause = async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isPlaying = false;
        resolve();
      }, 200);
    });
  };

  setVolume = async (volume: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
  };

  seek = async (position: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.position = position;
        resolve();
      }, 150);
    });
  };
}

export const streamingApi = new StreamingApiService();
