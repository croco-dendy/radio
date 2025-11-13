import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useUserAlbums } from '@/services/api';
import { AlbumListSkeleton } from './album-list-skeleton';
import { AlbumListEmpty } from './album-list-empty';
import { AlbumListItem } from './album-list-item';
import type { Album } from '@radio/types';
import {
  filterAlbums,
  sortAlbums,
  type AlbumFilters,
  type SortField,
  type SortOrder,
} from '../../../utils/album-helpers';

type AlbumListProps = {
  onAlbumClick: (album: Album) => void;
  onAlbumEdit: (album: Album) => void;
  onAlbumDelete: (albumId: number) => void;
  searchQuery: string;
  filters: AlbumFilters;
  sortBy: SortField;
  sortOrder: SortOrder;
};

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

export const AlbumList = ({
  onAlbumClick,
  onAlbumEdit,
  onAlbumDelete,
  searchQuery,
  filters,
  sortBy,
  sortOrder,
}: AlbumListProps) => {
  const { data: albums, isLoading } = useUserAlbums();

  const filteredAndSortedAlbums = useMemo(() => {
    if (!albums) return [];
    const filtered = filterAlbums(albums, filters, searchQuery);
    return sortAlbums(filtered, sortBy, sortOrder);
  }, [albums, filters, searchQuery, sortBy, sortOrder]);

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
            onClick={onAlbumClick}
            onEdit={onAlbumEdit}
            onDelete={onAlbumDelete}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
