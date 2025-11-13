import { useState, useEffect } from 'react';
import { Modal } from '@radio/mojo-ui';
import { useAddSongToAlbum } from '@/services/api';
import { FormInput } from '@/components/ui';
import { AudioUpload } from '../../shared';

type AddSongModalProps = {
  isOpen: boolean;
  onClose: () => void;
  albumId: number;
  nextTrackNumber: number;
};

export const AddSongModal = ({
  isOpen,
  onClose,
  albumId,
  nextTrackNumber,
}: AddSongModalProps) => {
  const [audioFileId, setAudioFileId] = useState<number | null>(null);
  const [trackNumber, setTrackNumber] = useState(nextTrackNumber.toString());
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

  const addSong = useAddSongToAlbum();

  useEffect(() => {
    if (isOpen) {
      setTrackNumber(nextTrackNumber.toString());
    }
  }, [isOpen, nextTrackNumber]);

  const handleAudioUploadSuccess = (audioFile: {
    id: number;
    name: string;
    duration: string;
    format: string;
  }) => {
    setAudioFileId(audioFile.id);
    if (!title) {
      setTitle(audioFile.name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!audioFileId || !title.trim() || !trackNumber) return;

    try {
      await addSong.mutateAsync({
        albumId,
        data: {
          audioFileId,
          trackNumber: Number.parseInt(trackNumber),
          title: title.trim(),
          artist: artist.trim() || undefined,
        },
      });

      setAudioFileId(null);
      setTitle('');
      setArtist('');
      onClose();
    } catch (error) {
      console.error('Failed to add song:', error);
      alert('Failed to add song to album');
    }
  };

  const handleClose = () => {
    setAudioFileId(null);
    setTitle('');
    setArtist('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Song to Album"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-3">
            Upload Audio File
          </h3>
          <AudioUpload onUploadSuccess={handleAudioUploadSuccess} />
          {audioFileId && (
            <p className="text-sm text-green-400 mt-2">
              ✓ Audio file uploaded successfully
            </p>
          )}
        </div>

        <FormInput
          label="Track Number"
          type="number"
          value={trackNumber}
          onChange={(e) => setTrackNumber(e.target.value)}
          required
          min="1"
          placeholder="1"
        />

        <FormInput
          label="Song Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter song title"
        />

        <FormInput
          label="Artist (optional)"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Featuring artist (if different from album artist)"
        />

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={
              !audioFileId || !title.trim() || !trackNumber || addSong.isPending
            }
            className="flex-1 px-4 py-2 rounded-lg bg-sun text-gray-900 hover:bg-sun/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {addSong.isPending ? 'Adding...' : 'Add Song'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
