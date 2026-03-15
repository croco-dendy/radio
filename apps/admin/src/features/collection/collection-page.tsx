import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const { activeTab, setActiveTab, selectedAlbum } = useCollectionStore();

  const tabs = [
    { id: 'albums' as const, label: 'Альбоми' },
    { id: 'playlists' as const, label: 'Плейлисти' },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as 'playlists' | 'albums');
    setSelectedCollection(null);
  };

  // For albums tab: show master-detail layout
  // For playlists tab: keep modal behavior
  const isAlbumsTab = activeTab === 'albums';
  const showAlbumDetail = isAlbumsTab && selectedAlbum !== null;

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
      <div className="relative pb-16 lg:pb-28 lg:h-[calc(100vh-12rem)] overflow-visible">
        <div
          className="relative h-full"
          style={{ width: '100%', paddingTop: '24px', paddingBottom: '24px' }}
        >
          {/* Sidebar - slides out to the left */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 overflow-hidden"
            style={{ width: 320, willChange: 'transform' }}
            animate={{
              x: showAlbumDetail ? -336 : 0,
              opacity: showAlbumDetail ? 0 : 1,
              pointerEvents: showAlbumDetail ? 'none' : 'auto',
            }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <CollectionSidebar />
          </motion.div>

          {/* Album List - starts after sidebar, slides to sidebar position when detail opens */}
          <motion.div
            className="absolute top-0 bottom-0 overflow-hidden flex flex-col"
            style={{
              left: 336,
              width: 'calc(100% - 320px - 24px)',
              willChange: 'transform',
            }}
            animate={{
              x: showAlbumDetail ? -336 : 0,
            }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <CollectionContent
              onCollectionClick={setSelectedCollection}
              showDetail={false}
            />
          </motion.div>

          {/* Album Detail - slides in from right, positioned above list with more height */}
          <AnimatePresence mode="popLayout">
            {showAlbumDetail && (
              <motion.div
                key="album-detail"
                className="absolute top-0 bottom-0 overflow-hidden flex flex-col"
                style={{
                  left: 336,
                  width: 'calc(100% - 320px - 24px)',
                  height: 'calc(100% + 48px)',
                  marginTop: '-24px',
                  willChange: 'transform',
                  zIndex: 10,
                }}
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <CollectionContent
                  onCollectionClick={setSelectedCollection}
                  showDetail={true}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <CollectionModals
        selectedCollection={selectedCollection}
        onCloseCollection={() => setSelectedCollection(null)}
      />
    </PageLayout>
  );
};
