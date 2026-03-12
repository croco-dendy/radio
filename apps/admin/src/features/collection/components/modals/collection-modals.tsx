import type { Collection } from '@radio/types';
import { useCollectionStore } from '../../store/collection-store';
import { CreateCollectionModal, CreateAlbumModal, DetailModal } from './index';
import { CollectionDetail } from '../content/playlists';
import { AlbumDetail } from '../content/albums';

type CollectionModalsProps = {
  selectedCollection: Collection | null;
  onCloseCollection: () => void;
};

export const CollectionModals = ({
  selectedCollection,
  onCloseCollection,
}: CollectionModalsProps) => {
  const {
    activeTab,
    selectedAlbum,
    showCreateAlbumModal,
    showEditAlbumModal,
    showCreateCollectionModal,
    setSelectedAlbum,
    setShowCreateAlbumModal,
    setShowEditAlbumModal,
    setShowCreateCollectionModal,
  } = useCollectionStore();

  return (
    <>
      {activeTab === 'playlists' && (
        <DetailModal
          title={selectedCollection?.name || ''}
          onClose={onCloseCollection}
          isOpen={!!selectedCollection}
        >
          {selectedCollection && (
            <CollectionDetail collection={selectedCollection} />
          )}
        </DetailModal>
      )}

      {activeTab === 'albums' && selectedAlbum && !showEditAlbumModal && (
        <DetailModal
          title={selectedAlbum.title}
          onClose={() => setSelectedAlbum(null)}
          isOpen={!!selectedAlbum}
        >
          <AlbumDetail album={selectedAlbum} />
        </DetailModal>
      )}

      <CreateCollectionModal
        isOpen={showCreateCollectionModal}
        onClose={() => setShowCreateCollectionModal(false)}
        onSuccess={() => setShowCreateCollectionModal(false)}
      />

      <CreateAlbumModal
        isOpen={showCreateAlbumModal}
        onClose={() => setShowCreateAlbumModal(false)}
        onSuccess={() => setShowCreateAlbumModal(false)}
      />

      {showEditAlbumModal && selectedAlbum && (
        <DetailModal
          title={`Редагувати: ${selectedAlbum.title}`}
          onClose={() => {
            setShowEditAlbumModal(false);
            setSelectedAlbum(null);
          }}
          isOpen={showEditAlbumModal}
        >
          <AlbumDetail album={selectedAlbum} />
        </DetailModal>
      )}
    </>
  );
};
