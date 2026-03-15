type AlbumCoverProps = {
  coverUrl: string | null;
  albumTitle: string;
  onUploadClick: () => void;
};

export const AlbumCover = ({
  coverUrl,
  albumTitle,
  onUploadClick,
}: AlbumCoverProps) => {
  return (
    <div className="flex-shrink-0">
      <button
        type="button"
        onClick={onUploadClick}
        className="w-48 h-48 bg-gray-700 rounded-lg overflow-hidden relative group cursor-pointer hover:opacity-90 transition-opacity"
        title={coverUrl ? 'Change Cover' : 'Upload Cover'}
      >
        {coverUrl ? (
          <>
            <img
              src={coverUrl}
              alt={albumTitle}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-medium transition-opacity">
                {coverUrl ? 'Change Cover' : 'Upload Cover'}
              </span>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 group-hover:text-gray-400 transition-colors">
            <svg
              aria-hidden="true"
              className="w-16 h-16 mb-2"
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
            <span className="text-xs">Click to upload</span>
          </div>
        )}
      </button>
    </div>
  );
};
