import { getGenreColor } from '@/features/collection/utils/album-helpers';

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
  const sortedGenres = Array.from(genreCounts.entries()).sort(
    (a, b) => b[1] - a[1],
  );

  const selectedSet = new Set(selectedGenres);

  if (sortedGenres.length === 0) {
    return <div />;
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {sortedGenres.map(([genre, count]) => {
          const isSelected = selectedSet.has(genre);
          const colorIndex = sortedGenres.findIndex(([g]) => g === genre);

          return (
            <button
              key={genre}
              type="button"
              onClick={() => onGenreClick(genre)}
              className={
                'group px-2 py-1 rounded-full text-sm font-medium transition-all cursor-pointer'
              }
              style={{
                backgroundColor: isSelected
                  ? `${getGenreColor(colorIndex)}40`
                  : `${getGenreColor(colorIndex)}20`,
                color: getGenreColor(colorIndex),
                borderWidth: 1,
                borderColor: isSelected
                  ? getGenreColor(colorIndex)
                  : 'transparent',
              }}
            >
              <span className="font-medium">{genre}</span>
              <span className="ml-1.5 text-xs opacity-75">({count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
