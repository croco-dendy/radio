import { IconButton } from '@radio/mojo-ui';
import { AlbumSearch } from './album-search';
import { useCollectionStore } from '../../../store/collection-store';
import { useCollectionFilters } from '../../../hooks';

export const SearchBar = () => {
  const { searchQuery, filters, setSearchQuery, setShowFilters } =
    useCollectionStore();
  const { hasActiveFilters } = useCollectionFilters(filters);
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1">
        <AlbumSearch value={searchQuery} onChange={setSearchQuery} />
      </div>
      <div className="flex-shrink-0">
        <IconButton
          variant={hasActiveFilters ? 'yellow' : 'gray'}
          size="medium"
          onClick={() => setShowFilters(true)}
          title="Фільтри"
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
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
        </IconButton>
      </div>
    </div>
  );
};
