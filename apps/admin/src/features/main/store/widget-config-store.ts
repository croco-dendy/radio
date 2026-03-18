import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WidgetPosition = {
  topPercent?: number; // 0-100
  bottomPercent?: number; // 0-100
  leftPercent?: number; // 0-100
  rightPercent?: number; // 0-100
  rotation: number;
};

export type WidgetVisualConfig = {
  id: string;
  title: string;
  radius?: number;
  position: WidgetPosition;
  color?: string;
  titleRotation?: number;
};

type WidgetConfigState = {
  isEditMode: boolean;
  widgets: WidgetVisualConfig[];
  selectedWidgetId: string | null;
};

type WidgetConfigActions = {
  toggleEditMode: () => void;
  setEditMode: (isEditMode: boolean) => void;
  setSelectedWidget: (id: string | null) => void;
  updateWidget: (id: string, updates: Partial<WidgetVisualConfig>) => void;
  updateWidgetPosition: (id: string, position: Partial<WidgetPosition>) => void;
  resetToDefaults: () => void;
};

export type WidgetConfigStore = WidgetConfigState & WidgetConfigActions;

const BASELINE_WIDTH = 1280;
const BASELINE_HEIGHT = 720;

const defaultWidgets: WidgetVisualConfig[] = [
  {
    id: 'albums',
    title: 'Albums',
    radius: 60,
    position: {
      topPercent: 24,
      leftPercent: 32,
      rotation: 6,
    },
    color: '#ff9f1c',
    titleRotation: 10,
  },
  {
    id: 'tracks',
    title: 'Tracks',
    radius: 80,
    position: {
      topPercent: 20,
      leftPercent: 7,
      rotation: -35,
    },
    color: '#ffc857',
    titleRotation: 45,
  },
  {
    id: 'airtime',
    title: 'Airtime',
    radius: 112,
    position: {
      topPercent: 10,
      leftPercent: 20,
      rotation: -8,
    },
    color: '#ffbd30',
    titleRotation: 300,
  },
  {
    id: 'catalog-health',
    title: 'Catalog Health',
    radius: 100,
    position: {
      bottomPercent: 20,
      leftPercent: 20,
      rotation: -9,
    },
    color: '#4ade80',
    titleRotation: 15,
  },
  {
    id: 'fresh-1',
    title: 'Fresh 1',
    radius: 90,
    position: {
      topPercent: 15,
      rightPercent: 20,
      rotation: -4,
    },
    color: '#ff6f00',
    titleRotation: 290,
  },
  {
    id: 'fresh-2',
    title: 'Fresh 2',
    radius: 100,
    position: {
      topPercent: 12,
      rightPercent: 7,
      rotation: -10,
    },
    color: '#d45500',
    titleRotation: 280,
  },
  {
    id: 'fresh-3',
    title: 'Fresh 3',
    radius: 112,
    position: {
      topPercent: 25,
      rightPercent: 0,
      rotation: -3,
    },
    color: '#ff9f1c',
    titleRotation: 20,
  },
];

/** Migrate legacy pixel positions to percentages (baseline 1280x720) */
function migratePosition(
  pos: WidgetPosition & {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  },
): WidgetPosition {
  const result: WidgetPosition = { rotation: pos.rotation };

  if (pos.topPercent !== undefined) result.topPercent = pos.topPercent;
  else if (pos.top !== undefined)
    result.topPercent = (pos.top / BASELINE_HEIGHT) * 100;

  if (pos.bottomPercent !== undefined) result.bottomPercent = pos.bottomPercent;
  else if (pos.bottom !== undefined)
    result.bottomPercent = (pos.bottom / BASELINE_HEIGHT) * 100;

  if (pos.leftPercent !== undefined) result.leftPercent = pos.leftPercent;
  else if (pos.left !== undefined)
    result.leftPercent = (pos.left / BASELINE_WIDTH) * 100;

  if (pos.rightPercent !== undefined) result.rightPercent = pos.rightPercent;
  else if (pos.right !== undefined)
    result.rightPercent = (pos.right / BASELINE_WIDTH) * 100;

  return result;
}

const initialState: WidgetConfigState = {
  isEditMode: false,
  widgets: defaultWidgets,
  selectedWidgetId: null,
};

export const useWidgetConfigStore = create<WidgetConfigStore>()(
  persist(
    (set) => ({
      ...initialState,

      toggleEditMode: () =>
        set((state) => {
          const newEditMode = !state.isEditMode;
          // When entering edit mode, select first widget if none selected
          // When leaving edit mode, clear selection
          return {
            isEditMode: newEditMode,
            selectedWidgetId: newEditMode
              ? state.selectedWidgetId || state.widgets[0]?.id || null
              : null,
          };
        }),

      setEditMode: (isEditMode) =>
        set((state) => ({
          isEditMode,
          selectedWidgetId: isEditMode ? state.selectedWidgetId : null,
        })),

      setSelectedWidget: (id) =>
        set(() => ({
          selectedWidgetId: id,
        })),

      updateWidget: (id, updates) =>
        set((state) => ({
          widgets: state.widgets.map((widget) =>
            widget.id === id ? { ...widget, ...updates } : widget,
          ),
        })),

      updateWidgetPosition: (id, position) =>
        set((state) => ({
          widgets: state.widgets.map((widget) => {
            if (widget.id !== id) return widget;
            // Preserve rotation when updating position
            return {
              ...widget,
              position: {
                ...widget.position,
                ...position,
                rotation: widget.position.rotation, // Preserve rotation
              },
            };
          }),
        })),

      resetToDefaults: () =>
        set(() => ({
          ...initialState,
        })),
    }),
    {
      name: 'main-page-widget-configs',
      version: 2,
      migrate: (persistedState: unknown, version: number) => {
        const state = persistedState as WidgetConfigState;
        if (version < 2 && state?.widgets) {
          state.widgets = state.widgets.map((w) => ({
            ...w,
            position: migratePosition(
              w.position as WidgetPosition & {
                top?: number;
                bottom?: number;
                left?: number;
                right?: number;
              },
            ),
          }));
        }
        return state;
      },
    },
  ),
);
