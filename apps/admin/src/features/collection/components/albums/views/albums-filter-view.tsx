import { AlbumFiltersComponent } from '../filters/album-filters';
import type { Album } from '@radio/types';
import { useCollectionStore } from '../../../store/collection-store';

type AlbumsFilterViewProps = {
  albums: Album[];
};

export const AlbumsFilterView = ({ albums }: AlbumsFilterViewProps) => {
  const { filters, sortBy, sortOrder, setFilters, setSort, setShowFilters } =
    useCollectionStore();

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
          Фільтри та сортування
        </h3>
        <button
          type="button"
          onClick={() => setShowFilters(false)}
          className="p-1 hover:bg-gray-700 rounded transition-colors"
          aria-label="Закрити фільтри"
          title="Закрити фільтри"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <AlbumFiltersComponent
          albums={albums}
          filters={filters}
          onFiltersChange={setFilters}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={setSort}
        />
      </div>
    </div>
  );
};
