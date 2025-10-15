import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  useCollection,
  useAddItemToCollection,
  useRemoveItemFromCollection,
  collectionApi,
} from '@/services/api';
import { AudioUpload } from './audio-upload';
import type { Collection } from '@radio/types';

type CollectionDetailProps = {
  collection: Collection;
};

export const CollectionDetail = ({ collection }: CollectionDetailProps) => {
  const { data: collectionWithItems, isLoading } = useCollection(collection.id);
  const addItemToCollection = useAddItemToCollection();
  const removeItemFromCollection = useRemoveItemFromCollection();
  const [showUpload, setShowUpload] = useState(false);

  const handleUploadSuccess = async (audioFile: {
    id: number;
    name: string;
    size: number;
    format: string;
    duration: string;
  }) => {
    try {
      await addItemToCollection.mutateAsync({
        collectionId: collection.id,
        audioFileId: audioFile.id,
        order: (collectionWithItems?.items?.length || 0) + 1,
      });
      setShowUpload(false);
    } catch (error) {
      console.error('Failed to add audio to collection:', error);
      alert('Failed to add audio to collection');
    }
  };

  const handleRemoveItem = async (audioFileId: number, name: string) => {
    if (!confirm(`Remove "${name}" from this collection?`)) return;

    try {
      await removeItemFromCollection.mutateAsync({
        collectionId: collection.id,
        audioFileId,
      });
    } catch (error) {
      console.error('Failed to remove item:', error);
      alert('Failed to remove item from collection');
    }
  };

  const formatDuration = (duration: string) => {
    if (duration === '0:00') return 'Unknown';
    return duration;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-100 rounded animate-pulse" />
        <div className="space-y-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={`detail-skeleton-${Math.random().toString(36).substr(2, 9)}`}
              className="h-16 bg-gray-100 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!collectionWithItems) {
    return <div className="text-gray-500">Collection not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Collection Header */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {collectionWithItems.name}
        </h2>
        {collectionWithItems.description && (
          <p className="text-gray-600 mt-2">
            {collectionWithItems.description}
          </p>
        )}
        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              collectionWithItems.isPublic
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {collectionWithItems.isPublic ? 'Public' : 'Private'}
          </span>
          <span>{collectionWithItems.items?.length || 0} tracks</span>
          <span>
            Created{' '}
            {new Date(collectionWithItems.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Upload Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Audio Files</h3>
          <button
            type="button"
            onClick={() => setShowUpload(!showUpload)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {showUpload ? 'Cancel Upload' : 'Add Audio'}
          </button>
        </div>

        {showUpload && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <AudioUpload onUploadSuccess={handleUploadSuccess} />
          </motion.div>
        )}
      </div>

      {/* Audio Files List */}
      <div className="space-y-3">
        {collectionWithItems.items?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No audio files in this collection yet.
          </div>
        ) : (
          collectionWithItems.items?.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="Audio file"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">
                  {item.name}
                </h4>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                  <span>{formatDuration(item.duration)}</span>
                  <span>{item.format.toUpperCase()}</span>
                  <span>
                    Added {new Date(item.addedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const url = collectionApi.getAudioFileStreamUrl(
                      item.audioFileId,
                    );
                    window.open(url, '_blank');
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Play/Download"
                >
                  ▶️
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.audioFileId, item.name)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Remove from collection"
                >
                  🗑️
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
