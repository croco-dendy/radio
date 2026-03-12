import { ProgressBar } from '@radio/mojo-ui';
import { CollectionStats } from '../stats/collection-stats';
import { CollectionActions } from './actions';
import { useCollectionStore } from '@/features/collection/store/collection-store';
import { GenreStats } from '../stats/genre-stats';

type AlbumsSidebarProps = {
  genreCounts: Map<string, number>;
  totalCount: number;
  publicCount: number;
  lastUpdated?: string;
  overallCompleteness: number;
  getCompletenessVariant: (percentage: number) => 'green' | 'yellow' | 'red';
};

export const AlbumsSidebar = ({
  genreCounts,
  totalCount,
  publicCount,
  lastUpdated,
  overallCompleteness,
  getCompletenessVariant,
}: AlbumsSidebarProps) => {
  const { filters, setFilters, setShowCreateAlbumModal } = useCollectionStore();

  const handleGenreClick = (genre: string) => {
    setFilters((prev) => ({
      ...prev,
      genres: prev.genres?.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...(prev.genres || []), genre],
    }));
  };

  return (
    <div className="flex flex-col h-full justify-between gap-6 w-full">
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

        <div className="pt-4 w-full">
          <CollectionActions
            activeTab="albums"
            onCreateAlbum={() => setShowCreateAlbumModal(true)}
          />
        </div>
      </div>
    </div>
  );
};
