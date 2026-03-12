import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlbumListSkeleton } from './list/album-list-skeleton';
import { AlbumListEmpty } from './list/album-list-empty';
import { AlbumListItem } from './list/album-list-item';
import type { Album } from '@radio/types';
import {
  filterAlbums,
  sortAlbums,
} from '@/features/collection/utils/album-helpers';
import { useCollectionStore } from '@/features/collection/store/collection-store';
import { useUserAlbums } from '@/services/api';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

export const AlbumList = () => {
  const {
    searchQuery,
    filters,
    sortBy,
    sortOrder,
    setSelectedAlbum,
    setShowEditAlbumModal,
  } = useCollectionStore();
  const { data: albums, isLoading, refetch } = useUserAlbums();

  const filteredAndSortedAlbums = useMemo(() => {
    const filtered = filterAlbums(albums || [], filters, searchQuery);
    return sortAlbums(filtered, sortBy, sortOrder);
  }, [albums, filters, searchQuery, sortBy, sortOrder]);

  const handleAlbumClick = (album: Album) => {
    setSelectedAlbum(album);
  };

  const handleAlbumEdit = (album: Album) => {
    setSelectedAlbum(album);
    setShowEditAlbumModal(true);
  };

  const handleAlbumDelete = () => {
    refetch();
  };

  if (isLoading) {
    return <AlbumListSkeleton />;
  }

  if (!albums || albums.length === 0) {
    return <AlbumListEmpty />;
  }

  if (filteredAndSortedAlbums.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <svg
          className="w-16 h-16 text-gray-600 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-300 mb-2">
          Нічого не знайдено
        </h3>
        <p className="text-sm text-gray-500">
          Спробуйте змінити параметри пошуку або фільтри
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-3 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {filteredAndSortedAlbums.map((album) => (
        <motion.div key={album.id} variants={itemVariants}>
          <AlbumListItem
            album={album}
            onClick={handleAlbumClick}
            onEdit={handleAlbumEdit}
            onDelete={handleAlbumDelete}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
