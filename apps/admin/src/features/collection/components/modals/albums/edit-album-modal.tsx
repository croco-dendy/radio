import { useState, useEffect } from 'react';
import { Modal } from '@radio/mojo-ui';
import { useUpdateAlbum } from '@/services/api';
import { FormInput, FormTextarea, FormCheckbox } from '@/components/ui';
import { TagEditor } from '../../shared';
import type { Album } from '@radio/types';

type EditAlbumModalProps = {
  isOpen: boolean;
  onClose: () => void;
  album: Album;
};

export const EditAlbumModal = ({
  isOpen,
  onClose,
  album,
}: EditAlbumModalProps) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(false);

  const updateAlbum = useUpdateAlbum();

  useEffect(() => {
    if (isOpen && album) {
      setTitle(album.title);
      setArtist(album.artist);
      setYear(album.year ? album.year.toString() : '');
      setDescription(album.description || '');
      setTags(album.tags ? JSON.parse(album.tags) : []);
      setIsPublic(!!album.isPublic);
    }
  }, [isOpen, album]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !artist.trim()) return;

    try {
      await updateAlbum.mutateAsync({
        id: album.id,
        data: {
          title: title.trim(),
          artist: artist.trim(),
          year: year ? Number.parseInt(year) : undefined,
          description: description.trim() || undefined,
          tags: tags.length > 0 ? JSON.stringify(tags) : undefined,
          isPublic,
        },
      });

      onClose();
    } catch (error) {
      console.error('Failed to update album:', error);
      alert('Failed to update album');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Album"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Album Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter album title"
        />

        <FormInput
          label="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
          placeholder="Enter artist name"
        />

        <FormInput
          label="Year"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="1900-2100"
          min="1900"
          max="2100"
        />

        <FormTextarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter album description"
          rows={3}
        />

        <TagEditor tags={tags} onTagsChange={setTags} />

        <FormCheckbox
          label="Make this album public"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!title.trim() || !artist.trim() || updateAlbum.isPending}
            className="flex-1 px-4 py-2 rounded-lg bg-sun text-gray-900 hover:bg-sun/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {updateAlbum.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
