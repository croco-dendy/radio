import { ProgressBar } from '@radio/mojo-ui';
import { CollectionStats } from '../../ui/collection-stats';
import { CollectionActions } from '../../ui/collection-actions';
import { SearchBar } from '../filters/search-bar';
import { SelectedFilters } from '../filters/selected-filters';
import { useCollectionStore } from '../../../store/collection-store';
import { useCollectionFilters } from '../../../hooks';
import { GenreStats } from '../stats';

type AlbumsMainViewProps = {
  genreCounts: Map<string, number>;
  totalCount: number;
  publicCount: number;
  lastUpdated?: string;
  overallCompleteness: number;
  getCompletenessVariant: (percentage: number) => 'green' | 'yellow' | 'red';
};

export const AlbumsMainView = ({
  genreCounts,
  totalCount,
  publicCount,
  lastUpdated,
  overallCompleteness,
  getCompletenessVariant,
}: AlbumsMainViewProps) => {
  const { filters, setFilters, setShowCreateAlbumModal } = useCollectionStore();
  const { hasActiveFilters } = useCollectionFilters(filters);

  const handleGenreClick = (genre: string) => () => {
    setFilters((prev) => ({
      ...prev,
      genres: prev.genres?.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...(prev.genres || []), genre],
    }));
  };

  return (
    <div className="flex flex-col h-full justify-between gap-6 w-full">
      <SearchBar />

      {hasActiveFilters && <SelectedFilters />}

      <GenreStats
        genreCounts={genreCounts}
        onGenreClick={handleGenreClick}
        selectedGenres={filters.genres || ([] as string[])}
      />

      <div>
        <div className="w-full">
          <ProgressBar
            value={overallCompleteness}
            variant={getCompletenessVariant(overallCompleteness)}
            size="medium"
            label="Повнота даних"
            lampCount={20}
            className="w-full pb-4"
          />
          <CollectionStats
            activeTab="albums"
            totalCount={totalCount}
            publicCount={publicCount}
            lastUpdated={lastUpdated}
          />
        </div>

        <div className="pt-4 border-t border-gray-700 w-full">
          <CollectionActions
            activeTab="albums"
            onCreateAlbum={() => setShowCreateAlbumModal(true)}
          />
        </div>
      </div>
    </div>
  );
};
