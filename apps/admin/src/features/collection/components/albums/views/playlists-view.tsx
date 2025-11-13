import { CollectionStats } from '../../ui/collection-stats';
import { CollectionActions } from '../../ui/collection-actions';
import { useCollectionStore } from '../../../store/collection-store';

type PlaylistsViewProps = {
  totalCount: number;
  publicCount: number;
  lastUpdated?: string;
};

export const PlaylistsView = ({
  totalCount,
  publicCount,
  lastUpdated,
}: PlaylistsViewProps) => {
  const { setShowCreateCollectionModal } = useCollectionStore();
  return (
    <>
      <CollectionStats
        activeTab="playlists"
        totalCount={totalCount}
        publicCount={publicCount}
        lastUpdated={lastUpdated}
      />

      <div className="mt-auto pt-4 border-t border-gray-700">
        <CollectionActions
          activeTab="playlists"
          onCreateCollection={() => setShowCreateCollectionModal(true)}
        />
      </div>
    </>
  );
};
