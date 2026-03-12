import { albumApi } from '@/services/api';

type AlbumCoverProps = {
  albumId: number;
  coverArtPath: string | null;
  title: string;
};

export const AlbumCover = ({ albumId, coverArtPath, title }: AlbumCoverProps) => {
  return (
    <div className="flex-shrink-0 w-16 h-16 bg-gray-700 rounded-lg overflow-hidden">
      {coverArtPath ? (
        <img
          src={albumApi.getCoverArtUrl(albumId)}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '';
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          <svg
            className="w-8 h-8"
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
  );
};

