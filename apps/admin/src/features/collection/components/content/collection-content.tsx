import type { Collection } from '@radio/types';
import { Panel } from '@radio/mojo-ui';
import { CollectionList } from '@/features/collection/components/content/playlists';
import {
  AlbumList,
  AlbumListHeader,
  AlbumDetail,
} from '@/features/collection/components/content/albums';
import { useCollectionStore } from '@/features/collection/store/collection-store';

type CollectionContentProps = {
  onCollectionClick: (collection: Collection) => void;
  showDetail?: boolean;
};

export const CollectionContent = ({
  onCollectionClick,
  showDetail = false,
}: CollectionContentProps) => {
  const { activeTab, selectedAlbum } = useCollectionStore();
  const isPlaylistsTab = activeTab === 'playlists';

  // Show detail view if requested and album is selected
  if (showDetail && selectedAlbum && !isPlaylistsTab) {
    return (
      <div className="flex-1 flex flex-col min-w-0 h-auto lg:h-full">
        <Panel
          content={<AlbumDetail album={selectedAlbum} />}
          className="flex-1 flex flex-col overflow-hidden h-auto lg:h-full"
          minHeight="h-full"
          decorated={false}
        />
      </div>
    );
  }

  // Determine variant based on context
  // When an album is selected (detail view is open), use minimal variant for the list panel
  const albumListVariant =
    selectedAlbum && !isPlaylistsTab ? 'minimal' : 'default';

  const content = isPlaylistsTab ? (
    <CollectionList onCollectionClick={onCollectionClick} />
  ) : (
    <AlbumList variant={albumListVariant} />
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 h-auto lg:h-full">
      <Panel
        sectionTitle={isPlaylistsTab ? 'Ваші плейлисти' : 'Ваші альбоми'}
        header={
          !isPlaylistsTab ? (
            <AlbumListHeader variant={albumListVariant} />
          ) : undefined
        }
        content={content}
        className="flex-1 flex flex-col overflow-hidden h-auto lg:h-full"
        minHeight="h-full"
        decorated={false}
      />
    </div>
  );
};
