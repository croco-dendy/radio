import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { collectionApi } from '../collection-api';

// Query Keys
export const collectionKeys = {
  all: ['collections'] as const,
  lists: () => [...collectionKeys.all, 'list'] as const,
  list: (filters: string) => [...collectionKeys.lists(), { filters }] as const,
  details: () => [...collectionKeys.all, 'detail'] as const,
  detail: (id: number) => [...collectionKeys.details(), id] as const,
  userCollections: () => [...collectionKeys.all, 'user'] as const,
  publicCollections: () => [...collectionKeys.all, 'public'] as const,
};

export const audioFileKeys = {
  all: ['audioFiles'] as const,
  details: () => [...audioFileKeys.all, 'detail'] as const,
  detail: (id: number) => [...audioFileKeys.details(), id] as const,
};

// Collection Hooks
export const usePublicCollections = (limit = 50, offset = 0) => {
  return useQuery({
    queryKey: [...collectionKeys.publicCollections(), { limit, offset }],
    queryFn: () => collectionApi.getPublicCollections(limit, offset),
  });
};

export const useUserCollections = (limit = 50, offset = 0) => {
  return useQuery({
    queryKey: [...collectionKeys.userCollections(), { limit, offset }],
    queryFn: () => collectionApi.getUserCollections(limit, offset),
  });
};

export const useCollection = (id: number) => {
  return useQuery({
    queryKey: collectionKeys.detail(id),
    queryFn: () => collectionApi.getCollectionById(id),
    enabled: !!id,
  });
};

export const useCreateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: collectionApi.createCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: collectionKeys.userCollections(),
      });
      queryClient.invalidateQueries({
        queryKey: collectionKeys.publicCollections(),
      });
    },
  });
};

export const useUpdateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Parameters<typeof collectionApi.updateCollection>[1];
    }) => collectionApi.updateCollection(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: collectionKeys.detail(id) });
      queryClient.invalidateQueries({
        queryKey: collectionKeys.userCollections(),
      });
      queryClient.invalidateQueries({
        queryKey: collectionKeys.publicCollections(),
      });
    },
  });
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: collectionApi.deleteCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: collectionKeys.all });
    },
  });
};

// Collection Items Hooks
export const useAddItemToCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      collectionId,
      audioFileId,
      order,
    }: { collectionId: number; audioFileId: number; order?: number }) =>
      collectionApi.addItemToCollection(collectionId, audioFileId, order),
    onSuccess: (_, { collectionId }) => {
      queryClient.invalidateQueries({
        queryKey: collectionKeys.detail(collectionId),
      });
    },
  });
};

export const useRemoveItemFromCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      collectionId,
      audioFileId,
    }: { collectionId: number; audioFileId: number }) =>
      collectionApi.removeItemFromCollection(collectionId, audioFileId),
    onSuccess: (_, { collectionId }) => {
      queryClient.invalidateQueries({
        queryKey: collectionKeys.detail(collectionId),
      });
    },
  });
};

// Audio File Hooks
export const useUploadAudioFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: collectionApi.uploadAudioFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: audioFileKeys.all });
    },
  });
};

export const useAudioFile = (id: number) => {
  return useQuery({
    queryKey: audioFileKeys.detail(id),
    queryFn: () => collectionApi.getAudioFile(id),
    enabled: !!id,
  });
};

export const useDeleteAudioFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: collectionApi.deleteAudioFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: audioFileKeys.all });
      queryClient.invalidateQueries({ queryKey: collectionKeys.all });
    },
  });
};
