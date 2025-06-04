import type React from 'react';

const albums = [
  { id: 1, title: 'Classics Vol. 1', cover: '/placeholder.png' },
  { id: 2, title: 'Classics Vol. 2', cover: '/placeholder.png' },
  { id: 3, title: 'Golden Hits', cover: '/placeholder.png' },
  { id: 4, title: 'Retro Wave', cover: '/placeholder.png' },
  { id: 5, title: 'Rock Legends', cover: '/placeholder.png' },
  { id: 6, title: 'Jazz Moods', cover: '/placeholder.png' },
];

export const Library: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto max-h-[500px] p-1">
      {albums.map((album) => (
        <div key={album.id} className="flex flex-col items-center">
          <img
            src={album.cover}
            alt={album.title}
            className="w-full rounded shadow-md"
          />
          <span className="mt-1 text-sm text-center">{album.title}</span>
        </div>
      ))}
    </div>
  );
};
