import { waveApiClient } from './clients/http-client';
import type { Collection, AudioFile, CollectionItem } from '@radio/types';

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

type CreateCollectionData = {
  name: string;
  description?: string;
  isPublic?: boolean;
};

type CollectionWithItems = Collection & {
  items: (CollectionItem & {
    name: string;
    path: string;
    duration: string;
    format: string;
  })[];
};

export const collectionApi = {
  // Collections
  getPublicCollections: async (
    limit = 50,
    offset = 0,
  ): Promise<Collection[]> => {
    const response = await waveApiClient.get<ApiResponse<Collection[]>>(
      `/api/collections/public?limit=${limit}&offset=${offset}`,
    );
    return response.data.data;
  },

  getUserCollections: async (limit = 50, offset = 0): Promise<Collection[]> => {
    const response = await waveApiClient.get<ApiResponse<Collection[]>>(
      `/api/collections/my?limit=${limit}&offset=${offset}`,
    );
    return response.data.data;
  },

  getCollectionById: async (id: number): Promise<CollectionWithItems> => {
    const response = await waveApiClient.get<ApiResponse<CollectionWithItems>>(
      `/api/collections/${id}`,
    );
    return response.data.data;
  },

  createCollection: async (data: CreateCollectionData): Promise<void> => {
    await waveApiClient.post<ApiResponse<void>>('/api/collections', data);
  },

  updateCollection: async (
    id: number,
    data: Partial<CreateCollectionData>,
  ): Promise<void> => {
    await waveApiClient.put<ApiResponse<void>>(`/api/collections/${id}`, data);
  },

  deleteCollection: async (id: number): Promise<void> => {
    await waveApiClient.delete<ApiResponse<void>>(`/api/collections/${id}`);
  },

  // Collection Items
  addItemToCollection: async (
    collectionId: number,
    audioFileId: number,
    order?: number,
  ): Promise<void> => {
    await waveApiClient.post<ApiResponse<void>>(
      `/api/collections/${collectionId}/items`,
      { audioFileId, order },
    );
  },

  removeItemFromCollection: async (
    collectionId: number,
    audioFileId: number,
  ): Promise<void> => {
    await waveApiClient.delete<ApiResponse<void>>(
      `/api/collections/${collectionId}/items/${audioFileId}`,
    );
  },

  reorderCollectionItems: async (
    collectionId: number,
    items: Array<{ id: number; order: number }>,
  ): Promise<void> => {
    await waveApiClient.put<ApiResponse<void>>(
      `/api/collections/${collectionId}/items/reorder`,
      { items },
    );
  },

  // Audio Files
  uploadAudioFile: async (file: File): Promise<AudioFile> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await waveApiClient.post<ApiResponse<AudioFile>>(
      '/api/audio-files/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data.data;
  },

  getAudioFile: async (id: number): Promise<AudioFile> => {
    const response = await waveApiClient.get<ApiResponse<AudioFile>>(
      `/api/audio-files/${id}`,
    );
    return response.data.data;
  },

  deleteAudioFile: async (id: number): Promise<void> => {
    await waveApiClient.delete<ApiResponse<void>>(`/api/audio-files/${id}`);
  },

  getAudioFileStreamUrl: (id: number): string => {
    return `${waveApiClient.defaults.baseURL}/api/audio-files/${id}/stream`;
  },
};
