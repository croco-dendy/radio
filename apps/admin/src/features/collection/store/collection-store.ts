import { create } from 'zustand';
import type { Album } from '@radio/types';
import type { AlbumFilters, SortField, SortOrder } from '../utils/album-helpers';

type CollectionState = {
  activeTab: 'playlists' | 'albums';
  searchQuery: string;
  filters: AlbumFilters;
  sortBy: SortField;
  sortOrder: SortOrder;
  showFilters: boolean;
  selectedAlbum: Album | null;
  showCreateAlbumModal: boolean;
  showEditAlbumModal: boolean;
  showCreateCollectionModal: boolean;
};

type CollectionActions = {
  setActiveTab: (tab: 'playlists' | 'albums') => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: AlbumFilters | ((prev: AlbumFilters) => AlbumFilters)) => void;
  setSortBy: (sortBy: SortField) => void;
  setSortOrder: (sortOrder: SortOrder) => void;
  setSort: (sortBy: SortField, sortOrder: SortOrder) => void;
  setShowFilters: (show: boolean) => void;
  toggleShowFilters: () => void;
  setSelectedAlbum: (album: Album | null) => void;
  setShowCreateAlbumModal: (show: boolean) => void;
  setShowEditAlbumModal: (show: boolean) => void;
  setShowCreateCollectionModal: (show: boolean) => void;
  resetFilters: () => void;
  resetState: () => void;
};

type CollectionStore = CollectionState & CollectionActions;

const initialState: CollectionState = {
  activeTab: 'albums',
  searchQuery: '',
  filters: {},
  sortBy: 'dateAdded',
  sortOrder: 'desc',
  showFilters: false,
  selectedAlbum: null,
  showCreateAlbumModal: false,
  showEditAlbumModal: false,
  showCreateCollectionModal: false,
};

export const useCollectionStore = create<CollectionStore>((set) => ({
  ...initialState,

  setActiveTab: (tab) => set({ 
    activeTab: tab,
    searchQuery: '',
    filters: {},
    sortBy: 'dateAdded',
    sortOrder: 'desc',
    showFilters: false,
    selectedAlbum: null,
  }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setFilters: (filters) =>
    set((state) => ({
      filters: typeof filters === 'function' ? filters(state.filters) : filters,
    })),

  setSortBy: (sortBy) => set({ sortBy }),

  setSortOrder: (sortOrder) => set({ sortOrder }),

  setSort: (sortBy, sortOrder) => set({ sortBy, sortOrder }),

  setShowFilters: (show) => set({ showFilters: show }),

  toggleShowFilters: () => set((state) => ({ showFilters: !state.showFilters })),

  setSelectedAlbum: (album) => set({ selectedAlbum: album }),

  setShowCreateAlbumModal: (show) => set({ showCreateAlbumModal: show }),

  setShowEditAlbumModal: (show) => set({ showEditAlbumModal: show }),

  setShowCreateCollectionModal: (show) => set({ showCreateCollectionModal: show }),

  resetFilters: () =>
    set({
      searchQuery: '',
      filters: {},
      sortBy: 'dateAdded',
      sortOrder: 'desc',
    }),

  resetState: () => set(initialState),
}));

