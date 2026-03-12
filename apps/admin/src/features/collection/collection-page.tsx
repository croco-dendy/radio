import { useState } from 'react';
import { PageLayout, VinylTabs } from '@radio/mojo-ui';
import {
  CollectionContent,
  CollectionSidebar,
  CollectionModals,
} from './components';
import type { Collection } from '@radio/types';
import { useCollectionStore } from './store/collection-store';

export const CollectionPage = () => {
  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);

  const { activeTab, setActiveTab } = useCollectionStore();

  const tabs = [
    { id: 'albums' as const, label: 'Альбоми' },
    { id: 'playlists' as const, label: 'Плейлисти' },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as 'playlists' | 'albums');
    setSelectedCollection(null);
  };

  return (
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
      <div className="flex flex-col gap-6 pb-16 lg:flex-row lg:pb-28 lg:h-[calc(100vh-12rem)]">
        <CollectionSidebar />
        <CollectionContent onCollectionClick={setSelectedCollection} />
      </div>

      <CollectionModals
        selectedCollection={selectedCollection}
        onCloseCollection={() => setSelectedCollection(null)}
      />
    </PageLayout>
  );
};
