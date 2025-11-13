import { useState } from 'react';
import { getGenreColor } from '../../../utils/album-helpers';

type GenreStatsProps = {
  genreCounts: Map<string, number>;
  onGenreClick: (genre: string) => void;
  selectedGenres: string[];
};

export const GenreStats = ({
  genreCounts,
  onGenreClick,
  selectedGenres,
}: GenreStatsProps) => {
  const [showAll, setShowAll] = useState(false);

  const sortedGenres = Array.from(genreCounts.entries()).sort(
    (a, b) => b[1] - a[1],
  );

  const selectedSet = new Set(selectedGenres);
  const selected = sortedGenres.filter(([genre]) => selectedSet.has(genre));
  const unselected = sortedGenres.filter(([genre]) => !selectedSet.has(genre));

  const orderedGenres = [...selected, ...unselected];
  const displayGenres = showAll ? orderedGenres : orderedGenres.slice(0, 10);
  const hasMore = sortedGenres.length > 10;

  if (sortedGenres.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {displayGenres.map(([genre, count]) => {
          const isSelected = selectedSet.has(genre);
          const colorIndex = sortedGenres.findIndex(([g]) => g === genre);
          return (
            <button
              key={genre}
              type="button"
              onClick={() => onGenreClick(genre)}
              className={
                'group px-2 py-1 rounded-full text-sm font-medium transition-all hover:scale-105 cursor-pointer'
              }
              style={{
                backgroundColor: isSelected
                  ? `${getGenreColor(colorIndex)}40`
                  : `${getGenreColor(colorIndex)}20`,
                color: getGenreColor(colorIndex),
                borderColor: getGenreColor(colorIndex),
              }}
            >
              <span className="font-medium">{genre}</span>
              <span className="ml-1.5 text-xs opacity-75">({count})</span>
            </button>
          );
        })}
      </div>
      {hasMore && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="text-xs text-gray-400 hover:text-gray-300 transition-colors"
        >
          {showAll ? 'Показати менше' : `Показати всі (${sortedGenres.length})`}
        </button>
      )}
    </div>
  );
};
