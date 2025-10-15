import { useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useUserCollections, useDeleteCollection } from '@/services/api';
import type { Collection } from '@radio/types';

type CollectionListProps = {
  onSelectCollection: (collection: Collection) => void;
  selectedCollectionId?: number;
};

export const CollectionList = ({
  onSelectCollection,
  selectedCollectionId,
}: CollectionListProps) => {
  const { data: collections, isLoading, error } = useUserCollections();
  const deleteCollection = useDeleteCollection();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    setDeletingId(id);
    try {
      await deleteCollection.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete collection:', error);
      alert('Failed to delete collection');
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`skeleton-${i}`}
            className="h-16 bg-stone-100 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4 bg-red-50 rounded-lg">
        Failed to load collections
      </div>
    );
  }

  if (!collections?.length) {
    return (
      <div className="text-stone-500 text-center py-8">
        No collections yet. Create your first collection!
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {collections.map((collection) => (
        <motion.div
          key={collection.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={clsx(
            'p-4 rounded-lg border cursor-pointer transition-all',
            selectedCollectionId === collection.id
              ? 'border-amber-500 bg-amber-50'
              : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50',
          )}
          onClick={() => onSelectCollection(collection)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-stone-900">{collection.name}</h3>
              {collection.description && (
                <p className="text-sm text-stone-600 mt-1">
                  {collection.description}
                </p>
              )}
              <div className="flex items-center gap-4 mt-2 text-xs text-stone-500">
                <span>{collection.isPublic ? 'Public' : 'Private'}</span>
                <span>
                  Created {new Date(collection.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(collection.id, collection.name);
              }}
              disabled={deletingId === collection.id}
              className={clsx(
                'p-2 text-red-600 hover:bg-red-50 rounded transition-colors',
                deletingId === collection.id && 'opacity-50 cursor-not-allowed',
              )}
            >
              {deletingId === collection.id ? '...' : '🗑️'}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
