import type { Album } from '@radio/types';
import clsx from 'clsx';

type CompactAlbumListItemProps = {
  album: Album;
  onClick: (album: Album) => void;
  isSelected?: boolean;
};

export const CompactAlbumListItem = ({
  album,
  onClick,
  isSelected = false,
}: CompactAlbumListItemProps) => {
  return (
    <div className="relative group">
      <button
        type="button"
        className={clsx(
          'w-full flex items-center gap-3 p-2 rounded-lg transition-all cursor-pointer text-left',
          isSelected
            ? 'bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50'
            : 'bg-gray-800/30 hover:bg-gray-800/50 border border-transparent',
        )}
        onClick={() => onClick(album)}
      >
        <div className="flex-shrink-0 w-12 h-12 bg-gray-700 rounded-lg overflow-hidden">
          {album.coverImageUrl ? (
            <img
              src={album.coverImageUrl}
              alt={album.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '';
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-label="No album cover"
                role="img"
              >
                <title>No album cover</title>
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
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-200 truncate text-sm">
            {album.title}
          </h4>
          <p className="text-xs text-gray-400 truncate mt-0.5">
            {album.artist}
          </p>
        </div>
      </button>
    </div>
  );
};
