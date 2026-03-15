type AlbumMetadataProps = {
  title: string;
  artist: string;
  year?: number | null;
  description?: string | null;
  tags: string[];
  songCount: number;
  createdAt: string;
};

export const AlbumMetadata = ({
  title,
  artist,
  year,
  description,
  tags,
  songCount,
  createdAt,
}: AlbumMetadataProps) => {
  return (
    <div className="flex-1">
      <h2 className="text-2xl font-bold text-gray-200">{title}</h2>
      <p className="text-lg text-gray-400 mt-1">{artist}</p>
      {year && <p className="text-sm text-gray-500 mt-1">{year}</p>}
      {description && (
        <p className="text-gray-300 mt-3">{description}</p>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-sun/20 text-sun border border-sun/30 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 mt-4">
        <span className="text-sm text-gray-500">{songCount} songs</span>
        <span className="text-sm text-gray-500">
          Created {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};
