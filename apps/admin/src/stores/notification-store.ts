import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number; // in milliseconds, 0 means persistent
  timestamp: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface LoadingState {
  id: string;
  message: string;
  progress?: number; // 0-100
}

interface NotificationStore {
  notifications: Notification[];
  loadingStates: LoadingState[];

  // Notification actions
  addNotification: (
    notification: Omit<Notification, 'id' | 'timestamp'>,
  ) => string;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;

  // Loading state actions
  addLoadingState: (loading: Omit<LoadingState, 'id'>) => string;
  updateLoadingState: (
    id: string,
    updates: Partial<Omit<LoadingState, 'id'>>,
  ) => void;
  removeLoadingState: (id: string) => void;
  clearAllLoadingStates: () => void;

  // Computed states
  hasActiveLoadingStates: () => boolean;
  getLoadingStateCount: () => number;
}

const generateId = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

export const useNotificationStore = create<NotificationStore>()(
  subscribeWithSelector((set, get) => ({
    notifications: [],
    loadingStates: [],

    addNotification: (notification) => {
      const id = generateId();
      const newNotification: Notification = {
        ...notification,
        id,
        timestamp: Date.now(),
        duration:
          notification.duration ?? (notification.type === 'error' ? 0 : 5000),
      };

      set((state) => ({
        notifications: [...state.notifications, newNotification],
      }));

      // Auto-remove notification after duration
      if (newNotification.duration && newNotification.duration > 0) {
        setTimeout(() => {
          get().removeNotification(id);
        }, newNotification.duration);
      }

      return id;
    },

    removeNotification: (id) => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    },

    clearAllNotifications: () => {
      set({ notifications: [] });
    },

    addLoadingState: (loading) => {
      const id = generateId();
      const newLoadingState: LoadingState = {
        ...loading,
        id,
      };

      set((state) => ({
        loadingStates: [...state.loadingStates, newLoadingState],
      }));

      return id;
    },

    updateLoadingState: (id, updates) => {
      set((state) => ({
        loadingStates: state.loadingStates.map((loading) =>
          loading.id === id ? { ...loading, ...updates } : loading,
        ),
      }));
    },

    removeLoadingState: (id) => {
      set((state) => ({
        loadingStates: state.loadingStates.filter((l) => l.id !== id),
      }));
    },

    clearAllLoadingStates: () => {
      set({ loadingStates: [] });
    },

    hasActiveLoadingStates: () => {
      return get().loadingStates.length > 0;
    },

    getLoadingStateCount: () => {
      return get().loadingStates.length;
    },
  })),
);
