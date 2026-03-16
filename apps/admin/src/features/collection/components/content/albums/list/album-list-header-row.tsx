export const AlbumListHeaderRow = () => {
  return (
    <div className="sticky top-0 z-10 w-full flex items-center gap-3 p-3 rounded-xl bg-gray-800/80 backdrop-blur-xl">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-16 flex-shrink-0">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Cover
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Title
          </span>
        </div>
        <div className="flex flex-col items-end gap-2 text-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Stats
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 flex-shrink-0 pl-2 border-l border-gray-700/50">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Status
        </span>
      </div>
    </div>
  );
};
