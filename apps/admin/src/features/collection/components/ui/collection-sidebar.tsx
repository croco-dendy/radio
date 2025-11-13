import { Panel } from '@radio/mojo-ui';
import type { Album } from '@radio/types';
import {
  AlbumsMainView,
  AlbumsFilterView,
  PlaylistsView,
} from '../albums/views';
import { useCollectionStore } from '../../store/collection-store';

type CollectionSidebarProps = {
  albums: Album[];
  genreCounts: Map<string, number>;
  totalCount: number;
  publicCount: number;
  lastUpdated?: string;
  overallCompleteness: number;
  getCompletenessVariant: (percentage: number) => 'green' | 'yellow' | 'red';
};

export const CollectionSidebar = ({
  albums,
  genreCounts,
  totalCount,
  publicCount,
  lastUpdated,
  overallCompleteness,
  getCompletenessVariant,
}: CollectionSidebarProps) => {
  const { activeTab, showFilters } = useCollectionStore();
  const isAlbumsTab = activeTab === 'albums';

  return (
    <div className="w-80 flex-shrink-0 flex flex-col h-full">
      <Panel
        sections={[
          {
            title: 'Filters',
            content: (
              <div className="flex flex-col h-full overflow-hidden">
                {isAlbumsTab && !showFilters && (
                  <AlbumsMainView
                    totalCount={totalCount}
                    publicCount={publicCount}
                    lastUpdated={lastUpdated}
                    genreCounts={genreCounts}
                    overallCompleteness={overallCompleteness}
                    getCompletenessVariant={getCompletenessVariant}
                  />
                )}

                {isAlbumsTab && showFilters && (
                  <AlbumsFilterView albums={albums} />
                )}

                {!isAlbumsTab && (
                  <PlaylistsView
                    totalCount={totalCount}
                    publicCount={publicCount}
                    lastUpdated={lastUpdated}
                  />
                )}
              </div>
            ),
          },
        ]}
        className="flex-1 flex flex-col h-full"
        minHeight="h-full"
        decorated={false}
      />
    </div>
  );
};
