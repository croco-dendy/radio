import { albumApi } from '@/services/api';
import { RecordWidget } from './record-widget';
import type { RecordContent } from './record-widget';
import type { StatsResponse } from '@/services/api/stats-api';
import { useWidgetConfigStore } from '../store/widget-config-store';
import type { WidgetVisualConfig } from '../store/widget-config-store';
import { DraggableWidget } from './draggable-widget';

type StatsData = StatsResponse | undefined;

const getPositionStyle = (
  position: WidgetVisualConfig['position'],
): React.CSSProperties => {
  const style: React.CSSProperties = {};

  if (position.top !== undefined) style.top = `${position.top}px`;
  if (position.bottom !== undefined) style.bottom = `${position.bottom}px`;
  if (position.left !== undefined) style.left = `${position.left}px`;
  if (position.right !== undefined) style.right = `${position.right}px`;

  // Apply rotation transform
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

export const RecordWidgets = ({
  stats,
  overallCompleteness,
  isLoading,
}: RecordWidgetsProps) => {
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

  const handleWidgetClick = (id: string) => {
    if (!isEditMode) {
      // Enter edit mode and select the clicked widget
      setEditMode(true);
      setSelectedWidget(id);
      return;
    }

    // In edit mode, just change selection
    setSelectedWidget(id);
  };

  return (
    <>
      {/* Scattered Vinyl Records - Desktop */}
      <div className={styles.recordsContainer.join(' ')}>
        {widgets.map((config) => {
          const isSelected = selectedWidgetId === config.id;
          const baseClassName = styles.recordWrapper.join(' ');

          return isEditMode ? (
            <DraggableWidget
              key={config.id}
              id={config.id}
              isEditMode={isEditMode}
              positionStyle={getPositionStyle(config.position)}
              className={baseClassName}
              isSelected={isSelected}
              onPositionChange={(id, position) =>
                updateWidgetPosition(id, position)
              }
              onSelect={handleWidgetClick}
            >
              {renderRecord(config, stats, overallCompleteness, isLoading)}
            </DraggableWidget>
          ) : (
            <button
              key={config.id}
              type="button"
              className={`${baseClassName} cursor-pointer bg-transparent`}
              style={getPositionStyle(config.position)}
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
