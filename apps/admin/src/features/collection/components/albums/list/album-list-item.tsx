import { useState } from 'react';
import type { Album } from '@radio/types';
import { AlbumCover } from './album-cover';
import {
  calculateAlbumCompleteness,
  getCompletenessColor,
} from '../../../utils/album-helpers';
import { albumApi } from '@/services/api';

type AlbumListItemProps = {
  album: Album;
  onClick: (album: Album) => void;
  onEdit: (album: Album) => void;
  onDelete: (albumId: number) => void;
};

export const AlbumListItem = ({
  album,
  onClick,
  onEdit,
  onDelete,
}: AlbumListItemProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const tags = album.tags ? JSON.parse(album.tags) : [];
  const completeness = calculateAlbumCompleteness(album);
  const completenessColors = getCompletenessColor(completeness);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(album);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleting(true);
    try {
      await albumApi.deleteAlbum(album.id);
      onDelete(album.id);
    } catch (error) {
      console.error('Failed to delete album:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleDeleteCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  return (
    <div className="relative group">
      <button
        type="button"
        className="w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all text-left bg-gray-800/30 hover:bg-gray-800/50 border border-transparent"
        onClick={() => onClick(album)}
      >
        <AlbumCover
          albumId={album.id}
          coverArtPath={album.coverArtPath}
          title={album.title}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-gray-200 truncate">
              {album.title}
            </h4>
            <div
              className={`w-2 h-2 rounded-full ${completenessColors.bg}`}
              title={`${completeness}% complete`}
            />
          </div>
          <p className="text-sm text-gray-400 truncate">{album.artist}</p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {album.year && (
              <span className="text-xs text-gray-500">{album.year}</span>
            )}
            <span
              className={`text-xs px-2 py-0.5 rounded ${
                album.isPublic
                  ? 'bg-green-900/30 text-green-400'
                  : 'bg-gray-700/50 text-gray-400'
              }`}
            >
              {album.isPublic ? 'Public' : 'Private'}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 text-xs text-gray-500">
          {tags.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap justify-end">
              {tags.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600/50"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-gray-500">+{tags.length - 3}</span>
              )}
            </div>
          )}
          <div className="flex flex-col items-end gap-1 whitespace-nowrap">
            <span>{new Date(album.createdAt).toLocaleDateString()}</span>
            {album.songCount !== undefined && (
              <span className="text-gray-400">
                {album.songCount} {album.songCount === 1 ? 'track' : 'tracks'}
              </span>
            )}
          </div>
        </div>
      </button>

      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <button
          type="button"
          onClick={handleEdit}
          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          aria-label="Редагувати альбом"
          title="Редагувати альбом"
        >
          <svg
            aria-hidden="true"
            className="w-4 h-4 text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={handleDeleteClick}
          className="p-2 bg-red-900/30 hover:bg-red-900/50 rounded-lg transition-colors"
          aria-label="Видалити альбом"
          title="Видалити альбом"
        >
          <svg
            aria-hidden="true"
            className="w-4 h-4 text-red-400"
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
        </button>
      </div>

      {showDeleteConfirm && (
        <div
          className="absolute inset-0 bg-gray-900/95 rounded-lg flex items-center justify-center z-10"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              e.stopPropagation();
              setShowDeleteConfirm(false);
            }
          }}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="delete-confirm-title"
        >
          <div className="text-center px-4">
            <p id="delete-confirm-title" className="text-sm text-gray-200 mb-3">
              Видалити альбом?
            </p>
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-3 py-1.5 bg-red-900/50 hover:bg-red-900/70 text-red-300 rounded text-sm transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Видалення...' : 'Так'}
              </button>
              <button
                type="button"
                onClick={handleDeleteCancel}
                disabled={isDeleting}
                className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded text-sm transition-colors disabled:opacity-50"
              >
                Ні
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
