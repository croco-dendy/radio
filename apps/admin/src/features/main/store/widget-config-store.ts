import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type WidgetPosition = {
  top?: number; // pixels
  bottom?: number; // pixels
  left?: number; // pixels
  right?: number; // pixels
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

// Helper to convert percentage to pixels (assuming 1280px container width, 720px height as baseline)
const percentToPx = (percent: string, dimension: 'width' | 'height'): number => {
  const value = Number.parseFloat(percent.replace('%', ''));
  const base = dimension === 'width' ? 1280 : 720;
  return (value / 100) * base;
};

const defaultWidgets: WidgetVisualConfig[] = [
  {
    id: 'albums',
    title: 'Albums',
    radius: 60,
    position: {
      top: percentToPx('24%', 'height'),
      left: percentToPx('32%', 'width'),
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
      top: percentToPx('20%', 'height'),
      left: percentToPx('7%', 'width'),
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
      top: percentToPx('10%', 'height'),
      left: percentToPx('20%', 'width'),
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
      bottom: percentToPx('20%', 'height'),
      left: percentToPx('20%', 'width'),
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
      top: percentToPx('15%', 'height'),
      right: percentToPx('20%', 'width'),
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
      top: percentToPx('12%', 'height'),
      right: percentToPx('7%', 'width'),
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
      top: percentToPx('25%', 'height'),
      right: 0,
      rotation: -3,
    },
    color: '#ff9f1c',
    titleRotation: 20,
  },
];

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
    },
  ),
);

