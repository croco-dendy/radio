import { useState } from 'react';
import { useDeleteSong, collectionApi } from '@/services/api';
import { useNowPlayingStore } from '@/stores/now-playing-store';
import type { Song } from '@radio/types';

type SongListProps = {
  albumId: number;
  songs: (Song & { audioFilePath?: string; audioFileName?: string })[];
};

export const SongList = ({ songs }: SongListProps) => {
  const deleteSong = useDeleteSong();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { currentTrack, isPlaying, playTrack } = useNowPlayingStore();

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

  // Convert songs to playlist format and create a map of song audioUrl to playlist index
  const playlist: Array<{ title: string; artist: string; audioUrl?: string }> = [];
  const songToPlaylistIndex = new Map<string, number>();

  for (const song of sortedSongs) {
    if (song.audioUrl) {
      const playlistIndex = playlist.length;
      playlist.push({
        title: song.title,
        artist: song.artist || '',
        audioUrl: song.audioUrl || undefined,
      });
      songToPlaylistIndex.set(song.audioUrl, playlistIndex);
    }
  }

  return (
    <div className="space-y-3">
      {sortedSongs.map((song) => {
        const isCurrentTrack =
          currentTrack?.audioUrl === song.audioUrl && !!song.audioUrl;
        const isThisPlaying = isCurrentTrack && isPlaying;

        // Get the playlist index for this song
        const playlistIndex = song.audioUrl
          ? songToPlaylistIndex.get(song.audioUrl) ?? -1
          : -1;

        return (
          <div
            key={song.id}
            className={`p-4 rounded-lg transition-all ${
              isCurrentTrack
                ? 'bg-sun/10 border border-sun/20'
                : 'bg-gray-800/30 hover:bg-gray-800/50 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Play button / track number */}
              {song.audioUrl && playlistIndex >= 0 ? (
                <button
                  type="button"
                  onClick={() =>
                    playTrack(playlist, playlistIndex)
                  }
                  className={`flex-shrink-0 w-8 h-8 rounded flex items-center justify-center transition-colors ${
                    isThisPlaying
                      ? 'bg-sun text-stone-900'
                      : 'bg-gray-700 text-gray-300 hover:bg-sun/80 hover:text-stone-900'
                  }`}
                  title={isThisPlaying ? 'Pause' : 'Play'}
                >
                  {isThisPlaying ? (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
              ) : (
                <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded flex items-center justify-center text-gray-300 font-medium">
                  {song.trackNumber}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <h4
                  className={`font-medium truncate ${isCurrentTrack ? 'text-sun' : 'text-gray-200'}`}
                >
                  {song.title}
                </h4>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                  {song.artist && (
                    <span className="truncate">{song.artist}</span>
                  )}
                  <span>{formatDuration(song.duration)}</span>
                  <span>{song.format.toUpperCase()}</span>
                  {song.fileSlug && (
                    <span
                      className="text-gray-600 truncate"
                      title={song.fileSlug}
                    >
                      {song.fileSlug}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const url = collectionApi.getAudioFileStreamUrl(
                      song.audioFileId,
                    );
                    window.open(url, '_blank');
                  }}
                  className="p-2 text-gray-400 hover:text-sun rounded transition-colors"
                  title="Open in new tab"
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
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
          </div>
        );
      })}
    </div>
  );
};
