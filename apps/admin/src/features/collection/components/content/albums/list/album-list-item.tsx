import type { Album } from '@radio/types';
import { AlbumCover } from './album-cover';
import {
  calculateAlbumCompleteness,
  getCompletenessColor,
} from '@/features/collection/utils/album-helpers';

type AlbumListItemProps = {
  album: Album;
  onClick: (album: Album) => void;
  onEdit: (album: Album) => void;
  onDelete: (albumId: number) => void;
};

export const AlbumListItem = ({ album, onClick }: AlbumListItemProps) => {
  const tags = album.tags ? JSON.parse(album.tags) : [];
  const completeness = calculateAlbumCompleteness(album);
  const completenessColors = getCompletenessColor(completeness);

  return (
    <div className="relative group">
      <button
        type="button"
        className="w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all text-left bg-gray-800/30 hover:bg-gray-800/50 border border-transparent"
        onClick={() => onClick(album)}
      >
        <AlbumCover
          albumId={album.id}
          coverArtPath={album.coverArtPath}
          title={album.title}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-gray-200 truncate">
              {album.title}
            </h4>
            <div
              className={`w-2 h-2 rounded-full ${completenessColors.bg}`}
              title={`${completeness}% complete`}
            />
          </div>
          <p className="text-sm text-gray-400 truncate">{album.artist}</p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {album.year && (
              <span className="text-xs text-gray-500">{album.year}</span>
            )}
            <span
              className={`text-xs px-2 py-0.5 rounded ${
                album.isPublic
                  ? 'bg-green-900/30 text-green-400'
                  : 'bg-gray-700/50 text-gray-400'
              }`}
            >
              {album.isPublic ? 'Public' : 'Private'}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 text-xs text-gray-500">
          {tags.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap justify-end">
              {tags.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600/50"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-gray-500">+{tags.length - 3}</span>
              )}
            </div>
          )}
          <div className="flex flex-col items-end gap-1 whitespace-nowrap">
            <span>{new Date(album.createdAt).toLocaleDateString()}</span>
            {album.songCount !== undefined && (
              <span className="text-gray-400">
                {album.songCount} {album.songCount === 1 ? 'track' : 'tracks'}
              </span>
            )}
          </div>
        </div>
      </button>
    </div>
  );
};
