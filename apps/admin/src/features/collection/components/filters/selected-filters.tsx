import { useCollectionStore } from '@/features/collection/store/collection-store';

export const SelectedFilters = () => {
  const { filters, setFilters } = useCollectionStore();
  const hasFilters =
    filters.yearMin ||
    filters.yearMax ||
    filters.artist ||
    (filters.genres && filters.genres.length > 0) ||
    filters.trackCountMin ||
    filters.trackCountMax;

  if (!hasFilters) return null;

  const removeFilter = (key: keyof typeof filters) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
  };

  const removeGenre = (genreToRemove: string) => {
    setFilters({
      ...filters,
      genres: filters.genres?.filter((g) => g !== genreToRemove),
    });
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-xs text-gray-400 uppercase tracking-wide">
          Активні фільтри
        </h3>
        <button
          type="button"
          onClick={clearAllFilters}
          className="text-xs text-gray-400 hover:text-gray-300 transition-colors"
        >
          Очистити
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.genres?.map((genre) => (
          <button
            key={genre}
            type="button"
            onClick={() => removeGenre(genre)}
            className="group px-2 py-1 rounded-full text-xs bg-gray-700/50 text-gray-300 border border-gray-600 hover:border-red-500 hover:bg-red-900/20 transition-all flex items-center gap-1"
          >
            <span>{genre}</span>
            <svg
              className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ))}

        {filters.artist && (
          <button
            type="button"
            onClick={() => removeFilter('artist')}
            className="group px-2 py-1 rounded-full text-xs bg-gray-700/50 text-gray-300 border border-gray-600 hover:border-red-500 hover:bg-red-900/20 transition-all flex items-center gap-1"
          >
            <span>🎤 {filters.artist}</span>
            <svg
              className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {(filters.yearMin || filters.yearMax) && (
          <button
            type="button"
            onClick={() => {
              removeFilter('yearMin');
              removeFilter('yearMax');
            }}
            className="group px-2 py-1 rounded-full text-xs bg-gray-700/50 text-gray-300 border border-gray-600 hover:border-red-500 hover:bg-red-900/20 transition-all flex items-center gap-1"
          >
            <span>
              📅 {filters.yearMin || '?'} - {filters.yearMax || '?'}
            </span>
            <svg
              className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {(filters.trackCountMin || filters.trackCountMax) && (
          <button
            type="button"
            onClick={() => {
              removeFilter('trackCountMin');
              removeFilter('trackCountMax');
            }}
            className="group px-2 py-1 rounded-full text-xs bg-gray-700/50 text-gray-300 border border-gray-600 hover:border-red-500 hover:bg-red-900/20 transition-all flex items-center gap-1"
          >
            <span>
              🎵 {filters.trackCountMin || '0'}+
              {filters.trackCountMax ? ` - ${filters.trackCountMax}` : ''}
            </span>
            <svg
              className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
