import { AlbumSearch } from '@/features/collection/components/filters/album-search';
import { useCollectionStore } from '@/features/collection/store/collection-store';
import { useSyncMedia } from '@/services/api';
import { useNotificationStore } from '@/stores/notification-store';
import {
  Button,
  IconButton,
  Popup,
  PopupItem,
  SortIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  FilterIcon,
} from '@radio/mojo-ui';

export const AlbumListHeader = () => {
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
    toggleFiltersEnabled,
    hasActiveFilters,
    filtersEnabled,
  } = useCollectionStore();

  const syncMedia = useSyncMedia();
  const { addNotification } = useNotificationStore();

  const handleSyncMedia = () => {
    syncMedia.mutate(undefined, {
      onSuccess: (data) => {
        const parts: string[] = [];
        if (data.albumsCreated > 0)
          parts.push(`${data.albumsCreated} albums created`);
        if (data.albumsUpdated > 0)
          parts.push(`${data.albumsUpdated} albums updated`);
        if (data.albumsMarkedOffline > 0)
          parts.push(`${data.albumsMarkedOffline} marked offline`);
        if (data.tracksCreated > 0)
          parts.push(`${data.tracksCreated} tracks added`);
        if (data.tracksUpdated > 0)
          parts.push(`${data.tracksUpdated} tracks updated`);

        const message =
          parts.length > 0 ? parts.join(', ') : 'No changes detected';

        addNotification({
          type: data.errors.length > 0 ? 'warning' : 'success',
          title: 'Media sync complete',
          message:
            data.errors.length > 0
              ? `${message}. ${data.errors.length} error(s) occurred.`
              : message,
        });
      },
      onError: (error) => {
        addNotification({
          type: 'error',
          title: 'Media sync failed',
          message:
            error instanceof Error
              ? error.message
              : 'An unexpected error occurred',
        });
      },
    });
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortOptions: Array<{
    value: typeof sortBy;
    label: string;
  }> = [
    { value: 'title', label: 'Назва' },
    { value: 'artist', label: 'Виконавець' },
    { value: 'year', label: 'Рік' },
    { value: 'trackCount', label: 'Треки' },
    { value: 'dateAdded', label: 'Дата' },
  ];

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label || 'Назва';

  return (
    <div className="flex items-center gap-3 w-full">
      <h3 className="text-lg font-semibold text-gray-200 whitespace-nowrap">
        Ваші альбоми
      </h3>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <Button
          variant="green"
          size="small"
          title={syncMedia.isPending ? 'Syncing...' : 'Sync Media'}
          onClick={handleSyncMedia}
          disabled={syncMedia.isPending}
          rounded="half"
        />

        <Popup
          label={currentSortLabel}
          icon={<SortIcon size={14} />}
          size="small"
          variant="yellow"
          rounded="half"
          align="right"
          buttonClassName="max-w-[200px]"
        >
          {sortOptions.map((option) => (
            <PopupItem
              key={option.value}
              selected={sortBy === option.value}
              onClick={() => setSortBy(option.value)}
            >
              {option.label}
            </PopupItem>
          ))}
        </Popup>

        <IconButton
          variant="dark"
          size="small"
          onClick={toggleSortOrder}
          aria-label={sortOrder === 'asc' ? 'За зростанням' : 'За спаданням'}
        >
          {sortOrder === 'asc' ? (
            <ArrowUpIcon size={16} />
          ) : (
            <ArrowDownIcon size={16} />
          )}
        </IconButton>

        <IconButton
          variant={hasActiveFilters() && filtersEnabled ? 'yellow' : 'dark'}
          size="small"
          onClick={toggleFiltersEnabled}
          disabled={!hasActiveFilters()}
          aria-label={filtersEnabled ? 'Вимкнути фільтри' : 'Увімкнути фільтри'}
        >
          <FilterIcon size={16} />
        </IconButton>

        <div className="w-64">
          <AlbumSearch value={searchQuery} onChange={setSearchQuery} />
        </div>
      </div>
    </div>
  );
};
