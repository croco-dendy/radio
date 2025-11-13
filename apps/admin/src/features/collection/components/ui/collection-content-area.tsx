import type { Collection, Album } from '@radio/types';
import { Panel } from '@radio/mojo-ui';
import { CollectionList } from '../playlists';
import { AlbumList } from '../albums';
import type { AlbumFilters, SortField, SortOrder } from '../../utils/album-helpers';

type CollectionContentAreaProps = {
  activeTab: 'playlists' | 'albums';
  onCollectionClick: (collection: Collection) => void;
  onAlbumClick: (album: Album) => void;
  onAlbumEdit: (album: Album) => void;
  onAlbumDelete: (albumId: number) => void;
  searchQuery: string;
  filters: AlbumFilters;
  sortBy: SortField;
  sortOrder: SortOrder;
};

export const CollectionContentArea = ({
  activeTab,
  onCollectionClick,
  onAlbumClick,
  onAlbumEdit,
  onAlbumDelete,
  searchQuery,
  filters,
  sortBy,
  sortOrder,
}: CollectionContentAreaProps) => {
  const title = activeTab === 'playlists' ? 'Ваші плейлисти' : 'Ваші альбоми';

  const content =
    activeTab === 'playlists' ? (
      <CollectionList onCollectionClick={onCollectionClick} />
    ) : (
      <AlbumList
        onAlbumClick={onAlbumClick}
        onAlbumEdit={onAlbumEdit}
        onAlbumDelete={onAlbumDelete}
        searchQuery={searchQuery}
        filters={filters}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
    );

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full">
      <Panel
        sections={[{ title, content }]}
        className="flex-1 flex flex-col overflow-hidden h-full"
        minHeight="h-full"
        decorated={false}
      />
    </div>
  );
};
