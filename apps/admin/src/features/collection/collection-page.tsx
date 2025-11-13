import { useState } from 'react';
import { PageLayout, VinylTabs } from '@radio/mojo-ui';
import { useUserCollections, useUserAlbums } from '@/services/api';
import {
  CreateCollectionModal,
  CollectionDetail,
  CollectionContentArea,
  CollectionSidebar,
  DetailModal,
  CreateAlbumModal,
  AlbumDetail,
} from './components';
import type { Collection } from '@radio/types';
import { useCollectionStore } from './store/collection-store';
import { useCollectionStats } from './hooks';

export const CollectionPage = () => {
  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);

  const { data: collections } = useUserCollections();
  const { data: albums, refetch: refetchAlbums } = useUserAlbums();

  const {
    activeTab,
    searchQuery,
    filters,
    sortBy,
    sortOrder,
    selectedAlbum,
    showCreateAlbumModal,
    showEditAlbumModal,
    showCreateCollectionModal,
    setActiveTab,
    setSelectedAlbum,
    setShowCreateAlbumModal,
    setShowEditAlbumModal,
    setShowCreateCollectionModal,
  } = useCollectionStore();

  const {
    genreCounts,
    overallCompleteness,
    lastUpdated,
    publicCount: publicAlbums,
    totalCount: totalAlbums,
    getCompletenessVariant,
  } = useCollectionStats(activeTab === 'albums' ? albums : undefined);

  const publicCollections = collections?.filter((c) => c.isPublic).length || 0;

  const tabs = [
    { id: 'albums' as const, label: 'Альбоми' },
    { id: 'playlists' as const, label: 'Плейлисти' },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as 'playlists' | 'albums');
    setSelectedCollection(null);
  };

  const statsData =
    activeTab === 'playlists'
      ? {
          total: collections?.length || 0,
          public: publicCollections,
        }
      : {
          total: totalAlbums,
          public: publicAlbums,
        };

  return (
    <>
      <PageLayout
        title="Колекція"
        headerRight={
          <VinylTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        }
      >
        <div className="flex gap-6 h-[calc(100vh-12rem)] pb-28">
          <CollectionSidebar
            albums={albums || []}
            genreCounts={genreCounts}
            totalCount={statsData.total}
            publicCount={statsData.public}
            lastUpdated={lastUpdated}
            overallCompleteness={overallCompleteness}
            getCompletenessVariant={getCompletenessVariant}
          />

          <CollectionContentArea
            activeTab={activeTab}
            onCollectionClick={setSelectedCollection}
            onAlbumClick={setSelectedAlbum}
            onAlbumEdit={(album) => {
              setSelectedAlbum(album);
              setShowEditAlbumModal(true);
            }}
            onAlbumDelete={() => {
              refetchAlbums();
            }}
            searchQuery={searchQuery}
            filters={filters}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        </div>

        {activeTab === 'playlists' && (
          <DetailModal
            title={selectedCollection?.name || ''}
            onClose={() => setSelectedCollection(null)}
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
      </PageLayout>
    </>
  );
};
