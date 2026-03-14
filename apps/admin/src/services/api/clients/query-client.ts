import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000, // 2 minutes (shorter for admin)
      gcTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error: unknown) => {
        // Don't retry on 4xx errors
        if (
          error &&
          typeof error === 'object' &&
          'response' in error &&
          error.response &&
          typeof error.response === 'object' &&
          'status' in error.response &&
          typeof error.response.status === 'number' &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: !import.meta.env.DEV, // Disable refetch on focus in dev to reduce CPU usage
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false,
    },
  },
});
