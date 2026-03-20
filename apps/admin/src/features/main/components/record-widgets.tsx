import { albumApi } from '@/services/api';
import type { StatsResponse } from '@/services/api/stats-api';
import { useEffect, useRef, useState } from 'react';
import { useWidgetConfigStore } from '../store/widget-config-store';
import type {
  WidgetPosition,
  WidgetVisualConfig,
} from '../store/widget-config-store';
import { DraggableWidget } from './draggable-widget';
import { RecordWidget } from './record-widget';
import type { RecordContent } from './record-widget';

type StatsData = StatsResponse | undefined;

type ContainerSize = { width: number; height: number };

const getPositionStyle = (
  position: WidgetPosition,
  containerSize: ContainerSize,
  widgetSize = 224,
): React.CSSProperties => {
  const { width: cw, height: ch } = containerSize;
  const style: React.CSSProperties = {};

  // Always output top/left for consistent layout (Draggable needs them)
  if (position.topPercent !== undefined) {
    style.top = `${(position.topPercent / 100) * ch}px`;
  } else if (position.bottomPercent !== undefined) {
    style.top = `${(ch * (100 - position.bottomPercent)) / 100 - widgetSize}px`;
  }

  if (position.leftPercent !== undefined) {
    style.left = `${(position.leftPercent / 100) * cw}px`;
  } else if (position.rightPercent !== undefined) {
    style.left = `${(cw * (100 - position.rightPercent)) / 100 - widgetSize}px`;
  }

  if (position.rotation !== 0) {
    style.transform = `rotate(${position.rotation}deg)`;
  }

  return style;
};

const styles = {
  recordsContainer: [
    'absolute inset-0',
    'hidden lg:block',
    'pointer-events-none',
    'w-full h-full',
  ],
  recordWrapper: ['absolute', 'pointer-events-auto', 'z-20'],
  mobileRecords: [
    'lg:hidden',
    'flex flex-col items-center gap-12 mt-8',
    'w-full',
  ],
  mobileRecordWrapper: ['flex flex-col items-center gap-3', 'w-full'],
} as const;

type RecordWidgetsProps = {
  stats: StatsData;
  overallCompleteness: number | undefined;
  isLoading: boolean;
};

const getContentForWidget = (
  widgetId: string,
  stats: StatsData,
  overallCompleteness: number | undefined,
): RecordContent | null => {
  switch (widgetId) {
    case 'albums':
      return stats?.totals
        ? {
            type: 'number',
            value: stats.totals.albums,
          }
        : null;

    case 'tracks':
      return stats?.totals
        ? {
            type: 'number',
            value: stats.totals.tracks,
          }
        : null;

    case 'airtime':
      return stats?.totals
        ? {
            type: 'number',
            value: stats.totals.totalDuration,
            format: 'duration',
          }
        : null;

    case 'catalog-health':
      if (overallCompleteness === undefined) return null;
      return {
        type: 'progress',
        percentage: overallCompleteness,
      };

    case 'fresh-1': {
      const album = stats?.recent?.[0];
      if (!album) return null;
      return {
        type: 'image',
        src: albumApi.getCoverArtUrl(album.id),
        alt: album.title,
        title: album.title,
        subtitle: album.artist,
      };
    }

    case 'fresh-2': {
      const album = stats?.recent?.[1];
      if (!album) return null;
      return {
        type: 'image',
        src: albumApi.getCoverArtUrl(album.id),
        alt: album.title,
        title: album.title,
        subtitle: album.artist,
      };
    }

    case 'fresh-3': {
      const album = stats?.recent?.[2];
      if (!album) return null;
      return {
        type: 'image',
        src: albumApi.getCoverArtUrl(album.id),
        alt: album.title,
        title: album.title,
        subtitle: album.artist,
      };
    }

    default:
      return null;
  }
};

const getWidgetTitle = (
  widgetId: string,
  config: WidgetVisualConfig,
  stats: StatsData,
): string => {
  // For fresh album widgets, use album title and artist
  if (
    widgetId === 'fresh-1' ||
    widgetId === 'fresh-2' ||
    widgetId === 'fresh-3'
  ) {
    const index = widgetId === 'fresh-1' ? 0 : widgetId === 'fresh-2' ? 1 : 2;
    const album = stats?.recent?.[index];
    if (album) {
      return `${album.title} - ${album.artist}`;
    }
  }
  // For other widgets, use the configured title
  return config.title;
};

const renderRecord = (
  config: WidgetVisualConfig,
  stats: StatsData,
  overallCompleteness: number | undefined,
  isLoading: boolean,
  isMobile = false,
) => {
  const content = getContentForWidget(config.id, stats, overallCompleteness);
  if (!content) return null;

  // Get dynamic title for widgets
  const widgetTitle = getWidgetTitle(config.id, config, stats);

  if (isMobile) {
    return (
      <div key={config.title} className={styles.mobileRecordWrapper.join(' ')}>
        <RecordWidget
          title={widgetTitle}
          content={content}
          radius={config.radius}
          isLoading={isLoading}
          color={config.color}
          titleRotation={config.titleRotation}
        />
      </div>
    );
  }

  return (
    <RecordWidget
      title={widgetTitle}
      content={content}
      radius={config.radius}
      isLoading={isLoading}
      color={config.color}
      titleRotation={config.titleRotation}
    />
  );
};

const DEFAULT_CONTAINER_SIZE: ContainerSize = { width: 1280, height: 720 };

export const RecordWidgets = ({
  stats,
  overallCompleteness,
  isLoading,
}: RecordWidgetsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState<ContainerSize>(
    DEFAULT_CONTAINER_SIZE,
  );

  const widgets = useWidgetConfigStore((state) => state.widgets);
  const isEditMode = useWidgetConfigStore((state) => state.isEditMode);
  const selectedWidgetId = useWidgetConfigStore(
    (state) => state.selectedWidgetId,
  );
  const updateWidgetPosition = useWidgetConfigStore(
    (state) => state.updateWidgetPosition,
  );
  const setSelectedWidget = useWidgetConfigStore(
    (state) => state.setSelectedWidget,
  );
  const setEditMode = useWidgetConfigStore((state) => state.setEditMode);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0]?.contentRect ?? {};
      if (width != null && height != null && (width > 0 || height > 0)) {
        setContainerSize({ width, height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleWidgetClick = (id: string) => {
    if (!isEditMode) {
      setEditMode(true);
      setSelectedWidget(id);
      return;
    }
    setSelectedWidget(id);
  };

  const size = containerSize.width > 0 ? containerSize : DEFAULT_CONTAINER_SIZE;

  return (
    <>
      {/* Scattered Vinyl Records - Desktop */}
      <div ref={containerRef} className={styles.recordsContainer.join(' ')}>
        {widgets.map((config) => {
          const isSelected = selectedWidgetId === config.id;
          const baseClassName = styles.recordWrapper.join(' ');
          const widgetSize = (config.radius ?? 112) * 2;
          const positionStyle = getPositionStyle(
            config.position,
            size,
            widgetSize,
          );

          return isEditMode ? (
            <DraggableWidget
              key={config.id}
              id={config.id}
              radius={config.radius ?? 112}
              isEditMode={isEditMode}
              positionStyle={positionStyle}
              className={baseClassName}
              isSelected={isSelected}
              onPositionChange={updateWidgetPosition}
              onSelect={handleWidgetClick}
            >
              {renderRecord(config, stats, overallCompleteness, isLoading)}
            </DraggableWidget>
          ) : (
            <button
              key={config.id}
              type="button"
              className={`${baseClassName} cursor-pointer bg-transparent`}
              style={positionStyle}
              onClick={() => handleWidgetClick(config.id)}
            >
              {renderRecord(config, stats, overallCompleteness, isLoading)}
            </button>
          );
        })}
      </div>

      {/* Stacked Records - Mobile */}
      <div className={styles.mobileRecords.join(' ')}>
        {widgets.map((config) =>
          renderRecord(config, stats, overallCompleteness, isLoading, true),
        )}
      </div>
    </>
  );
};
