import { useState } from 'react';
import { useDeleteSong, collectionApi } from '@/services/api';
import type { Song } from '@radio/types';

type SongListProps = {
  albumId: number;
  songs: (Song & { audioFilePath?: string; audioFileName?: string })[];
};

export const SongList = ({ songs }: SongListProps) => {
  const deleteSong = useDeleteSong();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (songId: number, title: string) => {
    if (!confirm(`Remove "${title}" from this album?`)) return;

    try {
      setDeletingId(songId);
      await deleteSong.mutateAsync(songId);
    } catch (error) {
      console.error('Failed to delete song:', error);
      alert('Failed to delete song');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDuration = (duration: string) => {
    if (duration === '0:00') return 'Unknown';
    return duration;
  };

  if (!songs || songs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No songs in this album yet.
      </div>
    );
  }

  const sortedSongs = [...songs].sort((a, b) => a.trackNumber - b.trackNumber);

  return (
    <div className="space-y-3">
      {sortedSongs.map((song) => (
        <div
          key={song.id}
          className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all"
        >
          <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-gray-300 font-medium">
            {song.trackNumber}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-200 truncate">{song.title}</h4>
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
              {song.artist && (
                <span className="truncate">{song.artist}</span>
              )}
              <span>{formatDuration(song.duration)}</span>
              <span>{song.format.toUpperCase()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const url = collectionApi.getAudioFileStreamUrl(song.audioFileId);
                window.open(url, '_blank');
              }}
              className="p-2 text-gray-400 hover:text-sun rounded transition-colors"
              title="Play/Download"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleDelete(song.id, song.title)}
              disabled={deletingId === song.id}
              className="p-2 text-gray-400 hover:text-red-400 rounded transition-colors disabled:opacity-50"
              title="Remove from album"
            >
              {deletingId === song.id ? (
                <span className="text-xs">...</span>
              ) : (
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

