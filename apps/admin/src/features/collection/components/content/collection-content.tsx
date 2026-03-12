import type { Collection } from '@radio/types';
import { Panel } from '@radio/mojo-ui';
import { CollectionList } from '@/features/collection/components/content/playlists';
import {
  AlbumList,
  AlbumListHeader,
} from '@/features/collection/components/content/albums';
import { useCollectionStore } from '@/features/collection/store/collection-store';

type CollectionContentProps = {
  onCollectionClick: (collection: Collection) => void;
};

export const CollectionContent = ({
  onCollectionClick,
}: CollectionContentProps) => {
  const { activeTab } = useCollectionStore();
  const isPlaylistsTab = activeTab === 'playlists';

  const content = isPlaylistsTab ? (
    <CollectionList onCollectionClick={onCollectionClick} />
  ) : (
    <AlbumList />
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 h-auto lg:h-full">
      <Panel
        sectionTitle={isPlaylistsTab ? 'Ваші плейлисти' : 'Ваші альбоми'}
        header={!isPlaylistsTab ? <AlbumListHeader /> : undefined}
        content={content}
        className="flex-1 flex flex-col overflow-hidden h-auto lg:h-full"
        minHeight="h-full"
        decorated={false}
      />
    </div>
  );
};
