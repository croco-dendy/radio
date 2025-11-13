import { useState } from 'react';
import {
  useAlbum,
  useDeleteAlbum,
  useUpdateAlbum,
  albumApi,
} from '@/services/api';
import { CoverUpload } from '../../shared';
import { SongList } from './song-list';
import { AddSongModal, EditAlbumModal } from '../modals';
import type { Album } from '@radio/types';

type AlbumDetailProps = {
  album: Album;
};

export const AlbumDetail = ({ album }: AlbumDetailProps) => {
  const { data: albumWithSongs, isLoading } = useAlbum(album.id);
  const deleteAlbum = useDeleteAlbum();
  const updateAlbum = useUpdateAlbum();
  const [showCoverUpload, setShowCoverUpload] = useState(false);
  const [showAddSong, setShowAddSong] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete album "${album.title}"? This will also delete all songs.`)) {
      return;
    }

    try {
      await deleteAlbum.mutateAsync(album.id);
    } catch (error) {
      console.error('Failed to delete album:', error);
      alert('Failed to delete album');
    }
  };

  const togglePublic = async () => {
    try {
      await updateAlbum.mutateAsync({
        id: album.id,
        data: { isPublic: !album.isPublic },
      });
    } catch (error) {
      console.error('Failed to update album:', error);
      alert('Failed to update album visibility');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-100/10 rounded" />
        <div className="space-y-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={`detail-skeleton-${i}`}
              className="h-16 bg-gray-100/10 rounded"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!albumWithSongs) {
    return <div className="text-gray-500">Album not found</div>;
  }

  const tags = albumWithSongs.tags
    ? JSON.parse(albumWithSongs.tags)
    : [];

  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        <div className="flex-shrink-0">
          <div className="w-48 h-48 bg-gray-700 rounded-lg overflow-hidden">
            {albumWithSongs.coverArtPath ? (
              <img
                src={albumApi.getCoverArtUrl(albumWithSongs.id)}
                alt={albumWithSongs.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <svg
                  className="w-16 h-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowCoverUpload(!showCoverUpload)}
            className="w-full mt-2 px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors text-sm"
          >
            {albumWithSongs.coverArtPath ? 'Change Cover' : 'Upload Cover'}
          </button>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-200">
            {albumWithSongs.title}
          </h2>
          <p className="text-lg text-gray-400 mt-1">{albumWithSongs.artist}</p>
          {albumWithSongs.year && (
            <p className="text-sm text-gray-500 mt-1">{albumWithSongs.year}</p>
          )}
          {albumWithSongs.description && (
            <p className="text-gray-300 mt-3">{albumWithSongs.description}</p>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-sun/20 text-sun border border-sun/30 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 mt-4">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                albumWithSongs.isPublic
                  ? 'bg-green-900/30 text-green-400'
                  : 'bg-gray-700/50 text-gray-400'
              }`}
            >
              {albumWithSongs.isPublic ? 'Public' : 'Private'}
            </span>
            <span className="text-sm text-gray-500">
              {albumWithSongs.songs?.length || 0} songs
            </span>
            <span className="text-sm text-gray-500">
              Created {new Date(albumWithSongs.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={() => setShowEditModal(true)}
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors text-sm"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={togglePublic}
              disabled={updateAlbum.isPending}
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors text-sm"
            >
              {updateAlbum.isPending
                ? 'Updating...'
                : albumWithSongs.isPublic
                  ? 'Make Private'
                  : 'Make Public'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteAlbum.isPending}
              className="px-4 py-2 bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/50 transition-colors text-sm"
            >
              {deleteAlbum.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>

      {showCoverUpload && (
        <div>
          <CoverUpload
            albumId={albumWithSongs.id}
            onSuccess={() => setShowCoverUpload(false)}
          />
        </div>
      )}

      <div className="border-t border-gray-700/50 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-200">Songs</h3>
          <button
            type="button"
            onClick={() => setShowAddSong(true)}
            className="px-4 py-2 bg-sun text-gray-900 rounded-lg hover:bg-sun/90 transition-colors text-sm font-medium"
          >
            Add Song
          </button>
        </div>

        <SongList albumId={albumWithSongs.id} songs={albumWithSongs.songs} />
      </div>

      <AddSongModal
        isOpen={showAddSong}
        onClose={() => setShowAddSong(false)}
        albumId={albumWithSongs.id}
        nextTrackNumber={(albumWithSongs.songs?.length || 0) + 1}
      />

      <EditAlbumModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        album={albumWithSongs}
      />
    </div>
  );
};

