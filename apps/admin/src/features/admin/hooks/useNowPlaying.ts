import { useState, useEffect, useCallback } from 'react';

export interface SongInfo {
  title: string;
  artist: string;
  album?: string;
  duration?: number;
  startTime?: number;
  isPlaying: boolean;
}

export const useNowPlaying = () => {
  const [currentSong, setCurrentSong] = useState<SongInfo>({
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    duration: 354,
    startTime: Date.now(),
    isPlaying: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Mock function - replace this with real API call later
  const fetchNowPlaying = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock data - replace with real API response
      const mockSongs = [
        {
          title: 'Bohemian Rhapsody',
          artist: 'Queen',
          album: 'A Night at the Opera',
          duration: 354,
        },
        {
          title: 'Hotel California',
          artist: 'Eagles',
          album: 'Hotel California',
          duration: 391,
        },
        {
          title: 'Stairway to Heaven',
          artist: 'Led Zeppelin',
          album: 'Led Zeppelin IV',
          duration: 482,
        },
        {
          title: 'Imagine',
          artist: 'John Lennon',
          album: 'Imagine',
          duration: 183,
        },
        {
          title: 'What a Wonderful World',
          artist: 'Louis Armstrong',
          album: 'What a Wonderful World',
          duration: 399,
        },
      ];

      const randomSong =
        mockSongs[Math.floor(Math.random() * mockSongs.length)];
      setCurrentSong({
        ...randomSong,
        startTime: Date.now(),
        isPlaying: true,
      });
    } catch (error) {
      console.error('Failed to fetch now playing:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-refresh every 30 seconds (simulate song changes)
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance to change song
        fetchNowPlaying();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchNowPlaying]);

  // Manual refresh function
  const refresh = () => {
    fetchNowPlaying();
  };

  return {
    currentSong,
    isLoading,
    refresh,
  };
};
