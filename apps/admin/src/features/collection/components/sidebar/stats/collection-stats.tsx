type CollectionStatsProps = {
  activeTab: 'playlists' | 'albums';
  totalCount: number;
  publicCount: number;
  lastUpdated?: string;
};

export const CollectionStats = ({
  totalCount,
  publicCount,
  lastUpdated,
}: CollectionStatsProps) => {
  const hiddenCount = totalCount - publicCount;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-2 w-full">
      <div className="grid grid-cols-3 gap-2 w-full">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-100">{totalCount}</div>
          <div className="text-xs text-gray-400">Всього</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-green-400">{publicCount}</div>
          <div className="text-xs text-gray-400">Публічні</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-500">{hiddenCount}</div>
          <div className="text-xs text-gray-400">Приховані</div>
        </div>
      </div>
      {lastUpdated && (
        <div className="pt-2 border-t border-gray-700/50 text-center">
          <div className="text-xs text-gray-500">{formatDate(lastUpdated)}</div>
        </div>
      )}
    </div>
  );
};
