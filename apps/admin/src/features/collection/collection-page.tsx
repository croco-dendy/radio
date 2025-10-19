import { useState } from 'react';
import clsx from 'clsx';
import { PageLayout, StatsCard, Button } from '@radio/mojo-ui';
import { sharedStyles } from '@/styles/shared-styles';
import { useUserCollections } from '@/services/api';
import {
  CollectionList,
  CreateCollectionModal,
  CollectionDetail,
} from './components';
import type { Collection } from '@radio/types';

export const CollectionPage = () => {
  const { data: collections } = useUserCollections();
  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Note: We'd need to fetch collection details to get actual track counts
  // const totalTracks = collections?.reduce((sum) => sum + 1, 0) || 0;

  const publicCollections = collections?.filter((c) => c.isPublic).length || 0;

  return (
    <PageLayout title="Audio Collection">
      <div className={clsx(sharedStyles.statsGrid)}>
        <StatsCard
          title="Collections"
          value={collections?.length?.toString() || '0'}
        />
        <StatsCard
          title="Public Collections"
          value={publicCollections.toString()}
        />
        <StatsCard title="Total Items" value="Loading..." />
      </div>

      <div className={clsx(sharedStyles.actionsSection)}>
        <h2 className={clsx(sharedStyles.actionsTitle)}>Collection Actions</h2>
        <div className={clsx(sharedStyles.actionsGrid)}>
          <Button
            variant="green"
            size="medium"
            title="Create Collection"
            onClick={() => setShowCreateModal(true)}
          />
          <Button
            variant="yellow"
            size="medium"
            title="View All Collections"
            onClick={() => setSelectedCollection(null)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Collections List */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-gray-900/30 backdrop-blur-2xl border border-white/5 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 hover:bg-gray-900/40 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/3 before:to-transparent before:pointer-events-none">
            <h3 className="text-lg font-display font-semibold text-gray-200 uppercase tracking-wide mb-4">
              Your Collections
            </h3>
            <CollectionList
              onSelectCollection={setSelectedCollection}
              selectedCollectionId={selectedCollection?.id}
            />
          </div>
        </div>

        {/* Collection Detail */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-gray-900/30 backdrop-blur-2xl border border-white/5 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 hover:bg-gray-900/40 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/3 before:to-transparent before:pointer-events-none">
            {selectedCollection ? (
              <CollectionDetail collection={selectedCollection} />
            ) : (
              <div className="text-center py-12 text-gray-400">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="Select collection"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-200 mb-2">
                  Select a Collection
                </h3>
                <p className="text-gray-400">
                  Choose a collection from the left to view and manage its audio
                  files.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <CreateCollectionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => {
          // Optionally select the newly created collection
        }}
      />
    </PageLayout>
  );
};
